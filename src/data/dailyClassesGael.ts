import { DailyClass } from '../types';

export const GAEL_DAILY_CLASSES: DailyClass[] = [
  {
    "id": "class-len-gael-01",
    "subjectId": "len-gael",
    "studentId": "gael",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Lectura comprensiva",
    "theme": "Lectura comprensiva y creación de cuentos",
    "objective": "Comprender y narrar historias",
    "introduction": "Bienvenido Gael a Lengua y Literatura. Hoy leeremos un cuento y crearemos el nuestro.",
    "reading": "Cuento: \"El dragón y la mariposa\"",
    "socraticQuestions": [
      "¿Qué pasó en la historia?",
      "¿Cuál fue tu parte favorita?"
    ],
    "resources": [
      {
        "id": "class-len-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Lectura comprensiva y creación de cuentos",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar lectura comprensiva y creación de cuentos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Lectura comprensiva y creación de cuentos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-01-act-1",
        "title": "Exploración Inicial: Lectura comprensiva y creación de cuentos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre lectura comprensiva y creación de cuentos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: comprender y narrar historias.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Dibuja tu parte favorita del cuento) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Dibuja tu parte favorita del cuento",
    "reflectionPrompt": "¿Qué aprendiste del dragón?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_gael_01.pdf",
    "learningPath": [
      {
        "id": "class-len-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Lectura comprensiva y creación de cuentos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre lectura comprensiva y creación de cuentos.",
          "detailedExplanation": "Bienvenido Gael a Lengua y Literatura. Hoy leeremos un cuento y crearemos el nuestro. En esta fase exploraremos las bases teóricas y el propósito de lectura comprensiva y creación de cuentos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: comprender y narrar historias.",
          "keyTakeaways": [
            "Comprender el propósito de Lectura comprensiva y creación de cuentos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué pasó en la historia?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de lectura comprensiva y creación de cuentos.",
          "detailedExplanation": "Profundizamos en comprender y narrar historias. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cuál fue tu parte favorita?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de lectura comprensiva y creación de cuentos.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-len-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-len-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Lectura comprensiva y creación de cuentos",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para lectura comprensiva y creación de cuentos.",
        "alignsWithStages": [
          "class-len-gael-01-stage-1",
          "class-len-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-gael-01-stage-1",
        "prompt": "¿Qué pasó en la historia?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-gael-01-stage-3",
        "prompt": "¿Cuál fue tu parte favorita?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-gael-01-stage-3",
        "criterion": "Comprensión de Lectura comprensiva y creación de cuentos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Dibuja tu parte favorita del cuento)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-mat-gael-01",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:45 - 09:30 (45 min)",
    "unit": "Unidad 1: Multiplicación",
    "theme": "Multiplicación, áreas y cuerpos 3D",
    "objective": "Introducción a la multiplicación con material concreto",
    "introduction": "Hoy usaremos Lego para entender la multiplicación.",
    "reading": "Tarjetas de multiplicación con Lego",
    "socraticQuestions": [
      "¿Cuántos Legos necesitas para 3 x 4?",
      "¿Qué forma hace?"
    ],
    "resources": [
      {
        "id": "class-mat-gael-01-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Multiplicación, áreas y cuerpos 3D",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar multiplicación, áreas y cuerpos 3d.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Multiplicación, áreas y cuerpos 3D",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-01-act-1",
        "title": "Exploración Inicial: Multiplicación, áreas y cuerpos 3D",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre multiplicación, áreas y cuerpos 3d.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: introducción a la multiplicación con material concreto.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Construye 3 torres de 4 Legos cada una) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Construye 3 torres de 4 Legos cada una",
    "reflectionPrompt": "¿Qué patrón notaste al multiplicar?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_01.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Multiplicación, áreas y cuerpos 3D",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre multiplicación, áreas y cuerpos 3d.",
          "detailedExplanation": "Hoy usaremos Lego para entender la multiplicación. En esta fase exploraremos las bases teóricas y el propósito de multiplicación, áreas y cuerpos 3d.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: introducción a la multiplicación con material concreto.",
          "keyTakeaways": [
            "Comprender el propósito de Multiplicación, áreas y cuerpos 3D.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuántos Legos necesitas para 3 x 4?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de multiplicación, áreas y cuerpos 3d.",
          "detailedExplanation": "Profundizamos en introducción a la multiplicación con material concreto. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué forma hace?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de multiplicación, áreas y cuerpos 3d.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-mat-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-mat-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Multiplicación, áreas y cuerpos 3D",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para multiplicación, áreas y cuerpos 3d.",
        "alignsWithStages": [
          "class-mat-gael-01-stage-1",
          "class-mat-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-gael-01-stage-1",
        "prompt": "¿Cuántos Legos necesitas para 3 x 4?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-gael-01-stage-3",
        "prompt": "¿Qué forma hace?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-gael-01-stage-3",
        "criterion": "Comprensión de Multiplicación, áreas y cuerpos 3D",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Construye 3 torres de 4 Legos cada una)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-rel-gael-01",
    "subjectId": "rel-gael",
    "studentId": "gael",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Valores y empatía",
    "theme": "Valores y empatía",
    "objective": "Identificar emociones y valores",
    "introduction": "Hoy hablaremos de sentimientos y cómo tratamos a los demás.",
    "reading": "Historia: \"El niño invisible\"",
    "socraticQuestions": [
      "¿Cómo se sintió el niño?",
      "¿Qué harías tú en su lugar?"
    ],
    "resources": [
      {
        "id": "class-rel-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Valores y empatía",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar valores y empatía.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-rel-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Valores y empatía",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_rel_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-rel-gael-01-act-1",
        "title": "Exploración Inicial: Valores y empatía",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre valores y empatía.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-rel-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar emociones y valores.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-rel-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Haz un dibujo de algo bueno que hiciste por alguien) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Haz un dibujo de algo bueno que hiciste por alguien",
    "reflectionPrompt": "¿Cómo te sentiste al ayudar?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_rel_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_rel_gael_01.pdf",
    "learningPath": [
      {
        "id": "class-rel-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Valores y empatía",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre valores y empatía.",
          "detailedExplanation": "Hoy hablaremos de sentimientos y cómo tratamos a los demás. En esta fase exploraremos las bases teóricas y el propósito de valores y empatía.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar emociones y valores.",
          "keyTakeaways": [
            "Comprender el propósito de Valores y empatía.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cómo se sintió el niño?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-rel-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de valores y empatía.",
          "detailedExplanation": "Profundizamos en identificar emociones y valores. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué harías tú en su lugar?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-rel-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de valores y empatía.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-rel-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-rel-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Valores y empatía",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para valores y empatía.",
        "alignsWithStages": [
          "class-rel-gael-01-stage-1",
          "class-rel-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-rel-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-rel-gael-01-stage-1",
        "prompt": "¿Cómo se sintió el niño?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-rel-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-rel-gael-01-stage-3",
        "prompt": "¿Qué harías tú en su lugar?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-rel-gael-01-stage-3",
        "criterion": "Comprensión de Valores y empatía",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-rel-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Haz un dibujo de algo bueno que hiciste por alguien)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-sci-gael-01",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Seres vivos",
    "theme": "Seres vivos y sus características",
    "objective": "Identificar características de los seres vivos",
    "introduction": "Hoy descubriremos qué tienen en común todos los seres vivos.",
    "reading": "Imágenes de animales y plantas",
    "socraticQuestions": [
      "¿Qué necesita un ser vivo para vivir?",
      "¿Una piedra está viva?"
    ],
    "resources": [
      {
        "id": "class-sci-gael-01-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Seres vivos y sus características",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "description": "Material de apoyo interactivo para dominar seres vivos y sus características.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Seres vivos y sus características",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-01-act-1",
        "title": "Exploración Inicial: Seres vivos y sus características",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre seres vivos y sus características.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar características de los seres vivos.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-sci-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Dibuja 3 seres vivos que conozcas) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Dibuja 3 seres vivos que conozcas",
    "reflectionPrompt": "¿Qué tienen en común todos?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_gael_01.pdf",
    "simulatorUrl": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
    "learningPath": [
      {
        "id": "class-sci-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Seres vivos y sus características",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre seres vivos y sus características.",
          "detailedExplanation": "Hoy descubriremos qué tienen en común todos los seres vivos. En esta fase exploraremos las bases teóricas y el propósito de seres vivos y sus características.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar características de los seres vivos.",
          "keyTakeaways": [
            "Comprender el propósito de Seres vivos y sus características.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué necesita un ser vivo para vivir?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-sci-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de seres vivos y sus características.",
          "detailedExplanation": "Profundizamos en identificar características de los seres vivos. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Una piedra está viva?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-sci-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de seres vivos y sus características.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-sci-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-sci-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Seres vivos y sus características",
        "type": "simulator",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para seres vivos y sus características.",
        "alignsWithStages": [
          "class-sci-gael-01-stage-1",
          "class-sci-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-sci-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-sci-gael-01-stage-1",
        "prompt": "¿Qué necesita un ser vivo para vivir?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-sci-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-sci-gael-01-stage-3",
        "prompt": "¿Una piedra está viva?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-sci-gael-01-stage-3",
        "criterion": "Comprensión de Seres vivos y sus características",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-sci-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Dibuja 3 seres vivos que conozcas)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-mat-gael-02",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Multiplicación con área",
    "objective": "Calcular área de rectángulos",
    "introduction": "Continuamos con multiplicación. Hoy medimos superficies.",
    "reading": "Fichas de rectángulos con cuadrados",
    "socraticQuestions": [
      "¿Cómo calculas el área?",
      "¿Qué pasa si cambias un lado?"
    ],
    "resources": [
      {
        "id": "class-mat-gael-02-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Multiplicación con área",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar multiplicación con área.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Multiplicación con área",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-02-act-1",
        "title": "Exploración Inicial: Multiplicación con área",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre multiplicación con área.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: calcular área de rectángulos.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Mide 3 superficies rectangulares en casa) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Mide 3 superficies rectangulares en casa",
    "reflectionPrompt": "¿Qué superficie fue la más grande?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_02.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Multiplicación con área",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre multiplicación con área.",
          "detailedExplanation": "Continuamos con multiplicación. Hoy medimos superficies. En esta fase exploraremos las bases teóricas y el propósito de multiplicación con área.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: calcular área de rectángulos.",
          "keyTakeaways": [
            "Comprender el propósito de Multiplicación con área.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cómo calculas el área?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de multiplicación con área.",
          "detailedExplanation": "Profundizamos en calcular área de rectángulos. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué pasa si cambias un lado?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de multiplicación con área.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-mat-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-mat-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Multiplicación con área",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para multiplicación con área.",
        "alignsWithStages": [
          "class-mat-gael-02-stage-1",
          "class-mat-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-gael-02-stage-1",
        "prompt": "¿Cómo calculas el área?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-gael-02-stage-3",
        "prompt": "¿Qué pasa si cambias un lado?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-gael-02-stage-3",
        "criterion": "Comprensión de Multiplicación con área",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Mide 3 superficies rectangulares en casa)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-ing-gael-01",
    "subjectId": "ing-gael",
    "studentId": "gael",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Fonética",
    "theme": "Aprendizaje lúdico de fonética",
    "objective": "Identificar sonidos iniciales en inglés",
    "introduction": "Bienvenido a Inglés. Canciones y juegos para aprender sonidos.",
    "reading": "Canción: \"The Alphabet Song\"",
    "socraticQuestions": [
      "¿Qué sonido empieza con...?",
      "¿Puedes cantar la canción?"
    ],
    "resources": [
      {
        "id": "class-ing-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Aprendizaje lúdico de fonética",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar aprendizaje lúdico de fonética.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Aprendizaje lúdico de fonética",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-gael-01-act-1",
        "title": "Exploración Inicial: Aprendizaje lúdico de fonética",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre aprendizaje lúdico de fonética.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar sonidos iniciales en inglés.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-ing-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Canta la canción del alfabeto en casa) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Canta la canción del alfabeto en casa",
    "reflectionPrompt": "¿Qué letra te gustó más?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_gael_01.pdf",
    "learningPath": [
      {
        "id": "class-ing-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Aprendizaje lúdico de fonética",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre aprendizaje lúdico de fonética.",
          "detailedExplanation": "Bienvenido a Inglés. Canciones y juegos para aprender sonidos. En esta fase exploraremos las bases teóricas y el propósito de aprendizaje lúdico de fonética.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar sonidos iniciales en inglés.",
          "keyTakeaways": [
            "Comprender el propósito de Aprendizaje lúdico de fonética.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué sonido empieza con...?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-ing-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de aprendizaje lúdico de fonética.",
          "detailedExplanation": "Profundizamos en identificar sonidos iniciales en inglés. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Puedes cantar la canción?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-ing-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de aprendizaje lúdico de fonética.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-ing-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-ing-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Aprendizaje lúdico de fonética",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para aprendizaje lúdico de fonética.",
        "alignsWithStages": [
          "class-ing-gael-01-stage-1",
          "class-ing-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-ing-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-ing-gael-01-stage-1",
        "prompt": "¿Qué sonido empieza con...?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-ing-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-ing-gael-01-stage-3",
        "prompt": "¿Puedes cantar la canción?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-ing-gael-01-stage-3",
        "criterion": "Comprensión de Aprendizaje lúdico de fonética",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-ing-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Canta la canción del alfabeto en casa)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-sci-gael-02",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Ecosistemas",
    "theme": "Plantas y animales del entorno",
    "objective": "Identificar plantas y animales del entorno local",
    "introduction": "Hoy exploraremos la naturaleza que nos rodea.",
    "reading": "Fotos de plantas y animales locales",
    "socraticQuestions": [
      "¿Qué animales ves en tu jardín?",
      "¿Qué necesitan las plantas para crecer?"
    ],
    "resources": [
      {
        "id": "class-sci-gael-02-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Plantas y animales del entorno",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "description": "Material de apoyo interactivo para dominar plantas y animales del entorno.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Plantas y animales del entorno",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-02-act-1",
        "title": "Exploración Inicial: Plantas y animales del entorno",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre plantas y animales del entorno.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar plantas y animales del entorno local.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-sci-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Busca 3 plantas diferentes en tu vecindario) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Busca 3 plantas diferentes en tu vecindario",
    "reflectionPrompt": "¿Cuál fue la planta más interesante?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_gael_02.pdf",
    "simulatorUrl": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
    "learningPath": [
      {
        "id": "class-sci-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Plantas y animales del entorno",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre plantas y animales del entorno.",
          "detailedExplanation": "Hoy exploraremos la naturaleza que nos rodea. En esta fase exploraremos las bases teóricas y el propósito de plantas y animales del entorno.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar plantas y animales del entorno local.",
          "keyTakeaways": [
            "Comprender el propósito de Plantas y animales del entorno.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué animales ves en tu jardín?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-sci-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de plantas y animales del entorno.",
          "detailedExplanation": "Profundizamos en identificar plantas y animales del entorno local. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué necesitan las plantas para crecer?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-sci-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de plantas y animales del entorno.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-sci-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-sci-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Plantas y animales del entorno",
        "type": "simulator",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para plantas y animales del entorno.",
        "alignsWithStages": [
          "class-sci-gael-02-stage-1",
          "class-sci-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-sci-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-sci-gael-02-stage-1",
        "prompt": "¿Qué animales ves en tu jardín?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-sci-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-sci-gael-02-stage-3",
        "prompt": "¿Qué necesitan las plantas para crecer?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-sci-gael-02-stage-3",
        "criterion": "Comprensión de Plantas y animales del entorno",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-sci-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Busca 3 plantas diferentes en tu vecindario)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-art-gael-01",
    "subjectId": "art-gael",
    "studentId": "gael",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Upcycling",
    "theme": "Upcycling y colores",
    "objective": "Crear arte con materiales reciclados",
    "introduction": "Hoy somos artistas con materiales reciclados.",
    "reading": "Ejemplos de arte reciclado",
    "socraticQuestions": [
      "¿Qué materiales puedes reciclar?",
      "¿Qué puedes crear con ellos?"
    ],
    "resources": [
      {
        "id": "class-art-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Upcycling y colores",
        "url": "https://quickdraw.withgoogle.com/",
        "description": "Material de apoyo interactivo para dominar upcycling y colores.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-art-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Upcycling y colores",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_art_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-art-gael-01-act-1",
        "title": "Exploración Inicial: Upcycling y colores",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre upcycling y colores.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-art-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: crear arte con materiales reciclados.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-art-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Crea una obra con materiales reciclados) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Crea una obra con materiales reciclados",
    "reflectionPrompt": "¿Qué forma creaste?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_art_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_art_gael_01.pdf",
    "simulatorUrl": "https://quickdraw.withgoogle.com/",
    "learningPath": [
      {
        "id": "class-art-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Upcycling y colores",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre upcycling y colores.",
          "detailedExplanation": "Hoy somos artistas con materiales reciclados. En esta fase exploraremos las bases teóricas y el propósito de upcycling y colores.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: crear arte con materiales reciclados.",
          "keyTakeaways": [
            "Comprender el propósito de Upcycling y colores.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué materiales puedes reciclar?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-art-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de upcycling y colores.",
          "detailedExplanation": "Profundizamos en crear arte con materiales reciclados. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué puedes crear con ellos?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-art-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de upcycling y colores.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-art-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-art-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Upcycling y colores",
        "type": "simulator",
        "url": "https://quickdraw.withgoogle.com/",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para upcycling y colores.",
        "alignsWithStages": [
          "class-art-gael-01-stage-1",
          "class-art-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-art-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-art-gael-01-stage-1",
        "prompt": "¿Qué materiales puedes reciclar?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-art-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-art-gael-01-stage-3",
        "prompt": "¿Qué puedes crear con ellos?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-art-gael-01-stage-3",
        "criterion": "Comprensión de Upcycling y colores",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-art-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Crea una obra con materiales reciclados)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-len-gael-02",
    "subjectId": "len-gael",
    "studentId": "gael",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Creación de cuentos propios",
    "objective": "Inventar y escribir un cuento corto",
    "introduction": "Hoy serás autor. Crearemos un cuento juntos.",
    "reading": "Estructura de un cuento: inicio, nudo, desenlace",
    "socraticQuestions": [
      "¿Qué personaje inventarás?",
      "¿Qué problema tendrá?"
    ],
    "resources": [
      {
        "id": "class-len-gael-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Creación de cuentos propios",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar creación de cuentos propios.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Creación de cuentos propios",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-02-act-1",
        "title": "Exploración Inicial: Creación de cuentos propios",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre creación de cuentos propios.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: inventar y escribir un cuento corto.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Termina tu cuento en casa) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Termina tu cuento en casa",
    "reflectionPrompt": "¿Qué sintió tu personaje al final?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_gael_02.pdf",
    "learningPath": [
      {
        "id": "class-len-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Creación de cuentos propios",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre creación de cuentos propios.",
          "detailedExplanation": "Hoy serás autor. Crearemos un cuento juntos. En esta fase exploraremos las bases teóricas y el propósito de creación de cuentos propios.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: inventar y escribir un cuento corto.",
          "keyTakeaways": [
            "Comprender el propósito de Creación de cuentos propios.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué personaje inventarás?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de creación de cuentos propios.",
          "detailedExplanation": "Profundizamos en inventar y escribir un cuento corto. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué problema tendrá?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de creación de cuentos propios.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-len-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-len-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Creación de cuentos propios",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para creación de cuentos propios.",
        "alignsWithStages": [
          "class-len-gael-02-stage-1",
          "class-len-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-gael-02-stage-1",
        "prompt": "¿Qué personaje inventarás?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-gael-02-stage-3",
        "prompt": "¿Qué problema tendrá?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-gael-02-stage-3",
        "criterion": "Comprensión de Creación de cuentos propios",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Termina tu cuento en casa)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soc-gael-01",
    "subjectId": "soc-gael",
    "studentId": "gael",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Ciudad vs campo",
    "theme": "Ciudad vs campo y servicios públicos",
    "objective": "Diferenciar ciudad y campo",
    "introduction": "Exploramos las diferencias entre vivir en ciudad y campo.",
    "reading": "Imágenes de ciudad y campo",
    "socraticQuestions": [
      "¿Qué ves en la ciudad? ¿Y en el campo?",
      "¿Qué servicios hay en cada uno?"
    ],
    "resources": [
      {
        "id": "class-soc-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Ciudad vs campo y servicios públicos",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar ciudad vs campo y servicios públicos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Ciudad vs campo y servicios públicos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-gael-01-act-1",
        "title": "Exploración Inicial: Ciudad vs campo y servicios públicos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre ciudad vs campo y servicios públicos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: diferenciar ciudad y campo.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soc-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Dibuja tu lugar ideal para vivir) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Dibuja tu lugar ideal para vivir",
    "reflectionPrompt": "¿Por qué elegiste ese lugar?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_gael_01.pdf",
    "learningPath": [
      {
        "id": "class-soc-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Ciudad vs campo y servicios públicos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre ciudad vs campo y servicios públicos.",
          "detailedExplanation": "Exploramos las diferencias entre vivir en ciudad y campo. En esta fase exploraremos las bases teóricas y el propósito de ciudad vs campo y servicios públicos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: diferenciar ciudad y campo.",
          "keyTakeaways": [
            "Comprender el propósito de Ciudad vs campo y servicios públicos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué ves en la ciudad? ¿Y en el campo?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soc-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de ciudad vs campo y servicios públicos.",
          "detailedExplanation": "Profundizamos en diferenciar ciudad y campo. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué servicios hay en cada uno?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soc-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de ciudad vs campo y servicios públicos.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-soc-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-soc-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Ciudad vs campo y servicios públicos",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para ciudad vs campo y servicios públicos.",
        "alignsWithStages": [
          "class-soc-gael-01-stage-1",
          "class-soc-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soc-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soc-gael-01-stage-1",
        "prompt": "¿Qué ves en la ciudad? ¿Y en el campo?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soc-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soc-gael-01-stage-3",
        "prompt": "¿Qué servicios hay en cada uno?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soc-gael-01-stage-3",
        "criterion": "Comprensión de Ciudad vs campo y servicios públicos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soc-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Dibuja tu lugar ideal para vivir)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-efi-gael-01",
    "subjectId": "efi-gael",
    "studentId": "gael",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Psicomotricidad",
    "theme": "Psicomotricidad y circuitos",
    "objective": "Desarrollar coordinación y equilibrio",
    "introduction": "Circuitos de movimiento: saltos, equilibrio, rodar.",
    "reading": "Tarjetas de ejercicios",
    "socraticQuestions": [
      "¿Qué movimiento te costó más?",
      "¿Cómo se sintió tu cuerpo?"
    ],
    "resources": [
      {
        "id": "class-efi-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Psicomotricidad y circuitos",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar psicomotricidad y circuitos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-efi-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Psicomotricidad y circuitos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_efi_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-efi-gael-01-act-1",
        "title": "Exploración Inicial: Psicomotricidad y circuitos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre psicomotricidad y circuitos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-efi-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: desarrollar coordinación y equilibrio.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-efi-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Practica el circuito en casa con tu familia) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Practica el circuito en casa con tu familia",
    "reflectionPrompt": "¿Te sentiste más rápido o fuerte después?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_efi_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_efi_gael_01.pdf",
    "learningPath": [
      {
        "id": "class-efi-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Psicomotricidad y circuitos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre psicomotricidad y circuitos.",
          "detailedExplanation": "Circuitos de movimiento: saltos, equilibrio, rodar. En esta fase exploraremos las bases teóricas y el propósito de psicomotricidad y circuitos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: desarrollar coordinación y equilibrio.",
          "keyTakeaways": [
            "Comprender el propósito de Psicomotricidad y circuitos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué movimiento te costó más?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-efi-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de psicomotricidad y circuitos.",
          "detailedExplanation": "Profundizamos en desarrollar coordinación y equilibrio. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo se sintió tu cuerpo?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-efi-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de psicomotricidad y circuitos.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-efi-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-efi-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Psicomotricidad y circuitos",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para psicomotricidad y circuitos.",
        "alignsWithStages": [
          "class-efi-gael-01-stage-1",
          "class-efi-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-efi-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-efi-gael-01-stage-1",
        "prompt": "¿Qué movimiento te costó más?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-efi-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-efi-gael-01-stage-3",
        "prompt": "¿Cómo se sintió tu cuerpo?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-efi-gael-01-stage-3",
        "criterion": "Comprensión de Psicomotricidad y circuitos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-efi-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Practica el circuito en casa con tu familia)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-mat-gael-02",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Figuras planas",
    "theme": "Figuras planas y patrones",
    "objective": "Identificar y clasificar figuras geométricas planas",
    "introduction": "Hoy descubriremos las formas planas: triángulos, cuadrados, círculos.",
    "reading": "Tarjetas de figuras geométricas",
    "socraticQuestions": [
      "¿Cuántos lados tiene un triángulo?",
      "¿Qué figura es un balón?"
    ],
    "resources": [
      {
        "id": "class-mat-gael-02-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Figuras planas y patrones",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar figuras planas y patrones.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Figuras planas y patrones",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-02-act-1",
        "title": "Exploración Inicial: Figuras planas y patrones",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre figuras planas y patrones.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar y clasificar figuras geométricas planas.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Busca 5 objetos con formas geométricas en casa) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Busca 5 objetos con formas geométricas en casa",
    "reflectionPrompt": "¿Qué forma te pareció más fácil de encontrar?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_02.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Figuras planas y patrones",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre figuras planas y patrones.",
          "detailedExplanation": "Hoy descubriremos las formas planas: triángulos, cuadrados, círculos. En esta fase exploraremos las bases teóricas y el propósito de figuras planas y patrones.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar y clasificar figuras geométricas planas.",
          "keyTakeaways": [
            "Comprender el propósito de Figuras planas y patrones.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuántos lados tiene un triángulo?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de figuras planas y patrones.",
          "detailedExplanation": "Profundizamos en identificar y clasificar figuras geométricas planas. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué figura es un balón?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de figuras planas y patrones.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-mat-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-mat-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Figuras planas y patrones",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para figuras planas y patrones.",
        "alignsWithStages": [
          "class-mat-gael-02-stage-1",
          "class-mat-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-gael-02-stage-1",
        "prompt": "¿Cuántos lados tiene un triángulo?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-gael-02-stage-3",
        "prompt": "¿Qué figura es un balón?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-gael-02-stage-3",
        "criterion": "Comprensión de Figuras planas y patrones",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Busca 5 objetos con formas geométricas en casa)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-sci-gael-01",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Ecosistemas",
    "theme": "Ecosistemas y seres vivos",
    "objective": "Explorar seres vivos y su entorno",
    "introduction": "Hoy somos exploradores. Descubriremos ecosistemas.",
    "reading": "Lupa y observación de insectos/plantas",
    "socraticQuestions": [
      "¿Qué seres vivos encuentras?",
      "¿Qué necesitan para vivir?"
    ],
    "resources": [
      {
        "id": "class-sci-gael-01-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Ecosistemas y seres vivos",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "description": "Material de apoyo interactivo para dominar ecosistemas y seres vivos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Ecosistemas y seres vivos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-01-act-1",
        "title": "Exploración Inicial: Ecosistemas y seres vivos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre ecosistemas y seres vivos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: explorar seres vivos y su entorno.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-sci-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Observa 3 seres vivos en tu jardín/parque) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Observa 3 seres vivos en tu jardín/parque",
    "reflectionPrompt": "¿Qué tienen en común todos los seres vivos?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_gael_01.pdf",
    "simulatorUrl": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
    "learningPath": [
      {
        "id": "class-sci-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Ecosistemas y seres vivos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre ecosistemas y seres vivos.",
          "detailedExplanation": "Hoy somos exploradores. Descubriremos ecosistemas. En esta fase exploraremos las bases teóricas y el propósito de ecosistemas y seres vivos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: explorar seres vivos y su entorno.",
          "keyTakeaways": [
            "Comprender el propósito de Ecosistemas y seres vivos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué seres vivos encuentras?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-sci-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de ecosistemas y seres vivos.",
          "detailedExplanation": "Profundizamos en explorar seres vivos y su entorno. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué necesitan para vivir?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-sci-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de ecosistemas y seres vivos.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-sci-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-sci-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Ecosistemas y seres vivos",
        "type": "simulator",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para ecosistemas y seres vivos.",
        "alignsWithStages": [
          "class-sci-gael-01-stage-1",
          "class-sci-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-sci-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-sci-gael-01-stage-1",
        "prompt": "¿Qué seres vivos encuentras?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-sci-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-sci-gael-01-stage-3",
        "prompt": "¿Qué necesitan para vivir?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-sci-gael-01-stage-3",
        "criterion": "Comprensión de Ecosistemas y seres vivos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-sci-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Observa 3 seres vivos en tu jardín/parque)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-ing-gael-02",
    "subjectId": "ing-gael",
    "studentId": "gael",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Vocabulario en inglés",
    "objective": "Aprender colores y números en inglés",
    "introduction": "Juego de colores y números en inglés.",
    "reading": "Tarjetas de colores y números 1-10",
    "socraticQuestions": [
      "¿Qué color es \"red\"?",
      "¿Cómo se dice 5 en inglés?"
    ],
    "resources": [
      {
        "id": "class-ing-gael-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Vocabulario en inglés",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar vocabulario en inglés.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Vocabulario en inglés",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-gael-02-act-1",
        "title": "Exploración Inicial: Vocabulario en inglés",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre vocabulario en inglés.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: aprender colores y números en inglés.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-ing-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Busca 3 objetos rojos y dilo en inglés) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Busca 3 objetos rojos y dilo en inglés",
    "reflectionPrompt": "¿Qué color aprendiste hoy?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_gael_02.pdf",
    "learningPath": [
      {
        "id": "class-ing-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Vocabulario en inglés",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre vocabulario en inglés.",
          "detailedExplanation": "Juego de colores y números en inglés. En esta fase exploraremos las bases teóricas y el propósito de vocabulario en inglés.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: aprender colores y números en inglés.",
          "keyTakeaways": [
            "Comprender el propósito de Vocabulario en inglés.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué color es \"red\"?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-ing-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de vocabulario en inglés.",
          "detailedExplanation": "Profundizamos en aprender colores y números en inglés. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo se dice 5 en inglés?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-ing-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de vocabulario en inglés.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-ing-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-ing-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Vocabulario en inglés",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para vocabulario en inglés.",
        "alignsWithStages": [
          "class-ing-gael-02-stage-1",
          "class-ing-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-ing-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-ing-gael-02-stage-1",
        "prompt": "¿Qué color es \"red\"?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-ing-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-ing-gael-02-stage-3",
        "prompt": "¿Cómo se dice 5 en inglés?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-ing-gael-02-stage-3",
        "criterion": "Comprensión de Vocabulario en inglés",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-ing-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Busca 3 objetos rojos y dilo en inglés)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soft-gael-01",
    "subjectId": "soft-gael",
    "studentId": "gael",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Lógica Algorítmica",
    "theme": "Cuentos animados en Scratch",
    "objective": "Crear una animación simple en Scratch",
    "introduction": "Bienvenido a Programación. Conoceremos a Codi el robot.",
    "reading": "Interfaz de Scratch Jr.",
    "socraticQuestions": [
      "¿Qué hace cada bloque?",
      "¿Cómo haces que se mueva?"
    ],
    "resources": [
      {
        "id": "class-soft-gael-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Cuentos animados en Scratch",
        "url": "https://scratch.mit.edu/projects/editor/",
        "description": "Material de apoyo interactivo para dominar cuentos animados en scratch.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soft-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Cuentos animados en Scratch",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_gael_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-gael-01-act-1",
        "title": "Exploración Inicial: Cuentos animados en Scratch",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre cuentos animados en scratch.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-gael-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: crear una animación simple en scratch.",
        "type": "debugging",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soft-gael-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Haz que tu personaje diga \"Hola\") demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Haz que tu personaje diga \"Hola\"",
    "reflectionPrompt": "¿Qué más quieres que haga tu personaje?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_gael_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_gael_01.pdf",
    "simulatorUrl": "https://scratch.mit.edu/projects/editor/",
    "learningPath": [
      {
        "id": "class-soft-gael-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Cuentos animados en Scratch",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre cuentos animados en scratch.",
          "detailedExplanation": "Bienvenido a Programación. Conoceremos a Codi el robot. En esta fase exploraremos las bases teóricas y el propósito de cuentos animados en scratch.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: crear una animación simple en scratch.",
          "keyTakeaways": [
            "Comprender el propósito de Cuentos animados en Scratch.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué hace cada bloque?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soft-gael-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de cuentos animados en scratch.",
          "detailedExplanation": "Profundizamos en crear una animación simple en scratch. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo haces que se mueva?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soft-gael-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de cuentos animados en scratch.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-soft-gael-01-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-soft-gael-01-dig-1",
        "title": "Simulador / Video Interactivo: Cuentos animados en Scratch",
        "type": "simulator",
        "url": "https://scratch.mit.edu/projects/editor/",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para cuentos animados en scratch.",
        "alignsWithStages": [
          "class-soft-gael-01-stage-1",
          "class-soft-gael-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soft-gael-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soft-gael-01-stage-1",
        "prompt": "¿Qué hace cada bloque?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soft-gael-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soft-gael-01-stage-3",
        "prompt": "¿Cómo haces que se mueva?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soft-gael-01-stage-3",
        "criterion": "Comprensión de Cuentos animados en Scratch",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soft-gael-01-stage-4",
        "criterion": "Calidad de la Entrega (Haz que tu personaje diga \"Hola\")",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-len-gael-03",
    "subjectId": "len-gael",
    "studentId": "gael",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Repaso de cuentos",
    "objective": "Recordar la estructura del cuento",
    "introduction": "Repasamos el cuento que creamos el miércoles.",
    "reading": "Cuento: \"El dragón y la mariposa\"",
    "socraticQuestions": [
      "¿Cuál es el inicio del cuento?",
      "¿Qué pasa al final?"
    ],
    "resources": [
      {
        "id": "class-len-gael-03-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Repaso de cuentos",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar repaso de cuentos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Repaso de cuentos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_gael_03.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-03-act-1",
        "title": "Exploración Inicial: Repaso de cuentos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre repaso de cuentos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-03-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: recordar la estructura del cuento.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-gael-03-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Dibuja el desenlace del cuento) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Dibuja el desenlace del cuento",
    "reflectionPrompt": "¿Qué fue lo más divertido de la semana?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_03.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_gael_03.pdf",
    "learningPath": [
      {
        "id": "class-len-gael-03-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Repaso de cuentos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre repaso de cuentos.",
          "detailedExplanation": "Repasamos el cuento que creamos el miércoles. En esta fase exploraremos las bases teóricas y el propósito de repaso de cuentos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: recordar la estructura del cuento.",
          "keyTakeaways": [
            "Comprender el propósito de Repaso de cuentos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuál es el inicio del cuento?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-gael-03-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de repaso de cuentos.",
          "detailedExplanation": "Profundizamos en recordar la estructura del cuento. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué pasa al final?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-gael-03-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de repaso de cuentos.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-len-gael-03-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-len-gael-03-dig-1",
        "title": "Simulador / Video Interactivo: Repaso de cuentos",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para repaso de cuentos.",
        "alignsWithStages": [
          "class-len-gael-03-stage-1",
          "class-len-gael-03-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-gael-03-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-gael-03-stage-1",
        "prompt": "¿Cuál es el inicio del cuento?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-gael-03-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-gael-03-stage-3",
        "prompt": "¿Qué pasa al final?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-gael-03-stage-3",
        "criterion": "Comprensión de Repaso de cuentos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-gael-03-stage-4",
        "criterion": "Calidad de la Entrega (Dibuja el desenlace del cuento)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-mat-gael-03",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Cuerpos 3D",
    "objective": "Identificar y construir figuras 3D",
    "introduction": "Hoy construimos figuras tridimensionales con Lego.",
    "reading": "Figuras 3D: cubo, prisma, pirámide",
    "socraticQuestions": [
      "¿Cuántas caras tiene un cubo?",
      "¿Qué figura es más estable?"
    ],
    "resources": [
      {
        "id": "class-mat-gael-03-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Cuerpos 3D",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar cuerpos 3d.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Cuerpos 3D",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_03.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-03-act-1",
        "title": "Exploración Inicial: Cuerpos 3D",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre cuerpos 3d.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-03-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar y construir figuras 3d.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-gael-03-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Construye un cubo y una pirámide) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Construye un cubo y una pirámide",
    "reflectionPrompt": "¿Qué diferencia hay entre 2D y 3D?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_03.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_gael_03.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-gael-03-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Cuerpos 3D",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre cuerpos 3d.",
          "detailedExplanation": "Hoy construimos figuras tridimensionales con Lego. En esta fase exploraremos las bases teóricas y el propósito de cuerpos 3d.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar y construir figuras 3d.",
          "keyTakeaways": [
            "Comprender el propósito de Cuerpos 3D.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuántas caras tiene un cubo?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-gael-03-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de cuerpos 3d.",
          "detailedExplanation": "Profundizamos en identificar y construir figuras 3d. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué figura es más estable?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-gael-03-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de cuerpos 3d.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-mat-gael-03-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-mat-gael-03-dig-1",
        "title": "Simulador / Video Interactivo: Cuerpos 3D",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para cuerpos 3d.",
        "alignsWithStages": [
          "class-mat-gael-03-stage-1",
          "class-mat-gael-03-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-gael-03-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-gael-03-stage-1",
        "prompt": "¿Cuántas caras tiene un cubo?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-gael-03-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-gael-03-stage-3",
        "prompt": "¿Qué figura es más estable?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-gael-03-stage-3",
        "criterion": "Comprensión de Cuerpos 3D",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-gael-03-stage-4",
        "criterion": "Calidad de la Entrega (Construye un cubo y una pirámide)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-ing-gael-03",
    "subjectId": "ing-gael",
    "studentId": "gael",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:45 - 09:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Repaso de la semana",
    "objective": "Repasar lo aprendido en inglés",
    "introduction": "Repaso semanal: canciones, colores, números.",
    "reading": "Juego de repaso",
    "socraticQuestions": [
      "¿Qué palabra recuerdas?",
      "¿Puedes contar al 10 en inglés?"
    ],
    "resources": [
      {
        "id": "class-ing-gael-03-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Repaso de la semana",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar repaso de la semana.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Repaso de la semana",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_gael_03.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-gael-03-act-1",
        "title": "Exploración Inicial: Repaso de la semana",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre repaso de la semana.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-gael-03-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: repasar lo aprendido en inglés.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-ing-gael-03-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Enseña a tu familia lo que aprendiste) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Enseña a tu familia lo que aprendiste",
    "reflectionPrompt": "¿Qué fue lo más divertido en inglés?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_gael_03.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_gael_03.pdf",
    "learningPath": [
      {
        "id": "class-ing-gael-03-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Repaso de la semana",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre repaso de la semana.",
          "detailedExplanation": "Repaso semanal: canciones, colores, números. En esta fase exploraremos las bases teóricas y el propósito de repaso de la semana.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: repasar lo aprendido en inglés.",
          "keyTakeaways": [
            "Comprender el propósito de Repaso de la semana.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué palabra recuerdas?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-ing-gael-03-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de repaso de la semana.",
          "detailedExplanation": "Profundizamos en repasar lo aprendido en inglés. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Puedes contar al 10 en inglés?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-ing-gael-03-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de repaso de la semana.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-ing-gael-03-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-ing-gael-03-dig-1",
        "title": "Simulador / Video Interactivo: Repaso de la semana",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para repaso de la semana.",
        "alignsWithStages": [
          "class-ing-gael-03-stage-1",
          "class-ing-gael-03-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-ing-gael-03-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-ing-gael-03-stage-1",
        "prompt": "¿Qué palabra recuerdas?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-ing-gael-03-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-ing-gael-03-stage-3",
        "prompt": "¿Puedes contar al 10 en inglés?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-ing-gael-03-stage-3",
        "criterion": "Comprensión de Repaso de la semana",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-ing-gael-03-stage-4",
        "criterion": "Calidad de la Entrega (Enseña a tu familia lo que aprendiste)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soc-gael-02",
    "subjectId": "soc-gael",
    "studentId": "gael",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Servicios públicos en la comunidad",
    "objective": "Identificar servicios comunitarios",
    "introduction": "¿Qué servicios necesitamos en nuestra comunidad?",
    "reading": "Mapa de servicios: bomberos, hospital, escuela",
    "socraticQuestions": [
      "¿Para qué sirve el hospital?",
      "¿Qué número llamas si hay fuego?"
    ],
    "resources": [
      {
        "id": "class-soc-gael-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Servicios públicos en la comunidad",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar servicios públicos en la comunidad.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Servicios públicos en la comunidad",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-gael-02-act-1",
        "title": "Exploración Inicial: Servicios públicos en la comunidad",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre servicios públicos en la comunidad.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar servicios comunitarios.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soc-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Dibuja un mapa de tu barrio con servicios) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Dibuja un mapa de tu barrio con servicios",
    "reflectionPrompt": "¿Qué servicio es más importante para ti?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_gael_02.pdf",
    "learningPath": [
      {
        "id": "class-soc-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Servicios públicos en la comunidad",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre servicios públicos en la comunidad.",
          "detailedExplanation": "¿Qué servicios necesitamos en nuestra comunidad? En esta fase exploraremos las bases teóricas y el propósito de servicios públicos en la comunidad.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar servicios comunitarios.",
          "keyTakeaways": [
            "Comprender el propósito de Servicios públicos en la comunidad.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Para qué sirve el hospital?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soc-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de servicios públicos en la comunidad.",
          "detailedExplanation": "Profundizamos en identificar servicios comunitarios. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué número llamas si hay fuego?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soc-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de servicios públicos en la comunidad.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-soc-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-soc-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Servicios públicos en la comunidad",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para servicios públicos en la comunidad.",
        "alignsWithStages": [
          "class-soc-gael-02-stage-1",
          "class-soc-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soc-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soc-gael-02-stage-1",
        "prompt": "¿Para qué sirve el hospital?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soc-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soc-gael-02-stage-3",
        "prompt": "¿Qué número llamas si hay fuego?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soc-gael-02-stage-3",
        "criterion": "Comprensión de Servicios públicos en la comunidad",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soc-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Dibuja un mapa de tu barrio con servicios)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soft-gael-02",
    "subjectId": "soft-gael",
    "studentId": "gael",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Cuentos animados en Scratch - Continuación",
    "objective": "Completar animación con múltiples escenas",
    "introduction": "Continuamos nuestra animación. Añadiremos más escenas.",
    "reading": "Bloques de movimiento y sonido",
    "socraticQuestions": [
      "¿Cómo cambias de escena?",
      "¿Qué sonido le pondrás?"
    ],
    "resources": [
      {
        "id": "class-soft-gael-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Cuentos animados en Scratch - Continuación",
        "url": "https://scratch.mit.edu/projects/editor/",
        "description": "Material de apoyo interactivo para dominar cuentos animados en scratch - continuación.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soft-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Cuentos animados en Scratch - Continuación",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_gael_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-gael-02-act-1",
        "title": "Exploración Inicial: Cuentos animados en Scratch - Continuación",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre cuentos animados en scratch - continuación.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-gael-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: completar animación con múltiples escenas.",
        "type": "debugging",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soft-gael-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Añade una segunda escena a tu cuento) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Añade una segunda escena a tu cuento",
    "reflectionPrompt": "¿Qué historia cuentas con tu animación?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_gael_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_gael_02.pdf",
    "simulatorUrl": "https://scratch.mit.edu/projects/editor/",
    "learningPath": [
      {
        "id": "class-soft-gael-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Cuentos animados en Scratch - Continuación",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre cuentos animados en scratch - continuación.",
          "detailedExplanation": "Continuamos nuestra animación. Añadiremos más escenas. En esta fase exploraremos las bases teóricas y el propósito de cuentos animados en scratch - continuación.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: completar animación con múltiples escenas.",
          "keyTakeaways": [
            "Comprender el propósito de Cuentos animados en Scratch - Continuación.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cómo cambias de escena?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soft-gael-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de cuentos animados en scratch - continuación.",
          "detailedExplanation": "Profundizamos en completar animación con múltiples escenas. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué sonido le pondrás?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soft-gael-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de cuentos animados en scratch - continuación.",
          "detailedExplanation": "Resolvemos problemas reales e interactuamos con las herramientas digitales disponibles.",
          "keyTakeaways": [
            "Aplicar la fórmula o método correcto.",
            "Verificar los resultados obtenidos."
          ]
        },
        "guidingQuestion": "¿Qué pasos seguirías para resolver el reto planteado en esta lección?",
        "socraticHints": [
          "Revisa los ejemplos del taller práctico.",
          "Si cometes un error, analiza qué paso necesita ajuste."
        ],
        "minResponseLength": 25,
        "advanceSignal": "¡Resuelto con éxito! Vamos a la etapa de creación.",
        "estimatedMinutes": 25
      },
      {
        "id": "class-soft-gael-02-stage-4",
        "order": 4,
        "title": "4. Creación y Transferencia",
        "type": "create",
        "coreConcept": {
          "summary": "Demostración de maestría mediante la creación de una evidencia.",
          "detailedExplanation": "Diseña y produce tu propio resultado demostrando autonomía y voz crítica.",
          "keyTakeaways": [
            "Sintetizar todo lo aprendido.",
            "Elaborar un producto final claro y bien argumentado."
          ]
        },
        "guidingQuestion": "¿Cómo le explicarías lo que creaste a otra persona?",
        "socraticHints": [
          "Enfócate en la claridad y la creatividad.",
          "Asegúrate de responder a todos los criterios de evaluación."
        ],
        "minResponseLength": 35,
        "advanceSignal": "¡Felicitaciones! Has completado la Masterclass de hoy.",
        "estimatedMinutes": 30
      }
    ],
    "digitalResources": [
      {
        "id": "class-soft-gael-02-dig-1",
        "title": "Simulador / Video Interactivo: Cuentos animados en Scratch - Continuación",
        "type": "simulator",
        "url": "https://scratch.mit.edu/projects/editor/",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para cuentos animados en scratch - continuación.",
        "alignsWithStages": [
          "class-soft-gael-02-stage-1",
          "class-soft-gael-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soft-gael-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soft-gael-02-stage-1",
        "prompt": "¿Cómo cambias de escena?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soft-gael-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soft-gael-02-stage-3",
        "prompt": "¿Qué sonido le pondrás?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soft-gael-02-stage-3",
        "criterion": "Comprensión de Cuentos animados en Scratch - Continuación",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soft-gael-02-stage-4",
        "criterion": "Calidad de la Entrega (Añade una segunda escena a tu cuento)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  }
];
