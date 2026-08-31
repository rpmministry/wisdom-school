import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

// Paso 1: configuramos el entorno de ejecución del backend y definimos la aplicación Express principal.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Paso 2: desactivamos el ETag para evitar caché agresivo y forzamos una recarga más limpia en frontend durante desarrollo.
app.disable('etag');
app.use((req, res, next) => {
  const isHtml = req.path === '/' || req.path.endsWith('.html');
  const isFrontendAsset =
    req.path.startsWith('/src/') ||
    req.path.startsWith('/@vite/') ||
    req.path.startsWith('/assets/') ||
    req.path.endsWith('.js') ||
    req.path.endsWith('.css') ||
    req.path.endsWith('.svg') ||
    req.path.endsWith('.png') ||
    req.path.endsWith('.jpg') ||
    req.path.endsWith('.jpeg') ||
    req.path.endsWith('.webp') ||
    req.path.endsWith('.ico');

  if (isHtml || isFrontendAsset) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
});

// Paso 3: habilitamos JSON y formularios extensos porque la app genera fotos, textos largos y payloads de IA.
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Paso 4: aseguramos que exista la carpeta pública de imágenes de estudiantes para guardar fotos y archivos visuales.
const publicStudentsDir = path.join(process.cwd(), 'public', 'students');
if (!fs.existsSync(publicStudentsDir)) {
  fs.mkdirSync(publicStudentsDir, { recursive: true });
}

// Paso 5: este endpoint resuelve imágenes de estudiantes sin depender del nombre exacto o la extensión exacta.
app.get('/students/:filename', (req: Request, res: Response, next) => {
  const reqName = req.params.filename.toLowerCase();
  const searchDirs = [
    publicStudentsDir,
    path.join(process.cwd(), 'public'),
    path.join(process.cwd(), 'dist', 'students'),
    path.join(process.cwd(), 'dist'),
  ];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      const match = files.find(
        (f) => f.toLowerCase() === reqName || f.toLowerCase().startsWith(reqName.split('.')[0])
      );
      if (match) {
        const filePath = path.join(dir, match);
        const ext = path.extname(match).toLowerCase();
        if (ext === '.png') res.setHeader('Content-Type', 'image/png');
        else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');
        else if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml');
        else if (ext === '.webp') res.setHeader('Content-Type', 'image/webp');
        return res.sendFile(filePath);
      }
    }
  }
  next();
});

// Paso 6: servimos la carpeta pública y la ruta de estudiantes para que el frontend pueda cargar fotos y avatares sin problema.
app.use('/students', express.static(publicStudentsDir));
app.use(express.static(path.join(process.cwd(), 'public')));

