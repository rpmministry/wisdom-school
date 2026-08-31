import { Student, Subject, DailyClass, ScheduleEntry, NewStudentInput } from '../types';
import { AVRIL_SUBJECTS, GAEL_SUBJECTS } from '../data/mockData';

export function createNewStudentProfile(input: NewStudentInput): {
  student: Student;
  subjects: Subject[];
  classes: DailyClass[];
  schedules: ScheduleEntry[];
} {
  const cleanName = input.name.trim();
  const studentId = `student-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now().toString().slice(-4)}`;
  
  const email = input.email && input.email.trim() ? input.email.trim().toLowerCase() : `${cleanName.toLowerCase().replace(/\s+/g, '')}@wisdomschool.edu`;
  const pinCode = input.pinCode && input.pinCode.trim() ? input.pinCode.trim().toUpperCase() : `${cleanName.slice(0, 3).toUpperCase()}-2026`;
  const password = input.password && input.password.trim() ? input.password.trim() : `${cleanName.toLowerCase().replace(/\s+/g, '')}2026`;

  const isYounger = input.age <= 10;
  const gradeLabel = input.grade || (isYounger ? '4.º EGB Elemental' : '8.º EGB Superior');

  const defaultTheme = input.themeWorld === 'snoopy' || (!input.themeWorld && !isYounger)
    ? {
        primary: 'indigo',
        secondary: 'violet',
        accent: '#6366f1',
        gradient: 'from-indigo-600 via-purple-600 to-pink-600',
        badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      }
    : input.themeWorld === 'mario' || (!input.themeWorld && isYounger)
    ? {
        primary: 'amber',
        secondary: 'emerald',
        accent: '#f59e0b',
        gradient: 'from-amber-500 via-emerald-500 to-teal-500',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      }
    : {
        primary: 'emerald',
        secondary: 'teal',
        accent: '#10b981',
        gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      };

  const newStudent: Student = {
    id: studentId,
    name: cleanName,
    email,
    pinCode,
    password,
    age: input.age,
    grade: gradeLabel,
    gradeLong: input.gradeLong || `${gradeLabel} (Año Lectivo 2026-2027)`,
    avatar: input.avatar || (isYounger
      ? 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&crop=top&q=80'),
    motto: `Explorando el conocimiento con curiosidad y excelencia pedagógica.`,
    interests: input.interests && input.interests.length > 0 ? input.interests : ['Ciencias', 'Robótica', 'Lectura', 'Arte'],
    colorTheme: defaultTheme,
    academicPlan: {
      schoolYear: 'Año Lectivo 2026 - 2027',
      ministryStandard: 'Diseñado para el cumplimiento curricular del Ministerio de Educación de Ecuador y Estándares Internacionales',
      educationLevel: gradeLabel,
      workingDays: 200,
      totalTrimesters: 3,
      totalSubjects: 9,
      evaluationModel: 'Proyectos Interdisciplinarios y Portafolio Digital (Sin exámenes memorísticos)',
      gradingSystem: isYounger ? 'Evaluación Cualitativa / Portafolio' : '7.00 / 10 (Nota Mínima)',
      supletoriosPeriod: 'Del 28 de junio al 02 de julio de 2027 (si aplica)',
      trimesters: [
        {
          trimesterNumber: 1,
          title: '1.º TRIMESTRE: Adaptación e Investigación Inicial',
          startDate: 'Martes 01 de Septiembre 2026',
          endDate: '24 de Noviembre 2026',
          valuationDate: 'Desde el 25 Nov 2026',
          description: 'Inicio lectivo, diagnóstico adaptativo y desarrollo del primer proyecto transversal.',
          isCurrent: true,
        },
        {
          trimesterNumber: 2,
          title: '2.º TRIMESTRE: Profundización e Innovación',
          startDate: '26 de Noviembre 2026',
          endDate: '08 de Marzo 2027',
          valuationDate: 'Desde el 09 Mar 2027',
          description: 'Construcción interdisciplinaria, experimentos PhET y pensamiento crítico.',
        },
        {
          trimesterNumber: 3,
          title: '3.º TRIMESTRE: Cierre de Portafolio y Exposición',
          startDate: '10 de Marzo 2027',
          endDate: '09 de Junio 2027',
          valuationDate: 'Desde el 10 Jun 2027',
          description: 'Feria final de aprendizajes y presentación del portafolio del año.',
        },
      ],
      projects: [
        {
          id: `proj-${studentId}-1`,
          trimesterNumber: 1,
          title: `Proyecto Integrado: Indagación y Creatividad`,
          subjectsInvolved: ['Lengua y Lit.', 'Matemáticas', 'Software y Prog.', 'Ciencias Naturales'],
          description: 'Creación de un portafolio digital y modelo interactivo de resolución de problemas cotidianos.',
          deliverables: [
            'Portafolio digital con reflexiones socráticas',
            'Demostración de proyecto práctico interdisciplinario',
            'Presentación en la feria virtual',
          ],
          evaluationCriteria: 'Autonomía, rigor analítico, claridad comunicativa y valores de respeto.',
          status: 'active',
        },
      ],
    },
  };

  // Base subjects template according to age/grade
  const baseSubjects = isYounger ? GAEL_SUBJECTS : AVRIL_SUBJECTS;
  const newSubjects: Subject[] = baseSubjects.map((sub) => {
    const subId = `sub-${studentId}-${sub.code.toLowerCase()}`;
    return {
      ...sub,
      id: subId,
      studentId: studentId,
      progressPercentage: 5,
      classesCompleted: 1,
    };
  });

  // Sample initial daily classes for the new student across week days
  const days: ('Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes')[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const newClasses: DailyClass[] = newSubjects.flatMap((sub, index) => {
    const day = days[index % days.length];
    return [
      {
        id: `class-${sub.id}-01`,
        subjectId: sub.id,
        studentId: studentId,
        date: '2026-09-01',
        dayOfWeek: day,
        scheduleTime: '08:00 - 09:30 (90 min)',
        unit: 'Unidad 1: Fundamentos e Indagación',
        theme: `Introducción a ${sub.name}`,
        objective: `Comprender los conceptos esenciales de ${sub.name} mediante preguntas socráticas e investigación.`,
        introduction: `¡Bienvenido/a ${cleanName}! En esta lección inicial exploraremos la fascinante importancia de ${sub.name}.`,
        reading: `El estudio de ${sub.name} nos permite desarrollar un pensamiento estructurado, resolver problemas con evidencia y conectar ideas con la vida cotidiana.`,
        socraticQuestions: [
          `¿Por qué crees que es importante aprender sobre ${sub.name}?`,
          '¿Cómo relacionas este tema con algo que hayas observado en tu entorno?',
        ],
        resources: [
          {
            id: `res-${sub.id}-1`,
            type: 'interactive',
            title: `Guía Introductoria a ${sub.name}`,
            url: 'https://phet.colorado.edu/',
            description: 'Recurso educativo interactivo de exploración.',
            order: 1,
          },
        ],
        activities: [
          {
            id: `act-${sub.id}-1`,
            title: 'Reflexión Inicial y Pregunta Socrática',
            description: 'Responde la pregunta del Profesor Virtual en tu cuaderno o caja de texto.',
            type: 'reflection',
            points: 10,
            completed: false,
          },
        ],
        homeworkTask: 'Redactar un párrafo corto de conclusión sobre lo aprendido hoy.',
        reflectionPrompt: '¿Qué fue lo que más llamó tu atención durante la clase de hoy?',
        isCompleted: false,
      },
    ];
  });

  // Schedule Entries
  const newSchedules: ScheduleEntry[] = newSubjects.map((sub, index) => {
    const day = days[index % days.length];
    return {
      id: `sch-${sub.id}`,
      studentId: studentId,
      subjectId: sub.id,
      subjectName: sub.name,
      dayOfWeek: day,
      startTime: '08:00',
      endTime: '09:30',
      color: sub.color,
      iconName: sub.iconName,
      classId: `class-${sub.id}-01`,
    };
  });

  return {
    student: newStudent,
    subjects: newSubjects,
    classes: newClasses,
    schedules: newSchedules,
  };
}
