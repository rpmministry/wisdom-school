import { Student, Subject, DailyClass, StudentSubmission, ScheduleEntry, ScheduleSlot } from '../types';
import { ALL_DAILY_CLASSES } from './dailyClassesData';
import { GAEL_ECA_MACRO, GAEL_ECA_UNITS, GAEL_SCI_MACRO, GAEL_SCI_UNITS } from './gaelCurriculumData';
import { GAEL_PE_MACRO, GAEL_PE_UNITS, GAEL_SOC_MACRO, GAEL_SOC_UNITS } from './gaelCurriculumDataPart2';
import { GAEL_ENG_MACRO, GAEL_ENG_UNITS, GAEL_LANG_MACRO, GAEL_LANG_UNITS } from './gaelCurriculumDataPart3';
import { GAEL_MATH_MACRO, GAEL_MATH_UNITS, GAEL_REL_MACRO, GAEL_REL_UNITS, GAEL_SOFT_MACRO, GAEL_SOFT_UNITS } from './gaelCurriculumDataPart4';
import { AVRIL_ADM_MACRO, AVRIL_ADM_UNITS, AVRIL_SCI_MACRO, AVRIL_SCI_UNITS, AVRIL_POL_MACRO, AVRIL_POL_UNITS } from './avrilCurriculumDataPart1';
import { AVRIL_ECA_MACRO, AVRIL_ECA_UNITS, AVRIL_PE_MACRO, AVRIL_PE_UNITS, AVRIL_SOC_MACRO, AVRIL_SOC_UNITS } from './avrilCurriculumDataPart2';
import { AVRIL_ENG_MACRO, AVRIL_ENG_UNITS, AVRIL_LANG_MACRO, AVRIL_LANG_UNITS } from './avrilCurriculumDataPart3';
import { AVRIL_MATH_MACRO, AVRIL_MATH_UNITS, AVRIL_REL_MACRO, AVRIL_REL_UNITS, AVRIL_SOFT_MACRO, AVRIL_SOFT_UNITS } from './avrilCurriculumDataPart4';

// =====================================================================
// 🔥 DESTRUCTOR DE MEMORIA FANTASMA (Solo se ejecuta 1 vez hoy)
// =====================================================================
if (typeof window !== 'undefined') {
  const resetKey = 'inicio_de_clases_07_sept_2026';
  if (localStorage.getItem('app_reset_version') !== resetKey) {
    localStorage.clear();
    localStorage.setItem('app_reset_version', resetKey);
    console.warn('¡SISTEMA PURGADO! Progreso reiniciado a 0% para el inicio de clases.');
    window.location.reload();
  }
}

