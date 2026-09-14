import type { DailyClass, Subject, MicrocurriculumItem, ClassResource } from '../types';

// Puente entre el horario semanal y el microcurrículo de cada materia.
// El microcurrículo guarda el temario real ("Sept / Sem 3", "Dic / Sem 1"...), pero antes
// no se usaba: la app repetía cada semana la misma clase de la semana 1. Aquí se resuelve,
// para el día y la semana escolar en curso, el ítem de temario que corresponde.

export interface MicroTheme {
  item: MicrocurriculumItem;
  unitTitle: string;
}

const parseMicroWeek = (monthWeek?: string): number | null => {
  const match = (monthWeek || '').match(/Sem(?:ana)?s?\s*(\d+)/i);
  return match ? Number(match[1]) : null;
};

const flattenSubjectItems = (subject: Subject): { item: MicrocurriculumItem; unitTitle: string; week: number | null }[] =>
  subject.units.flatMap((unit) =>
    unit.microcurriculum.map((item) => ({ item, unitTitle: unit.title, week: parseMicroWeek(item.monthWeek) })),
  );

/**
 * Devuelve el tema del microcurrículo para la semana escolar y el día indicados.
 * - Si la semana tiene ítems, se alinean en orden con los días de clase de la materia.
 * - Si esa semana no tiene contenido, se continúa con el último temario disponible (evita reiniciar).
 * - Antes del primer ítem se usa el primero.
 */
export const resolveMicroTheme = (subject: Subject, schoolWeekIndex: number, dayOfWeek: string): MicroTheme | null => {
  const entries = flattenSubjectItems(subject);
  if (entries.length === 0) return null;

  const targetWeek = schoolWeekIndex + 1;
  const dayIndex = Math.max(0, subject.daysOfWeek.indexOf(dayOfWeek));

  const ofWeek = entries.filter((entry) => entry.week === targetWeek);
  if (ofWeek.length > 0) {
    const picked = ofWeek[Math.min(dayIndex, ofWeek.length - 1)];
    return { item: picked.item, unitTitle: picked.unitTitle };
  }

  const prior = entries.filter((entry) => entry.week !== null && entry.week < targetWeek);
  if (prior.length > 0) {
    const lastWeek = prior[prior.length - 1].week as number;
    const sameWeek = prior.filter((entry) => entry.week === lastWeek);
    const picked = sameWeek[Math.min(dayIndex, sameWeek.length - 1)];
    return { item: picked.item, unitTitle: picked.unitTitle };
  }

  return { item: entries[0].item, unitTitle: entries[0].unitTitle };
};

const microResource = (cls: DailyClass, item: MicrocurriculumItem): ClassResource[] => {
  const resource = item.verifiedResource;
  if (!resource?.url) return [];
  return [{
    id: `${cls.id}-micro-resource`,
    type: 'external_link',
    title: resource.title || item.theme,
    url: resource.url,
    description: resource.platform ? `Recurso verificado en ${resource.platform}.` : 'Recurso verificado.',
    order: 0,
  }];
};

/** Devuelve una copia de la clase con el temario (tema, objetivo, guía y recursos) de la semana en curso. */
export const applyMicroTheme = (
  cls: DailyClass,
  subject: Subject | undefined,
  theme: MicroTheme | null,
  dayOfWeek: string,
  dateKey: string,
): DailyClass => {
  if (!subject || !theme) return { ...cls, dayOfWeek, date: dateKey };

  const { item, unitTitle } = theme;
  const baseQuestions = (cls.socraticQuestions || []).filter(Boolean);
  const socraticQuestions = item.socraticQuestion
    ? [item.socraticQuestion, ...baseQuestions.slice(0, 2)]
    : baseQuestions;

  return {
    ...cls,
    dayOfWeek,
    date: dateKey,
    unit: unitTitle,
    theme: item.theme,
    objective: item.objective || `Comprender "${item.theme}" mediante preguntas socráticas y una actividad vivencial.`,
    introduction: item.dynamicActivity
      ? `Tema de la semana: "${item.theme}". ${item.dynamicActivity}`
      : cls.introduction,
    reading: item.verifiedResource
      ? `${item.verifiedResource.title}${item.verifiedResource.platform ? ` (${item.verifiedResource.platform})` : ''}`
      : cls.reading,
    socraticQuestions,
    reflectionPrompt: item.socraticQuestion || cls.reflectionPrompt,
    homeworkTask: cls.homeworkTask,
    guideTitle: `Guía Didáctica — ${item.theme}`,
    resources: [...microResource(cls, item), ...(cls.resources || [])].slice(0, 3),
  };
};

/** Clase mínima cuando la materia aún no tiene una DailyClass base (p. ej. perfiles nuevos). */
export const buildSyntheticMicroClass = (
  subject: Subject,
  theme: MicroTheme | null,
  dayOfWeek: string,
  dateKey: string,
): DailyClass => ({
  id: `micro-${subject.id}-${dayOfWeek}`,
  subjectId: subject.id,
  studentId: subject.studentId,
  date: dateKey,
  dayOfWeek,
  scheduleTime: subject.scheduleTime,
  unit: theme?.unitTitle || `Unidad curricular — ${subject.name}`,
  theme: theme?.item.theme || subject.name,
  objective: theme?.item.objective || `Explorar "${theme?.item.theme || subject.name}" con tu profesor IA.`,
  introduction: theme?.item.dynamicActivity || `Sesión de ${subject.name} guiada por el método socrático.`,
  reading: theme?.item.verifiedResource?.title || subject.curriculumOverview || subject.name,
  socraticQuestions: theme?.item.socraticQuestion
    ? [theme.item.socraticQuestion]
    : [`¿Qué idea central de ${subject.name} te resulta más relevante y por qué?`],
  resources: [],
  activities: [],
  homeworkTask: `Documenta en tu libreta la exploración de "${theme?.item.theme || subject.name}".`,
  reflectionPrompt: theme?.item.socraticQuestion || `¿Cómo aplicas lo aprendido en ${subject.name} a tu vida diaria?`,
});