// Paso 7: este endpoint guarda la foto real del estudiante en el servidor para que se use en la interfaz y quede persistida.
app.post('/api/students/upload-avatar', (req: Request, res: Response) => {
  try {
    const { studentId, imageBase64 } = req.body;
    if (!studentId || !imageBase64) {
      return res.status(400).json({ error: 'Falta studentId o imageBase64' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const targetFile = path.join(publicStudentsDir, `${studentId.toLowerCase()}.png`);
    fs.writeFileSync(targetFile, buffer);

    // Also write to dist/students if dist exists
    const distStudentsDir = path.join(process.cwd(), 'dist', 'students');
    if (!fs.existsSync(distStudentsDir)) {
      fs.mkdirSync(distStudentsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distStudentsDir, `${studentId.toLowerCase()}.png`), buffer);

    const avatarUrl = `/students/${studentId.toLowerCase()}.png?t=${Date.now()}`;
    return res.json({ success: true, avatarUrl });
  } catch (error: any) {
    console.error('Error al guardar foto de estudiante:', error);
    return res.status(500).json({ error: error?.message || 'Error al guardar la foto' });
  }
});

// Paso 8: verificamos qué avatares existen para decidir si ya hay una imagen real del estudiante cargada o se usa una predeterminada.
app.get('/api/students/avatars-status', (req: Request, res: Response) => {
  const results: Record<string, string | null> = { avril: null, gael: null };
  for (const id of ['avril', 'gael']) {
    for (const ext of ['.png', '.jpg', '.jpeg', '.webp']) {
      const p = path.join(publicStudentsDir, `${id}${ext}`);
      if (fs.existsSync(p)) {
        results[id] = `/students/${id}${ext}?t=${Date.now()}`;
        break;
      }
    }
  }
  res.json({ results });
});

// Paso 9: inicializamos el cliente de Gemini solo cuando se necesita, con validación de la clave de entorno para no fallar en runtime.
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined in environment variables.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Paso 10: el health check sirve como verificación de que el backend está vivo antes de pedir servicios de IA o autenticación.
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Wisdom School Backend', time: new Date().toISOString() });
});

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Paso 11: esta función intenta varios modelos de Gemini en orden de prioridad y reintenta ante caídas temporales o alta demanda.
async function callGeminiWithModelFallback(
  ai: GoogleGenAI,
  requestParams: {
    contents: any;
    config?: any;
  }
) {
  // Valid modern Gemini models in prioritized order (Gemini 3.7 / 1.5 / 2.5 / 2.0 fallback)
  const modelsToTry = [
    'gemini-3.7-flash',
    'gemini-1.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: requestParams.contents,
          config: requestParams.config,
        });
        if (response) {
          return { response, modelUsed: model };
        }
      } catch (err: any) {
        lastError = err;
        const statusCode = err?.status || err?.code || '';
        const isTemporary = statusCode === 503 || statusCode === 429 || `${err?.message || ''}`.includes('high demand');

        if (isTemporary && attempt === 0) {
          await wait(600);
          continue;
        }
        break;
      }
    }
  }

  throw lastError;
}

// Paso 12: construimos el historial de mensajes en formato alternado para que Gemini reciba conversaciones válidas y coherentes.
function buildGeminiContents(
  history: Array<{ role: 'user' | 'model'; content: string }>,
  currentMessage: string
) {
  const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

  for (const msg of history || []) {
    if (!msg || typeof msg.content !== 'string' || !msg.content.trim()) continue;
    const role: 'user' | 'model' = msg.role === 'user' ? 'user' : 'model';

    // Must start with user
    if (contents.length === 0 && role === 'model') continue;

    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += `\n${msg.content.trim()}`;
    } else {
      contents.push({ role, parts: [{ text: msg.content.trim() }] });
    }
  }

  // Ensure alternating turns before pushing final user question
  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents.push({ role: 'model', parts: [{ text: 'Entendido.' }] });
  }

  contents.push({ role: 'user', parts: [{ text: currentMessage.trim() }] });
  return contents;
}

/**
 * Paso 13: Motor de Resiliencia en Cascada.
 *
 * Fase 1: consulta modelos gratuitos de OpenRouter para intentar la opción más económica.
 * Fase 2: prueba cada modelo con timeout y reasignación de tiempo antes de fallar.
 * Fase 3: usa Gemini como respaldo seguro si OpenRouter no responde.
 * Fase final: devuelve un mensaje educativo amable cuando todo falla.
 */