// 1. DATOS DE LOS ESTUDIANTES
export const STUDENTS_DATA: Student[] = [
  {
    id: 'avril',
    name: 'Avril',
    email: 'andradesanchezavril@gmail.com',
    pinCode: 'AVR-2026',
    password: 'avril',
    age: 12,
    grade: '8.° EGB Superior',
    gradeLong: '8.º Año de Educación General Básica Superior',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&crop=top&q=80',
    motto: 'Explorar, cuestionar y descubrir el orden detrás de las cosas.',
    interests: ['Astronomía', 'Álgebra', 'Literatura', 'Robótica'],
    colorTheme: { primary: 'indigo', secondary: 'violet', accent: '#6366f1', gradient: 'from-indigo-600 via-purple-600 to-pink-600', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    academicPlan: {
      schoolYear: 'Año Lectivo 2026 - 2027',
      ministryStandard: 'Diseñado para el cumplimiento curricular del Ministerio de Educación de Ecuador',
      educationLevel: '8.º Año de Educación General Básica Superior',
      workingDays: 200, totalTrimesters: 3, totalSubjects: 11,
      evaluationModel: 'Proyectos Interdisciplinarios (Sin exámenes memorísticos)',
      gradingSystem: '7.00 / 10 (Nota Mínima)',
      supletoriosPeriod: 'Del 28 de junio al 02 de julio de 2027 (si aplica)',
      trimesters: [
        { trimesterNumber: 1, title: '1.º TRIMESTRE: Diagnóstico y Emprendimiento', startDate: 'Lunes 07 de Septiembre 2026', endDate: '24 de Noviembre 2026', valuationDate: 'Desde el 25 Nov 2026', description: 'Inicio lectivo oficial el Lunes 7 de Septiembre de 2026.', notes: '1.ª Valoración formativa integral.', isCurrent: true },
        { trimesterNumber: 2, title: '2.º TRIMESTRE: Continuación e Invierno', startDate: '26 de Noviembre 2026', endDate: '08 de Marzo 2027', valuationDate: 'Desde el 09 Mar 2027', description: 'Profundización conceptual.', notes: 'Incluye Vacaciones de Navidad/Fin de Año. 2.ª Valoración.' },
        { trimesterNumber: 3, title: '3.º TRIMESTRE: Cierre de Año Lectivo', startDate: '10 de Marzo 2027', endDate: '09 de Junio 2027', valuationDate: 'Desde el 10 Jun 2027', description: 'Feria interdisciplinaria y evaluaciones de cierre.', notes: '3.ª Valoración de cierre lectivo.' },
      ],
      projects: [
        { id: 'proj-avril-1', trimesterNumber: 1, title: 'Emprendimiento con Propósito', subjectsInvolved: ['Admin. y Marketing', 'Matemáticas', 'Software y Prog.', 'Relación con Dios'], description: 'Diseño de un modelo de negocio con impacto social.', deliverables: ['Modelo Canvas', 'Presupuesto', 'Prototipo web', 'Código de ética'], evaluationCriteria: 'Rigor lógico y viabilidad.', status: 'active' },
        { id: 'proj-avril-2', trimesterNumber: 2, title: 'El Mundo en Perspectiva', subjectsInvolved: ['Ciencias Políticas', 'Estudios Sociales', 'Lengua y Lit.', 'Inglés'], description: 'Simulación de una cumbre de la ONU.', deliverables: ['Ensayo argumentativo', 'Position Paper oficial en inglés', 'Participación ONU'], evaluationCriteria: 'Pensamiento crítico.', status: 'upcoming' }
      ],
    },
  },
  {
    id: 'gael',
    name: 'Gael',
    email: 'gaelandradesanchez@gmail.com',
    pinCode: 'GAE-2026',
    password: 'gael',
    age: 8,
    grade: '4.° EGB Elemental',
    gradeLong: '4.º Año de Educación General Básica Elemental',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&auto=format&fit=crop&q=80',
    motto: '¡Aprender jugando, inventando y explorando el mundo!',
    interests: ['Dinosaurios', 'Experimentos', 'Lego y Mecánica', 'Mapas'],
    colorTheme: { primary: 'amber', secondary: 'emerald', accent: '#f59e0b', gradient: 'from-amber-500 via-emerald-500 to-teal-500', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    academicPlan: {
      schoolYear: 'Año Lectivo 2026 - 2027',
      ministryStandard: 'Diseñado para el cumplimiento curricular del Ministerio de Educación de Ecuador',
      educationLevel: '4.º Año de Educación General Básica Elemental',
      workingDays: 200, totalTrimesters: 3, totalSubjects: 9,
      evaluationModel: 'Exploración y Proyectos (Sin exámenes de memorización)',
      gradingSystem: 'Evaluación Cualitativa / Portafolio',
      supletoriosPeriod: 'Clases regulares culminan a mediados de junio.',
      trimesters: [
        { trimesterNumber: 1, title: '1.º TRIMESTRE: Adaptación y Cuentos Digitales', startDate: 'Lunes 07 de Septiembre 2026', endDate: '24 de Noviembre 2026', valuationDate: 'Desde el 25 Nov 2026', description: 'Inicio escolar oficial el Lunes 7 de Septiembre de 2026.', notes: '1.ª Valoración cualitativa y formativa.', isCurrent: true },
        { trimesterNumber: 2, title: '2.º TRIMESTRE: Avance Interdisciplinario', startDate: '26 de Noviembre 2026', endDate: '08 de Marzo 2027', valuationDate: 'Desde el 09 Mar 2027', description: 'Construcción comunitaria.', notes: 'Incluye Vacaciones de Navidad/Fin de Año. 2.ª Valoración.' },
        { trimesterNumber: 3, title: '3.º TRIMESTRE: Cierre y Exposición', startDate: '10 de Marzo 2027', endDate: '09 de Junio 2027', valuationDate: 'Desde el 10 Jun 2027', description: 'Presentación final de aprendizajes.', notes: '3.ª Valoración de portafolio y proyectos.' },
      ],
      projects: [
        { id: 'proj-gael-1', trimesterNumber: 1, title: 'Mi Entorno Natural y Digital', subjectsInvolved: ['Ciencias Naturales', 'Software y Prog.', 'Lengua y Lit.'], description: 'Cuento interactivo sobre ecosistemas.', deliverables: ['Cuento ilustrado', 'Animación en Scratch'], evaluationCriteria: 'Curiosidad investigativa.', status: 'active' },
        { id: 'proj-gael-2', trimesterNumber: 2, title: 'Constructores de Historia', subjectsInvolved: ['Estudios Sociales', 'Matemáticas', 'Arte (ECA)', 'Relación con Dios'], description: 'Diseño de ciudad ideal.', deliverables: ['Maqueta de ciudad', 'Plano geométrico'], evaluationCriteria: 'Uso de formas geométricas.', status: 'upcoming' }
      ],
    },
  },
  {
    id: 'karen',
    name: 'Karen',
    email: 'karen.demo@wisdom.edu',
    pinCode: 'KAR-2026',
    password: 'karen',
    age: 12,
    grade: '8.° EGB Superior',
    gradeLong: '8.º Año de Educación General Básica Superior',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&crop=top&q=80',
    motto: 'Explorar, cuestionar y descubrir el orden.',
    interests: ['Astronomía', 'Álgebra'],
    colorTheme: { primary: 'indigo', secondary: 'violet', accent: '#6366f1', gradient: 'from-indigo-600 via-purple-600 to-pink-600', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    academicPlan: { schoolYear: 'Año Lectivo 2026 - 2027', ministryStandard: 'Ecuador', educationLevel: '8.º EGB', workingDays: 200, totalTrimesters: 3, totalSubjects: 11, evaluationModel: 'Proyectos', gradingSystem: '7.00 / 10', supletoriosPeriod: 'Junio 2027', trimesters: [], projects: [] },
    isDemo: true,
  },
  {
    id: 'mauricio',
    name: 'Mauricio',
    email: 'mauricio.demo@wisdom.edu',
    pinCode: 'MAU-2026',
    password: 'mauricio',
    age: 8,
    grade: '4.° EGB Elemental',
    gradeLong: '4.º Año de Educación General Básica Elemental',
    avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&auto=format&fit=crop&q=80',
    motto: '¡Descubrir el mundo!',
    interests: ['Animales', 'Juegos'],
    colorTheme: { primary: 'pink', secondary: 'rose', accent: '#ec4899', gradient: 'from-pink-500 via-rose-500 to-amber-500', badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    academicPlan: { schoolYear: 'Año Lectivo 2026 - 2027', ministryStandard: 'Ecuador', educationLevel: '4.º EGB', workingDays: 200, totalTrimesters: 3, totalSubjects: 9, evaluationModel: 'Proyectos', gradingSystem: 'Portafolio', supletoriosPeriod: 'Junio 2027', trimesters: [], projects: [] },
    isDemo: true,
  }
];

// FILTRO INTERNO DE CLASES A 0% (Se aplica dinámicamente)
const resetSubjectProgress = (subject: Subject): Subject => ({
  ...subject,
  progressPercentage: 0,
  classesCompleted: 0,
  units: subject.units?.map((unit: any, index: number) => ({
    ...unit,
    progressPercentage: 0,
    status: index === 0 ? 'active' : 'upcoming',
    topics: unit.topics?.map((topic: any) => ({
      ...topic,
      isCompleted: false,
      status: 'pending'
    })) || []
  })) || []
});

// 2. MATERIAS (Quemadas en 0% desde su concepción)
const RAW_AVRIL_SUBJECTS: Subject[] = [
  { id: 'mat-avril', studentId: 'avril', name: 'Matemáticas', code: 'MAT-801', iconName: 'Calculator', color: 'indigo', description: 'Álgebra inicial y resolución de problemas cotidianos sin memorizar fórmulas.', scheduleTime: '08:00 - 09:30 (Lunes/Miércoles/Viernes)', daysOfWeek: ['Lunes', 'Miércoles', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Modelado algebraico.', teacher: { id: 'prof-sophia', name: 'Dra. Sophia Euler', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', title: 'Doctora en Matemáticas', specialty: 'Álgebra', personality: 'Socrática.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Plantea preguntas.', welcomeMessage: '¡Hola Avril!' }, macroCurriculum: AVRIL_MATH_MACRO, units: AVRIL_MATH_UNITS },
  { id: 'len-avril', studentId: 'avril', name: 'Lengua y Literatura', code: 'LEN-801', iconName: 'BookOpen', color: 'rose', description: 'Comprensión lectora analítica y ensayo argumentativo.', scheduleTime: '08:00 - 09:30 (Lunes/Miércoles/Jueves)', daysOfWeek: ['Lunes', 'Miércoles', 'Jueves'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Desarrollo de voz crítica.', teacher: { id: 'prof-neruda', name: 'Prof. Gabriel Neruda', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', title: 'Magíster en Literatura', specialty: 'Argumentación', personality: 'Elocuente.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Desafía al estudiante.', welcomeMessage: '¡Bienvenida Avril!' }, macroCurriculum: AVRIL_LANG_MACRO, units: AVRIL_LANG_UNITS },
  { id: 'sci-avril', studentId: 'avril', name: 'Ciencias Naturales', code: 'CNI-801', iconName: 'Dna', color: 'emerald', description: 'Estructura celular, biomoléculas y método científico.', scheduleTime: '08:00 - 09:30 (Jueves)', daysOfWeek: ['Lunes', 'Jueves'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Estudio de la vida.', teacher: { id: 'prof-darwin', name: 'Dr. Leonardo Darwin', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', title: 'Doctor en Biología', specialty: 'Biología Celular', personality: 'Curioso.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Guía el razonamiento.', welcomeMessage: '¡Saludos Avril!' }, macroCurriculum: AVRIL_SCI_MACRO, units: AVRIL_SCI_UNITS },
  { id: 'soc-avril', studentId: 'avril', name: 'Estudios Sociales', code: 'SOC-801', iconName: 'Landmark', color: 'amber', description: 'Historia del Ecuador y América Latina.', scheduleTime: '10:00 - 10:45 (Martes)', daysOfWeek: ['Martes', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Comprensión de los procesos históricos.', teacher: { id: 'prof-valentina', name: 'Dra. Valentina Chronos', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80', title: 'Doctora en Historia', specialty: 'Historia Universal', personality: 'Narradora apasionada.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Fomenta el análisis.', welcomeMessage: '¡Hola Avril!' }, macroCurriculum: AVRIL_SOC_MACRO, units: AVRIL_SOC_UNITS },
  { id: 'ing-avril', studentId: 'avril', name: 'Inglés', code: 'ING-801', iconName: 'Globe', color: 'blue', description: 'Desarrollo de fluidez comunicativa y debates en inglés.', scheduleTime: '08:00 - 09:30 (Martes)', daysOfWeek: ['Martes', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Comprensión auditiva (B1).', teacher: { id: 'prof-sarah', name: 'Prof. Sarah Mitchell', avatar: 'https://images.unsplash.com/photo-1580894732415-373300300d8d?w=150&auto=format&fit=crop&q=80', title: 'B.A. in English', specialty: 'Debate', personality: 'Dinámica.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Combina método socrático.', welcomeMessage: '¡Hola Avril!' }, macroCurriculum: AVRIL_ENG_MACRO, units: AVRIL_ENG_UNITS },
  { id: 'soft-avril', studentId: 'avril', name: 'Software y Prog.', code: 'SOFT-801', iconName: 'Cpu', color: 'purple', description: 'Pensamiento computacional, hardware y Scratch.', scheduleTime: '10:00 - 10:45 (Miércoles)', daysOfWeek: ['Miércoles', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Creación de software funcional.', teacher: { id: 'prof-turing', name: 'Ing. Alan Turing', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', title: 'Ingeniero de Software', specialty: 'Algoritmos', personality: 'Pragmático.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Descompone problemas.', welcomeMessage: '¡Hola Avril!' }, macroCurriculum: AVRIL_SOFT_MACRO, units: AVRIL_SOFT_UNITS },
  { id: 'pol-avril', studentId: 'avril', name: 'Ciencias Políticas', code: 'POL-801', iconName: 'Scale', color: 'teal', description: 'Sistemas de gobierno y participación ciudadana.', scheduleTime: '10:00 - 10:45 (Jueves/Viernes)', daysOfWeek: ['Jueves', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Toma de decisiones colectivas.', teacher: { id: 'prof-rodrigo', name: 'Lic. Rodrigo Mendoza', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', title: 'Licenciado en Políticas', specialty: 'Diplomacia', personality: 'Diplomático.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Plantea dilemas.', welcomeMessage: '¡Bienvenida Avril!' }, macroCurriculum: AVRIL_POL_MACRO, units: AVRIL_POL_UNITS },
  { id: 'adm-avril', studentId: 'avril', name: 'Admin. y Marketing', code: 'ADM-801', iconName: 'TrendingUp', color: 'emerald', description: 'Modelos de negocio y finanzas de proyectos.', scheduleTime: '10:45 - 11:30 (Martes)', daysOfWeek: ['Martes', 'Jueves'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Formulación y gestión.', teacher: { id: 'prof-carla', name: 'MBA Carla Fonseca', avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80', title: 'Master en Administración', specialty: 'Emprendimiento', personality: 'Estratégica.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Aplica casos reales.', welcomeMessage: '¡Hola Avril!' }, macroCurriculum: AVRIL_ADM_MACRO, units: AVRIL_ADM_UNITS },
  { id: 'rel-avril', studentId: 'avril', name: 'Relación con Dios', code: 'REL-801', iconName: 'HeartHandshake', color: 'sky', description: 'Principios de fe, valores universales y servicio.', scheduleTime: '11:30 - 12:00 (Lunes)', daysOfWeek: ['Lunes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Cultivo del carácter.', teacher: { id: 'prof-david', name: 'Pastor David', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', title: 'Teólogo', specialty: 'Ética de Valores', personality: 'Cálido.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Reflexiona mediante historias.', welcomeMessage: '¡Paz y bien Avril!' }, macroCurriculum: AVRIL_REL_MACRO, units: AVRIL_REL_UNITS },
  { id: 'art-avril', studentId: 'avril', name: 'Arte (ECA)', code: 'ART-801', iconName: 'Palette', color: 'fuchsia', description: 'Educación Cultural y Artística y composición visual.', scheduleTime: '11:30 - 12:00 (Martes)', daysOfWeek: ['Martes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Expresión estética.', teacher: { id: 'prof-clara', name: 'Maestra Clara Monet', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', title: 'Licenciada en Arte', specialty: 'Composición', personality: 'Creativa.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Guía la experimentación.', welcomeMessage: '¡Hola Avril!' }, macroCurriculum: AVRIL_ECA_MACRO, units: AVRIL_ECA_UNITS },
  { id: 'efi-avril', studentId: 'avril', name: 'Educación Física', code: 'EFI-801', iconName: 'Activity', color: 'orange', description: 'Acondicionamiento físico y salud postural.', scheduleTime: '11:30 - 12:00 (Miércoles)', daysOfWeek: ['Miércoles'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Desarrollo armónico.', teacher: { id: 'prof-mateo', name: 'Entrenador Mateo', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', title: 'Especialista', specialty: 'Salud Postural', personality: 'Motivador.', educationalLevel: 'EGB Superior', pedagogicalStyle: 'Enseña la relación física.', welcomeMessage: '¡Vamos Avril!' }, macroCurriculum: AVRIL_PE_MACRO, units: AVRIL_PE_UNITS },
];

const RAW_GAEL_SUBJECTS: Subject[] = [
  { id: 'len-gael', studentId: 'gael', name: 'Lengua y Literatura', code: 'LEN-401', iconName: 'BookOpen', color: 'rose', description: 'Lectura comprensiva y creación de cuentos.', scheduleTime: '08:00 - 09:30 (Lun/Mié/Jue)', daysOfWeek: ['Lunes', 'Miércoles', 'Jueves'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Afianzamiento de la lectoescritura.', teacher: { id: 'prof-lucia', name: 'Maestra Lucía', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', title: 'Especialista Infantil', specialty: 'Storytelling', personality: 'Alegre.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Cero memorización.', welcomeMessage: '¡Hola Gael!' }, macroCurriculum: GAEL_LANG_MACRO, units: GAEL_LANG_UNITS },
  { id: 'mat-gael', studentId: 'gael', name: 'Matemáticas', code: 'MAT-401', iconName: 'Sparkles', color: 'amber', description: 'Multiplicación, áreas y cuerpos 3D.', scheduleTime: '08:00 - 09:30 (Lun/Mié/Jue/Vie)', daysOfWeek: ['Lunes', 'Miércoles', 'Jueves', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 36, curriculumOverview: 'Secuencia CPA (Concreto-Pictórico-Abstracto).', teacher: { id: 'prof-lucas', name: 'Prof. Lucas', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80', title: 'Profesor Método Singapur', specialty: 'Aritmética', personality: 'Creativo.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Utiliza Lego.', welcomeMessage: '¡Súper Gael!' }, macroCurriculum: GAEL_MATH_MACRO, units: GAEL_MATH_UNITS },
  { id: 'sci-gael', studentId: 'gael', name: 'Ciencias Naturales', code: 'CNI-401', iconName: 'Compass', color: 'emerald', description: 'Ecosistemas y seres vivos.', scheduleTime: '08:00 - 09:30 (Lun/Mar/Jue)', daysOfWeek: ['Lunes', 'Martes', 'Jueves'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Indagación activa.', teacher: { id: 'prof-maya', name: 'Dra. Maya Selva', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&auto=format&fit=crop&q=80', title: 'Bióloga', specialty: 'Botánica', personality: 'Aventurera.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Experimentos vivos.', welcomeMessage: '¡Explorador Gael!' }, macroCurriculum: GAEL_SCI_MACRO, units: GAEL_SCI_UNITS },
  { id: 'soc-gael', studentId: 'gael', name: 'Estudios Sociales', code: 'SOC-401', iconName: 'Globe', color: 'cyan', description: 'Ciudad vs campo y servicios públicos.', scheduleTime: '10:00 - 10:45 (Mié/Vie)', daysOfWeek: ['Miércoles', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Construcción cívica.', teacher: { id: 'prof-diego', name: 'Cap. Diego Mapamundi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', title: 'Geógrafo', specialty: 'Cívica', personality: 'Narrador.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Mapas interactivos.', welcomeMessage: '¡Alcalde Gael!' }, macroCurriculum: GAEL_SOC_MACRO, units: GAEL_SOC_UNITS },
  { id: 'ing-gael', studentId: 'gael', name: 'Inglés', code: 'ING-401', iconName: 'Languages', color: 'blue', description: 'Aprendizaje lúdico de fonética.', scheduleTime: '10:00 - 10:45 (Mar/Jue/Vie)', daysOfWeek: ['Martes', 'Jueves', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 36, curriculumOverview: 'Iniciación divertida.', teacher: { id: 'prof-emma', name: 'Teacher Emma', avatar: 'https://images.unsplash.com/photo-1580894732415-373300300d8d?w=150&auto=format&fit=crop&q=80', title: 'English Specialist', specialty: 'Phonics', personality: 'Alegre.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Canciones y juegos.', welcomeMessage: '¡Campeón Gael!' }, macroCurriculum: GAEL_ENG_MACRO, units: GAEL_ENG_UNITS },
  { id: 'soft-gael', studentId: 'gael', name: 'Software y Programación', code: 'SOFT-401', iconName: 'Cpu', color: 'purple', description: 'Cuentos animados en Scratch.', scheduleTime: '10:45 - 11:30 (Jue/Vie)', daysOfWeek: ['Jueves', 'Viernes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Lógica Algorítmica.', teacher: { id: 'prof-codi', name: 'Robot Codi', avatar: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80', title: 'Mentor', specialty: 'Robótica', personality: 'Divertido.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Bloques de código.', welcomeMessage: '¡Bip-bop Gael!' }, macroCurriculum: GAEL_SOFT_MACRO, units: GAEL_SOFT_UNITS },
  { id: 'rel-gael', studentId: 'gael', name: 'Relación con Dios', code: 'REL-401', iconName: 'HeartHandshake', color: 'sky', description: 'Valores y empatía.', scheduleTime: '11:30 - 12:00 (Lunes)', daysOfWeek: ['Lunes'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Diálogo socrático.', teacher: { id: 'prof-david-semillitas', name: 'Prof. David', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', title: 'Educador', specialty: 'Ética', personality: 'Amoroso.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Cero dogmática.', welcomeMessage: '¡Hola Gael!' }, macroCurriculum: GAEL_REL_MACRO, units: GAEL_REL_UNITS },
  { id: 'art-gael', studentId: 'gael', name: 'Arte (ECA)', code: 'ART-401', iconName: 'Palette', color: 'fuchsia', description: 'Upcycling y colores.', scheduleTime: '11:30 - 12:00 (Jueves)', daysOfWeek: ['Jueves'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Arte socrático.', teacher: { id: 'prof-pincelita', name: 'Tía Pincelita', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', title: 'Tallerista', specialty: 'Modelado 3D', personality: 'Expresiva.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Cero plantillas.', welcomeMessage: '¡Hola artista!' }, macroCurriculum: GAEL_ECA_MACRO, units: GAEL_ECA_UNITS },
  { id: 'efi-gael', studentId: 'gael', name: 'Educación Física', code: 'EFI-401', iconName: 'Activity', color: 'orange', description: 'Psicomotricidad y circuitos.', scheduleTime: '11:30 - 12:00 (Miércoles)', daysOfWeek: ['Miércoles'], progressPercentage: 0, classesCompleted: 0, totalClasses: 35, curriculumOverview: 'Circuitos lúdicos.', teacher: { id: 'prof-alex', name: 'Profe Alex', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', title: 'Entrenador', specialty: 'Fisiología', personality: 'Dinámico.', educationalLevel: 'EGB Elemental', pedagogicalStyle: 'Cuerpo sano.', welcomeMessage: '¡A mover el cuerpo!' }, macroCurriculum: GAEL_PE_MACRO, units: GAEL_PE_UNITS },
];

export const AVRIL_SUBJECTS: Subject[] = RAW_AVRIL_SUBJECTS.map(resetSubjectProgress);
export const GAEL_SUBJECTS: Subject[] = RAW_GAEL_SUBJECTS.map(resetSubjectProgress);

export const SUBJECTS_DATA: Subject[] = [...AVRIL_SUBJECTS, ...GAEL_SUBJECTS];

export const AVRIL_SCHEDULE_SLOTS: ScheduleSlot[] = [
  { timeRange: '08:00 - 08:45', Lunes: 'Matemáticas', Martes: 'Inglés', Miércoles: 'Lengua y Lit.', Jueves: 'Ciencias Naturales', Viernes: 'Matemáticas' },
  { timeRange: '08:45 - 09:30', Lunes: 'Matemáticas', Martes: 'Inglés', Miércoles: 'Lengua y Lit.', Jueves: 'Ciencias Naturales', Viernes: 'Software y Prog.' },
  { timeRange: '09:30 - 10:00', isRecess: true, Lunes: 'RECREO', Martes: 'RECREO', Miércoles: 'RECREO', Jueves: 'RECREO', Viernes: 'RECREO' },
  { timeRange: '10:00 - 10:45', Lunes: 'Ciencias Naturales', Martes: 'Estudios Sociales', Miércoles: 'Software y Prog.', Jueves: 'Ciencias Políticas', Viernes: 'Ciencias Políticas' },
  { timeRange: '10:45 - 11:30', Lunes: 'Lengua y Lit.', Martes: 'Admin. y Mkt.', Miércoles: 'Matemáticas', Jueves: 'Lengua y Lit.', Viernes: 'Estudios Sociales' },
  { timeRange: '11:30 - 12:00', Lunes: 'Relación con Dios', Martes: 'Arte (ECA)', Miércoles: 'Educación Física', Jueves: 'Admin. y Mkt.', Viernes: 'Inglés' },
];

export const GAEL_SCHEDULE_SLOTS: ScheduleSlot[] = [
  { timeRange: '08:00 - 08:45', Lunes: 'Lengua y Lit.', Martes: 'Matemáticas', Miércoles: 'Lengua y Lit.', Jueves: 'Ciencias Naturales', Viernes: 'Matemáticas' },
  { timeRange: '08:45 - 09:30', Lunes: 'Lengua y Lit.', Martes: 'Matemáticas', Miércoles: 'Lengua y Lit.', Jueves: 'Ciencias Naturales', Viernes: 'Estudios Sociales' },
  { timeRange: '09:30 - 10:00', isRecess: true, Lunes: 'RECREO', Martes: 'RECREO', Miércoles: 'RECREO', Jueves: 'RECREO', Viernes: 'RECREO' },
  { timeRange: '10:00 - 10:45', Lunes: 'Matemáticas', Martes: 'Ciencias Naturales', Miércoles: 'Estudios Sociales', Jueves: 'Inglés', Viernes: 'Estudios Sociales' },
  { timeRange: '10:45 - 11:30', Lunes: 'Ciencias Naturales', Martes: 'Inglés', Miércoles: 'Matemáticas', Jueves: 'Software y Prog.', Viernes: 'Software y Prog.' },
  { timeRange: '11:30 - 12:00', Lunes: 'Relación con Dios', Martes: 'Arte (ECA)', Miércoles: 'Educación Física', Jueves: 'Lengua y Lit.', Viernes: 'Inglés' },
];

// Helper: Map slot subject names to subject IDs
const AVRIL_SUBJECT_MAP: Record<string, string> = {
  'Matemáticas': 'mat-avril',
  'Inglés': 'ing-avril',
  'Lengua y Lit.': 'len-avril',
  'Ciencias Naturales': 'sci-avril',
  'Estudios Sociales': 'soc-avril',
  'Admin. y Mkt.': 'adm-avril',
  'Software y Prog.': 'soft-avril',
  'Ciencias Políticas': 'pol-avril',
  'Arte (ECA)': 'art-avril',
  'Relación con Dios': 'rel-avril',
  'Educación Física': 'efi-avril',
  'RECREO': 'recess',
};

const GAEL_SUBJECT_MAP: Record<string, string> = {
  'Lengua y Lit.': 'len-gael',
  'Matemáticas': 'mat-gael',
  'Ciencias Naturales': 'sci-gael',
  'Estudios Sociales': 'soc-gael',
  'Inglés': 'ing-gael',
  'Software y Prog.': 'soft-gael',
  'Relación con Dios': 'rel-gael',
  'Arte (ECA)': 'art-gael',
  'Educación Física': 'efi-gael',
  'RECREO': 'recess',
};

const AVRIL_ICON_MAP: Record<string, string> = {
  'Matemáticas': 'Calculator',
  'Inglés': 'Globe',
  'Lengua y Lit.': 'BookOpen',
  'Ciencias Naturales': 'Dna',
  'Estudios Sociales': 'Landmark',
  'Admin. y Mkt.': 'TrendingUp',
  'Software y Prog.': 'Cpu',
  'Ciencias Políticas': 'Scale',
  'Arte (ECA)': 'Palette',
  'Relación con Dios': 'HeartHandshake',
  'Educación Física': 'Activity',
};

const GAEL_ICON_MAP: Record<string, string> = {
  'Lengua y Lit.': 'BookOpen',
  'Matemáticas': 'Sparkles',
  'Ciencias Naturales': 'Compass',
  'Estudios Sociales': 'Globe',
  'Inglés': 'Languages',
  'Software y Prog.': 'Cpu',
  'Relación con Dios': 'HeartHandshake',
  'Arte (ECA)': 'Palette',
  'Educación Física': 'Activity',
};

const AVRIL_COLOR_MAP: Record<string, string> = {
  'Matemáticas': 'indigo',
  'Inglés': 'blue',
  'Lengua y Lit.': 'rose',
  'Ciencias Naturales': 'emerald',
  'Estudios Sociales': 'amber',
  'Admin. y Mkt.': 'emerald',
  'Software y Prog.': 'purple',
  'Ciencias Políticas': 'teal',
  'Arte (ECA)': 'fuchsia',
  'Relación con Dios': 'sky',
  'Educación Física': 'orange',
};

const GAEL_COLOR_MAP: Record<string, string> = {
  'Lengua y Lit.': 'rose',
  'Matemáticas': 'amber',
  'Ciencias Naturales': 'emerald',
  'Estudios Sociales': 'cyan',
  'Inglés': 'blue',
  'Software y Prog.': 'purple',
  'Relación con Dios': 'sky',
  'Arte (ECA)': 'fuchsia',
  'Educación Física': 'orange',
};

const DAYS_ORDER: ('Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes')[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const dayIndexToNum = (day: string): number => {
  const map: Record<string, number> = { 'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5 };
  return map[day] || 1;
};

function generateScheduleEntries(): ScheduleEntry[] {
  const entries: ScheduleEntry[] = [];
  let entryId = 1;

  const generateForStudent = (
    studentId: 'avril' | 'gael',
    slots: ScheduleSlot[],
    subjectMap: Record<string, string>,
    iconMap: Record<string, string>,
    colorMap: Record<string, string>,
    classIdPrefix: string
  ) => {
    DAYS_ORDER.forEach((day) => {
      slots.forEach((slot) => {
        if (slot.isRecess) return;
        const subjectName = slot[day as keyof ScheduleSlot] as string;
        if (!subjectName || subjectName === 'RECREO') return;

        const subjectId = subjectMap[subjectName];
        if (!subjectId) return;

        const startTime = slot.timeRange.split(' - ')[0];
        const endTime = slot.timeRange.split(' - ')[1];

        const classId = `class-${classIdPrefix}-${subjectId.split('-')[0]}-${dayIndexToNum(day)}`;

        entries.push({
          id: `sch-${studentId}-${entryId++}`,
          studentId,
          subjectId,
          subjectName,
          dayOfWeek: day,
          startTime,
          endTime,
          color: colorMap[subjectName] || 'indigo',
          iconName: iconMap[subjectName] || 'BookOpen',
          classId,
        });
      });
    });
  };

  generateForStudent('avril', AVRIL_SCHEDULE_SLOTS, AVRIL_SUBJECT_MAP, AVRIL_ICON_MAP, AVRIL_COLOR_MAP, 'avril');
  generateForStudent('gael', GAEL_SCHEDULE_SLOTS, GAEL_SUBJECT_MAP, GAEL_ICON_MAP, GAEL_COLOR_MAP, 'gael');

  return entries;
}

export const SCHEDULE_DATA: ScheduleEntry[] = generateScheduleEntries();

// FILTRO PURIFICADOR 3: FORZAMOS TODAS LAS CLASES DEL DÍA A 0
export const DAILY_CLASSES_DATA: DailyClass[] = ALL_DAILY_CLASSES.map(cls => ({
  ...cls,
  isCompleted: false, 
  status: 'scheduled',
  activities: cls.activities.map(act => ({
    ...act,
    completed: false 
  }))
}));

// ELIMINAMOS TAREAS ANTIGUAS
export const INITIAL_SUBMISSIONS: StudentSubmission[] = [];