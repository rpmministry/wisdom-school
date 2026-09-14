import type { DailyClass } from '../types';
import type { GuideAiContent, GuideQuestionType } from './guideGenerator';

// ============================================================================
// Almacén ÚNICO de la guía didáctica v4.0 por clase/ocurrencia.
// El PDF y el chat del profesor IA leen/escriben EXACTAMENTE la misma entrada,
// de modo que el texto que el estudiante tiene impreso es el mismo string que
// el profesor cita. Persistimos el contenido YA finalizado (mismo recorte y
// mismas preguntas que se imprimen), no el borrador crudo de la IA.
// ============================================================================

export type StoredGuideContent = GuideAiContent;
export type StoredGuideQuestion = GuideAiContent['preguntas'][number];

const KEY_PREFIX = 'wisdom_guide_v4';

/** Clave de fecha de una clase (la guía es por clase de un día concreto). */
export const guideDateKey = (cls?: Pick<DailyClass, 'date'> | null): string =>
  cls?.date || new Date().toISOString().slice(0, 10);

/** Clave persistente por estudiante + clase + fecha (evita colisiones entre semanas que reutilizan el mismo id base). */
export const guideStorageKey = (
  studentId?: string,
  classId?: string,
  dateKey?: string,
): string => `${KEY_PREFIX}_${studentId || 'x'}_${classId || 'c'}_${dateKey || new Date().toISOString().slice(0, 10)}`;

const normalizeQuestion = (q: any, index: number): StoredGuideQuestion => ({
  tipo: (['literal', 'interpretativa', 'aplicacion'].includes(q?.tipo)
    ? q.tipo
    : (['literal', 'interpretativa', 'aplicacion'][index] || 'interpretativa')) as GuideQuestionType,
  pregunta: String(q?.pregunta ?? '').replace(/\s+/g, ' ').trim(),
  pista: q?.pista ? String(q.pista).replace(/\s+/g, ' ').trim() : null,
});

/** Escribe la guía EXACTA (la que se imprime). Best-effort: Safari privado puede lanzar. */
export function writeGuideContent(
  studentId: string | undefined,
  classId: string | undefined,
  dateKey: string | undefined,
  content: StoredGuideContent,
): void {
  try {
    localStorage.setItem(
      guideStorageKey(studentId, classId, dateKey),
      JSON.stringify({
        content: { explicacion: content.explicacion, preguntas: content.preguntas },
        providerUsed: content.providerUsed,
      }),
    );
  } catch { /* cuota llena / modo privado: el chat usará el respaldo de la clase */ }
}

/** Lee la guía almacenada para una clase/ocurrencia. null si aún no se generó. */
export function readGuideContent(
  studentId: string | undefined,
  classId: string | undefined,
  dateKey: string | undefined,
): StoredGuideContent | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(guideStorageKey(studentId, classId, dateKey)) || 'null');
    const c = parsed?.content;
    if (c && typeof c.explicacion === 'string' && c.explicacion.trim() && Array.isArray(c.preguntas) && c.preguntas.length > 0) {
      return {
        explicacion: c.explicacion,
        preguntas: c.preguntas
          .map((q: any, i: number) => normalizeQuestion(q, i))
          .filter((q: StoredGuideQuestion) => q.pregunta.length > 0),
        providerUsed: parsed.providerUsed,
      };
    }
  } catch { /* caché corrupta: se ignora */ }
  return null;
}

export const readGuideForClass = (
  studentId: string | undefined,
  cls?: Pick<DailyClass, 'id' | 'date'> | null,
): StoredGuideContent | null => (cls ? readGuideContent(studentId, cls.id, guideDateKey(cls)) : null);

export const writeGuideForClass = (
  studentId: string | undefined,
  cls: Pick<DailyClass, 'id' | 'date'>,
  content: StoredGuideContent,
): void => writeGuideContent(studentId, cls.id, guideDateKey(cls), content);
