import type { DayOfWeekName } from '../context/SchoolContext';

/**
 * Calendario escolar oficial 2026-2027.
 * El año lectivo inicia el lunes 7 de septiembre de 2026; la jornada es de lunes a viernes.
 * Este módulo es la única fuente de verdad para saber en qué día y semana escolar estamos.
 */
export const SCHOOL_DAYS: DayOfWeekName[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

/** Lunes 7 de septiembre de 2026 (hora local). */
export const SCHOOL_START_DATE = new Date(2026, 8, 7, 0, 0, 0, 0);

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export interface SchoolDayInfo {
  day: DayOfWeekName;
  date: Date;
  /** Etiqueta corta lista para la UI, p. ej. "14 Sep". */
  dateLabel: string;
  /** Etiqueta larga, p. ej. "14 Sep 2026". */
  dateLabelLong: string;
  isToday: boolean;
  /** true solo para el lunes 7 de septiembre de 2026 (primer día de clases). */
  isFirstSchoolDay: boolean;
}

export const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const addDays = (date: Date, days: number): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** Clave estable YYYY-MM-DD en hora local. */
export const toDayKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const parseDayKey = (key: string): Date => {
  const match = (key || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return startOfDay(new Date());
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
};

/** Normaliza fechas ISO o YYYY-MM-DD a la clave YYYY-MM-DD ('' si no es válida). */
export const normalizeDayKey = (value?: string): string => {
  const match = (value || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : '';
};

export const formatShortDate = (date: Date): string =>
  `${String(date.getDate()).padStart(2, '0')} ${MONTHS_ES[date.getMonth()]}`;

export const formatLongDate = (date: Date): string => `${formatShortDate(date)} ${date.getFullYear()}`;

export const isBeforeSchoolStart = (date: Date = new Date()): boolean =>
  startOfDay(date).getTime() < SCHOOL_START_DATE.getTime();

/**
 * Lunes de la semana escolar a la que pertenece `date`.
 * Los fines de semana se proyectan a la semana siguiente y nunca se devuelve una fecha anterior al inicio lectivo.
 */
export const getSchoolWeekStart = (date: Date = new Date()): Date => {
  const base = startOfDay(date);
  const jsDay = base.getDay(); // 0 = Domingo ... 6 = Sábado
  const offsetToMonday = jsDay === 0 ? 1 : jsDay === 6 ? 2 : 1 - jsDay;
  const monday = addDays(base, offsetToMonday);
  return monday.getTime() < SCHOOL_START_DATE.getTime() ? SCHOOL_START_DATE : monday;
};

/**
 * Día escolar de `date`: lunes a viernes según el calendario real.
 * Antes del inicio lectivo, y los fines de semana, se devuelve Lunes (el inicio de la semana escolar vigente o próxima).
 * A diferencia del cálculo anterior (días corridos % 5), este método NO se desalinea al pasar el fin de semana.
 */
export const getCurrentSchoolDay = (date: Date = new Date()): DayOfWeekName => {
  if (isBeforeSchoolStart(date)) return 'Lunes';
  const jsDay = startOfDay(date).getDay();
  if (jsDay === 0 || jsDay === 6) return 'Lunes';
  return SCHOOL_DAYS[jsDay - 1];
};

/** Semana escolar (lunes a viernes) correspondiente a `date`, con etiquetas listas para la UI. */
export const getSchoolWeek = (date: Date = new Date()): SchoolDayInfo[] => {
  const weekStart = getSchoolWeekStart(date);
  const today = startOfDay(date);
  return SCHOOL_DAYS.map((day, index) => {
    const dayDate = addDays(weekStart, index);
    return {
      day,
      date: dayDate,
      dateLabel: formatShortDate(dayDate),
      dateLabelLong: formatLongDate(dayDate),
      isToday: isSameDay(dayDate, today),
      isFirstSchoolDay: isSameDay(dayDate, SCHOOL_START_DATE),
    };
  });
};

/** Índice de la semana escolar (0 = primera semana, la del 7 de septiembre de 2026). */
export const getSchoolWeekIndex = (date: Date = new Date()): number => {
  const weekStart = getSchoolWeekStart(date);
  return Math.max(0, Math.round((weekStart.getTime() - SCHOOL_START_DATE.getTime()) / (7 * MS_PER_DAY)));
};
