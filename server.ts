import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';

dotenv.config();
// Las claves del servidor (sin prefijo VITE_) se guardan en .env.local; se cargan sin pisar las variables ya existentes (producción/Vercel las inyecta el entorno).
dotenv.config({ path: '.env.local' });

// Vercel serverless runtime no soporta import.meta.url en el build CJS generado por esbuild.
// Usamos process.cwd() como base del proyecto para mantener compatibilidad tanto en local como en Vercel.
const appRoot = process.cwd();

const app = express();
const PORT = Number(process.env.PORT || 3000);

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
const publicStudentsDir = path.join(appRoot, 'public', 'students');
try {
  if (!fs.existsSync(publicStudentsDir)) {
    fs.mkdirSync(publicStudentsDir, { recursive: true });
  }
} catch (err: any) {
  // En serverless (Vercel) el FS de la función es de solo lectura: no debe impedir el arranque de la API de IA.
  console.warn('No se pudo preparar public/students:', err?.message || err);
}

// Paso 5: este endpoint resuelve imágenes de estudiantes sin depender del nombre exacto o la extensión exacta.
app.get('/students/:filename', (req: Request, res: Response, next) => {
  const reqName = req.params.filename.toLowerCase();
  const searchDirs = [
    publicStudentsDir,
    path.join(appRoot, 'public'),
    path.join(appRoot, 'dist', 'students'),
    path.join(appRoot, 'dist'),
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
app.use(express.static(path.join(appRoot, 'public')));

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
    const distStudentsDir = path.join(appRoot, 'dist', 'students');
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

// Paso 9b: envía el PIN por email al iniciar sesión
app.post('/api/send-pin', async (req: Request, res: Response) => {
  const { email, pinCode } = req.body;
  if (!email || !pinCode) {
    return res.status(400).json({ error: 'Missing email or pinCode' });
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Tu PIN de acceso a Wisdom School',
      text: `Hola,\n\nTu PIN de acceso es: ${pinCode}\nUtilízalo para ingresar a la plataforma.\n\n¡Éxitos!\n`,
    });
    res.json({ success: true });
  } catch (e) {
    console.error('Error sending PIN email', e);
    res.status(500).json({ error: 'Failed to send email' });
  }
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
app.get('/api/health', async (req: Request, res: Response) => {
  let hierarchySummary: string[] = [];
  try {
    hierarchySummary = (await getAIHierarchy()).map((layer) => `${layer.label}: ${layer.models.slice(0, 3).join(' | ')}${layer.models.length > 3 ? ` (+${layer.models.length - 3} free más)` : ''}`);
  } catch { /* no debe tumbar el health */ }
  res.json({
    status: 'ok',
    service: 'Wisdom School Backend',
    ai: {
      deepSeekConfigured: Boolean(process.env.DEEPSEEK_API_KEY?.trim()),
      deepSeekModel: (process.env.DEEPSEEK_MODEL || 'deepseek-chat').trim(),
      geminiConfigured: isUsableGeminiKey(process.env.GEMINI_API_KEY),
      openRouterConfigured: Boolean(process.env.OPENROUTER_API_KEY?.trim()),
      openCodeConfigured: Boolean(process.env.OPENCODE_API_KEY?.trim()),
      freeFirst: !process.env.DEEPSEEK_API_KEY?.trim(),
      hierarchy: hierarchySummary,
    },
    time: new Date().toISOString(),
  });
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
  // Valid modern Gemini models in prioritized order (Gemini 3.7 / 3.6 / 3.5 fallback)
  const modelsToTry = ['gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash'];

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

// Extrae el primer objeto JSON balanceado de una respuesta que puede traer prosa o fences de markdown.
function extractJsonObject(raw: string | null | undefined): string | null {
  const text = (raw || '').replace(/```json/gi, '').replace(/```/g, '').replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
  const start = text.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

// Los modelos gratuitos suelen dejar saltos de línea crudos dentro de los strings o comas colgantes:
// reparamos antes de tirar la toalla. Si aún así falla, devolvemos snippet para diagnóstico.
function sanitizeJsonText(s: string): string {
  let out = '';
  let inString = false;
  let escaped = false;
  for (const ch of s) {
    if (inString) {
      if (escaped) { out += ch; escaped = false; continue; }
      if (ch === '\\') { out += ch; escaped = true; continue; }
      if (ch === '"') { inString = false; out += ch; continue; }
      if (ch === '\n') { out += '\\n'; continue; }
      if (ch === '\r') { continue; }
      if (ch === '\t') { out += '\\t'; continue; }
      out += ch;
    } else {
      if (ch === '"') inString = true;
      out += ch;
    }
  }
  return out;
}

function looseParseJson(candidate: string | null): any | null {
  if (!candidate) return null;
  const trimmed = candidate.replace(/<\/?CPA_DONE>/gi, '').trim();
  try { return JSON.parse(trimmed); } catch { /* reparamos */ }
  try { return JSON.parse(sanitizeJsonText(trimmed).replace(/,\s*([}\]])/g, '$1')); } catch { return null; }
}

// Los modelos ":free" de razonamiento a veces devuelven en `content` su cadena de pensamiento y, dentro,
// la respuesta final entre comillas. Extrae la parte útil en español; si no la hay, devuelve null
// para que el front use SIEMPRE su explicación determinista (nunca queda vacía).
function cleanReasoningLeak(rawText: string | null | undefined): string | null {
  const t = (rawText || '').replace(/<\/?CPA_DONE>/gi, '').trim();
  if (!t) return null;
  const looksSpanish = (s: string) => /[áéíóúñ¿¡]|no pasa|porque|respuesta|correct|fracci/i.test(s);

  // 1) La respuesta final suele venir entrecomillada (“...” o "...").
  const quotes = Array.from(t.matchAll(/[“"]([^“”"]{40,})[”"]/g)).map((m) => m[1].trim());
  const bestQuote = quotes.filter(looksSpanish).sort((a, b) => b.length - a.length)[0];
  if (bestQuote) return bestQuote;

  // 2) Sin cita clara, corta el preámbulo de razonamiento: toma desde la primera línea en español
  //    que no sea "meta instructions" del propio modelo.
  const metaLine = /^(we need|i need|draft[:\s]|count[:\s]|the user|must |should |plan[:\s]|first[,\s])/i;
  const lines = t.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const start = lines.findIndex((l) => looksSpanish(l) && !metaLine.test(l));
  if (start > 0) return lines.slice(start).join(' ').trim();
  if (start === 0) {
    // arranca bien pero puede traer un "Draft:" al final: quédate antes de cualquier marker de razonamiento.
    const cleaned = lines.filter((l) => !metaLine.test(l)).join(' ').trim();
    return cleaned || null;
  }
  // 3) Todo parece razonamiento en inglés sin respuesta explícita: nada fiable.
  return null;
}

/**
 * Paso 13: Motor de Jerarquía de IA con Respaldo Secuencial.
 *
 * Prioridades:
 *   1) DeepSeek (PRINCIPAL · plan de pago)  ← se activa con DEEPSEEK_API_KEY
 *   2) OpenRouter: caza modelos ":free" (gratis) hasta que uno conteste.
 *   3) OpenCode Zen: catálogo "-free" (gratuito; requiere OPENCODE_API_KEY).
 *   4) Gemini Flash: último recurso (free tier de Google AI Studio).
 * Cada intento de modelo tiene su presupuesto (AI_MODEL_TIMEOUT_MS, defecto 6 s). Si un modelo falla o
 * calla, se prueba el siguiente modelo/capa según el alcance del error (credencial → salta capa,
 * modelo roto → siguiente modelo, transitorio → reintento dentro del presupuesto).
 * Si TODAS las capas fallan, se lanza el mensaje pedagógico de contingencia (503) y el cliente
 * cae a su cascada local. Opcional: AI_PAID_MODEL añade una capa premium de OpenRouter al final.
 */

type AIErrorKind = 'timeout' | 'http' | 'empty' | 'network' | 'auth' | 'model';

class AIError extends Error {
  kind: AIErrorKind;
  retryable: boolean;
  status?: number;
  constructor(kind: AIErrorKind, message: string, retryable: boolean, status?: number) {
    super(message);
    this.name = 'AIError';
    this.kind = kind;
    this.retryable = retryable;
    this.status = status;
  }
}

interface AIChatLayer {
  id: string;
  label: string;
  provider: 'openai-compatible' | 'gemini';
  baseUrl?: string;
  apiKey?: string;
  models: string[];
  extraHeaders?: Record<string, string>;
}

// Formatos: una API key válida de Google empieza con 'AIza' o es del estilo nuevo 'AQ.xxx' de AI Studio.
// Un OAuth Client ID ('…apps.googleusercontent.com') NO es API key: estas capa se omite en vez de agonizar en reintentos.
function isUsableGeminiKey(value?: string): boolean {
  const v = (value || '').trim();
  if (!v) return false;
  if (/\.apps\.googleusercontent\.com$/i.test(v)) return false;
  return /^AIza[0-9A-Za-z_-]{10,}$/.test(v) || /^AQ\.[0-9A-Za-z_-]{10,}$/.test(v) || v.length > 30;
}

// Descatalogo dinámico de modelos gratuitos de OpenRouter (cacheado 10 min).
let freeModelsCache: { list: string[]; fetchedAt: number } = { list: [], fetchedAt: 0 };
const FREE_FALLBACKstaticHint = ['meta-llama/llama-3.3-70b-instruct:free', 'deepseek/deepseek-chat-v3-0324:free'];
const FREE_FAMILY_PRIORITY = ['qwen', 'google/gemini', 'deepseek', 'meta-llama', 'mistral', 'gemma', 'glm', 'kimi', 'nemotron'];

async function getOpenRouterFreeModels(preferredRaw?: string): Promise<string[]> {
  const explicit = (preferredRaw || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (explicit.length > 0) return explicit;

  const fresh = Date.now() - freeModelsCache.fetchedAt < 10 * 60 * 1000;
  if (fresh && freeModelsCache.list.length > 0) return freeModelsCache.list;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/models', { signal: AbortSignal.timeout(5000) });
    const data: any = await res.json();
    const free = (data?.data || [])
      .filter((m: any) => typeof m.id === 'string' && m.id.endsWith(':free'))
      .map((m: any) => m.id as string);
    if (free.length > 0) {
      const rank = (id: string) => {
        const i = FREE_FAMILY_PRIORITY.findIndex((fam) => id.startsWith(fam));
        return i === -1 ? FREE_FAMILY_PRIORITY.length : i;
      };
      free.sort((a: string, b: string) => rank(a) - rank(b));
      freeModelsCache = { list: free.slice(0, Number(process.env.AI_FREE_MODEL_MAX || 8)), fetchedAt: Date.now() };
      console.log(`[AI Hierarchy] Caza de modelos free OpenRouter: ${freeModelsCache.list.slice(0, 3).join(', ')}… (${freeModelsCache.list.length} en cola)`);
      return freeModelsCache.list;
    }
  } catch (err: any) {
    console.warn('[AI Hierarchy] No se pudo listar modelos free de OpenRouter, uso fallback estático:', err?.message || err);
  }
  return freeModelsCache.list.length > 0 ? freeModelsCache.list : FREE_FALLBACKstaticHint;
}

function getOpenCodeFreeModels(): string[] {
  const explicit = (process.env.AI_TIER2_MODEL || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (explicit.length > 0) return explicit;
  // Limitación verificada en vivo: OpenCode Zen bloquea sus modelos "-free" fuera de su propia app
  // ("OpenCode's free tier can only be used in OpenCode"). Con clave gratuita esta capa falla rápido (400);
  // solo es útil si tu cuenta OpenCode tiene modelos de pago. Se puede desactivar vaciando OPENCODE_API_KEY.
  return [
    'deepseek-v4-flash-free',
    'mimo-v2.5-free',
  ];
}

async function getAIHierarchy(): Promise<AIChatLayer[]> {
  const deepSeekKey = process.env.DEEPSEEK_API_KEY?.trim();
  const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
  const openCodeKey = process.env.OPENCODE_API_KEY?.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();

  const layers: AIChatLayer[] = [];

  // CAPA 0 (PRINCIPAL, plan de pago): DeepSeek. API compatible con OpenAI.
  // Base oficial: https://api.deepseek.com  ·  endpoint compatible: /v1/chat/completions
  // Modelos: 'deepseek-chat' (V3, rápido, ideal para el profesor IA) o 'deepseek-reasoner' (razonamiento).
  if (deepSeekKey) {
    layers.push({
      id: 'deepseek',
      label: 'DeepSeek (principal · plan de pago)',
      provider: 'openai-compatible',
      baseUrl: (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1').replace(/\/+$/, ''),
      apiKey: deepSeekKey,
      models: (process.env.DEEPSEEK_MODEL || 'deepseek-chat').split(',').map((s) => s.trim()).filter(Boolean),
    });
  }

  if (openRouterKey) {
    layers.push({
      id: 'openrouter-free',
      label: 'OpenRouter (caza de modelos FREE)',
      provider: 'openai-compatible',
      baseUrl: 'https://openrouter.ai/api/v1',
      apiKey: openRouterKey,
      models: await getOpenRouterFreeModels(process.env.AI_TIER1_MODEL),
      extraHeaders: {
        'HTTP-Referer': process.env.APP_URL || 'https://wisdomschool.edu',
        'X-Title': 'Wisdom School AI Teacher',
      },
    });
  }

  if (openCodeKey) {
    layers.push({
      id: 'opencode',
      label: 'OpenCode Zen (gratuito)',
      provider: 'openai-compatible',
      baseUrl: 'https://opencode.ai/zen/v1',
      apiKey: openCodeKey,
      models: getOpenCodeFreeModels(),
    });
  }

  if (isUsableGeminiKey(geminiKey)) {
    layers.push({
      id: 'gemini',
      label: 'Google Gemini (free tier AI Studio)',
      provider: 'gemini',
      apiKey: geminiKey,
      models: (process.env.AI_TIER3_MODEL || 'gemini-3.7-flash').split(',').map((s) => s.trim()).filter(Boolean),
    });
  } else if (geminiKey) {
    console.warn('[AI Hierarchy] GEMINI_API_KEY parece un OAuth Client ID u otro valor no-válido: capa Gemini omitida. Necesitas una API key de https://aistudio.google.com/apikey');
  }

  // Capa PREMIUM opcional (por defecto NO existe: el proyecto es 100% gratuito).
  const premiumModel = (process.env.AI_PAID_MODEL || '').trim();
  if (premiumModel && openRouterKey) {
    layers.push({
      id: 'premium',
      label: 'OpenRouter (premium opcional)',
      provider: 'openai-compatible',
      baseUrl: 'https://openrouter.ai/api/v1',
      apiKey: openRouterKey,
      models: [premiumModel],
      extraHeaders: {
        'HTTP-Referer': process.env.APP_URL || 'https://wisdomschool.edu',
        'X-Title': 'Wisdom School AI Teacher',
      },
    });
  }

  return layers;
}

function buildOpenAIMessages(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'model'; content: string }>
) {
  return [
    { role: 'system', content: systemPrompt },
    ...(conversationHistory || [])
      .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim())
      .map((msg) => ({ role: msg.role === 'model' ? 'assistant' : 'user', content: msg.content.trim() })),
    { role: 'user', content: userMessage },
  ];
}

function classifyHttpStatus(status: number): { kind: AIErrorKind; retryable: boolean } {
  if (status === 401 || status === 403) return { kind: 'auth', retryable: false };
  if (status === 402) return { kind: 'http', retryable: false }; // sin crédito: reintentar no ayuda
  if (status === 404) return { kind: 'model', retryable: false }; // modelo inexistente para esta cuenta
  if (status === 408 || status === 429 || status >= 500) return { kind: 'http', retryable: true };
  return { kind: 'http', retryable: false }; // 4xx de petición: no reintentar
}

// Cuál es la "culpa" de un error determina la transición: si es de CREDENCIALES se abandona la capa entera;
// si es solo de ESTE MODELO (404/400/503-unavailable) se pasa al siguiente modelo de la misma capa;
// si es TRANSITORIO (timeout/5xx/congestión) gasta presupuesto de reintento antes de pasar.
type AIErrorScope = 'layer' | 'model' | 'transient';
function scopeOfError(kind: AIErrorKind, status?: number): AIErrorScope {
  if (kind === 'auth') return 'layer';
  if (kind === 'model') return 'model';
  if (kind === 'http' && (status === 401 || status === 402 || status === 403)) return 'layer';
  if (kind === 'timeout' || kind === 'empty' || kind === 'network') return 'transient';
  if (kind === 'http' && status === 503) return 'transient'; // alta demanda: breve espera y otro intento
  if (kind === 'http' && status !== undefined && status >= 300 && status < 500) return 'model'; // 400/404/422: este modelo rechaza la petición
  return 'transient';
}

async function callOpenAICompatibleLayer(
  layer: AIChatLayer,
  model: string,
  messages: Array<{ role: string; content: string }>,
  timeoutMs: number,
  gen?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${layer.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${layer.apiKey}`,
        'Content-Type': 'application/json',
        ...(layer.extraHeaders || {}),
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages,
        temperature: gen?.temperature ?? 0.7,
        ...(gen?.maxTokens ? { max_tokens: gen.maxTokens } : {}),
      }),
    });

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '');
      const { kind, retryable } = classifyHttpStatus(res.status);
      throw new AIError(kind, `${layer.id} respondió ${res.status}: ${bodyText.slice(0, 160)}`, retryable, res.status);
    }

    const data = await res.json();
    // Ciertos modelos ":free" de razonamiento devuelven content vacío y dejan el texto en message.reasoning:
    // si content viene hueco, probamos con reasoning antes de descartar el modelo.
    const msg = data?.choices?.[0]?.message;
    const text = (msg?.content && String(msg.content).trim()) || (msg?.reasoning && String(msg.reasoning).trim());
    if (text && typeof text === 'string' && text.trim()) return text.trim();
    throw new AIError('empty', `${layer.id} respondió sin contenido útil (finish=${data?.choices?.[0]?.finish_reason || 'n/d'})`, true);
  } catch (err: any) {
    if (err instanceof AIError) throw err;
    if (err?.name === 'AbortError' || err?.code === 20) throw new AIError('timeout', `${layer.id} superó su presupuesto de ${timeoutMs} ms`, true, 408);
    throw new AIError('network', `${layer.id} fallo de red: ${err?.message || err}`, true);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function callGeminiLayer(
  layer: AIChatLayer,
  model: string,
  systemPrompt: string,
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'model'; content: string }>,
  timeoutMs: number,
  gen?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(layer.apiKey || '')}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: buildGeminiContents(conversationHistory, userMessage),
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { temperature: gen?.temperature ?? 0.7, ...(gen?.maxTokens ? { maxOutputTokens: gen.maxTokens } : {}) },
      }),
    });

    if (!res.ok) {
      const bodyText = await res.text().catch(() => '');
      const { kind, retryable } = classifyHttpStatus(res.status);
      throw new AIError(kind, `${layer.id} respondió ${res.status}: ${bodyText.slice(0, 160)}`, retryable, res.status);
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts;
    const text = Array.isArray(parts) ? parts.map((p: any) => p?.text || '').filter(Boolean).join('\n') : '';
    if (text && text.trim()) return text.trim();
    throw new AIError('empty', `${layer.id} respondió sin contenido útil (finishReason=${data?.candidates?.[0]?.finishReason || 'n/d'})`, true);
  } catch (err: any) {
    if (err instanceof AIError) throw err;
    if (err?.name === 'AbortError' || err?.code === 20) throw new AIError('timeout', `${layer.id} superó su presupuesto de ${timeoutMs} ms`, true, 408);
    throw new AIError('network', `${layer.id} fallo de red: ${err?.message || err}`, true);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function executeResilientAIPipeline(params: {
  systemPrompt: string;
  userMessage: string;
  conversationHistory: Array<{ role: 'user' | 'model'; content: string }>;
}, opts?: { modelTryMs?: number; tierBudgetMs?: number; lastTierBudgetMs?: number; gen?: { maxTokens?: number; temperature?: number } }): Promise<{ reply: string; providerUsed: string }> {
  const { systemPrompt, userMessage, conversationHistory } = params;
  const hierarchy = await getAIHierarchy();

  if (hierarchy.length === 0) {
    console.error('[AI Hierarchy] Ninguna capa tiene API key configurada (OPENROUTER_API_KEY / OPENCODE_API_KEY / GEMINI_API_KEY).');
    throw new Error('Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?');
  }

  const modelTryMs = Number(opts?.modelTryMs || process.env.AI_MODEL_TIMEOUT_MS || 6000);
  const tierBudgetMs = Number(opts?.tierBudgetMs || process.env.AI_TIER_BUDGET_MS || 20000);
  const lastTierBudgetMs = Number(opts?.lastTierBudgetMs || process.env.AI_LAST_TIER_BUDGET_MS || 12000);

  for (let i = 0; i < hierarchy.length; i++) {
    const layer = hierarchy[i];
    const isLast = i === hierarchy.length - 1;
    const budgetMs = isLast ? lastTierBudgetMs : tierBudgetMs;
    const deadline = Date.now() + budgetMs;
    const messages = buildOpenAIMessages(systemPrompt, userMessage, conversationHistory);

    console.log(`[AI Hierarchy] Capa ${i + 1}/${hierarchy.length} → ${layer.label} · ${layer.models.length} modelo(s) [${layer.models.slice(0, 3).join(', ')}${layer.models.length > 3 ? '…' : ''}] (presupuesto ${budgetMs} ms, máx ${modelTryMs} ms/modelo)`);

    let abandonLayer = false; // una credencial muerta no debe castigar a los modelos hermanos
    for (let mi = 0; mi < layer.models.length; mi++) {
      if (abandonLayer || deadline - Date.now() < 700) break;
      const model = layer.models[mi];
      const maxTries = isLast || i === 0 ? 2 : 1; // la capa principal (DeepSeek) y la última merecen un reintento propio

      for (let t = 0; t < maxTries; t++) {
        const callTimeout = Math.min(deadline - Date.now(), modelTryMs);
        if (callTimeout < 600) break;
        try {
          const reply = layer.provider === 'gemini'
            ? await callGeminiLayer(layer, model, systemPrompt, userMessage, conversationHistory, callTimeout, opts?.gen)
            : await callOpenAICompatibleLayer(layer, model, messages, callTimeout, opts?.gen);
          console.log(`[AI Hierarchy] ✔ ${layer.label} respondió con "${model}"${t > 0 ? ' (tras reintento)' : ''} (${budgetMs - (deadline - Date.now())} ms usados).`);
          return { reply, providerUsed: `${layer.label} · ${model}` };
        } catch (err: any) {
          const aiErr: AIError = err instanceof AIError ? err : new AIError('network', err?.message || String(err), true);
          const scope = scopeOfError(aiErr.kind, aiErr.status);
          console.warn(`[AI Hierarchy] ✖ ${layer.label} · ${model} — intento ${t + 1} (${aiErr.kind}${aiErr.status ? ' ' + aiErr.status : ''} → ${scope}): ${aiErr.message}`);
          if (scope === 'layer') { abandonLayer = true; break; }
          if (scope === 'model') break; // solo este modelo está roto: pasar al siguiente de la misma capa sin gastar espera
          if (t + 1 < maxTries && deadline - Date.now() > Math.min(modelTryMs, 3000) + 800) { await wait(800); continue; }
          break; // transitorio agotado para este modelo → siguiente modelo/capa
        }
      }
    }
    console.warn(`[AI Hierarchy] Capa ${layer.label} agotada${isLast ? ' — no quedan capas.' : ', activando siguiente capa.'}`);
  }

  // Manejo de errores final: el endpoint responde 503 con mensaje pedagógico amigable.
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
1.1 RUTA DE MINI-LECCIONES: La teoría se entrega en la interfaz "Clase Interactiva" como micro-lecciones (tarjetas 1..N con su reto de opción múltiple). NUNCA repitas una exposición larga ni vuelques todas las definiciones: acompaña, verifica y refuerza en mensajes cortos (máximo 80 palabras), enfocados en la lección que el estudiante menciona. Si pide que le expliques TODO, dale un resumen breve por puntos (máx 120 palabras).
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

// Paso 15b: Generador de la ruta de "micro-lecciones" (JSON estricto que consume el MicroLessonPlayer de la Clase Interactiva).
app.post('/api/ai/lesson-plan', async (req: Request, res: Response) => {
  try {
    const { student, teacher, subject, dailyClass } = req.body;
    if (!dailyClass?.theme) {
      return res.status(503).json({ plan: null, isOfflineSimulation: true });
    }
    const count = Math.min(4, Math.max(2, Number(process.env.MICROLESSON_COUNT || 3)));

    const systemPrompt = `
Eres el diseñador instruccional jefe de Wisdom School, experto en microlearning infantil.
Tu única tarea: convertir el tema del día en ${count} micro-lecciones progresivas, devolviendo SOLO un objeto JSON válido (sin fences markdown, sin prosa antes o después). NO raciocines en voz alta, NO muestres tu razonamiento, NO pidas más datos: emite directamente el objeto JSON final.

DATOS DE LA SESIÓN:
- Estudiante: ${student?.name || 'el estudiante'} (${student?.age || 10} años)
- Materia: ${subject?.name || 'General'} · Profesora/or: ${teacher?.name || 'tu profe'}
- Tema: "${dailyClass.theme}"
- Objetivo de aprendizaje: ${dailyClass.objective || 'comprender los conceptos clave del tema'}

ESQUEMA EXACTO (respétalo al pie de la letra):
{"unitTitle":"título del tema","lessons":[{"title":"subtema (máx 40 caracteres)","theory":"explicación EXACTA de máximo 50 palabras en español para niños","analogy":"analogía de la vida real (máx 15 palabras)","example":"ejemplo concreto (máx 20 palabras)","quiz":{"question":"pregunta de opción múltiple sobre ESTE subtema (máx 20 palabras)","options":["opción A corta","opción B corta","opción C corta"],"correctIndex":0,"correctExplanation":"por qué es correcta (máx 12 palabras)"}}],"closingMessage":"felicitación cálida del profesor (máx 20 palabras)"}

REGLAS ESTRICTAS:
0. SÉ EXTREMADAMENTE COMPACTO: toda la respuesta debe caber en ~700 tokens. Sin saltos de línea, sin markdown y sin comillas dobles dentro de los valores.
1. El array lessons debe tener exactamente ${count} elementos, en orden progresivo (de lo más simple a lo aplicado), cubriendo TODOS los conceptos necesarios para el objetivo.
2. Cada lección enseña UN solo concepto pequeño.
3. options tiene SIEMPRE 3 cadenas no vacías y muy distintas entre sí; correctIndex es 0, 1 o 2.
4. Idioma: español claro y afectuoso. Nunca hagas preguntas fuera del quiz.
5. No inventes datos: si un número o dato de entrada es escaso, usa ejemplos numéricos simples y coherentes con la edad.
6. No incluyas claves adicionales fuera del esquema; no añadas texto antes ni después del JSON.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: `Genera ahora el JSON de las ${count} micro-lecciones para "${dailyClass.theme}" en español.`,
      conversationHistory: [],
    }, { modelTryMs: Number(process.env.MICROLESSON_MODEL_TIMEOUT_MS || 22000), tierBudgetMs: Number(process.env.MICROLESSON_TIER_BUDGET_MS || 46000), lastTierBudgetMs: Number(process.env.MICROLESSON_LAST_TIER_BUDGET_MS || 44000), gen: { maxTokens: 1400, temperature: 0.2 } });

    const jsonStr = extractJsonObject(result.reply);
    const parsed = looseParseJson(jsonStr);
    res.setHeader('Cache-Control', 'no-store');
    if (!parsed) {
      console.warn('[lesson-plan] JSON no parseable. Snippet:', (result.reply || '').slice(0, 300));
      return res.status(503).json({ plan: null, providerUsed: result.providerUsed, isOfflineSimulation: false, rawSnippet: (result.reply || '').slice(0, 600) });
    }
    return res.json({ plan: parsed, providerUsed: result.providerUsed });
  } catch (err: any) {
    console.error('Error en /api/ai/lesson-plan:', err?.message || err);
    return res.status(503).json({ plan: null, isOfflineSimulation: true });
  }
});

// Paso 15c: Genera UNA micro-lección compacta (JSON pequeño = fiable y rápido también en modelos gratuitos congestados).
// El MicroLessonPlayer pide la lección N de T con las cubiertas (no repetir), cachea por estudiante+clase+índice+fecha y muestra learningPath mientras llega.
app.post('/api/ai/lesson-bite', async (req: Request, res: Response) => {
  try {
    const { student, teacher, subject, dailyClass, index, total, covered } = req.body;
    if (!dailyClass?.theme || !Number.isInteger(index) || index < 1) {
      return res.status(400).json({ lesson: null, error: 'Faltan dailyClass.theme o index' });
    }
    const coveredList: string[] = Array.isArray(covered) ? covered.filter((c: any) => typeof c === 'string' && c.trim()).slice(-3) : [];
    const totalLessons = Math.min(5, Math.max(2, Number(total) || 3));

    const systemPrompt = `
Eres el diseñador instruccional de Wisdom School, experto en microlearning infantil.
Genera la micro-lección ${index} de ${totalLessons} (orden progresivo) para enseñar "${dailyClass.theme}" a ${student?.name || 'el estudiante'} (${student?.age || 10} años), materia ${subject?.name || 'General'}. Objetivo de la clase: ${dailyClass.objective || 'comprender los conceptos clave'}.
${coveredList.length ? `Ya se explicaron estos subtemas (NO los repitas ni los resumas): ${coveredList.join(' | ')}. Aporta el siguiente concepto esencial hacia el objetivo.` : 'Es la primera lección: empieza por el concepto más fundamental del tema.'}

Devuelve SOLO este objeto JSON compacto (sin razonamiento visible, sin prosa, sin markdown, sin texto antes o después):
{"title":"subtema en máx 40 caracteres","theory":"explicación exacta de máx 45 palabras para su edad","analogy":"analogía de su vida real en máx 12 palabras","example":"ejemplo concreto en máx 18 palabras","quiz":{"question":"pregunta de opción múltiple sobre ESTE subtema (máx 18 palabras)","options":["opción A corta","opción B corta","opción C corta"],"correctIndex":0,"correctExplanation":"por qué es correcta (máx 12 palabras)"}}
REGLAS: español claro y afectuoso; options SIEMPRE 3, cortas y muy distintas; correctIndex 0, 1 o 2; nada de listas anidadas dentro de los valores.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: `Genera la micro-lección ${index} de ${totalLessons} como JSON.`,
      conversationHistory: [],
    }, { modelTryMs: Number(process.env.MICROBITE_MODEL_TIMEOUT_MS || 9000), tierBudgetMs: Number(process.env.MICROBITE_TIER_BUDGET_MS || 22000), lastTierBudgetMs: Number(process.env.MICROBITE_LAST_TIER_BUDGET_MS || 13000), gen: { maxTokens: 1100, temperature: 0.4 } });

    const parsed = looseParseJson(extractJsonObject(result.reply));
    res.setHeader('Cache-Control', 'no-store');
    const quiz = parsed?.quiz;
    const valid = parsed && typeof parsed.title === 'string' && typeof parsed.theory === 'string' && parsed.theory.trim()
      && quiz && typeof quiz.question === 'string' && Array.isArray(quiz.options) && quiz.options.length === 3
      && Number.isInteger(Number(quiz.correctIndex)) && Number(quiz.correctIndex) >= 0 && Number(quiz.correctIndex) <= 2;
    if (!valid) {
      console.warn('[lesson-bite] JSON inválido. Snippet:', (result.reply || '').slice(0, 240));
      return res.status(503).json({ lesson: null, providerUsed: result.providerUsed, isOfflineSimulation: false });
    }
    return res.json({
      lesson: {
        title: String(parsed.title).trim(),
        theory: String(parsed.theory).trim(),
        analogy: typeof parsed.analogy === 'string' && parsed.analogy.trim() ? parsed.analogy.trim() : undefined,
        example: typeof parsed.example === 'string' && parsed.example.trim() ? parsed.example.trim() : undefined,
        quiz: {
          question: String(quiz.question).trim(),
          options: (quiz.options as string[]).map((o: any) => String(o).trim()),
          correctIndex: Number(quiz.correctIndex),
          correctExplanation: typeof quiz.correctExplanation === 'string' ? quiz.correctExplanation.trim() : undefined,
        },
      },
      providerUsed: result.providerUsed,
    });
  } catch (err: any) {
    console.error('Error en /api/ai/lesson-bite:', err?.message || err);
    return res.status(503).json({ lesson: null, isOfflineSimulation: true });
  }
});

// Paso 15e: DESARROLLA el tema para la Guía Didáctica oficial (plantilla "El Ciclo del Agua").
// MODO A (preferido): el cliente envía los `steps` ya resueltos por la ruta interactiva → se genera SOLO {intro, questionA, questionB}
// (JSON chico = rápido y fiable también con free-tier saturado; la guía queda idéntica a lo que el niño estudió).
// MODO B: sin steps → genera guía completa (intro+3 pasos reales+preguntas). Si nada funciona, el frente usa su fallback con la lectura real.
app.post('/api/ai/guide-content', async (req: Request, res: Response) => {
  try {
    const { student, subject, dailyClass, steps: presetSteps } = req.body ?? {};
    if (!dailyClass?.theme) {
      return res.status(400).json({ content: null, error: 'Falta dailyClass.theme' });
    }
    const preset: Array<{ title: string; text: string }> = (Array.isArray(presetSteps) ? presetSteps : [])
      .filter((s: any) => s && typeof s.title === 'string' && typeof s.text === 'string' && s.text.trim().length > 25)
      .slice(0, 3)
      .map((s: any) => ({ title: String(s.title).replace(/\s+/g, ' ').trim().slice(0, 70), text: String(s.text).replace(/\s+/g, ' ').trim().slice(0, 300) }));

    const edad = student?.age || 10;
    // Normalización de campos JSON: SOLO colapsar espacios (cleanReasoningLeak es para prosa larga, no para
    // strings cortos sin tildes: ahí devolvía null y tiraba respuestas válidas enteras — bug corregido).
    const norm = (s: unknown, max: number) => (typeof s === 'string' ? s : '').replace(/\s+/g, ' ').trim().slice(0, max);

    let systemPrompt: string;
    let userMessage: string;
    let budgets: { modelTryMs: number; tierBudgetMs: number; lastTierBudgetMs: number; maxTokens: number };

    if (preset.length >= 2) {
      const pasosTxt = preset.map((s, i) => `Paso ${i + 1}: ${s.title} — ${s.text}`).join('\n');
      systemPrompt = `
Eres el autor de las Guías Didácticas de Wisdom School (escuela cristiana evangélica). El estudiante YA vio estos pasos del tema "${dailyClass.theme}" en su clase interactiva:
${pasosTxt}

Genera SOLO un objeto JSON (empieza con { y termina }, sin notas internas, sin markdown) con este esquema exacto y nada más:
{"intro":"párrafo de 50-70 palabras, español cálido y sencillo para un niño de ${edad} años: presenta el tema, por qué importa en la vida real y termina con una frase que conecte su orden y propósito con Dios creador y con nuestra mayordomía (sin citar versículos largos)","questionA":"pregunta de ANÁLISIS encadenando TODOS los pasos de arriba (qué pasa primero, después, al final) y por qué el proceso funciona así y no al revés; máximo 45 palabras, termina con una mini-pregunta de por qué","questionB":"UN escenario concreto de la vida real de un niño de ${edad} años donde una parte del proceso falla o está en riesgo, seguido de 2 preguntas cortas: ¿qué pasaría…? y ¿cuál es tu responsabilidad para cuidarlo como buen mayordomo de lo que Dios creó?; máximo 55 palabras"}
PROHIBIDO inventar pasos nuevos o cambiar los nombres de los dados; las preguntas DEBEN poder responderse leyendo solo los pasos de arriba.
      `.trim();
      userMessage = `Genera el JSON (intro, questionA, questionB) para "${dailyClass.theme}". Materia: ${subject?.name || 'General'}.`;
      budgets = { modelTryMs: 10000, tierBudgetMs: 24000, lastTierBudgetMs: 14000, maxTokens: 520 };
    } else {
      const base = [
        dailyClass.objective ? `Objetivo: ${dailyClass.objective}` : '',
        dailyClass.introduction ? `Introducción del maestro: ${String(dailyClass.introduction).slice(0, 500)}` : '',
        dailyClass.reading ? `Lectura base de la clase: ${String(dailyClass.reading).slice(0, 800)}` : '',
        (dailyClass.activities && dailyClass.activities[0]) ? `Actividad clave: ${dailyClass.activities[0].title} — ${dailyClass.activities[0].description}` : '',
      ].filter(Boolean).join('\n');
      systemPrompt = `
Eres el autor de las Guías Didácticas oficiales de Wisdom School (escuela cristiana evangélica, cosmovisión bíblica). Tu trabajo: DESARROLLAR EL TEMA con contenido real y nombres concretos. Estilo de referencia (copia SU ESTILO, no su contenido): Tema "El ciclo del agua" → intro de 4 líneas; "Paso 1: Evaporación (El Ascenso): el sol calienta el agua… sube como vapor"; "Paso 2: Condensación (La Formación): el vapor se enfría y forma nubes"; "Paso 3: Precipitación (El Regreso): cae como lluvia y riega los campos"; después A y B.
Los pasos DEBEN usar los NOMBRES REALES de cada parte del proceso (términos científicos, episodios, reglas, operaciones...), con apodo evocador entre paréntesis. PROHIBIDO titular pasos "Observa", "Comprende", "Parte 1", "Idea central".

Tu respuesta COMIENZA con { y TERMINA con }. Sin notas internas ni texto fuera del JSON. ESQUEMA EXACTO:
{"intro":"50-70 palabras, español sencillo para ${edad} años, cierra conectando orden/propósito con Dios creador","steps":[{"title":"NOMBRE real (Apodo)","text":"explicación SOLO de este paso, 35-48 palabras sin relleno"},{"title":"NOMBRE real del siguiente paso (Apodo)","text":"35-48 palabras"},{"title":"NOMBRE real del último paso (Apodo)","text":"35-48 palabras"}],"questionA":"A. Expresa con tus propias palabras: pregunta de análisis encadenando los 3 pasos + por qué funcionan en ese orden (máx 45 palabras)","questionB":"B. Pensamiento crítico: escenario real donde algo falla o está en riesgo + ¿qué pasaría...? + ¿cuál es tu responsabilidad/mayordomía? (máx 55 palabras)"}
      `.trim();
      userMessage = `Tema a desarrollar: "${dailyClass.theme}". Materia: ${subject?.name || 'General'}. Estudiante: ${student?.name || 'tu estudiante'} (${edad} años).\n${base}\nDesarrolla ahora el JSON de la guía.`;
      budgets = { modelTryMs: 14000, tierBudgetMs: 30000, lastTierBudgetMs: 18000, maxTokens: 1600 };
    }

    const result = await executeResilientAIPipeline(
      { systemPrompt, userMessage, conversationHistory: [] },
      { modelTryMs: budgets.modelTryMs, tierBudgetMs: budgets.tierBudgetMs, lastTierBudgetMs: budgets.lastTierBudgetMs, gen: { maxTokens: budgets.maxTokens, temperature: 0.35 } }
    );

    const parsed = looseParseJson(extractJsonObject(result.reply));
    res.setHeader('Cache-Control', 'no-store');
    const intro = norm(parsed?.intro ?? parsed?.introduction, 520);
    const questionA = norm(parsed?.questionA, 360).replace(/^A\.\s*/i, '').replace(/^Expresa con tus propias palabras\s*[:\-—]\s*/i, '');
    const questionB = norm(parsed?.questionB, 440).replace(/^B\.\s*/i, '').replace(/^Pensamiento (cr[ií]tico|de an[aá]lisis)\s*[:\-—]\s*/i, '');

    let outSteps = preset;
    if (preset.length < 2) {
      const rawSteps = Array.isArray(parsed?.steps) ? parsed.steps : [];
      outSteps = rawSteps
        .filter((s: any) => s && typeof s.title === 'string' && typeof s.text === 'string' && s.text.trim().length > 25)
        .slice(0, 3)
        .map((s: any) => ({ title: norm(s.title, 70).replace(/^Paso\s*\d+\s*[:\-—]\s*/i, ''), text: norm(s.text, 320) }));
    }
    if (!intro || outSteps.length < 2 || !questionA || !questionB) {
      console.warn('[guide-content] incompleto. Snippet:', (result.reply || '').slice(0, 260));
      return res.status(503).json({ content: null, providerUsed: result.providerUsed });
    }
    return res.json({ content: { intro, steps: outSteps, questionA, questionB }, providerUsed: result.providerUsed });
  } catch (err: any) {
    console.error('Error en /api/ai/guide-content:', err?.message || err);
    return res.status(503).json({ content: null, isOfflineSimulation: true });
  }
});

// Paso 15d: Re-explicación con sustento teórico para la ruta de micro-lecciones.
// A diferencia del chat socrático (que jamás da la respuesta), aquí SÍ se explica por qué la respuesta
// correcta lo es, usando el contenido exacto de la lección que el niño ya está viendo.
app.post('/api/ai/reexplain', async (req: Request, res: Response) => {
  try {
    const { student, teacher, subject, dailyClass, lesson } = req.body ?? {};
    const theory = String(lesson?.theory || '').slice(0, 700);
    const correctAnswer = String(lesson?.correctAnswer || '').slice(0, 140);
    const question = String(lesson?.question || '').slice(0, 220);
    if (!theory || !correctAnswer) {
      return res.status(400).json({ text: null, error: 'Faltan lesson.theory o lesson.correctAnswer' });
    }
    const analogy = String(lesson?.analogy || '').slice(0, 200);
    const example = String(lesson?.example || '').slice(0, 200);

    const systemPrompt = `
Eres "${teacher?.name || 'el profesor de Wisdom School'}", explicando con mucho cariño a ${student?.name || 'tu estudiante'} (${student?.age || 10} años), de la materia ${subject?.name || 'General'}.
Acaba de fallar este reto: "${question || 'la pregunta de la lección'}". La respuesta correcta es "${correctAnswer}".

Contenido oficial de SU lección (úsalo como única fuente, no lo contradigas):
- Teoría: ${theory}
- Analogía usada: ${analogy || '(la de la ficha)'}
- Ejemplo usado: ${example || '(el de la ficha)'}

Escribe SOLO la explicación final, sin títulos, sin markdown, sin listas y SIN escribir nunca tu planificación o notas internas:
1. Una frase de ánimo ("No pasa nada...", varíala), 2. vuelve a contar el concepto con palabras MÁS simples que la teoría de arriba, 3. usa una analogía NUEVA y distinta a la de la ficha (otra cosa de su vida diaria), 4. cierra diciendo exactamente por qué "${correctAnswer}" es la respuesta correcta, conectándola con el ejemplo.
Máximo 60 palabras español claro para su edad. PROHIBIDO hacer preguntas, prohibido pedirle que responda algo: es una explicación definitiva para que vuelva a intentarlo con éxito.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: 'Dame la explicación de cariño ahora.',
      conversationHistory: [],
    }, { modelTryMs: Number(process.env.REEXPLAIN_MODEL_TIMEOUT_MS || 8000), tierBudgetMs: Number(process.env.REEXPLAIN_TIER_BUDGET_MS || 16000), lastTierBudgetMs: Number(process.env.REEXPLAIN_LAST_TIER_BUDGET_MS || 10000), gen: { maxTokens: 480, temperature: 0.8 } });

    const text = cleanReasoningLeak(result.reply);
    res.setHeader('Cache-Control', 'no-store');
    if (!text) {
      console.warn('[reexplain] sin texto útil. Snippet:', (result.reply || '').slice(0, 200));
      return res.status(503).json({ text: null, providerUsed: result.providerUsed });
    }
    return res.json({ text, providerUsed: result.providerUsed });
  } catch (err: any) {
    console.error('Error en /api/ai/reexplain:', err?.message || err);
    return res.status(503).json({ text: null, isOfflineSimulation: true });
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

// Paso 17: dejamos un fallback estático para que la función también pueda responder la página principal si Vercel la enruta aquí.
if (process.env.VERCEL) {
  const distPath = path.join(appRoot, 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Paso 18: el servidor decide si ejecuta Vite en desarrollo o sirve archivos estáticos en producción, según el entorno actual.
async function start() {
  const isVercelRuntime = Boolean(process.env.VERCEL);

  if (!isVercelRuntime && process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
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
  } else if (!isVercelRuntime) {
    const distPath = path.join(appRoot, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!isVercelRuntime) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Wisdom School Server running on http://0.0.0.0:${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  start();
}

export default app;
