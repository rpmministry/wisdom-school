import { DailyClass } from '../types';

export const AVRIL_DAILY_CLASSES: DailyClass[] = [
  // ==========================================
  // LUNES (4 CLASES OFICIALES - 07 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-mat-avril-01',
    subjectId: 'mat-avril',
    studentId: 'avril',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Indagación y Problema Retador', minutes: 15, description: 'Planteamiento de fracciones aplicadas a presupuestos y reparto proporcional.' },
      { phase: 'Fase 2: Video y Demostración Matemática', minutes: 25, description: 'Operaciones combinadas con números racionales respetando jerarquía operacional.' },
      { phase: 'Fase 3: Laboratorio PhET de Fracciones', minutes: 35, description: 'Manipulación interactiva de fracciones equivalentes y áreas proporcionales.' },
      { phase: 'Fase 4: Síntesis y Evaluación Formativa', minutes: 15, description: 'Resolución de reto en libreta y verificación con el docente.' },
    ],
    unit: 'Unidad 1: Números Racionales y Operaciones Combinadas',
    theme: 'Operaciones con Fracciones y Decimales en Contextos Reales',
    objective: 'Dominar la suma, resta, multiplicación y división de números racionales (fracciones y decimales positivos y negativos) aplicando la jerarquía de operaciones en la resolución de problemas cotidianos.',
    introduction: 'Los números racionales nos permiten medir con absoluta precisión cantidades continuas que no son enteras, como las proporciones de una receta, los márgenes de ganancia de un negocio o las medidas de un plano arquitectónico.',
    reading: `Jerarquía de Operaciones con Racionales:
1. Paréntesis, corchetes y llaves (desde el más interno hacia el exterior).
2. Potencias y raíces.
3. Multiplicaciones y divisiones (de izquierda a derecha).
4. Sumas y restas (de izquierda a derecha).

Regla de Signos:
- En multiplicación y división: signos iguales dan positivo (+), signos diferentes dan negativo (-).
- En suma y resta: si tienen el mismo signo se suman y se mantiene el signo; si tienen signos distintos se restan los valores absolutos y se conserva el signo del número de mayor valor absoluto.`,
    videoUrl: 'https://www.youtube.com/embed/LgMptyzudXU',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_all.html',
    socraticQuestions: [
      '¿Por qué es indispensable encontrar un denominador común antes de sumar fracciones?',
      '¿En qué situación de tu emprendimiento escolar necesitarías multiplicar una fracción por un decimal?',
      '¿Qué diferencia existe entre un número decimal periódico puro y uno mixto?',
    ],
    resources: [
      {
        id: 'res-mat-a1-1',
        type: 'video',
        title: 'Video Explicativo: Jerarquía de Operaciones con Fracciones (Español)',
        url: 'https://www.youtube.com/embed/LgMptyzudXU',
        description: 'Explicación paso a paso de operaciones combinadas con fracciones y signos.',
        duration: '14 min',
        order: 1,
      },
      {
        id: 'res-mat-a1-2',
        type: 'simulator',
        title: 'Emparejador de Fracciones y Proporciones (PhET)',
        url: 'https://phet.colorado.edu/sims/html/fraction-matcher/latest/fraction-matcher_all.html',
        description: 'Laboratorio visual para comparar representaciones gráficas y simbólicas.',
        duration: '15 min',
        order: 2,
      },
    ],
    activities: [
      {
        id: 'act-mat-a1-1',
        title: 'Resolución de 4 Operaciones Combinadas',
        description: 'Desarrolla en tu libreta los ejercicios con corchetes y fracciones aplicando jerarquía estricta.',
        type: 'practice',
        points: 50,
        completed: false,
      },
      {
        id: 'act-mat-a1-2',
        title: 'Problema Aplicado de Presupuesto',
        description: 'Calcula qué fracción del presupuesto total queda disponible tras restar 1/3 en materiales y 2/5 en empaque.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Numeros_Racionales_Jerarquia.pdf',
    homeworkTask: 'Resuelve los 3 problemas de aplicación del taller en tu libreta y adjunta la foto del procedimiento.',
    reflectionPrompt: '¿Cómo te ayuda la jerarquía de operaciones a ser más ordenado y metódico al resolver situaciones complejas?',
    isCompleted: false,
  },

  {
    id: 'class-sci-avril-02',
    subjectId: 'sci-avril',
    studentId: 'avril',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Activación y Pregunta Ecológica', minutes: 10, description: '¿Qué sucedería si desaparecieran todos los descomponedores del suelo?' },
      { phase: 'Fase 2: Video de Redes Tróficas en los Andes', minutes: 15, description: 'Flujo de energía y ciclo de materia en los pisos ecológicos andinos.' },
      { phase: 'Fase 3: Taller de Modelado Trófico', minutes: 15, description: 'Diseño de la pirámide ecológica del páramo andino.' },
      { phase: 'Fase 4: Cierre y Pregunta de Reflexión', minutes: 5, description: 'Conclusiones sobre el impacto de la actividad humana.' },
    ],
    unit: 'Unidad 1: Ecosistemas y Biodiversidad del Ecuador',
    theme: 'Niveles de Organización Ecológica y Redes Tróficas',
    objective: 'Identificar los niveles de organización ecológica (individuo, población, comunidad, ecosistema y biósfera) y analizar el flujo de energía a través de las redes tróficas.',
    introduction: 'Los ecosistemas funcionan como redes interconectadas donde cada organismo cumple un rol vital: productores fotosintéticos, consumidores herbívoros y carnívoros, y descomponedores que reciclan los nutrientes.',
    reading: `Estructura de una Red Trófica:
1. Productores Primarios: Plantas autótrofas que capturan energía solar (ej. frailejones y gramíneas del páramo).
2. Consumidores Primarios: Herbívoros que se alimentan de productores (ej. conejos silvestres, venados).
3. Consumidores Secundarios/Terciarios: Depredadores y carnívoros (ej. zorro andino, cóndor, puma).
4. Descomponedores: Hongos y bacterias que degradan la materia orgánica devolviendo minerales al suelo.`,
    videoUrl: 'https://www.youtube.com/embed/5F_P6251xXw',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_all.html',
    socraticQuestions: [
      '¿Por qué solo se transfiere aproximadamente el 10% de la energía de un nivel trófico al siguiente?',
      '¿Qué especie del ecosistema andino consideras clave y por qué?',
    ],
    resources: [
      {
        id: 'res-sci-a2-1',
        type: 'video',
        title: 'Video Explicativo: Ecosistemas, Cadenas y Redes Tróficas (Español)',
        url: 'https://www.youtube.com/embed/5F_P6251xXw',
        description: 'Explicación interactiva sobre los niveles ecológicos y el equilibrio bioenergético.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-sci-a2-1',
        title: 'Construcción de una Red Trófica Andina',
        description: 'Elabora en tu cuaderno una red trófica con al menos 8 especies de los Andes ecuatorianos indicando flechas de flujo de energía.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Redes_Troficas_Ecosistemas.pdf',
    homeworkTask: 'Investiga un caso en Ecuador donde la alteración de una red trófica haya afectado a la comunidad local.',
    reflectionPrompt: '¿Cómo se refleja el principio de interdependencia ecológica en nuestras relaciones humanas?',
    isCompleted: false,
  },

  {
    id: 'class-len-avril-02',
    subjectId: 'len-avril',
    studentId: 'avril',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Dilema Argumentativo', minutes: 10, description: 'Presentación de una afirmación polémica y análisis de posturas.' },
      { phase: 'Fase 2: Video de Técnicas de Argumentación', minutes: 15, description: 'Cómo formular argumentos de autoridad, de datos y de causa-efecto.' },
      { phase: 'Fase 3: Práctica de Redacción', minutes: 15, description: 'Construcción de párrafos argumentativos con conectores de contraste.' },
      { phase: 'Fase 4: Retroalimentación y Conclusiones', minutes: 5, description: 'Lectura de argumentos destacados.' },
    ],
    unit: 'Unidad 1: Textos de Divulgación Científica y Argumentación',
    theme: 'Estructura del Ensayo Argumentativo: Tesis y Argumentos',
    objective: 'Comprender los componentes esenciales de un ensayo argumentativo y formular argumentos lógicos sólidos utilizando conectores discursivos adecuados.',
    introduction: 'Saber argumentar no es simplemente opinar; es construir un puente lógico de razones fundamentadas que permitan a otros comprender y validar tu punto de vista con respeto y evidencia.',
    reading: `Tipos de Argumentos:
- Argumento de Datos/Hechos: Basado en estadísticas, mediciones y observaciones comprobables.
- Argumento de Autoridad: Respaldado en el juicio de especialistas o instituciones científicas reconocidas.
- Argumento de Causa-Efecto: Demuestra que un fenómeno es consecuencia directa de una acción previa.
- Argumento de Analogía: Compara dos situaciones similares para ilustrar una conclusión.`,
    videoUrl: 'https://www.youtube.com/embed/Q5bQ4k9aY9Y',
    socraticQuestions: [
      '¿Qué diferencia a un argumento convincente de una falacia emocional?',
      '¿Por qué es importante citar la fuente de tus datos en un debate formal?',
    ],
    resources: [
      {
        id: 'res-len-a2-1',
        type: 'video',
        title: 'Video: Cómo Escribir Argumentos Sólidos para un Ensayo (Español)',
        url: 'https://www.youtube.com/embed/Q5bQ4k9aY9Y',
        description: 'Técnicas para estructurar tesis, premisas y evidencias.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-len-a2-1',
        title: 'Redacción de Tesis y 2 Argumentos',
        description: 'Formula tu tesis sobre el consumo responsable y redacta un argumento de datos y uno de causa-efecto.',
        type: 'reflection',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Estructura_Ensayo_Argumentativo.pdf',
    homeworkTask: 'Redacta un borrador de 200 palabras de tu postura crítica para el proyecto del trimestre.',
    reflectionPrompt: '¿Qué valor tiene escuchar argumentos contrarios a los tuyos con apertura mental?',
    isCompleted: false,
  },

  {
    id: 'class-rel-avril-01',
    subjectId: 'rel-avril',
    studentId: 'avril',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Reflexión y Lectura Bíblica', minutes: 10, description: 'Lectura guiada sobre la mayordomía, los talentos y la integridad en la vida diaria.' },
      { phase: 'Fase 2: Análisis Ético y Conversatorio', minutes: 12, description: 'Discusión sobre cómo poner los talentos propios al servicio de la comunidad.' },
      { phase: 'Fase 3: Oración y Compromiso Semanal', minutes: 8, description: 'Redacción del propósito ético y momento de gratitud personal.' },
    ],
    unit: 'Unidad 1: Principios Morales y Liderazgo con Propósito',
    theme: 'El Valor de la Integridad y el Servicio al Prójimo',
    objective: 'Reflexionar sobre la ética personal y el desarrollo de un carácter íntegro orientado al servicio y la gratitud.',
    introduction: 'El verdadero liderazgo no se mide por la autoridad ejercida sobre otros, sino por la capacidad de servir con humildad, honestidad y amor desinteresado en cada acción cotidiana.',
    reading: `Principios Fundamentales del Liderazgo de Servicio:
1. Integridad: Coherencia absoluta entre lo que pensamos, decimos y hacemos, incluso cuando nadie nos observa.
2. Mayordomía: Administración responsable y generosa de los talentos, el tiempo y los recursos confiados.
3. Empatía y Escucha Activa: Ponerse en el lugar de los demás antes de emitir un juicio.
4. Gratitud Continua: Reconocer el valor de la vida, la familia y las oportunidades recibidas cada día.`,
    videoUrl: 'https://www.youtube.com/embed/8Zp9n5U6j10',
    socraticQuestions: [
      '¿Qué significa ser una persona íntegra cuando enfrentamos una decisión difícil en solitario?',
      '¿Cómo puedes utilizar tus habilidades en tecnología y matemáticas para bendecir a otros en tu comunidad?',
    ],
    resources: [
      {
        id: 'res-rel-a1',
        type: 'reading',
        title: 'Lectura Formativa: Parábola de los Talentos y Liderazgo de Servicio',
        url: 'https://bibleproject.com/es/',
        description: 'Guía de reflexión sobre la administración ética de los dones personales.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-rel-a1',
        title: 'Bitácora de Propósito y Gratitud',
        description: 'Escribe en tu diario escolar 3 compromisos concretos de servicio que pondrás en práctica esta semana.',
        type: 'reflection',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Etica_Liderazgo_Servicio.pdf',
    homeworkTask: 'Realiza un acto voluntario de ayuda en el hogar o comunidad y escribe un breve párrafo sobre lo aprendido.',
    reflectionPrompt: '¿De qué manera la integridad personal fortalece la confianza en todas tus relaciones humanas?',
    isCompleted: false,
  },

  // ==========================================
  // MARTES (4 CLASES OFICIALES - 01 DE SEPTIEMBRE 2026 - PRIMER DÍA DE CLASES)
  // ==========================================
  {
    id: 'class-ing-avril-02',
    subjectId: 'ing-avril',
    studentId: 'avril',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Calentamiento y Debate Guiado (15 min)', minutes: 15, description: 'Explicación en español del tema del día: cómo dar tu opinión sobre la tecnología en el aprendizaje usando conectores formales en inglés.' },
      { phase: 'Fase 2: Video Tutorial y Conectores Clave (25 min)', minutes: 25, description: 'Aprenderemos qué significan y cómo usar conectores como however (sin embargo), furthermore (además) y consequently (por lo tanto).' },
      { phase: 'Fase 3: Taller Práctico de Escritura y Pronunciación (35 min)', minutes: 35, description: 'Redacción guiada paso a paso de un párrafo de opinión de 100-150 palabras con plantilla y ejemplos bilingües.' },
      { phase: 'Fase 4: Cierre y Autoevaluación Formativa (15 min)', minutes: 15, description: 'Revisión con tu profesora IA sobre la pronunciación correcta y la coherencia de tus argumentos.' },
    ],
    unit: 'Unidad 1: Comunicación Global y Debate Académico (Unit 1)',
    theme: 'Expresión de Opiniones y Justificación de Puntos de Vista (Expressing Opinions - Nivel B1)',
    objective: 'Comprender y utilizar frases formales de opinión y conectores de transición en inglés para argumentar puntos de vista sobre temas de actualidad con total claridad.',
    introduction: '¡Bienvenida a tu clase de Inglés, Avril! En esta sesión aprenderás exactamente cómo expresar lo que piensas y defender tus ideas en inglés de manera educada y formal. Dominar estas frases te permitirá participar con seguridad en debates escolares y proyectos internacionales.',
    reading: `📘 Guía de Frases Clave para Opinar y Conectar Ideas (con traducción al español):

1. Para expresar tu punto de vista personal:
   • "From my perspective..." -> Desde mi perspectiva...
   • "I strongly believe that..." -> Creo firmemente que...
   • "In my opinion, technology enhances learning because..." -> En mi opinión, la tecnología mejora el aprendizaje porque...
   • "Evidence suggests that..." -> La evidencia sugiere que...

2. Para agregar argumentos o ideas de apoyo:
   • "Furthermore,..." -> Además / Es más...
   • "In addition to this,..." -> Sumado a esto...
   • "Moreover, students can access global information." -> Por otra parte, los estudiantes pueden acceder a información global.

3. Para contrastar o mostrar otra cara del tema:
   • "On the one hand... on the other hand..." -> Por un lado... por el otro...
   • "However, one must consider..." -> Sin embargo, se debe considerar...
   • "Despite these benefits, screen time should be balanced." -> A pesar de estos beneficios, el tiempo de pantalla debe equilibrarse.

4. Para concluir tu argumento:
   • "Taking everything into account,..." -> Tomando todo en cuenta...
   • "Ultimately, the key factor is..." -> En última instancia, el factor clave es...`,
    videoUrl: 'https://www.youtube.com/results?search_query=Oxford+Online+English+Expressing+Opinions+Debate',
    socraticQuestions: [
      '¿Por qué crees que usar conectores formales como "however" o "furthermore" hace que tu mensaje sea más convincente y claro?',
      '¿Cómo explicarías en tus propias palabras la diferencia entre dar una simple preferencia personal y justificar un argumento con datos?',
    ],
    resources: [
      {
        id: 'res-ing-a2-1',
        type: 'video',
        title: 'Video Didáctico: Cómo Expresar tu Opinión en Inglés Paso a Paso (Nivel B1)',
        url: 'https://www.youtube.com/results?search_query=Oxford+Online+English+How+to+express+your+opinion+in+English',
        description: 'Explicación detallada con ejemplos prácticos y subtítulos de apoyo para estructurar opiniones y debates.',
        duration: '12 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-ing-a2-1',
        title: 'Taller Guiado: Redacción de un Párrafo de Opinión con Conectores',
        description: '¿Qué vas a hacer paso a paso?\n1. Elige tu postura sobre la educación digital: ¿ayuda a aprender mejor?\n2. Escribe un párrafo de 5 a 6 oraciones en inglés en tu libreta o procesador de texto.\n3. Incluye obligatoriamente al menos 3 conectores aprendidos hoy (ejemplo: "In my opinion...", "Furthermore...", "However...").\n4. Escribe debajo la traducción al español para verificar que comprendiste cada frase.\n5. Sube tu foto o texto al taller para recibir la retroalimentación de tu tutora IA.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Ingles_Expresion_Opiniones_Debate.pdf',
    homeworkTask: 'Graba una nota de voz corta de 1 minuto en inglés presentando 2 ventajas de estudiar en línea usando "In my opinion" y "Furthermore". Ten a la mano tus notas en español para guiarte con confianza.',
    reflectionPrompt: '¿Cómo te ayuda aprender inglés a comunicarte y colaborar con personas y científicos de todo el mundo?',
    isCompleted: false,
  },

  {
    id: 'class-soc-avril-02',
    subjectId: 'soc-avril',
    studentId: 'avril',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Pregunta Geográfica', minutes: 10, description: '¿Por qué Ecuador es uno de los países más megadiversos del planeta por kilómetro cuadrado?' },
      { phase: 'Fase 2: Video de las 4 Regiones Naturales', minutes: 15, description: 'Costa, Sierra, Amazonía y Región Insular (Galápagos): clima, flora, fauna y economía.' },
      { phase: 'Fase 3: Cartografía y Análisis Comparativo', minutes: 15, description: 'Completar tabla de recursos productivos por región.' },
      { phase: 'Fase 4: Cierre y Pregunta de Debate', minutes: 5, description: 'El reto del desarrollo sustentable y la conservación.' },
    ],
    unit: 'Unidad 1: Geografía y Diversidad del Ecuador',
    theme: 'Las Cuatro Regiones Naturales y su Impacto Económico',
    objective: 'Analizar las características geográficas, climáticas y productivas de las cuatro regiones del Ecuador, comprendiendo la importancia de su conservación y aprovechamiento sustentable.',
    introduction: 'Ecuador alberga cuatro mundos en un solo territorio: la riqueza marina y agrícola de la Costa, la majestuosidad andina de la Sierra, el pulmón biológico de la Amazonía y el laboratorio evolutivo de Galápagos.',
    reading: `Perfil de las Cuatro Regiones del Ecuador:
1. Región Litoral o Costa: Llanuras fértiles, clima tropical cálido, puertos de exportación (banano, camarón, cacao).
2. Región Interandina o Sierra: Valles fértiles y montañas elevadas, agricultura de altura (papas, maíz, flores) y ganadería lechera.
3. Región Amazónica u Oriente: Selva tropical húmeda, reservas de biodiversidad incalculable, yacimientos de recursos y comunidades ancestrales.
4. Región Insular o Galápagos: Archipiélago volcánico único en el mundo, patrimonio natural de la humanidad y turismo ecológico regulado.`,
    videoUrl: 'https://www.youtube.com/embed/N4M4T8U6Y48',
    socraticQuestions: [
      '¿De qué manera la Cordillera de los Andes crea microclimas tan diversos en distancias cortas?',
      '¿Qué medidas concretas puede tomar un emprendedor para no perjudicar la biodiversidad de su entorno?',
    ],
    resources: [
      {
        id: 'res-soc-a2-1',
        type: 'video',
        title: 'Video Explicativo: Las 4 Regiones del Ecuador y su Geografía (Español)',
        url: 'https://www.youtube.com/embed/N4M4T8U6Y48',
        description: 'Documental didáctico sobre pisos climáticos y producción regional.',
        duration: '13 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soc-a2-1',
        title: 'Matriz Comparativa de las 4 Regiones',
        description: 'Completa en tu libreta la matriz con clima, productos principales y reto ambiental de cada región.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Geografia_Regiones_Ecuador.pdf',
    homeworkTask: 'Investiga una especie endémica de Galápagos o la Amazonía y describe en 1 página su hábitat y estado de conservación.',
    reflectionPrompt: '¿Qué responsabilidad ciudadana tenemos todos los ecuatorianos en la protección de nuestras reservas naturales?',
    isCompleted: false,
  },

  {
    id: 'class-adm-avril-02',
    subjectId: 'adm-avril',
    studentId: 'avril',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Dilema Financiero', minutes: 10, description: '¿Cómo saber cuánto cobrar por un producto o servicio para no tener pérdidas?' },
      { phase: 'Fase 2: Video de Costos y Punto de Equilibrio', minutes: 15, description: 'Costos fijos, costos variables, margen de contribución y precio de venta.' },
      { phase: 'Fase 3: Ejercicio Práctico de Cálculo', minutes: 15, description: 'Cálculo del punto de equilibrio para el proyecto del trimestre.' },
      { phase: 'Fase 4: Conclusiones y Validación', minutes: 5, description: 'Revisión de resultados con el docente de administración.' },
    ],
    unit: 'Unidad 1: Fundamentos de Emprendimiento y Finanzas',
    theme: 'Análisis de Costos Fijos, Variables y Punto de Equilibrio',
    objective: 'Diferenciar con claridad los costos fijos de los variables y calcular el punto de equilibrio en unidades y dinero para asegurar la viabilidad económica de un proyecto.',
    introduction: 'Cualquier emprendimiento exitoso requiere dominio numérico de sus finanzas: saber exactamente cuánto cuesta producir una unidad y cuántas ventas mínimas se requieren para cubrir todos los gastos operativos.',
    reading: `Fórmulas Clave de Finanzas para Emprendedores:
- Costos Fijos (CF): Gastos que no cambian con el volumen de ventas (ej. arriendo, sueldos fijos, licencias de software).
- Costos Variables (CV): Gastos que aumentan directamente con la cantidad producida (ej. materia prima, empaque).
- Precio de Venta (PV): Valor al que se ofrece el producto al cliente final.
- Margen de Contribución Unitario = PV - CV
- Punto de Equilibrio (PE) en unidades = Costos Fijos / (PV - CV)

El punto de equilibrio indica el nivel exacto de ventas donde Ingresos Totales = Costos Totales (ni ganas ni pierdes). A partir de la unidad siguiente, cada venta genera ganancia real.`,
    videoUrl: 'https://www.youtube.com/embed/Z1BCujX3pw8',
    socraticQuestions: [
      '¿Por qué reducir los costos fijos al inicio de un emprendimiento disminuye el riesgo de quiebra?',
      'Si el costo de la materia prima sube un 20%, ¿qué opciones tiene el emprendedor antes de subir el precio al cliente?',
    ],
    resources: [
      {
        id: 'res-adm-a2-1',
        type: 'video',
        title: 'Video: Cómo Calcular el Punto de Equilibrio Fácil y Rápido (Español)',
        url: 'https://www.youtube.com/embed/Z1BCujX3pw8',
        description: 'Guía práctica para entender costos fijos, variables y cálculo del punto muerto.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-adm-a2-1',
        title: 'Cálculo del Punto de Equilibrio de tu Producto',
        description: 'Calcula cuántas unidades debes vender de tu proyecto si tus CF son $80, tu CV es $3 y tu PV es $7.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Costos_Punto_Equilibrio.pdf',
    homeworkTask: 'Elabora la hoja de costos de tu producto del trimestre con desglose de costos directos e indirectos.',
    reflectionPrompt: '¿Cómo te ayuda la prudencia financiera a tomar mejores decisiones en tus proyectos personales?',
    isCompleted: false,
  },

  {
    id: 'class-art-avril-01',
    subjectId: 'art-avril',
    studentId: 'avril',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apreciación y Psicología del Color', minutes: 8, description: 'Cómo los colores transmiten emociones y comunican mensajes en el arte y diseño.' },
      { phase: 'Fase 2: Demostración de Técnicas Visuales', minutes: 12, description: 'Armonías cromáticas: complementarios, análogos y triadas.' },
      { phase: 'Fase 3: Bocetaje y Creación Visual', minutes: 10, description: 'Diseño del logotipo e identidad visual del proyecto escolar.' },
    ],
    unit: 'Unidad 1: Expresión Visual y Diseño Multimedia',
    theme: 'Composición Gráfica, Teoría del Color y Storytelling Visual',
    objective: 'Aplicar los principios de la teoría del color, el contraste y la jerarquía visual en la creación de piezas artísticas y comunicacionales.',
    introduction: 'El arte visual es un lenguaje universal que combina estética, emoción y técnica para transmitir historias poderosas que conectan con el espectador.',
    reading: `Principios de Composición y Teoría del Color:
- Colores Cálidos: Rojos, naranjas y amarillos (transmiten energía, urgencia, calidez y pasión).
- Colores Fríos: Azules, verdes y violetas (transmiten serenidad, confianza, naturaleza y profesionalismo).
- Contraste: Diferencia de luminosidad que permite que los elementos principales destaquen con nitidez.
- Regla de Tercios: División del lienzo en 9 cuadrículas para ubicar puntos de interés visual de forma armónica.`,
    videoUrl: 'https://www.youtube.com/embed/1v0E2T6ZfH0',
    socraticQuestions: [
      '¿Qué sensaciones te provoca una paleta monocromática frente a una de colores complementarios?',
      '¿Por qué las marcas de tecnología eligen predominantemente tonos azules y blancos?',
    ],
    resources: [
      {
        id: 'res-art-a1',
        type: 'video',
        title: 'Video: Teoría del Color y Composición Visual para Artistas (Español)',
        url: 'https://www.youtube.com/embed/1v0E2T6ZfH0',
        description: 'Aprende a combinar colores y componer ilustraciones impactantes.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-art-a1',
        title: 'Boceto de Identidad Gráfica y Paleta',
        description: 'Crea en tu libreta de arte el boceto del logotipo del proyecto seleccionando 3 colores con su justificación psicológica.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Teoria_Color_Composicion.pdf',
    homeworkTask: 'Finaliza el diseño a color de tu logotipo y describe la paleta elegida.',
    reflectionPrompt: '¿Cómo puede el arte servir como una herramienta para generar conciencia sobre problemas sociales y ambientales?',
    isCompleted: false,
  },

  // ==========================================
  // MIÉRCOLES (4 CLASES OFICIALES - 02 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-len-avril-01',
    subjectId: 'len-avril',
    studentId: 'avril',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Indagación Socrática Inicial', minutes: 15, description: 'Debate guiado sobre la diferencia entre una opinión subjetiva y un argumento fundamentado con evidencias.' },
      { phase: 'Fase 2: Video Explicativo y Estructura Textual', minutes: 25, description: 'Análisis en video sobre la anatomía de un ensayo: tesis, premisas, contrargumento y conclusión.' },
      { phase: 'Fase 3: Taller de Redacción y Esquematización', minutes: 35, description: 'Creación del mapa conceptual del ensayo propio y redacción del párrafo introductorio.' },
      { phase: 'Fase 4: Síntesis Crítica y Rúbrica', minutes: 15, description: 'Revisión por pares socrática con el tutor virtual Prof. Gabriel Neruda.' },
    ],
    unit: 'Unidad 1: El Ensayo Argumentativo y la Estructura de Tesis',
    theme: 'Identificación de Tesis y Opinión Fundamentada en Textos de Opinión',
    objective: 'Distinguir entre hechos comprobables, opiniones personales y argumentos fundamentados, formulando una postura crítica clara para el ensayo argumentativo.',
    introduction: 'En la era de la sobreinformación, la habilidad de discernir entre una simple opinión y un argumento sólidamente fundamentado es la herramienta más poderosa del pensamiento crítico.',
    reading: `Estructura del Ensayo Argumentativo:
1. La Tesis: Es la afirmación central, debatible y sustentable que el autor defiende a lo largo del texto.
2. Los Argumentos: Razones lógicas respaldadas por datos empíricos, citas de expertos o ejemplos verificables.
3. El Contraargumento: Anticipación a las objeciones que un lector escéptico podría formular, fortaleciendo la posición propia.
4. La Conclusión: Síntesis que reafirma la tesis con una reflexión final de impacto.`,
    videoUrl: 'https://www.youtube.com/embed/Q5bQ4k9aY9Y',
    simulatorUrl: 'https://app.bookcreator.com/',
    socraticQuestions: [
      '¿Cuál es la diferencia exacta entre decir "no me gusta este libro" y "el libro carece de consistencia argumentativa"?',
      '¿Por qué incluir un contraargumento hace que tu postura sea más fuerte en lugar de debilitarla?',
      '¿Qué criterios utilizas para confiar en una fuente de información digital?',
    ],
    resources: [
      {
        id: 'res-len-a1',
        type: 'video',
        title: 'Video Explicativo: La Estructura del Texto Argumentativo y la Tesis (Español)',
        url: 'https://www.youtube.com/embed/Q5bQ4k9aY9Y',
        description: 'Aprende a estructurar premisas lógicas y tesis defendibles.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-len-a1',
        title: 'Formulación de la Tesis del Proyecto Interdisciplinario',
        description: 'Redacta en un párrafo de máximo 5 líneas tu postura sobre el impacto de la tecnología en la sostenibilidad ambiental.',
        type: 'reflection',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Redaccion_Tesis_Argumentativa.pdf',
    homeworkTask: 'Elabora el esquema gráfico de tu ensayo con 3 argumentos principales y 1 contraargumento con refutación.',
    reflectionPrompt: '¿Cómo influye la claridad de tu tesis en la solidez de tu discurso oral?',
    isCompleted: false,
  },

  {
    id: 'class-soft-avril-02',
    subjectId: 'soft-avril',
    studentId: 'avril',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Reto de Automatización', minutes: 10, description: '¿Cómo podemos hacer que una computadora repita una tarea 1000 veces sin equivocarse?' },
      { phase: 'Fase 2: Video de Bucles y Estructuras Repetitivas', minutes: 15, description: 'Bucles "for", "while" y contadores en programación moderna.' },
      { phase: 'Fase 3: Ejercicio Práctico en Editor', minutes: 15, description: 'Creación de un algoritmo para calcular la suma de los primeros N números.' },
      { phase: 'Fase 4: Depuración y Pruebas', minutes: 5, description: 'Análisis de bucles infinitos y cómo evitarlos.' },
    ],
    unit: 'Unidad 1: Pensamiento Computacional y Lógica de Programación',
    theme: 'Estructuras de Control Condicionales y Bucles en Python/Scratch',
    objective: 'Implementar bucles e iteraciones para automatizar procesos repetitivos y manipular listas de datos de forma eficiente.',
    introduction: 'Los bucles son el corazón del poder computacional: permiten procesar miles de datos por segundo, realizar simulaciones complejas y crear animaciones fluidas con muy pocas líneas de código.',
    reading: `Conceptos Clave de Bucles:
- Bucle 'for': Se utiliza cuando conocemos de antemano la cantidad exacta de repeticiones (ej. recorrer los 10 productos de una lista).
- Bucle 'while': Se ejecuta continuamente mientras una condición específica siga siendo verdadera (ej. 'mientras el usuario no presione Salir').
- Variable Acumuladora: Guarda sumas progresivas (ej. total = total + precio).
- Condición de Parada: Regla que garantiza que el bucle termine y no se congele el programa en un ciclo infinito.`,
    videoUrl: 'https://www.youtube.com/embed/BCjL86fB1gI',
    simulatorUrl: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted',
    socraticQuestions: [
      '¿Qué ocurre en la memoria del computador si se produce un bucle infinito sin condición de parada?',
      '¿En qué situación de la vida diaria sigues un algoritmo con bucle?',
    ],
    resources: [
      {
        id: 'res-soft-a2-1',
        type: 'video',
        title: 'Video: Bucles y Repeticiones en Programación Explicados Fácil (Español)',
        url: 'https://www.youtube.com/embed/BCjL86fB1gI',
        description: 'Explicación gráfica del funcionamiento de ciclos y contadores.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soft-a2-1',
        title: 'Creación del Algoritmo con Bucle Acumulador',
        description: 'Escribe el pseudocódigo que sume las calificaciones de 5 materias y devuelva el promedio final.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Bucles_Algoritmos.pdf',
    homeworkTask: 'Programa en Scratch o Python un contador que imprima la tabla de multiplicar del 7.',
    reflectionPrompt: '¿Cómo te permite la programación transformar una tarea aburrida en un proceso automático?',
    isCompleted: false,
  },

  {
    id: 'class-mat-avril-02',
    subjectId: 'mat-avril',
    studentId: 'avril',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: De Palabras a Símbolos', minutes: 10, description: 'Traducción de enunciados cotidianos a lenguaje algebraico simbólico.' },
      { phase: 'Fase 2: Video de Expresiones Algebraicas', minutes: 15, description: 'Términos semejantes, coeficientes, grado y reducción algebraica.' },
      { phase: 'Fase 3: Práctica con Balanzas Algebraicas', minutes: 15, description: 'Reducción de términos en ejercicios de geometría y perímetro.' },
      { phase: 'Fase 4: Evaluación Formativa Rápida', minutes: 5, description: 'Comprobación de respuestas en libreta.' },
    ],
    unit: 'Unidad 1: Lenguaje Algebraico y Ecuaciones Lineales',
    theme: 'Traducción de Problemas Cotidianos a Expresiones Algebraicas',
    objective: 'Expresar en lenguaje algebraico enunciados expresados en lenguaje común y simplificar expresiones reduciendo términos semejantes.',
    introduction: 'El álgebra es la generalización de la aritmética: nos permite formular leyes universales y resolver infinitos problemas con una sola expresión matemática.',
    reading: `Diccionario Básico de Lenguaje Algebraico:
- "Un número cualquiera": x
- "El doble de un número": 2x
- "El triple aumentado en 5": 3x + 5
- "La mitad de un número disminuida en 4": (x/2) - 4
- "El cuadrado de la suma de dos números": (a + b)²
- "La suma de tres números consecutivos": x + (x + 1) + (x + 2) = 3x + 3`,
    videoUrl: 'https://www.youtube.com/embed/CDncvN-fUvM',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_all.html',
    socraticQuestions: [
      '¿Por qué solo podemos sumar o restar términos que tienen exactamente la misma parte literal?',
      '¿Cómo representarías algebraicamente el perímetro de un rectángulo cuya base mide el triple que su altura?',
    ],
    resources: [
      {
        id: 'res-mat-a2-1',
        type: 'video',
        title: 'Video: Lenguaje Algebraico y Términos Semejantes (Español)',
        url: 'https://www.youtube.com/embed/CDncvN-fUvM',
        description: 'Aprende a traducir enunciados a fórmulas algebraicas.',
        duration: '12 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-mat-a2-1',
        title: 'Traducción de 6 Enunciados Algebraicos',
        description: 'Escribe en tu cuaderno la expresión algebraica correspondiente para cada enunciado de la guía.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Lenguaje_Algebraico_Expresiones.pdf',
    homeworkTask: 'Resuelve los 4 problemas de perímetro algebraico de la guía y comprueba sustituyendo x = 5.',
    reflectionPrompt: '¿Cómo cambia tu forma de pensar cuando ves las situaciones a través de modelos algebraicos?',
    isCompleted: false,
  },

  {
    id: 'class-efi-avril-01',
    subjectId: 'efi-avril',
    studentId: 'avril',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Calentamiento Articular Dinámico', minutes: 8, description: 'Movilidad de hombros, columna, cadera y tobillos para prevenir lesiones.' },
      { phase: 'Fase 2: Circuito Funcional y Resistencia', minutes: 14, description: 'Sentadillas, planchas isométricas, saltos con cuerda y ejercicios de postura.' },
      { phase: 'Fase 3: Vuelta a la Calma y Estiramientos', minutes: 8, description: 'Respiración diafragmática, estiramiento de isquiotibiales y cuello.' },
    ],
    unit: 'Unidad 1: Condición Física, Postura y Hábitos Saludables',
    theme: 'Plan de Acondicionamiento Físico Personalizado y Ergonomía Digital',
    objective: 'Diseñar y ejecutar una rutina de ejercicio físico que fortalezca el sistema cardiovascular y la higiene postural durante las horas de estudio.',
    introduction: 'El ejercicio regular oxigena el cerebro, mejora la concentración académica, regula el sueño y previene dolores posturales derivados del uso de pantallas.',
    reading: `Pilares de la Salud Física Integral:
1. Resistencia Cardiovascular: Al menos 30 minutos de actividad aeróbica diaria (caminar, trotar, bailar, nadar).
2. Fuerza y Tono Postural: Ejercicios de core (abdomen y espalda baja) para sostener la columna erguida.
3. Flexibilidad: Estiramientos diarios de al menos 15-30 segundos por grupo muscular.
4. Ergonomía de Estudio: Pantalla a la altura de los ojos, pies apoyados en el suelo y pausas activas cada 45 minutos.`,
    videoUrl: 'https://www.youtube.com/embed/v9qWkZ7wN78',
    socraticQuestions: [
      '¿Qué adaptaciones fisiológicas ocurren en tu corazón y pulmones cuando practicas ejercicio regular?',
      '¿Cómo afecta una mala postura al sentarse a tu nivel de energía y concentración durante el día?',
    ],
    resources: [
      {
        id: 'res-efi-a1',
        type: 'video',
        title: 'Video: Rutina de Pausa Activa y Postura Saludable para Estudiantes (Español)',
        url: 'https://www.youtube.com/embed/v9qWkZ7wN78',
        description: 'Ejercicios guiados para realizar en casa sin equipamiento.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-efi-a1',
        title: 'Registro de Frecuencia Cardíaca y Circuito',
        description: 'Mide tu pulso en reposo, realiza el circuito de 10 minutos y vuelve a medir el pulso anotando la recuperación en tu bitácora.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Acondicionamiento_Ergonomia.pdf',
    homeworkTask: 'Cumple tu plan semanal de actividad física de 3 días y anota tus sensaciones.',
    reflectionPrompt: '¿Cómo influye el cuidado de tu cuerpo en tu bienestar mental y emocional?',
    isCompleted: false,
  },

  // ==========================================
  // JUEVES (4 CLASES OFICIALES - 03 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-sci-avril-01',
    subjectId: 'sci-avril',
    studentId: 'avril',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Pregunta Disparadora', minutes: 15, description: 'Analogía sistémica: ¿En qué se parece una célula viva a una ciudad autosustentable?' },
      { phase: 'Fase 2: Video en Español y Modelado Fisiológico', minutes: 25, description: 'Visualización 3D de la membrana, mitocondrias, retículo endoplasmático y núcleo.' },
      { phase: 'Fase 3: Laboratorio Celular Interactivo', minutes: 35, description: 'Exploración de la permeabilidad de la membrana y respiración celular en el simulador.' },
      { phase: 'Fase 4: Síntesis y Cuaderno Científico', minutes: 15, description: 'Elaboración del diagrama de flujo bioenergético en el diario de campo.' },
    ],
    unit: 'Unidad 1: Fisiología Celular y Biodiversidad',
    theme: 'Organelos Celulares y su Analogía con una Ciudad Autosustentable',
    objective: 'Comprender la función especializada de los organelos citoplasmáticos (mitocondrias, ribosomas, aparato de Golgi) a través del modelado de sistemas biológicos.',
    introduction: 'Cada una de los 37 billones de células de tu cuerpo es una metrópolis hiperorganizada donde millones de reacciones químicas ocurren por segundo sin descanso.',
    reading: `Organelos Principales y su Analogía Urbana:
- Núcleo: El Ayuntamiento o Palacio Municipal donde reside la información genética maestra (ADN).
- Mitocondrias: Las centrales eléctricas generadoras de energía utilizable en forma de ATP.
- Ribosomas: Las fábricas ensambladoras de proteínas esenciales para la estructura.
- Aparato de Golgi: La oficina postal que empaqueta y distribuye sustancias dentro y fuera de la célula.
- Membrana Celular: La muralla con aduanas inteligentes que regula qué entra y qué sale.`,
    videoUrl: 'https://www.youtube.com/embed/URUJD5NEXC8',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/membrane-channels/latest/membrane-channels_all.html',
    socraticQuestions: [
      '¿Qué ocurriría en la célula si las mitocondrias detuvieran la producción de ATP durante 5 minutos?',
      '¿Por qué la membrana celular es selectivamente permeable en lugar de ser completamente cerrada o abierta?',
    ],
    resources: [
      {
        id: 'res-sci-a1',
        type: 'video',
        title: 'Video Explicativo: La Célula y sus Organelos en Detalle (Español)',
        url: 'https://www.youtube.com/embed/URUJD5NEXC8',
        description: 'Explicación didáctica completa de las funciones celulares para secundaria.',
        duration: '14 min',
        order: 1,
      },
      {
        id: 'res-sci-a2',
        type: 'simulator',
        title: 'Canales de Membrana y Difusión (PhET)',
        url: 'https://phet.colorado.edu/sims/html/membrane-channels/latest/membrane-channels_all.html',
        description: 'Simulador de paso de moléculas e iones a través de la bicapa lipídica.',
        duration: '15 min',
        order: 2,
      },
    ],
    activities: [
      {
        id: 'act-sci-a1',
        title: 'Diagrama Comparativo de la Célula-Ciudad',
        description: 'Dibuja en tu libreta el mapa de una ciudad asignando a cada edificio el nombre de un organelo celular con su justificación bioenergética.',
        type: 'project',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Fisiologia_Celular_Organelos.pdf',
    homeworkTask: 'Investiga una enfermedad mitocondrial y explica brevemente en tu libreta cómo la falta de energía celular afecta los órganos principales.',
    reflectionPrompt: '¿Cómo se relaciona la eficiencia energética celular con la sustentabilidad de una ciudad moderna?',
    isCompleted: false,
  },

  {
    id: 'class-pol-avril-02',
    subjectId: 'pol-avril',
    studentId: 'avril',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Dilema de Separación de Poderes', minutes: 10, description: '¿Por qué no debe concentrarse todo el poder de un país en una sola persona o institución?' },
      { phase: 'Fase 2: Video de la Estructura del Estado', minutes: 15, description: 'Las 5 funciones del Estado ecuatoriano según la Constitución de 2008.' },
      { phase: 'Fase 3: Estudio de Casos Constitucionales', minutes: 15, description: 'Análisis de cómo se aprueba una ley y quién vela por los derechos ciudadanos.' },
      { phase: 'Fase 4: Síntesis Cívica', minutes: 5, description: 'Conclusiones sobre el equilibrio democrático.' },
    ],
    unit: 'Unidad 1: Estado, Democracia y Ciudadanía Activa',
    theme: 'Los Poderes del Estado Ecuatoriano y Derechos Constitucionales',
    objective: 'Comprender la estructura republicana del Estado ecuatoriano, sus 5 funciones constitucionales y el sistema de contrapesos para garantizar los derechos ciudadanos.',
    introduction: 'La democracia republicana se fundamenta en la división y equilibrio de poderes, impidiendo los abusos de autoridad y garantizando que las leyes protejan a todos por igual.',
    reading: `Las 5 Funciones del Estado en Ecuador (Constitución 2008):
1. Función Ejecutiva: Liderada por el Presidente/a de la República, administra los recursos públicos y ejecuta las políticas de gobierno.
2. Función Legislativa: La Asamblea Nacional, encargada de deliberar, redactar, modificar y aprobar las leyes del país.
3. Función Judicial y Justicia Indígena: Juzgados y Cortes que administran justicia y aplican el marco legal con imparcialidad.
4. Función Electoral: Consejo Nacional Electoral (CNE) y Tribunal Contencioso Electoral, garantizan comicios transparentes.
5. Función de Transparencia y Control Social: Promueve el control ciudadano y la lucha contra la corrupción.`,
    videoUrl: 'https://www.youtube.com/embed/4gP5lHjUqVo',
    socraticQuestions: [
      '¿Por qué el control mutuo entre poderes es vital para preservar la libertad individual?',
      '¿Cuál es el rol de los jóvenes en la veeduría y participación ciudadana?',
    ],
    resources: [
      {
        id: 'res-pol-a2-1',
        type: 'video',
        title: 'Video: Estructura del Estado y Funciones de Gobierno en Ecuador (Español)',
        url: 'https://www.youtube.com/embed/4gP5lHjUqVo',
        description: 'Explicación clara de las 5 funciones constitucionales.',
        duration: '12 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-pol-a2-1',
        title: 'Infografía de las 5 Funciones del Estado',
        description: 'Diseña un esquema visual en tu libreta con las 5 funciones, sus máximas autoridades y su misión principal.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Estructura_Estado_Democracia.pdf',
    homeworkTask: 'Investiga un proyecto de ley reciente y explica qué función del estado lo propuso y quién lo aprobó.',
    reflectionPrompt: '¿De qué manera puedes ejercer una ciudadanía responsable desde tu etapa estudiantil?',
    isCompleted: false,
  },

  {
    id: 'class-len-avril-03',
    subjectId: 'len-avril',
    studentId: 'avril',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Análisis de Discursos Célebres', minutes: 10, description: 'Cómo los grandes oradores utilizan la modulación, las pausas y la postura para conmover y convencer.' },
      { phase: 'Fase 2: Video de Técnicas de Oratoria', minutes: 15, description: 'Control de la respiración diafragmática, contacto visual y lenguaje corporal no verbal.' },
      { phase: 'Fase 3: Práctica de Declamación y Debate', minutes: 15, description: 'Grabación de un mini-discurso de 1 minuto defendiendo un proyecto.' },
      { phase: 'Fase 4: Rúbrica y Cierre Formativo', minutes: 5, description: 'Autoevaluación de dicción y seguridad escénica.' },
    ],
    unit: 'Unidad 1: Comunicación Asertiva y Debate Formal',
    theme: 'Técnicas de Oratoria, Tono de Voz y Refutación Respetuosa',
    objective: 'Desarrollar habilidades de expresión oral persuasiva, modulación de voz y argumentación en vivo respetando las normas del debate académico.',
    introduction: 'La voz humana tiene el poder de inspirar a naciones enteras. Dominar el arte de la oratoria te permite convertir tus conocimientos en mensajes transformadores.',
    reading: `Elementos Esenciales de la Comunicación Oral Efectiva:
- Lenguaje Corporal: Postura erguida, manos abiertas que acompañan la idea, contacto visual firme y empático.
- Modulación y Ritmo: Variar la velocidad para enfatizar puntos clave y hacer pausas estratégicas para invitar a la reflexión.
- Dicción y Proyección: Articulación clara de cada vocal y consonante con apoyo del diafragma.
- Refutación Asertiva: "Entiendo tu argumento sobre X, sin embargo, los datos demuestran que Y..." (con respeto inquebrantable).`,
    videoUrl: 'https://www.youtube.com/embed/v9qWkZ7wN78',
    socraticQuestions: [
      '¿Por qué el silencio y las pausas deliberadas pueden ser más impactantes que hablar a gran velocidad?',
      '¿Cómo influye la postura corporal en la seguridad emocional al hablar en público?',
    ],
    resources: [
      {
        id: 'res-len-a3-1',
        type: 'video',
        title: 'Video: Técnicas de Oratoria y Control del Miedo Escénico (Español)',
        url: 'https://www.youtube.com/embed/v9qWkZ7wN78',
        description: 'Consejos prácticos para hablar con elocuencia y carisma.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-len-a3-1',
        title: 'Grabación del Discurso de Presentación del Proyecto',
        description: 'Prepara un guion de 1 minuto y practica tu discurso frente al espejo prestando atención a tus gestos.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Oratoria_Comunicacion_Asertiva.pdf',
    homeworkTask: 'Graba tu audio de 1 minuto presentando la propuesta de valor de tu emprendimiento con tono formal.',
    reflectionPrompt: '¿Cómo te ayuda la práctica de la oratoria a ganar autoconfianza en todas las áreas de tu vida?',
    isCompleted: false,
  },

  {
    id: 'class-adm-avril-01',
    subjectId: 'adm-avril',
    studentId: 'avril',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apertura de Emprendimiento', minutes: 8, description: 'Análisis de casos de jóvenes innovadores y formulación de ideas de negocio.' },
      { phase: 'Fase 2: Video de Modelo Canvas', minutes: 12, description: 'Los 9 bloques del modelo de negocio Canvas: propuesta de valor, clientes, canales y flujo de ingresos.' },
      { phase: 'Fase 3: Taller de Llenado del Canvas', minutes: 10, description: 'Definición de propuesta de valor única y segmento de clientes para el trimestre.' },
    ],
    unit: 'Unidad 1: Plan de Negocios y Finanzas Personales',
    theme: 'Estructura de Costos y Modelo Canvas para Jóvenes Emprendedores',
    objective: 'Diseñar la propuesta de valor y la estructura general de un emprendimiento juvenil aplicando la metodología ágil del Business Model Canvas.',
    introduction: 'Un emprendimiento no empieza con una oficina o mucho dinero, sino con la resolución creativa de un problema real para un grupo específico de personas.',
    reading: `Los 9 Bloques del Modelo Canvas:
1. Segmento de Clientes: ¿Para quién creamos valor?
2. Propuesta de Valor: ¿Qué problema resolvemos y qué nos hace únicos?
3. Canales de Distribución: ¿Cómo entregamos nuestro producto?
4. Relación con Clientes: ¿Cómo fidelizamos a nuestra comunidad?
5. Fuentes de Ingresos: ¿Cómo y cuánto pagarán los clientes?
6. Recursos Clave: ¿Qué activos necesitamos (tecnología, talento, materiales)?
7. Actividades Clave: ¿Qué debemos hacer sin falta cada día?
8. Socios Clave: ¿Quiénes nos pueden ayudar (proveedores, mentores)?
9. Estructura de Costos: ¿Cuáles son los gastos fijos y variables principales?`,
    videoUrl: 'https://www.youtube.com/embed/Z1BCujX3pw8',
    socraticQuestions: [
      '¿Por qué es preferible validar la idea con clientes reales antes de invertir dinero en fabricar el producto?',
      '¿Qué valor diferencial ofrece tu proyecto frente a lo que ya existe en el mercado?',
    ],
    resources: [
      {
        id: 'res-adm-a1',
        type: 'video',
        title: 'Video Explicativo: Cómo Crear un Modelo Canvas Paso a Paso (Español)',
        url: 'https://www.youtube.com/embed/Z1BCujX3pw8',
        description: 'Aprende a estructurar un modelo de negocio en 1 sola página.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-adm-a1',
        title: 'Llenado del Lienzo Canvas del Proyecto',
        description: 'Completa los 9 bloques del Canvas en el formato digital o en tu libreta de proyectos.',
        type: 'project',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Modelo_Canvas_Emprendimiento.pdf',
    homeworkTask: 'Entrevista a 2 posibles clientes y pregúntales qué opinan de tu propuesta de valor.',
    reflectionPrompt: '¿Cómo puede un emprendimiento generar riqueza económica y al mismo tiempo impacto social positivo?',
    isCompleted: false,
  },

  // ==========================================
  // VIERNES (5 CLASES OFICIALES - 04 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-mat-avril-03',
    subjectId: 'mat-avril',
    studentId: 'avril',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '08:00 - 08:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apertura e Indagación Socrática', minutes: 10, description: 'Planteamiento de la incógnita cotidiana y la noción de equilibrio en la balanza.' },
      { phase: 'Fase 2: Video Explicativo en Español y Modelado', minutes: 15, description: 'Visualización de resolución formal de ecuaciones de 1er grado paso a paso.' },
      { phase: 'Fase 3: Laboratorio PhET y Práctica en Libreta', minutes: 15, description: 'Manipulación de coeficientes en el explorador de igualdades y despeje en cuaderno.' },
      { phase: 'Fase 4: Cierre Formativo y Evidencia', minutes: 5, description: 'Registro de conclusiones en la bitácora de aprendizaje y verificación de soluciones.' },
    ],
    unit: 'Unidad 1: Lenguaje Algebraico y Ecuaciones Lineales',
    theme: 'Modelado de Problemas Reales con Ecuaciones de Primer Grado',
    objective: 'Aprender a traducir situaciones verbales y problemas de la vida diaria a ecuaciones algebraicas de primer grado (ax + b = c), reconociendo incógnitas, constantes y condiciones de equilibrio.',
    introduction: 'En la vida cotidiana constantemente tomamos decisiones basadas en incógnitas: "¿Cuánto dinero necesito ahorrar?", "¿A qué velocidad debo viajar para llegar a tiempo?". Las ecuaciones de primer grado son el lenguaje universal que nos permite formalizar estas dudas y encontrar soluciones exactas.',
    reading: `¿Qué es modelar matemáticamente?
Modelar consiste en traducir un problema expresado en palabras al lenguaje simbólico de las matemáticas. 

Pasos clave para modelar:
1. Identificar la incógnita: Determina con precisión qué cantidad desconocida estás buscando y asígnale una letra (comúnmente 'x').
2. Reconocer los datos conocidos: Anota los valores numéricos fijos (constantes) y las relaciones entre ellos (el doble, el triple, la mitad, aumentado en...).
3. Plantear la ecuación: Escribe una igualdad matemática donde ambos miembros representen la misma cantidad bajo dos perspectivas diferentes.
4. Resolver aplicando la propiedad uniforme: Despeja la incógnita manteniendo siempre el equilibrio de la balanza.
5. Interpretar y comprobar: Sustituye la solución en el problema original para verificar si tiene sentido en el contexto real.

Ejemplo ilustrativo:
"El triple de la edad de Juan aumentado en 5 años es igual a 26 años. ¿Qué edad tiene Juan?"
- Incógnita: x = edad de Juan
- Expresión: 3x + 5 = 26
- Despeje: 3x = 26 - 5 -> 3x = 21 -> x = 7 años.
- Comprobación: 3(7) + 5 = 21 + 5 = 26 (¡Es correcto!).`,
    videoUrl: 'https://www.youtube.com/embed/IHblqjW8RY8',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_all.html',
    socraticQuestions: [
      '¿Por qué decimos que el signo "=" funciona exactamente como el punto de apoyo de una balanza?',
      'Si un problema dice "hace 4 años", ¿qué operación matemática debemos aplicar a la incógnita actual x?',
      'Si sumamos 10 a un lado de la ecuación pero no al otro, ¿qué le ocurre a la verdad matemática del problema?',
      '¿En qué situación de tu proyecto de emprendimiento necesitarás usar una ecuación lineal?',
    ],
    resources: [
      {
        id: 'res-mat-a1',
        type: 'simulator',
        title: 'Explorador de Igualdades y Balanzas (PhET)',
        url: 'https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_all.html',
        description: 'Simulador visual para colocar pesos y variables y observar el equilibrio algebraico.',
        duration: '15 min de interacción',
        order: 1,
      },
      {
        id: 'res-mat-a2',
        type: 'video',
        title: 'Video Explicativo: Cómo Resolver Ecuaciones de Primer Grado (Profe Alex)',
        url: 'https://www.youtube.com/embed/IHblqjW8RY8',
        description: 'Explicación detallada y gráfica en español sobre despejes y propiedades uniformes.',
        duration: '12 min',
        order: 2,
      },
    ],
    activities: [
      {
        id: 'act-mat-a1',
        title: 'Traducción de Enunciados Verbales a Ecuaciones',
        description: 'Resuelve en tu cuaderno los ejercicios del 1 al 4 de la guía adjunta traduciendo cada problema a forma ax + b = c.',
        type: 'practice',
        points: 50,
        completed: false,
      },
      {
        id: 'act-mat-a2',
        title: 'Reto de Despeje con Coeficientes Negativos',
        description: 'Resuelve la ecuación -3x + 12 = -6 explicando detalladamente qué propiedad aplicas en cada renglón.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Modelado_Ecuaciones_Lineales.pdf',
    guideUrl: '#',
    homeworkTask: 'Resuelve en tu libreta los 5 problemas de modelado de la guía (incluyendo el presupuesto del proyecto de emprendimiento). Toma una foto clara de tus procedimientos y súbela aquí para el análisis formativo con la Dra. Sophia.',
    reflectionPrompt: '¿Qué te resulta más desafiante: entender el enunciado verbal o despejar los números algebraicos? ¿Por qué?',
    isCompleted: false,
  },

  {
    id: 'class-soft-avril-01',
    subjectId: 'soft-avril',
    studentId: 'avril',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '08:45 - 09:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Planteamiento del Reto Lógico', minutes: 10, description: 'Descomposición de un problema algorítmico en secuencias de instrucciones condicionales (If-Else).' },
      { phase: 'Fase 2: Video Explicativo de Programación', minutes: 15, description: 'Tutorial en español sobre lógica algorítmica, variables y estructuras de control.' },
      { phase: 'Fase 3: Laboratorio Práctico de Código', minutes: 15, description: 'Escribir una función que valide datos de entrada para la tienda digital del emprendimiento.' },
      { phase: 'Fase 4: Depuración (Debugging) y Cierre', minutes: 5, description: 'Revisión de errores de sintaxis y prueba de casos límite.' },
    ],
    unit: 'Unidad 1: Algoritmia y Desarrollo Web Estructurado',
    theme: 'Estructuras de Control y Lógica Condicional en JavaScript',
    objective: 'Comprender cómo las computadoras toman decisiones lógicas mediante operadores relacionales y bloques condicionales (if, else if, else).',
    introduction: 'Todo el software moderno, desde las aplicaciones del teléfono hasta los sistemas de navegación espacial, se basa en decisiones lógicas simples: "Si ocurre A, entonces ejecuta B; de lo contrario, ejecuta C".',
    reading: `Lógica Condicional:
- Variable: Un contenedor en memoria para almacenar un dato cambiante (ej. 'edad', 'precioTotal').
- Operadores de Comparación: > (mayor), < (menor), === (estrictamente igual), !== (diferente).
- Flujo de Ejecución: El camino que recorre el programa según las condiciones verdaderas o falsas.`,
    videoUrl: 'https://www.youtube.com/embed/U3CGMyjzpdM',
    simulatorUrl: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted',
    socraticQuestions: [
      '¿Qué ocurre en un programa si ninguna de las condiciones evaluadas resulta verdadera y no hay un bloque "else"?',
      '¿Por qué es fundamental probar un código con datos erróneos además de datos correctos?',
    ],
    resources: [
      {
        id: 'res-soft-a1',
        type: 'video',
        title: 'Video Explicativo: Qué es un Algoritmo y Lógica de Programación (Español)',
        url: 'https://www.youtube.com/embed/U3CGMyjzpdM',
        description: 'Explicación visual de cómo estructurar algoritmos eficientes.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soft-a1',
        title: 'Diseño del Algoritmo del Carrito de Compras',
        description: 'Escribe en pseudocódigo o diagrama de flujo el proceso de cálculo de descuento si la compra supera los $50.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Algoritmia_Condicionales.pdf',
    homeworkTask: 'Construye en el editor de código un script que calcule el total a pagar aplicando 15% de IVA y descuento promocional.',
    reflectionPrompt: '¿Cómo te ayuda el pensamiento algorítmico a resolver problemas en otras materias como matemáticas y ciencias?',
    isCompleted: false,
  },

  {
    id: 'class-pol-avril-01',
    subjectId: 'pol-avril',
    studentId: 'avril',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Indagación Cívica', minutes: 10, description: 'Estudio de caso sobre la Declaración Universal de los Derechos Humanos de 1948.' },
      { phase: 'Fase 2: Video Educativo de Ciencias Políticas', minutes: 15, description: 'Derechos fundamentales, mecanismos de participación ciudadana y Estado de Derecho.' },
      { phase: 'Fase 3: Análisis de Casos Constitucionales', minutes: 15, description: 'Identificación de derechos vulnerados y formulación de propuestas de solución cívica.' },
      { phase: 'Fase 4: Síntesis y Reflexión Ética', minutes: 5, description: 'Registro de compromisos de ciudadanía responsable en el cuaderno.' },
    ],
    unit: 'Unidad 1: Fundamentos de Educación Cívica y Derechos Humanos',
    theme: 'Derechos Humanos, Constitución y Deberes Ciudadanos',
    objective: 'Analizar la estructura de los derechos fundamentales garantizados en la Constitución y comprender la correlación directa entre derechos y responsabilidades cívicas.',
    introduction: 'Los derechos no son concesiones del poder; son conquistas históricas de la humanidad que garantizan la dignidad de cada ser humano sin distinción alguna.',
    reading: `Generaciones de Derechos Humanos:
1. Primera Generación: Derechos civiles y políticos (libertad de expresión, voto, juicio justo, derecho a la vida).
2. Segunda Generación: Derechos económicos, sociales y culturales (educación gratuita, salud, vivienda digna, trabajo justo).
3. Tercera Generación: Derechos colectivos y ambientales (derecho a un medio ambiente sano, a la paz, al desarrollo sustentable).`,
    videoUrl: 'https://www.youtube.com/embed/xL5iH3t8n2s',
    socraticQuestions: [
      '¿Por qué decimos que todo derecho individual conlleva una responsabilidad social ineludible?',
      '¿Qué mecanismos existen en tu comunidad para denunciar la vulneración de un derecho fundamental?',
    ],
    resources: [
      {
        id: 'res-pol-a1',
        type: 'video',
        title: 'Video Explicativo: Qué son los Derechos Humanos y su Historia (Español)',
        url: 'https://www.youtube.com/embed/xL5iH3t8n2s',
        description: 'Recorrido histórico desde la Declaración Universal hasta la Constitución actual.',
        duration: '12 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-pol-a1',
        title: 'Análisis de Caso: Derecho a la Educación de Calidad',
        description: 'Redacta un análisis de 1 página sobre cómo el acceso a la tecnología impacta la igualdad de oportunidades educativas.',
        type: 'reflection',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Derechos_Humanos_Constitucion.pdf',
    homeworkTask: 'Investiga un artículo de la Constitución del Ecuador sobre los derechos de la naturaleza y elabora un mapa conceptual.',
    reflectionPrompt: '¿Cómo puedes promover activamente el respeto a los derechos humanos en tu entorno diario?',
    isCompleted: false,
  },

  {
    id: 'class-soc-avril-01',
    subjectId: 'soc-avril',
    studentId: 'avril',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apertura Geográfica', minutes: 10, description: 'Análisis de mapas temáticos y pregunta sobre cómo la geografía moldea la cultura y la economía.' },
      { phase: 'Fase 2: Video Documental en Español', minutes: 15, description: 'Geografía física, pisos climáticos y diversidad étnico-cultural del Ecuador y América Latina.' },
      { phase: 'Fase 3: Análisis de Fuentes y Cartografía', minutes: 15, description: 'Identificación de cuencas hidrográficas y corredores comerciales estratégicos.' },
      { phase: 'Fase 4: Síntesis y Preguntas de Debate', minutes: 5, description: 'Registro de conclusiones sobre la gestión sustentable de recursos naturales.' },
    ],
    unit: 'Unidad 1: Geopolítica y Cartografía de América Latina',
    theme: 'Geografía Física y Diversidad Biocultural en la Región Andina',
    objective: 'Analizar la influencia de la Cordillera de los Andes en el clima, la distribución poblacional y las actividades económicas de la región.',
    introduction: 'Los Andes no son solo montañas: son la columna vertebral que define el clima, las rutas comerciales y la rica cosmovisión de millones de personas en Sudamérica.',
    reading: `Los Pisos Ecológicos Andinos:
- Zona Baja/Costa: Cultivos tropicales y puertos comerciales marítimos.
- Zona Templada/Valles Interandinos: Centros urbanos históricos y producción agrícola diversificada.
- Zona de Páramo/Alta Montaña: Grandes esponjas hídricas naturales que abastecen de agua dulce a las ciudades.`,
    videoUrl: 'https://www.youtube.com/embed/1B1pY3gq6iQ',
    socraticQuestions: [
      '¿Por qué el páramo andino es considerado un ecosistema estratégico de seguridad nacional?',
      '¿Cómo influye la altitud en la presión atmosférica y en la vida de los seres humanos?',
    ],
    resources: [
      {
        id: 'res-soc-a1',
        type: 'video',
        title: 'Video Documental: La Cordillera de los Andes y sus Ecosistemas (Español)',
        url: 'https://www.youtube.com/embed/1B1pY3gq6iQ',
        description: 'Recorrido visual por los pisos ecológicos y la biodiversidad andina.',
        duration: '13 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soc-a1',
        title: 'Mapa Físico de América del Sur y los Andes',
        description: 'Dibuja en tu libreta el mapa de Sudamérica identificando las principales cadenas montañosas y cuencas fluviales.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Geografia_Andes_Ecosistemas.pdf',
    homeworkTask: 'Elabora un ensayo corto de 1 página sobre la importancia del agua proveniente de los páramos para las ciudades del Ecuador.',
    reflectionPrompt: '¿Qué acciones cotidianas puedes implementar para reducir tu huella hídrica y ecológica?',
    isCompleted: false,
  },

  {
    id: 'class-ing-avril-01',
    subjectId: 'ing-avril',
    studentId: 'avril',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Activación y Vocabulario de Debate (8 min)', minutes: 8, description: 'Explicación en español sobre cómo plantear un contraargumento respetuoso en inglés usando conectores clave como "Nonetheless" y "In contrast".' },
      { phase: 'Fase 2: Video Didáctico con Guía Bilingüe (12 min)', minutes: 12, description: 'Comprensión auditiva: cómo formular una tesis con datos de apoyo en un debate sobre energías limpias.' },
      { phase: 'Fase 3: Práctica de Oratoria y Redacción (10 min)', minutes: 10, description: 'Redacción y lectura en voz alta de 3 argumentos a favor del medio ambiente con guía en español.' },
    ],
    unit: 'Unidad 1: Inglés Académico y Discurso Crítico (Unit 1)',
    theme: 'Debate Académico: Argumentos y Contraargumentos (Stating Arguments & Counter-Arguments)',
    objective: 'Aprender a formular argumentos y contraargumentos en inglés mediante conectores académicos de nivel B1, comprendiendo su significado y uso en debates internacionales.',
    introduction: '¡Hola Avril! En la comunidad científica y académica mundial, el inglés es el idioma principal para compartir descubrimientos y debatir sobre soluciones ecológicas. En esta clase de 30 minutos aprenderás a estructurar una opinión sólida y responder a puntos de vista contrarios.',
    reading: `📘 Frases Académicas para Debates (con significado y pronunciación explicada en español):

1. Introducir un punto respaldado por datos:
   • "It is widely acknowledged that solar energy reduces emissions."
     -> [Es ampliamente reconocido que la energía solar reduce las emisiones.]
   • "Recent evidence suggests that renewable sources are more efficient."
     -> [La evidencia reciente sugiere que las fuentes renovables son más eficientes.]

2. Presentar un contraargumento respetuoso:
   • "Nonetheless, we must take into account initial installation costs."
     -> [No obstante, debemos tomar en cuenta los costos iniciales de instalación.]
   • "In contrast to conventional views, technology allows fast adaptation."
     -> [En contraste con las posturas tradicionales, la tecnología permite una rápida adaptación.]

3. Concluir de forma persuasiva:
   • "Therefore, the most viable strategy is to invest in education."
     -> [Por lo tanto, la estrategia más viable es invertir en educación.]
   • "Ultimately, the data supports our proposal."
     -> [En última instancia, los datos respaldan nuestra propuesta.]`,
    videoUrl: 'https://www.youtube.com/embed/X90wWk6pCyc',
    socraticQuestions: [
      '¿Por qué es importante reconocer el punto de vista contrario antes de defender tu propia postura en un debate?',
      '¿Qué conector en inglés usarías para decir "no obstante" o "a pesar de ello" de manera académica?',
    ],
    resources: [
      {
        id: 'res-ing-a1',
        type: 'video',
        title: 'Video Clase: Conectores y Marcadores Discursivos para Debates en Inglés',
        url: 'https://www.youtube.com/embed/X90wWk6pCyc',
        description: 'Guía práctica para utilizar conectores formales en exposiciones orales y ensayos.',
        duration: '11 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-ing-a1',
        title: 'Taller de Oratoria: Preparación de 3 Argumentos en Inglés',
        description: '¿Qué vas a hacer paso a paso?\n1. Escribe en tu libreta 3 oraciones en inglés apoyando el uso de energía solar o el cuidado del agua.\n2. Emplea en cada oración un conector diferente: "It is widely acknowledged that...", "Nonetheless...", y "Therefore...".\n3. Anota debajo de cada oración su significado en español.\n4. Practica leerlas en voz alta 2 veces prestando atención a la entonación.\n5. Sube tu foto o texto al taller para revisión pedagógica.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Avril_Ingles_Debate_Academico_Sustentabilidad.pdf',
    homeworkTask: 'Graba una nota de voz de 90 segundos exponiendo en inglés tu propuesta para cuidar el planeta, usando al menos 2 conectores formales. Puedes tener tu libreta abierta con las notas en español para apoyarte.',
    reflectionPrompt: '¿Cómo te ayuda expresarte en inglés a compartir tus proyectos ecológicos con estudiantes de otros países?',
    isCompleted: false,
  },
];
