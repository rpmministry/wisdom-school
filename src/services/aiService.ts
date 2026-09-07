import { Student, AITeacher, Subject, DailyClass, WorkAnalysisResult } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface TeacherChatRequest {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
  conversationHistory: { role: 'user' | 'model'; content: string }[];
  message: string;
}

export interface AnalyzeWorkRequest {
  student: Student;
  subject: Subject;
  dailyClass: DailyClass;
  workTitle: string;
  workDescription: string;
  imageData?: string;
  mimeType?: string;
  studentNotes?: string;
}

export function renderMarkdownToHtml(content: string): string {
  if (!content || typeof content !== 'string') return '';
  const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const normalize = (value: string) => value.replace(/\r\n/g, '\n');
  const withInline = (value: string) => {
    let html = escapeHtml(value);
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    return html;
  };
  const blocks = normalize(content).split(/\n{2,}/);
  const rendered = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^(-|\*)\s+/m.test(trimmed)) {
      const items = trimmed.split(/\n/).map((line) => line.trim()).filter(Boolean).map((line) => `<li>${withInline(line.replace(/^[-*]\s*/, ''))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    if (/^\d+\.\s+/m.test(trimmed)) {
      const items = trimmed.split(/\n/).map((line) => line.trim()).filter(Boolean).map((line) => `<li>${withInline(line.replace(/^\d+\.\s*/, ''))}</li>`).join('');
      return `<ol>${items}</ol>`;
    }
    if (/^#{1,3}\s+/.test(trimmed)) {
      const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = withInline(headingMatch[2]);
        return `<h${level}>${text}</h${level}>`;
      }
    }
    return `<p>${withInline(trimmed).replace(/\n/g, '<br />')}</p>`;
  });
  return rendered.filter(Boolean).join('');
}

// ==========================================
// CAZADOR DE MODELOS AUXILIARES (OPENROUTER)
// ==========================================
let cachedFreeModels: string[] = [];
async function getFreeOpenRouterModels(): Promise<string[]> {
  if (cachedFreeModels.length > 0) return cachedFreeModels;
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models");
    const data = await res.json();
    let freeModels = data.data.filter((m: any) => parseFloat(m.pricing?.prompt || "1") === 0 && parseFloat(m.pricing?.completion || "1") === 0).map((m: any) => m.id);
    
    // Priorizamos modelos rápidos y eficientes
    const preferredOrder = ["google/gemini-flash-1.5:free", "google/gemini-2.0-flash-lite-preview-02-05:free", "meta-llama/llama-3.1-8b-instruct:free"];
    freeModels.sort((a: string, b: string) => {
      const aRank = preferredOrder.indexOf(a); const bRank = preferredOrder.indexOf(b);
      if (aRank !== -1 && bRank !== -1) return aRank - bRank;
      if (aRank !== -1) return -1; if (bRank !== -1) return 1; return 0;
    });
    if (freeModels.length > 0) { cachedFreeModels = freeModels; return cachedFreeModels; }
  } catch (error) { 
    console.warn("[Motor IA Auxiliar] Falló la obtención dinámica de lista. Usando lista estática."); 
  }
  return ["google/gemini-flash-1.5:free", "meta-llama/llama-3.1-8b-instruct:free"];
}

async function fetchWithTimeout(resource: string, options: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id); return response;
  } catch (error) { clearTimeout(id); throw error; }
}

// ==========================================
// FUNCIÓN CENTRAL: IA DEL PROFESOR
// ==========================================
export async function askAITeacher(req: TeacherChatRequest): Promise<string> {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
  
  const GEMINI_TIMEOUT = 15000; 
  const OPENROUTER_TIMEOUT = 8000;

  const systemInstruction = `
    Eres ${req.teacher.name}, un experto pedagogo, inmensamente paciente y profesor de ${req.subject.name}.
    Estás dando una CLASE MAGISTRAL PRIVADA a tu estudiante: ${req.student.name}.
    Contexto de la clase actual: "${req.dailyClass?.theme}".
    Objetivo: ${req.dailyClass?.objective}.

    DIRECTRICES PEDAGÓGICAS ESTRICTAS (MÉTODO SOCRÁTICO PASO A PASO):
    1. PROHIBIDO DAR TEXTOS LARGOS: Nunca le des toda la información de golpe. Un cerebro aprende mejor por partes.
    2. DIVIDE Y VENCERÁS: Desglosa el tema "${req.dailyClass?.theme}" en conceptos clave muy fáciles de digerir.
    3. CICLO DE ENSEÑANZA (Repite esto por cada concepto):
       - Paso A: Explica el concepto de forma muy sencilla, usando un ejemplo o analogía de la vida real.
       - Paso B: Inmediatamente después, hazle UNA sola pregunta de razonamiento para verificar si entendió.
       - Paso C: Detente y espera su respuesta. No avances al siguiente concepto bajo ninguna circunstancia.
    4. CORRECCIÓN EMPÁTICA: Si el estudiante responde mal, no le des la respuesta correcta. Indaga por qué pensó así, muéstrale la falla en su lógica amablemente y vuelve a explicarlo de otra forma.
    5. CELEBRACIÓN Y AVANCE: Si responde bien, felicítalo efusivamente y avanza al siguiente concepto.
    6. Eres su guía. Habla en un tono amigable, motivador y sumamente claro. Usa Markdown (negritas y listas) para resaltar lo importante.
  `;

  let primaryErrorMsg = ""; // Guardará el motivo por el que falla Gemini

  try {
    let geminiContents = req.conversationHistory.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    // Evitar que el historial empiece con el modelo
    if (geminiContents.length > 0 && geminiContents[0].role === 'model') geminiContents.shift(); 
    geminiContents.push({ role: 'user', parts: [{ text: req.message }] });

    try {
      // 🚀 MOTOR PRINCIPAL ESTÁNDAR 2026: gemini-3.6-flash
      console.log("[Red Neural] Contactando motor primario: Gemini 3.6 Flash...");
      const geminiResponse = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: geminiContents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
          }),
        },
        GEMINI_TIMEOUT
      );

      const geminiData = await geminiResponse.json();
      
      if (geminiData.candidates && geminiData.candidates.length > 0) {
        console.log("[Red Neural] ✔️ Respuesta exitosa de Gemini 3.6 Flash");
        return geminiData.candidates[0].content.parts[0].text;
      }
      
      // Si la API de Gemini responde con un error oficial
if (geminiData.error) {
          throw new Error(`Error oficial de Google: ${geminiData.error.message}`);
        }
        throw new Error("Respuesta inválida o vacía de Gemini");

    } catch (geminiError: any) {
      primaryErrorMsg = geminiError.name === 'AbortError' ? 'Tiempo de espera agotado (Timeout)' : geminiError.message;
      console.warn(`[Red Neural] ⚠️ Motor primario falló. Motivo: ${primaryErrorMsg}`);

      // FALLBACK LOCAL: Si no hay API keys configuradas, usar respuestas locales
      const GEMINI_KEY_AVAILABLE = !!import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== "TU_CLAVE_AQUI";
      const OPENROUTER_KEY_AVAILABLE = !!import.meta.env.VITE_OPENROUTER_API_KEY && import.meta.env.VITE_OPENROUTER_API_KEY !== "PEGA_AQUI_TU_CLAVE_OPENROUTER";
      
      if (!GEMINI_KEY_AVAILABLE && !OPENROUTER_KEY_AVAILABLE) {
        console.warn("[Modo Demo] API keys no configuradas. Usando IA pedagógica local.");
        
        // Respuestas de fallback basadas en el tema actual - pedagogía socrática
        const fallbackResponses = {
          'Modelado algebraico': `Excelente pregunta, ${req.student.name}. Vamos a pensar en esto juntos: si tuvieras que contar alguna historia con números, ¿qué parte te gustaría contar primero? La ecuación es como una historia matemática: tenemos una historia que contar (el resultado) y queremos descubrir qué pasó antes. ¿Cuál sería el primer paso para reconstruir esa historia?`,
          'Estructura celular': `¡Qué interesante que quieras saber sobre células, ${req.student.name}! Imagina que una célula es como una casita muy pequeñita. ¿Qué crees que necesitaría para funcionar bien? Piensa en los ingredientes que necesitaría para "vivir" y organizarse. Cada parte de la casita tiene un trabajo especial.`,
          'Fotosíntesis': `${req.student.name}, qué buena intuición sobre las plantas. Imagina que las hojas son como pequeñas fábricas. ¿Qué ingredientes crees que necesitan para producir algo? La luz es como el "combustible", el agua es como la "materia prima", y el oxígeno es lo que "sobrante" producen. ¿Te imaginas una fábrica que solo produce algo cuando tiene luz?`,
          'default': `${req.student.name}, excelente reflexión. Según la pedagogía socrática, no se busca una respuesta clave, sino construir pensamiento. ¿Podrías profundizar: qué ejemplo concreto de tu vida cotidiana podrías usar para ilustrar este concepto? Cada conexión que haces es un paso hacia el verdadero aprendizaje.`
        };
        
        const theme = req.dailyClass?.theme || '';
        const response = fallbackResponses[theme as keyof typeof fallbackResponses] || fallbackResponses.default;
        return `${response}\n\n¿Te gustaría explorar otro aspecto o conectar esto con algo más que ya sabes?`;
      }

      console.log(`[Red Neural] 🔄 Activando IA Auxiliar (OpenRouter)...`);
      
      if (OPENROUTER_API_KEY === "PEGA_AQUI_TU_CLAVE_OPENROUTER" || !OPENROUTER_API_KEY) {
         throw new Error("No tienes configurada tu clave API de OpenRouter en el código.");
      }

      const openRouterMessages = [
        { role: 'system', content: systemInstruction },
        ...req.conversationHistory.map(msg => ({ role: msg.role === 'model' ? 'assistant' : 'user', content: msg.content })),
        { role: 'user', content: req.message }
      ];

      const freeModelsToTry = await getFreeOpenRouterModels();
      let lastAuxError = "Todos los modelos auxiliares rechazaron la conexión.";

      for (const modelId of freeModelsToTry) {
        try {
          console.log(`[Motor Auxiliar] Intentando con: ${modelId}...`);
          const orResponse = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
              method: "POST",
              headers: { 
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`, 
                "HTTP-Referer": "https://wisdom-school.edu", 
                "X-Title": "Wisdom School", 
                "Content-Type": "application/json" 
              },
              body: JSON.stringify({ model: modelId, messages: openRouterMessages, temperature: 0.7 })
            }, OPENROUTER_TIMEOUT);
            
          const orData = await orResponse.json();
          
          if (orData.choices && orData.choices.length > 0) {
            console.log(`[Motor Auxiliar] ✔️ Rescate exitoso usando: ${modelId}`);
            return orData.choices[0].message.content;
          }

          if (orData.error) {
            lastAuxError = `Error en ${modelId}: ${orData.error.message}`;
            console.warn(`[Motor Auxiliar] ⚠️ ${lastAuxError}`);
          }
        } catch (e: any) { 
          lastAuxError = `Fallo de conexión con ${modelId}`;
          console.warn(`[Motor Auxiliar] ⚠️ ${lastAuxError}`);
          continue; 
        }
      }
      throw new Error(`Fallo total en cascada auxiliar. Último error: ${lastAuxError}`);
    }
  } catch (error: any) {
    console.error("[Corte de Energía IA] Ambos motores fallaron:", error);
    
    // ESTE ES EL MENSAJE DE ALERTA QUE SALDRÁ EN PANTALLA SI TODO FALLA
    return `⚠️ **SISTEMA DE EMERGENCIA: Fallo de Conexión IA**\n\nNo he podido generar una respuesta debido a un fallo en cascada en los motores:\n\n1. **Fallo Motor Principal (3.6 Flash):** ${primaryErrorMsg}\n2. **Fallo Motor Auxiliar (OpenRouter):** ${error.message}\n\n*Por favor, presiona **F12** y revisa la Consola, o verifica que tus API Keys estén escritas correctamente.*`;
  }
}

export async function analyzeWork(req: AnalyzeWorkRequest): Promise<WorkAnalysisResult> {
  return { strengths: ['Evidencia recibida correctamente'], errors: [], explanation: 'Trabajo procesado.', correction: '', recommendations: [], comprehensionLevel: 'En evaluación', feedbackSummary: 'Buen trabajo.' };
}