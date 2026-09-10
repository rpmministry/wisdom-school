import { Student, AITeacher, Subject, DailyClass, WorkAnalysisResult, MicroLessonPlan, MicroLesson } from '../types';

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

// Retry configuration
const RETRY_DELAYS_MS = [2000, 4000, 6000]; // 2s, 4s, 6s
const MAX_RETRIES = RETRY_DELAYS_MS.length;

// Los errores de clave inválida/petición inválida son FATALES: reintentarlos solo quema 12 segundos.
class FatalAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FatalAIError';
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delays: number[] = RETRY_DELAYS_MS
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchFn();
    } catch (error: any) {
      if (error?.name === 'FatalAIError') throw error; // transición inmediata al motor auxiliar
      lastError = error;
      
      // If this was the last attempt, throw
      if (attempt === retries) break;
      
      const delay = delays[attempt] || delays[delays.length - 1];
      console.warn(`[Reintento ${attempt + 1}/${retries}] Falló, reintentando en ${delay}ms:`, error.message);
      await sleep(delay);
    }
  }
  
  throw lastError || new Error('Todos los reintentos fallaron');
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
    
    // Priorizamos familias de modelos conocidas por calidad en modo gratuito.
    const FAMILIES = ['qwen', 'google/gemini', 'deepseek', 'meta-llama', 'mistral', 'gemma', 'glm', 'kimi', 'nemotron'];
    const rank = (id: string) => { const i = FAMILIES.findIndex((f) => id.startsWith(f)); return i === -1 ? 99 : i; };
    freeModels.sort((a: string, b: string) => rank(a) - rank(b));
    if (freeModels.length > 0) { cachedFreeModels = freeModels; return cachedFreeModels; }
  } catch (error) { 
    console.warn("[Motor IA Auxiliar] Falló la obtención dinámica de lista. Usando lista estática."); 
  }
  return ["nvidia/nemotron-3.5-lightning:free", "nex-agi/nex-n2.5-mini:free", "poolside/laguna-s-2.1:free"];
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
// PLAN DE MICRO-LECCIONES (ruta paginada + quizzes) — servido por la jerarquía gratuita del servidor
// ==========================================
// Contenido DESARROLLADO de la Guía Didáctica (plantilla oficial: intro + PASOS REALES + A/B).
// DISEÑO: si el caller pasa `steps` (los que la Clase Interactiva ya resolvió, cacheados y coherentes con lo que el niño vio),
// el server genera SOLO {intro, questionA, questionB} = JSON pequeño y confiable hasta en free-tier saturado (guía == clase).
// Sin steps, cae a modo completo (intro+pasos+preguntas); null => generador usa su fallback determinista (lectura real).
export async function requestGuideContent(req: {
  student: Student;
  subject: Subject;
  dailyClass: DailyClass;
  steps?: { title: string; text: string }[];
}): Promise<import('../utils/guideGenerator').GuideAiContent | null> {
  const preset = (req.steps || []).filter((s) => s && typeof s.title === "string" && typeof s.text === "string" && s.text.trim().length > 25).slice(0, 3);
  const wantsFull = preset.length < 2;
  // Caché diaria por clase: la guía buena se reusa sin gastar la cuota gratuita del día.
  const dateKey = req.dailyClass?.date || new Date().toISOString().slice(0, 10);
  const cacheKey = `wisdom_guide_v3_${req.student?.id || 'x'}_${req.dailyClass?.id || 'c'}_${dateKey}`;
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    const cl = cached?.content;
    if (cl && typeof cl.intro === 'string' && Array.isArray(cl.steps) && cl.steps.length >= 2 && cl.questionA && cl.questionB) {
      return { intro: String(cl.intro), steps: cl.steps.map((s: any) => ({ title: String(s.title), text: String(s.text) })), questionA: String(cl.questionA), questionB: String(cl.questionB), providerUsed: `${cached.providerUsed || 'IA'} (caché de hoy)` };
    }
  } catch { /* cache corrupta: regenerar */ }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), wantsFull ? 55000 : 35000);
  try {
    const res = await fetch('/api/ai/guide-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student, subject: req.subject, dailyClass: req.dailyClass,
        ...(wantsFull ? {} : { steps: preset }),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const c = data?.content;
    if (!c || typeof c.intro !== 'string') return null;

    const finalSteps = wantsFull
      ? (Array.isArray(c.steps) ? c.steps : [])
          .filter((s: any) => s && typeof s.title === 'string' && typeof s.text === 'string' && s.text.trim().length > 20)
          .slice(0, 3)
          .map((s: any) => ({ title: String(s.title), text: String(s.text) }))
      : preset;
    const requireModelSteps = wantsFull && finalSteps.length < 2 ? null : finalSteps;
    if (!requireModelSteps) return null;
    if (!(c.questionA && c.questionB)) return null;
    const built = {
      intro: String(c.intro),
      steps: requireModelSteps,
      questionA: String(c.questionA),
      questionB: String(c.questionB),
      providerUsed: data.providerUsed || (wantsFull ? 'guía IA completa' : 'guía IA sobre la ruta del estudiante'),
  };
  // Solo cacheamos el camino IA (MODO A/B); el fallback determinista local no debe congelarse.
  try {
    if (data?.providerUsed && !data.isOfflineSimulation && built.steps.length >= 2) {
      localStorage.setItem(cacheKey, JSON.stringify({ content: { intro: built.intro, steps: built.steps, questionA: built.questionA, questionB: built.questionB }, providerUsed: built.providerUsed }));
    }
  } catch { /* cuota llena: sin caché, la guía igual se descarga */ }
  return built;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Lee los pasos de la ruta YA generados para una clase, sin tocar la red (para la descarga por lotes del día).
// Devuelve [] si esa clase aún no tiene micro-lecciones generadas.
export function readCachedBiteSteps(student: Student, dailyClass: DailyClass, total = 3): { title: string; text: string }[] {
  const out: { title: string; text: string }[] = [];
  const dateKey = dailyClass?.date || new Date().toISOString().slice(0, 10);
  for (let i = 1; i <= total; i++) {
    try {
      const raw = localStorage.getItem(biteCacheKey(student?.id || 'x', dailyClass?.id || 'c', dateKey, i));
      const l = raw ? JSON.parse(raw)?.lesson : null;
      if (l && typeof l.theory === 'string' && l.theory.trim()) {
        out.push({ title: String(l.title || `Lección ${i}`), text: [l.theory, l.analogy, l.example].filter(Boolean).join(' ') });
      }
    } catch { /* entrada corrupta: se ignora */ }
  }
  return out;
}

// Re-explicación afectuosa con sustento teórico (usa /api/ai/reexplain; null => el UI mantiene la explicación determinista).
export async function requestReExplanation(req: {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
  explanation: { theory: string; analogy?: string; example?: string; question: string; correctAnswer: string };
}): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('/api/ai/reexplain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student, teacher: req.teacher, subject: req.subject,
        dailyClass: req.dailyClass, lesson: req.explanation,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    return text.length > 12 ? text : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Una micro-lección (JSON pequeño) — camino principal del MicroLessonPlayer: fiable incluso con la capa gratuita saturada.
const BITE_CACHE_PREFIX = 'wisdom_lesson_bite_v1_';
function biteCacheKey(studentId: string, classId: string, date: string, index: number): string {
  return `${BITE_CACHE_PREFIX}${studentId}_${classId}_${index}_${date}`;
}

export async function requestLessonBite(req: {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
  index: number; // 1-based
  total: number;
  covered: string[]; // títulos ya explicados (para no repetir)
}): Promise<MicroLesson | null> {
  const dateKey = req.dailyClass?.date || new Date().toISOString().slice(0, 10);
  const key = biteCacheKey(req.student?.id || 'x', req.dailyClass?.id || 'c', dateKey, req.index);
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      const l = parsed?.lesson;
      if (l && typeof l.theory === 'string' && l.quiz?.options?.length === 3) {
        return {
          id: `micro-${req.dailyClass?.id}-L${req.index}`,
          title: l.title,
          theory: l.theory,
          analogy: l.analogy,
          example: l.example,
          quiz: l.quiz,
        };
      }
    }
  } catch { /* caché corrupta: regenerar */ }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch('/api/ai/lesson-bite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student, teacher: req.teacher, subject: req.subject,
        dailyClass: req.dailyClass, index: req.index, total: req.total, covered: req.covered,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const l = data?.lesson;
    if (!l || typeof l.theory !== 'string' || !l.quiz || !Array.isArray(l.quiz.options) || l.quiz.options.length !== 3) return null;
    const lesson: MicroLesson = {
      id: `micro-${req.dailyClass?.id}-L${req.index}`,
      title: String(l.title ?? `Lección ${req.index}`),
      theory: String(l.theory),
      analogy: l.analogy,
      example: l.example,
      quiz: {
        question: String(l.quiz.question),
        options: l.quiz.options.map((o: any) => String(o)),
        correctIndex: Math.min(2, Math.max(0, Number(l.quiz.correctIndex) || 0)),
        correctExplanation: l.quiz.correctExplanation,
      },
    };
    try { localStorage.setItem(key, JSON.stringify({ lesson: l, providerUsed: data.providerUsed })); } catch { /* cuota llena: sin caché, funciona igual */ }
    return lesson;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeLessonPlan(raw: any, dailyClass: DailyClass | null, providerUsed?: string): MicroLessonPlan | null {
  try {
    if (!raw || !Array.isArray(raw.lessons) || raw.lessons.length < 1 || raw.lessons.length > 5) return null;
    const lessons: MicroLesson[] = [];
    for (let i = 0; i < raw.lessons.length; i++) {
      const l = raw.lessons[i];
      if (!l || typeof l.title !== 'string' || typeof l.theory !== 'string' || l.theory.trim().length < 10) return null;
      let quiz = null;
      if (l.quiz && typeof l.quiz.question === 'string' && Array.isArray(l.quiz.options) && l.quiz.options.length === 3
        && l.quiz.options.every((o: any) => typeof o === 'string' && o.trim())
        && Number.isInteger(Number(l.quiz.correctIndex)) && Number(l.quiz.correctIndex) >= 0 && Number(l.quiz.correctIndex) <= 2) {
        quiz = {
          question: String(l.quiz.question).trim(),
          options: (l.quiz.options as string[]).map((o) => String(o).trim()),
          correctIndex: Number(l.quiz.correctIndex),
          correctExplanation: typeof l.quiz.correctExplanation === 'string' ? l.quiz.correctExplanation.trim() : undefined,
          encouragement: typeof l.quiz.encouragement === 'string' ? l.quiz.encouragement.trim() : undefined,
        };
      }
      lessons.push({
        id: `micro-${dailyClass?.id || 'clase'}-L${i + 1}`,
        title: String(l.title).trim(),
        theory: String(l.theory).trim(),
        analogy: typeof l.analogy === 'string' && l.analogy.trim() ? l.analogy.trim() : undefined,
        example: typeof l.example === 'string' && l.example.trim() ? l.example.trim() : undefined,
        quiz,
      });
    }
    return {
      unitTitle: typeof raw.unitTitle === 'string' && raw.unitTitle.trim() ? raw.unitTitle.trim() : (dailyClass?.theme || 'Ruta de Aprendizaje'),
      lessons,
      closingMessage: typeof raw.closingMessage === 'string' && raw.closingMessage.trim() ? raw.closingMessage.trim() : undefined,
      providerUsed,
      degraded: false,
    };
  } catch {
    return null;
  }
}

// Construye el plan de respaldo desde el learningPath estático de la clase (siembra sin costo, sin quizzes).
export function buildStaticLessonPlan(dailyClass: DailyClass): MicroLessonPlan | null {
  const stages = (dailyClass.learningPath && dailyClass.learningPath.length > 0)
    ? dailyClass.learningPath
    : [];
  if (stages.length === 0) return null;
  const lessons: MicroLesson[] = stages.map((s, i) => ({
    id: `micro-${dailyClass.id}-L${i + 1}`,
    title: s.title.replace(/^Paso \d+[:\s]*/i, '') || `Lección ${i + 1}`,
    theory: [s.coreConcept.summary, s.coreConcept.detailedExplanation].filter(Boolean).join(' '),
    analogy: s.coreConcept.visualAnalogy,
    example: (s.coreConcept.keyTakeaways || []).slice(0, 3).join(' · '),
    quiz: null,
  }));
  return { unitTitle: dailyClass.theme, lessons, closingMessage: undefined, providerUsed: 'learningPath estático', degraded: true };
}

function lessonPlanCacheKey(student: Student, dailyClass: DailyClass): string {
  const d = new Date();
  const day = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return `wisdom_lesson_plan_v1_${student?.id || 'x'}_${dailyClass?.id || 'c'}_${dailyClass?.date || day}`;
}

export async function requestLessonPlan(req: {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
}): Promise<MicroLessonPlan | null> {
  const cacheKey = lessonPlanCacheKey(req.student, req.dailyClass);
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      const plan = normalizeLessonPlan(parsed?.plan, req.dailyClass, parsed?.providerUsed ? `${parsed.providerUsed} (caché)` : 'caché');
      if (plan) {
        console.log('[lesson-plan] sirviendo desde caché local:', cacheKey);
        return plan;
      }
    }
  } catch { /* caché corrupta o no disponible: seguimos con la red */ }

  const controller = new AbortController();
  // Un plan grande en modelos gratuitos puede tardar; el resultado se cachea, así que solo pesa la 1ª vez del día.
  const PLAN_TIMEOUT_MS = Number(import.meta.env.VITE_LESSON_PLAN_TIMEOUT_MS || 90000);
  const timeoutId = setTimeout(() => controller.abort(), PLAN_TIMEOUT_MS);
  try {
    const res = await fetch('/api/ai/lesson-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ student: req.student, teacher: req.teacher, subject: req.subject, dailyClass: req.dailyClass }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!data || !data.plan) return null;
    const plan = normalizeLessonPlan(data.plan, req.dailyClass, data.providerUsed);
    if (plan) {
      try {
        // Solo cacheamos planes con evaluación (no degradados): un fallo 503 no debe quedar guardado.
        if (plan.lessons.length > 1 && plan.lessons.some((l) => l.quiz)) {
          localStorage.setItem(cacheKey, JSON.stringify({ plan: data.plan, providerUsed: data.providerUsed }));
        }
      } catch { /* sin caché si supera cuota: no es fatal */ }
      console.log('[lesson-plan] generado por:', plan.providerUsed);
    }
    return plan;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ==========================================
// FASE A: JERARQUÍA EN EL SERVIDOR (Qwen 3.8 Flash → OpenCode → Gemini 3.7 Flash)
// Las claves viven solo en el servidor. Cualquier fallo (red, 404, 503, timeout)
// devuelve null y la llamada continúa hacia la FASE B (ruta directa del cliente,
// idéntica a la implementación anterior = respaldo de contingencia).
// ==========================================
async function tryServerTeacherHierarchy(req: TeacherChatRequest): Promise<string | null> {
  const SERVER_TIMEOUT_MS = Number(import.meta.env.VITE_AI_SERVER_TIMEOUT_MS || 25000);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);
  try {
    const res = await fetch('/api/ai/teacher-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student,
        teacher: req.teacher,
        subject: req.subject,
        dailyClass: req.dailyClass,
        conversationHistory: req.conversationHistory,
        message: req.message,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const reply = data?.reply;
    // El servidor marca isOfflineSimulation=true cuando toda su jerarquía falló: en ese caso probamos la fase B local.
    if (data?.isOfflineSimulation) return null;
    if (reply && typeof reply === 'string' && reply.trim()) return reply.trim();
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ==========================================
// FUNCIÓN CENTRAL: IA DEL PROFESOR CON REINTENTOS
// ==========================================
export async function askAITeacher(req: TeacherChatRequest): Promise<string> {
  // FASE A — jerarquía administrada en el servidor (mejor fidelidad, claves ocultas).
  try {
    const serverReply = await tryServerTeacherHierarchy(req);
    if (serverReply) return serverReply;
  } catch {
    /* silencio deliberado: se cae a la FASE B */
  }

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";
  
  const GEMINI_TIMEOUT = 15000; 
  const OPENROUTER_TIMEOUT = 8000;

const systemInstruction = `
    Eres ${req.teacher.name}, el Director de la Clase de ${req.subject.name}. Actúas como el profesor guía principal de esta sesión magistral privada para ${req.student.name}.
    Contexto de la clase actual: "${req.dailyClass?.theme}".
    Objetivo: ${req.dailyClass?.objective}.

    METODOLOGÍA OBLIGATORIA DEL DIRECTOR DE CLASE — RUTA DE APRENDIZAJE ACTIVO:

    PASO 1 — BIENVENIDA BREVE A LA RUTA (PROHIBIDO EXPONER LA TEORÍA AQUÍ):
    - La teoría ya NO se entrega en el chat: la plataforma se la muestra al alumno en la "Ruta Interactiva" (tarjetas de micro-lecciones 1..N con teoría corta, analogía, ejemplo y un reto de opción múltiple).
    - Tu primera línea debe ser un saludo cálido + invitarlo a avanzar por sus mini-lecciones. NUNCA repitas una exposición larga ni todas las definiciones del tema.

    PASO 2 — COMPAÑERO DE VERIFICACIÓN:
    - Cuando el alumno te cuente qué lección está viendo o responda a ella, haz UNA sola pregunta corta de razonamiento sobre ese punto específico y espera su respuesta.
    - Si falla o duda: no des la respuesta; indaga por qué pensó así y muéstrale amablemente la grieta en su lógica. Si acierta: felicítalo con energía y pídele el siguiente paso de la ruta.

    PASO 3 — REEXPLICACIÓN AFECTUOSA (CUANDO NO SE ENTIENDE):
    - Si pide ayuda o evidencia confusión sobre un concepto: reexplicalo SOLO a ÉL, en máximo 4 líneas, con lenguaje más sencillo, una analogía nueva o un ejemplo de su vida. Nunca vuelques toda la teoría otra vez; solo el punto dudosos.
    - Luego verifica con una mini-pregunta y solo entonces déjalo continuar su ruta.

    PASO 4 — Laboratorio Digital:
    - Cuando el alumno termine sus mini-lecciones, anímalo a entrar al "Laboratorio Digital" (el botón grande de la pantalla de éxito) para ver el video/simulador.

    PASO 5 — Taller Práctico y Evidencia:
    - Después lo esperas en el "Taller Práctico", ayudándolo con cada actividad y celebrando cuando suba su evidencia. Cierra con una reflexión breve que conecte el tema con su vida.

    REGLAS GENERALES:
    - TODOS tus mensajes deben ser BREVES (máximo 80 palabras); la teoría extensa le corresponde a las tarjetas de micro-lecciones, nunca a ti. La única excepción: si el alumno pide explícitamente "explícamelo todo", le das un resumen por lecciones en ≤120 palabras.
    - Mantén siempre el contexto de la lección que el alumno menciona; si no dice cuál, pregúntale en 5 palabras en qué mini-lección va.
    - Eres su guía. Tono amigable, motivador y sumamente claro. Usa Markdown en español.
  `;

  let primaryErrorMsg = "";

  // El valor pegado a veces es un OAuth Client ID (…apps.googleusercontent.com), que NUNCA funciona como API key de Gemini:
  // detectarlo aquí evita quemar 15 s en reintentos inútiles y deja pasar al Motor Auxiliar Gratuito.
  const GEMINI_KEY_SHAPE_OK = /^AIza[0-9A-Za-z_-]{10,}$/.test(GEMINI_API_KEY.trim()) || /^AQ\.[0-9A-Za-z_.-]{10,}$/.test(GEMINI_API_KEY.trim());
  if (GEMINI_API_KEY && !GEMINI_KEY_SHAPE_OK) {
    console.warn("[Red Neural] ⚠️ VITE_GEMINI_API_KEY no tiene formato de API key de Gemini (parece OAuth Client ID u otro valor). Se omite el motor primario y se usará la IA gratuita de OpenRouter. Consigue la key real en https://aistudio.google.com/apikey");
  }

  const GEMINI_KEY_AVAILABLE = !!import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== "TU_CLAVE_AQUI" && GEMINI_KEY_SHAPE_OK;
  const OPENROUTER_KEY_AVAILABLE = !!import.meta.env.VITE_OPENROUTER_API_KEY && import.meta.env.VITE_OPENROUTER_API_KEY !== "PEGA_AQUI_TU_CLAVE_OPENROUTER";

  // Build conversation history
  let geminiContents = req.conversationHistory.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  if (geminiContents.length > 0 && geminiContents[0].role === 'model') geminiContents.shift(); 
  geminiContents.push({ role: 'user', parts: [{ text: req.message }] });

  // TRIAL 1: Gemini 3.6 Flash with retries
  if (GEMINI_KEY_AVAILABLE) {
    try {
      const geminiResponse = await fetchWithRetry(async () => {
        console.log("[Red Neural] Contactando motor primario: Gemini 3.6 Flash...");
        const response = await fetchWithTimeout(
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

        const geminiData = await response.json();
        
        if (geminiData.candidates && geminiData.candidates.length > 0) {
          console.log("[Red Neural] ✔️ Respuesta exitosa de Gemini 3.6 Flash");
          return geminiData.candidates[0].content.parts[0].text;
        }
        
        if (geminiData.error) {
          const errMessage = String(geminiData.error.message || geminiData.error.status || '');
          if (/API key not valid|API_KEY_INVALID|PERMISSION_DENIED|UNAUTHENTICATED|INVALID_ARGUMENT|BAD REQUEST/i.test(errMessage)) {
            throw new FatalAIError(`Google rechazó la credencial/petición: ${errMessage}`);
          }
          throw new Error(`Error oficial de Google: ${errMessage}`);
        }
        throw new Error("Respuesta inválida o vacía de Gemini");
      });
      
      return geminiResponse;
    } catch (geminiError: any) {
      const fatal = geminiError?.name === 'FatalAIError';
      primaryErrorMsg = geminiError?.name === 'AbortError' ? 'Tiempo de espera agotado (Timeout)' : geminiError?.message;
      console.warn(fatal
        ? `[Red Neural] ⚠️ Motor primario descartado al instante (error terminal): ${primaryErrorMsg}`
        : `[Red Neural] ⚠️ Motor primario falló tras ${MAX_RETRIES} reintentos. Motivo: ${primaryErrorMsg}`);
    }
  }

  // FALLBACK LOCAL if no keys configured
  if (!GEMINI_KEY_AVAILABLE && !OPENROUTER_KEY_AVAILABLE) {
    console.warn("[Modo Demo] API keys no configuradas. Usando IA pedagógica local.");
    
    const fallbackResponses: Record<string, string> = {
      'Modelado algebraico': `Excelente pregunta, ${req.student.name}. Vamos a pensar en esto juntos: si tuvieras que contar alguna historia con números, ¿qué parte te gustaría contar primero? La ecuación es como una historia matemática: tenemos una historia que contar (el resultado) y queremos descubrir qué pasó antes. ¿Cuál sería el primer paso para reconstruir esa historia?`,
      'Estructura celular': `¡Qué interesante que quieras saber sobre células, ${req.student.name}! Imagina que una célula es como una casita muy pequeñita. ¿Qué crees que necesitaría para funcionar bien? Piensa en los ingredientes que necesitaría para "vivir" y organizarse. Cada parte de la casita tiene un trabajo especial.`,
      'Fotosíntesis': `${req.student.name}, qué buena intuición sobre las plantas. Imagina que las hojas son como pequeñas fábricas. ¿Qué ingredientes crees que necesitan para producir algo? La luz es como el "combustible", el agua es como la "materia prima", y el oxígeno es lo que "sobrante" producen. ¿Te imaginas una fábrica que solo produce algo cuando tiene luz?`,
      'default': `${req.student.name}, excelente reflexión. Según la pedagogía socrática, no se busca una respuesta clave, sino construir pensamiento. ¿Podrías profundizar: qué ejemplo concreto de tu vida cotidiana podrías usar para ilustrar este concepto? Cada conexión que haces es un paso hacia el verdadero aprendizaje.`
    };
    
    const theme = req.dailyClass?.theme || '';
    const response = fallbackResponses[theme] || fallbackResponses.default;
    return `${response}\n\n¿Te gustaría explorar otro aspecto o conectar esto con algo más que ya sabes?`;
  }

  // TRIAL 2: OpenRouter fallback with retries
  console.log("[Motor Auxiliar] Activando IA Auxiliar (OpenRouter) con reintentos...");
  
  if (!OPENROUTER_KEY_AVAILABLE) {
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
      const orResponse = await fetchWithRetry(async () => {
        console.log(`[Motor Auxiliar] Intentando con: ${modelId}...`);
        const response = await fetchWithTimeout("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: { 
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`, 
              "HTTP-Referer": "https://wisdom-school.edu", 
              "X-Title": "Wisdom School", 
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({ model: modelId, messages: openRouterMessages, temperature: 0.7 })
          }, OPENROUTER_TIMEOUT);
        
        const orData = await response.json();
        
        if (orData.choices && orData.choices.length > 0) {
          console.log(`[Motor Auxiliar] ✔️ Rescate exitoso usando: ${modelId}`);
          return orData.choices[0].message.content;
        }

        if (orData.error) {
          throw new Error(`Error en ${modelId}: ${orData.error.message}`);
        }
        throw new Error(`Respuesta inválida de ${modelId}`);
      });
      
      return orResponse;
    } catch (e: any) { 
      lastAuxError = `Fallo definitivo con ${modelId}: ${e.message}`;
      console.warn(`[Motor Auxiliar] ⚠️ ${lastAuxError}`);
      continue; 
    }
  }
  
  console.error("[Corte de Energía IA] Ambos motores fallaron tras reintentos:", lastAuxError);
  
  return `⚠️ **SISTEMA DE EMERGENCIA: Fallo de Conexión IA**

No he podido generar una respuesta debido a un fallo en cascada en los motores:

1. **Fallo Motor Principal (3.6 Flash):** ${primaryErrorMsg} (tras ${MAX_RETRIES} reintentos a 2s/4s/6s)
2. **Fallo Motor Auxiliar (OpenRouter):** ${lastAuxError}

*Por favor, presiona **F12** y revisa la Consola, o verifica que tus API Keys estén escritas correctamente.*`;
}

export async function analyzeWork(req: AnalyzeWorkRequest): Promise<WorkAnalysisResult> {
  return { strengths: ['Evidencia recibida correctamente'], errors: [], explanation: 'Trabajo procesado.', correction: '', recommendations: [], comprehensionLevel: 'En evaluación', feedbackSummary: 'Buen trabajo.' };
}