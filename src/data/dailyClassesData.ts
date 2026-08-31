import { DailyClass } from '../types';
import { AVRIL_DAILY_CLASSES } from './dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from './dailyClassesGael';

export const ALL_DAILY_CLASSES: DailyClass[] = [
  ...AVRIL_DAILY_CLASSES,
  ...GAEL_DAILY_CLASSES,
];

export { AVRIL_DAILY_CLASSES, GAEL_DAILY_CLASSES };