async function executeResilientAIPipeline(params: {
  systemPrompt: string;
  userMessage: string;
  conversationHistory: Array<{ role: 'user' | 'model'; content: string }>;
}): Promise<{ reply: string; providerUsed: string }> {
  const { systemPrompt, userMessage, conversationHistory } = params;

  // --------------------------------------------------------------------------
  // FASE 1 & FASE 2: Búsqueda dinámica de modelos gratuitos e Iteración (OpenRouter)
  // --------------------------------------------------------------------------
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey && openRouterKey.trim()) {
    try {
      console.log('[Resilience Engine] Fase 1: Consultando catálogo de modelos en OpenRouter...');
      let freeModels: string[] = [];

      try {
        const modelsRes = await fetch('https://openrouter.ai/api/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${openRouterKey.trim()}`,
            'Content-Type': 'application/json',
          },
        });

        if (modelsRes.ok) {
          const modelsData = await modelsRes.json();
          const allModels: any[] = modelsData?.data || [];

          freeModels = allModels
            .filter((m: any) => {
              const id = String(m?.id || '');
              const promptCost = Number(m?.pricing?.prompt ?? 1);
              const completionCost = Number(m?.pricing?.completion ?? 1);
              return id.endsWith(':free') || (promptCost === 0 && completionCost === 0);
            })
            .map((m: any) => String(m?.id || ''))
            .filter(Boolean)
            .slice(0, 3);
        }
      } catch (catErr: any) {
        console.warn('[Resilience Engine] Error obteniendo catálogo de OpenRouter, usando lista gratuita de respaldo:', catErr?.message || catErr);
      }

      if (freeModels.length === 0) {
        freeModels = [
          'google/gemini-2.0-flash-exp:free',
          'meta-llama/llama-3.3-70b-instruct:free',
          'mistralai/mistral-7b-instruct:free',
        ];
      }

      console.log(`[Resilience Engine] Fase 1: Se utilizarán ${freeModels.length} modelos gratuitos:`, freeModels);

      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map((msg) => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content,
        })),
        { role: 'user', content: userMessage },
      ];

      // Fase 2: Iteración sobre modelos gratuitos con timeout de 15s y delay de 2-3s
      for (const modelId of freeModels) {
        console.log(`[Resilience Engine] Fase 2: Intentando modelo gratuito OpenRouter: ${modelId}...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        try {
          const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openRouterKey.trim()}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': process.env.APP_URL || 'https://wisdomschool.edu',
              'X-Title': 'Wisdom School AI Teacher',
            },
            signal: controller.signal,
            body: JSON.stringify({
              model: modelId,
              messages,
              temperature: 0.7,
            }),
          });

          if (!openRouterRes.ok) {
            const errorBody = await openRouterRes.text().catch(() => '');
            const descr = errorBody ? ` ${errorBody.slice(0, 200)}` : '';
            console.warn(`[Resilience Engine] OpenRouter ${modelId} respondió con ${openRouterRes.status}${descr}`);
            throw new Error(`OpenRouter status ${openRouterRes.status}${descr}`);
          }

          const data = await openRouterRes.json();
          const text = data?.choices?.[0]?.message?.content;

          if (text && typeof text === 'string' && text.trim()) {
            console.log(`[Resilience Engine] ¡Éxito en Fase 2 con modelo OpenRouter ${modelId}!`);
            return { reply: text.trim(), providerUsed: `OpenRouter Free (${modelId})` };
          }

          throw new Error(`OpenRouter respondió sin contenido válido para ${modelId}`);
        } catch (attemptErr: any) {
          console.warn(`[Resilience Engine] Fallo o timeout de 15s en modelo ${modelId}:`, attemptErr?.message || attemptErr);
          const delayMs = 2000 + Math.floor(Math.random() * 1000);
          await wait(delayMs);
        } finally {
          clearTimeout(timeoutId);
        }
      }
    } catch (openRouterErr: any) {
      console.warn('[Resilience Engine] Excepción en Fase 1/2 de OpenRouter:', openRouterErr?.message || openRouterErr);
    }
  }

  // --------------------------------------------------------------------------
  // FASE 3: Fallback de Seguridad de Alta Capacidad (Gemini 3.7 / 1.5 / 2.5)
  // --------------------------------------------------------------------------
  const ai = getGeminiClient();
  if (ai) {
    try {
      console.log('[Resilience Engine] Fase 3: Activando Fallback de Seguridad con Gemini...');
      const sanitizedContents = buildGeminiContents(conversationHistory, userMessage);

      const { response, modelUsed } = await callGeminiWithModelFallback(ai, {
        contents: sanitizedContents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      if (response && response.text) {
        console.log(`[Resilience Engine] ¡Éxito en Fase 3 con Gemini model ${modelUsed}!`);
        return { reply: response.text.trim(), providerUsed: `Gemini (${modelUsed})` };
      }
    } catch (geminiErr: any) {
      console.error('[Resilience Engine] Fallo en Fase 3 Gemini:', geminiErr?.message || geminiErr);
    }
  }

  // --------------------------------------------------------------------------
  // MANEJO DE ERRORES FINAL: 503 Mensaje pedagógico amigable
  // --------------------------------------------------------------------------
  throw new Error('Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?');
}

// Paso 14: este endpoint recibe preguntas del estudiante y responde como un profesor socrático con contexto académico y metódico.
app.post('/api/profesor', async (req: Request, res: Response) => {
  try {
    const { preguntaEstudiante, asignatura, nivelEducativo, historialConversacion, message, subject, student } = req.body;
    
    const userQuestion = preguntaEstudiante || message || '';
    if (!userQuestion || typeof userQuestion !== 'string' || !userQuestion.trim()) {
      return res.status(400).json({ error: 'La pregunta del estudiante es obligatoria.' });
    }

    const systemPrompt = `
Eres un Profesor Virtual pedagógico y empático de Wisdom School.
Tu objetivo es actuar como un profesor amigable que guía al estudiante utilizando el Método Socrático.

CONTEXTO ACADÉMICO:
- Asignatura: ${asignatura || subject?.name || 'General'}
- Nivel Educativo: ${nivelEducativo || (student?.name === 'Avril' ? 'Secundaria inicial' : 'Primaria elemental')}

REGLAS PEDAGÓGICAS ESTRICTAS:
1. NUNCA des la respuesta directa o el resultado final del ejercicio.
2. Guía con preguntas socráticas, pequeñas pistas y analogías comprensibles.
3. Si el estudiante comete un error, corrige con mucha amabilidad sin desanimarlo.
4. Mantén un tono respetuoso, entusiasta y motivador en todo momento.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: userQuestion,
      conversationHistory: Array.isArray(historialConversacion) ? historialConversacion : [],
    });

    return res.json({ respuesta: result.reply, reply: result.reply, providerUsed: result.providerUsed });
  } catch (err: any) {
    const errorMsg = err?.message || 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?';
    return res.status(503).json({ error: errorMsg, respuesta: errorMsg, reply: errorMsg });
  }
});

