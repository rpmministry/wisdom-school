import { Student } from '../types';

// Temas visuales de "aula" reutilizados por el chat del profesor y la ruta de micro-lecciones.
// Avril/karen = Peanuts (Snoopy), Gael/mauricio = Super Mario; cualquier otro estudiante conserva su colorTheme.
export interface ThemeColors {
  accent: string;
  chip: string;
  textStrong: string;
  label: 'Peanuts' | 'Super Mario Bros' | 'Original';
}

export const getWorldTheme = (student: Student): ThemeColors => {
  const base: any = student?.colorTheme || {
    primary: 'indigo',
    secondary: 'violet',
    accent: '#6366f1',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  };
  if (student?.id === 'avril' || student?.id === 'karen') {
    return { ...base, accent: '#7c9cff', chip: '#fff8d6', textStrong: '#1f2937', label: 'Peanuts' };
  }
  if (student?.id === 'gael' || student?.id === 'mauricio') {
    return { ...base, accent: '#e11d48', chip: '#fef3c7', textStrong: '#111827', label: 'Super Mario Bros' };
  }
  return { ...base, accent: base?.accent || '#6366f1', chip: '#1f2937', textStrong: '#f8fafc', label: 'Original' };
};

export interface WorldDecor {
  emoji: string;
  title: (name: string) => string;
  accentLabel: string;
  celebrationWord: string; // guiño temático en la pantalla de éxito
}

export const getWorldDecor = (student: Student): WorldDecor => {
  const theme = getWorldTheme(student);
  if (theme.label === 'Peanuts') {
    return { emoji: '🐶', title: (n) => `El club de lectura de ${n}`, accentLabel: 'Snoopy y Woodstock aprueban tu esfuerzo', celebrationWord: '¡Snoopy está orgulloso de ti!' };
  }
  if (theme.label === 'Super Mario Bros') {
    return { emoji: '🍄', title: (n) => `El reino del saber de ${n}`, accentLabel: '¡Power-up de conocimiento conseguido!', celebrationWord: '¡Mario te lanza una moneda de oro!' };
  }
  return { emoji: '🎓', title: (n) => `El rincón de estudio de ${n}`, accentLabel: 'tu profesor te acompaña', celebrationWord: '¡Gran logro!' };
};