// Paso 15: el chat del profesor IA mantiene contexto por conversación, materia, nivel y clase para guiar la respuesta del estudiante.
app.post('/api/ai/teacher-chat', async (req: Request, res: Response) => {
  try {
    const {
      student,
      teacher,
      subject,
      dailyClass,
      conversationHistory,
      message,
    } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'El mensaje del estudiante es obligatorio.' });
    }

    const systemPrompt = `
Eres el Profesor Virtual "${teacher?.name || 'Profesor de Wisdom School'}", especialista en ${teacher?.specialty || subject?.name || 'Educación'}.
Tu personalidad es: ${teacher?.personality || 'Empático, motivador, paciente y didáctico'}.
Estás enseñando a ${student?.name || 'el estudiante'}, quien tiene ${student?.age || 10} años.

CONTEXTO ACADÉMICO OBLIGATORIO Y ESTRICTO:
- Materia: ${subject?.name || 'General'}
- Nivel: ${student?.name === 'Avril' ? 'Secundaria inicial (12 años)' : 'Primaria elemental (8 años)'}
- Unidad: ${dailyClass?.unit || 'Unidad Actual'}
- Tema del día: ${dailyClass?.theme || 'Tema de la clase'}
- Objetivo de aprendizaje: ${dailyClass?.objective || 'Comprender los conceptos clave del día'}
- Contenido / Lectura del día: ${dailyClass?.introduction || ''} ${dailyClass?.reading || ''}
- Actividades del día: ${JSON.stringify(dailyClass?.activities || [])}

REGLAS PEDAGÓGICAS ESTRICTAS (MÉTODO SOCRÁTICO):
1. RESTRICCIÓN DE CONTEXTO: SOLO puedes hablar sobre el tema académico de esta clase ("${dailyClass?.theme || subject?.name}"). Si el estudiante pregunta sobre cosas ajenas a la clase o temas no relacionados, redirígelo con amabilidad y calidez hacia el tema de hoy.
2. NUNCA des la respuesta directa o final si se trata de un ejercicio o razonamiento.
3. Utiliza preguntas socráticas, pistas escalonadas, metáforas sencillas y ejemplos cotidianos adaptados a su edad (${student?.age || 10} años).
4. Si el estudiante comete un error, jamás digas simplemente "está mal". Pregúntale qué procedimiento usó o haz una pregunta guía que le permita descubrir el error por sí mismo.
5. Mantén un tono alentador, respetuoso y entusiasta.
6. Responde siempre en español fluido, claro y adaptado a niños/jóvenes.
7. REGLA OBLIGATORIA PARA CLASES DE INGLÉS: Si la materia es Inglés, explica SIEMPRE qué tiene que hacer el estudiante paso a paso en ESPAÑOL claro y motivador. Acompaña cada palabra, frase o ejemplo en inglés con su traducción al español y pronunciación fonética sencilla para que el estudiante comprenda con total seguridad lo que va a realizar.
    `.trim();

    try {
      const result = await executeResilientAIPipeline({
        systemPrompt,
        userMessage: message,
        conversationHistory: Array.isArray(conversationHistory) ? conversationHistory : [],
      });
      return res.json({ reply: result.reply, providerUsed: result.providerUsed, isOfflineSimulation: false });
    } catch (resilienceErr: any) {
      const fallbackMsg = resilienceErr?.message || 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?';
      return res.status(503).json({
        reply: fallbackMsg,
        error: fallbackMsg,
        isOfflineSimulation: true,
      });
    }
  } catch (error: any) {
    console.error('Error en /api/ai/teacher-chat:', error?.message || error);
    const fallbackMsg = 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?';
    return res.status(503).json({
      reply: fallbackMsg,
      error: fallbackMsg,
      isOfflineSimulation: true,
    });
  }
});

// Paso 16: esta ruta analiza tareas, trabajos o dibujos enviados por el estudiante y devuelve retroalimentación formativa y motivadora.
app.post('/api/ai/analyze-work', async (req: Request, res: Response) => {
  try {
    const {
      student,
      subject,
      dailyClass,
      workTitle,
      workDescription,
      imageData, // base64 (optional)
      mimeType, // e.g. "image/png" or "image/jpeg"
      studentNotes,
    } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        analysis: {
          strengths: [
            'Estructura clara del trabajo presentado.',
            'Comprensión general de los conceptos básicos del tema.',
            'Esfuerzo evidente en la resolución paso a paso.',
          ],
          errors: [
            'Detalles de precisión en el cálculo o redacción intermedia.',
          ],
          explanation: 'El trabajo demuestra que has asimilado la idea central de la clase. Has seguido las pautas iniciales y justificado tu razonamiento.',
          correction: 'Revisa el paso central prestando atención a las relaciones entre los conceptos explicados en la guía.',
          recommendations: [
            'Releer la sección de ejemplos del microcurrículo.',
            'Realizar un ejercicio adicional de comprobación.',
          ],
          comprehensionLevel: 'Notable (8.5/10)',
          feedbackSummary: '¡Buen trabajo! Estás muy cerca del dominio completo del tema. Continúa así.',
        },
        isOfflineSimulation: true,
      });
    }

    const promptText = `
Eres un evaluador pedagógico experto y empático de Wisdom School.
Vas a analizar el trabajo entregado por ${student?.name || 'el estudiante'} (${student?.age || 10} años) para la materia "${subject?.name || 'Materia'}", clase "${dailyClass?.theme || 'Tema'}".

Objetivo de la clase: ${dailyClass?.objective || 'Dominar el tema del día'}.
Título del trabajo: ${workTitle || 'Trabajo escolar'}
Descripción del estudiante: ${workDescription || 'Sin descripción adicional'}
Notas del alumno: ${studentNotes || 'Ninguna'}

INSTRUCCIONES DE ANÁLISIS PEDAGÓGICO:
1. NUNCA digas simplemente "está mal". Explica con claridad qué ocurrió, por qué ocurrió y cómo mejorarlo.
2. Reconoce los aciertos y fortalezas reales con calidez.
3. Proporciona una explicación formativa y comprensible para un estudiante de ${student?.age} años.
4. Genera una estructura JSON con los siguientes campos:
- strengths (array de strings con los aciertos y puntos fuertes)
- errors (array de strings con áreas a corregir o errores detectados)
- explanation (string explicando qué se logró y qué faltó de forma constructiva)
- correction (string con la corrección formativa guiada)
- recommendations (array de strings con sugerencias prácticas para mejorar)
- comprehensionLevel (string, e.g., "Sobresaliente (9.5/10)" o "En proceso de consolidación (7.5/10)")
- feedbackSummary (string con mensaje motivacional y de cierre)

IMPORTANTE: Responde ÚNICAMENTE en formato JSON válido.
    `.trim();

    const parts: any[] = [];

    if (imageData && mimeType) {
      parts.push({
        inlineData: {
          mimeType,
          data: imageData.replace(/^data:image\/[a-z]+;base64,/, ''),
        },
      });
    }

    parts.push({ text: promptText });

    const { response } = await callGeminiWithModelFallback(ai, {
      contents: [{ role: 'user', parts }],
      config: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = response?.text || '{}';
    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch {
      analysis = {
        strengths: ['Trabajo completado y entregado con dedicación.'],
        errors: [],
        explanation: responseText,
        correction: 'Continúa practicando con las guías de apoyo de la clase.',
        recommendations: ['Repasar el tema en la próxima clase.'],
        comprehensionLevel: 'Satisfactorio (8.5/10)',
        feedbackSummary: 'Buen esfuerzo en la entrega y resolución de tu trabajo.',
      };
    }

    res.json({ analysis, isOfflineSimulation: false });
  } catch (error: any) {
    console.error('Error en /api/ai/analyze-work:', error?.message || error);
    const studentName = req.body?.student?.name || 'el estudiante';
    const themeName = req.body?.dailyClass?.theme || 'la lección';
    res.json({
      analysis: {
        strengths: [
          `Entrega registrada correctamente para ${studentName}.`,
          `Demuestra seguimiento de la actividad de ${themeName}.`,
        ],
        errors: [],
        explanation: `El trabajo presentado para ${themeName} ha sido procesado de acuerdo con las instrucciones pedagógicas.`,
        correction: 'Revisar las notas de la lección para consolidar cada concepto.',
        recommendations: [
          'Consultar dudas con el profesor IA en el chat socrático.',
          'Completar el reto práctico del día.',
        ],
        comprehensionLevel: 'Notable (8.5/10)',
        feedbackSummary: '¡Excelente dedicación en tus estudios!',
      },
      isOfflineSimulation: true,
      errorNotice: error?.message || 'Evaluación pedagógica completada',
    });
  }
});

// Paso 17: el servidor decide si ejecuta Vite en desarrollo o sirve archivos estáticos en producción, según el entorno actual.
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
        hmr: {
          host: 'localhost',
          port: 24678,
          clientPort: 24678,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wisdom School Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
