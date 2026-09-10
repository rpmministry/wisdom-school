import { DailyClass } from '../types';

export const AVRIL_DAILY_CLASSES: DailyClass[] = [
  {
    "id": "class-mat-avril-01",
    "subjectId": "mat-avril",
    "studentId": "avril",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Modelado algebraico",
    "theme": "Modelado algebraico",
    "objective": "Resolver ecuaciones de primer grado",
    "introduction": "Bienvenidos al curso de Álgebra. Hoy iniciaremos con la resolución de ecuaciones.",
    "reading": "Ejercicios del libro página 10-15",
    "socraticQuestions": [
      "Observa la ecuación de ejemplo del contexto: **x + 5 = 12**. ¿Qué representa cada elemento (x, +, 5, =, 12)?",
      "¿Cómo aplicarías el método de la balanza (restar 5 en ambos lados) a un problema cotidiano?"
    ],
    "resources": [
      {
        "id": "class-mat-avril-01-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Modelado algebraico",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar modelado algebraico.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Modelado algebraico",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-avril-01-act-1",
        "title": "Exploración Inicial: Modelado algebraico",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre modelado algebraico.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: resolver ecuaciones de primer grado.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Completa los ejercicios de la página 12) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Completa los ejercicios de la página 12",
    "reflectionPrompt": "¿Qué patrón dedujiste al resolver la ecuación?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_avril_01.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Modelado algebraico",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre modelado algebraico.",
          "detailedExplanation": "Bienvenidos al curso de Álgebra. Hoy iniciaremos con la resolución de ecuaciones. En esta fase exploraremos las bases teóricas y el propósito de modelado algebraico.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: resolver ecuaciones de primer grado.",
          "keyTakeaways": [
            "Comprender el propósito de Modelado algebraico.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "Observa la ecuación de ejemplo del contexto: **x + 5 = 12**. ¿Qué representa cada elemento (x, +, 5, =, 12)?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de modelado algebraico.",
          "detailedExplanation": "Profundizamos en resolver ecuaciones de primer grado. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo aplicarías esto a un problema cotidiano?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de modelado algebraico.",
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
        "id": "class-mat-avril-01-stage-4",
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
        "id": "class-mat-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Modelado algebraico",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para modelado algebraico.",
        "alignsWithStages": [
          "class-mat-avril-01-stage-1",
          "class-mat-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-avril-01-stage-1",
        "prompt": "Observa la ecuación de ejemplo del contexto: **x + 5 = 12**. ¿Qué representa cada elemento (x, +, 5, =, 12)?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-avril-01-stage-3",
        "prompt": "¿Cómo aplicarías esto a un problema cotidiano?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-avril-01-stage-3",
        "criterion": "Comprensión de Modelado algebraico",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Completa los ejercicios de la página 12)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-sci-avril-01",
    "subjectId": "sci-avril",
    "studentId": "avril",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Estructura celular",
    "theme": "Estructura celular",
    "objective": "Identificar componentes de la célula",
    "introduction": "Introducción a la biología celular: qué hay dentro de una célula.",
    "reading": "Diagrama de la célula animal y vegetal",
    "socraticQuestions": [
      "¿Por qué es importante la membrana celular?",
      "¿Qué diferencia una célula de otra?"
    ],
    "resources": [
      {
        "id": "class-sci-avril-01-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Estructura celular",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "description": "Material de apoyo interactivo para dominar estructura celular.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Estructura celular",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-avril-01-act-1",
        "title": "Exploración Inicial: Estructura celular",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre estructura celular.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar componentes de la célula.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-sci-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Etichetar el diagrama de la célula) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Etichetar el diagrama de la célula",
    "reflectionPrompt": "¿Cómo funciona la relación entre estructura y función?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_avril_01.pdf",
    "simulatorUrl": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
    "learningPath": [
      {
        "id": "class-sci-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Estructura celular",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre estructura celular.",
          "detailedExplanation": "Introducción a la biología celular: qué hay dentro de una célula. En esta fase exploraremos las bases teóricas y el propósito de estructura celular.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar componentes de la célula.",
          "keyTakeaways": [
            "Comprender el propósito de Estructura celular.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Por qué es importante la membrana celular?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-sci-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de estructura celular.",
          "detailedExplanation": "Profundizamos en identificar componentes de la célula. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué diferencia una célula de otra?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-sci-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de estructura celular.",
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
        "id": "class-sci-avril-01-stage-4",
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
        "id": "class-sci-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Estructura celular",
        "type": "simulator",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para estructura celular.",
        "alignsWithStages": [
          "class-sci-avril-01-stage-1",
          "class-sci-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-sci-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-sci-avril-01-stage-1",
        "prompt": "¿Por qué es importante la membrana celular?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-sci-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-sci-avril-01-stage-3",
        "prompt": "¿Qué diferencia una célula de otra?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-sci-avril-01-stage-3",
        "criterion": "Comprensión de Estructura celular",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-sci-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Etichetar el diagrama de la célula)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-rel-avril-01",
    "subjectId": "rel-avril",
    "studentId": "avril",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Principios de fe",
    "theme": "Principios de fe y valores universales",
    "objective": "Reflexionar sobre valores universales",
    "introduction": "Bienvenidos a Relación con Dios. Hoy iniciaremos con los principios básicos.",
    "reading": "Extractos de textos sobre ética universal",
    "socraticQuestions": [
      "¿Qué valoresConsideras universales?",
      "¿Cómo vivimos estos principios en nuestro diario?"
    ],
    "resources": [
      {
        "id": "class-rel-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Principios de fe y valores universales",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar principios de fe y valores universales.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-rel-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Principios de fe y valores universales",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_rel_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-rel-avril-01-act-1",
        "title": "Exploración Inicial: Principios de fe y valores universales",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre principios de fe y valores universales.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-rel-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: reflexionar sobre valores universales.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-rel-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Redacta tus 3 valores fundamentales) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Redacta tus 3 valores fundamentales",
    "reflectionPrompt": "¿Cómo han cambiado tus valores con el tiempo?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_rel_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_rel_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-rel-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Principios de fe y valores universales",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre principios de fe y valores universales.",
          "detailedExplanation": "Bienvenidos a Relación con Dios. Hoy iniciaremos con los principios básicos. En esta fase exploraremos las bases teóricas y el propósito de principios de fe y valores universales.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: reflexionar sobre valores universales.",
          "keyTakeaways": [
            "Comprender el propósito de Principios de fe y valores universales.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué valoresConsideras universales?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-rel-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de principios de fe y valores universales.",
          "detailedExplanation": "Profundizamos en reflexionar sobre valores universales. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo vivimos estos principios en nuestro diario?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-rel-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de principios de fe y valores universales.",
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
        "id": "class-rel-avril-01-stage-4",
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
        "id": "class-rel-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Principios de fe y valores universales",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para principios de fe y valores universales.",
        "alignsWithStages": [
          "class-rel-avril-01-stage-1",
          "class-rel-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-rel-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-rel-avril-01-stage-1",
        "prompt": "¿Qué valoresConsideras universales?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-rel-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-rel-avril-01-stage-3",
        "prompt": "¿Cómo vivimos estos principios en nuestro diario?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-rel-avril-01-stage-3",
        "criterion": "Comprensión de Principios de fe y valores universales",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-rel-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Redacta tus 3 valores fundamentales)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-len-avril-lunes-01",
    "subjectId": "len-avril",
    "studentId": "avril",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Comprensión lectora",
    "theme": "Escritura creativa y argumentación",
    "objective": "Desarrollar ensayos argumentativos con voz crítica",
    "introduction": "Hoy practicamos la escritura argumentativa con estructura sólida.",
    "reading": "Modelo de ensayo argumentativo",
    "socraticQuestions": [
      "Usa la estructura del contexto (Tesis → Argumentos → Evidencias → Conclusión). ¿Cuál es tu postura (tesis) sobre un tema que elijas?",
      "¿Qué evidencias concretas usarías para respaldar tu argumento según la estructura?"
    ],
    "resources": [
      {
        "id": "class-len-avril-lunes-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Escritura creativa y argumentación",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar escritura creativa y argumentación.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-avril-lunes-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Escritura creativa y argumentación",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_lunes_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-lunes-01-act-1",
        "title": "Exploración Inicial: Escritura creativa y argumentación",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre escritura creativa y argumentación.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-lunes-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: desarrollar ensayos argumentativos con voz crítica.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-avril-lunes-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Escribe un párrafo argumentativo sobre un tema libre) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Escribe un párrafo argumentativo sobre un tema libre",
    "reflectionPrompt": "¿Cómo fue el proceso de argumentar tu postura?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_lunes_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_lunes_01.pdf",
    "learningPath": [
      {
        "id": "class-len-avril-lunes-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Escritura creativa y argumentación",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre escritura creativa y argumentación.",
          "detailedExplanation": "Hoy practicamos la escritura argumentativa con estructura sólida. En esta fase exploraremos las bases teóricas y el propósito de escritura creativa y argumentación.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: desarrollar ensayos argumentativos con voz crítica.",
          "keyTakeaways": [
            "Comprender el propósito de Escritura creativa y argumentación.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "Usa la estructura del contexto (Tesis → Argumentos → Evidencias → Conclusión). ¿Cuál es tu postura (tesis) sobre un tema que elijas?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-avril-lunes-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de escritura creativa y argumentación.",
          "detailedExplanation": "Profundizamos en desarrollar ensayos argumentativos con voz crítica. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué evidencias concretas usarías para respaldar tu argumento según la estructura (Tesis → Argumentos → Evidencias → Conclusión)?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-avril-lunes-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de escritura creativa y argumentación.",
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
        "id": "class-len-avril-lunes-01-stage-4",
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
        "id": "class-len-avril-lunes-01-dig-1",
        "title": "Simulador / Video Interactivo: Escritura creativa y argumentación",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para escritura creativa y argumentación.",
        "alignsWithStages": [
          "class-len-avril-lunes-01-stage-1",
          "class-len-avril-lunes-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-avril-lunes-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-avril-lunes-01-stage-1",
        "prompt": "Usa la estructura del contexto (Tesis → Argumentos → Evidencias → Conclusión). ¿Cuál es tu postura (tesis) sobre un tema que elijas?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-avril-lunes-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-avril-lunes-01-stage-3",
        "prompt": "¿Qué evidencias concretas usarías para respaldar tu argumento según la estructura (Tesis → Argumentos → Evidencias → Conclusión)?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-avril-lunes-01-stage-3",
        "criterion": "Comprensión de Escritura creativa y argumentación",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-avril-lunes-01-stage-4",
        "criterion": "Calidad de la Entrega (Escribe un párrafo argumentativo sobre un tema libre)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-len-avril-01",
    "subjectId": "len-avril",
    "studentId": "avril",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Comprensión lectora",
    "theme": "Comprensión lectora analítica",
    "objective": "Analizar texto argumentativo",
    "introduction": "Hoy trabajaremos la lectura comprensiva y el ensayo.",
    "reading": "Texto modelo: \"El poder de la palabra\"",
    "socraticQuestions": [
      "Identifica una razón/argumento del autor y explica cómo te diste cuenta."
    ],
    "resources": [
      {
        "id": "class-len-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Comprensión lectora analítica",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar comprensión lectora analítica.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Comprensión lectora analítica",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-01-act-1",
        "title": "Exploración Inicial: Comprensión lectora analítica",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre comprensión lectora analítica.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: analizar texto argumentativo.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Redacta un resumen del texto) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Redacta un resumen del texto",
    "reflectionPrompt": "¿Cómo cambia tu perspectiva al analizar profundamente?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-len-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Comprensión lectora analítica",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre comprensión lectora analítica.",
          "detailedExplanation": "Hoy trabajaremos la lectura comprensiva y el ensayo. En esta fase exploraremos las bases teóricas y el propósito de comprensión lectora analítica.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: analizar texto argumentativo.",
          "keyTakeaways": [
            "Comprender el propósito de Comprensión lectora analítica.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuál es la idea central del concepto que acabas de leer?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de comprensión lectora analítica.",
          "detailedExplanation": "Profundizamos en analizar texto argumentativo. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "Identifica una razón/argumento del autor y explica cómo te diste cuenta (usa el método: ¿qué dice?, ¿por qué lo dice?, ¿qué quiere que yo piense?).",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de comprensión lectora analítica.",
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
        "id": "class-len-avril-01-stage-4",
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
        "id": "class-len-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Comprensión lectora analítica",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para comprensión lectora analítica.",
        "alignsWithStages": [
          "class-len-avril-01-stage-1",
          "class-len-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-avril-01-stage-1",
        "prompt": "¿Cuál es la idea central que has entendido hasta ahora?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-avril-01-stage-3",
        "prompt": "Identifica una razón/argumento del autor y explica cómo te diste cuenta (usa el método: ¿qué dice?, ¿por qué lo dice?, ¿qué quiere que yo piense?).",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-avril-01-stage-3",
        "criterion": "Comprensión de Comprensión lectora analítica",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Redacta un resumen del texto)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soc-avril-01",
    "subjectId": "soc-avril",
    "studentId": "avril",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Historia del Ecuador",
    "theme": "Historia del Ecuador y América Latina",
    "objective": "Ubicar eventos cronológicos",
    "introduction": "Repaso de la historia precolombina y colonial del Ecuador.",
    "reading": "Línea de tiempo histórica del Ecuador",
    "socraticQuestions": [
      "¿Qué civilizaciones habitaram Ecuador?",
      "¿Cómo influyó la colonización?"
    ],
    "resources": [
      {
        "id": "class-soc-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Historia del Ecuador y América Latina",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar historia del ecuador y américa latina.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Historia del Ecuador y América Latina",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-avril-01-act-1",
        "title": "Exploración Inicial: Historia del Ecuador y América Latina",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre historia del ecuador y américa latina.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: ubicar eventos cronológicos.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soc-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Investiga una cultura precolombina) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Investiga una cultura precolombina",
    "reflectionPrompt": "¿Qué legado dejaron las culturas antiguas?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-soc-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Historia del Ecuador y América Latina",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre historia del ecuador y américa latina.",
          "detailedExplanation": "Repaso de la historia precolombina y colonial del Ecuador. En esta fase exploraremos las bases teóricas y el propósito de historia del ecuador y américa latina.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: ubicar eventos cronológicos.",
          "keyTakeaways": [
            "Comprender el propósito de Historia del Ecuador y América Latina.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué civilizaciones habitaram Ecuador?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soc-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de historia del ecuador y américa latina.",
          "detailedExplanation": "Profundizamos en ubicar eventos cronológicos. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo influyó la colonización?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soc-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de historia del ecuador y américa latina.",
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
        "id": "class-soc-avril-01-stage-4",
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
        "id": "class-soc-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Historia del Ecuador y América Latina",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para historia del ecuador y américa latina.",
        "alignsWithStages": [
          "class-soc-avril-01-stage-1",
          "class-soc-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soc-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soc-avril-01-stage-1",
        "prompt": "¿Qué civilizaciones habitaram Ecuador?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soc-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soc-avril-01-stage-3",
        "prompt": "¿Cómo influyó la colonización?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soc-avril-01-stage-3",
        "criterion": "Comprensión de Historia del Ecuador y América Latina",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soc-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Investiga una cultura precolombina)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-adm-avril-01",
    "subjectId": "adm-avril",
    "studentId": "avril",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Modelos de negocio",
    "theme": "Modelos de negocio y finanzas de proyectos",
    "objective": "Identificar tipos de modelos de negocio",
    "introduction": "Introducción al emprendimiento y modelos de negocio.",
    "reading": "Canvas Business Model - Introducción",
    "socraticQuestions": [
      "¿Cuál es tu propuesta de valor?",
      "¿Quién es tu cliente?"
    ],
    "resources": [
      {
        "id": "class-adm-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Modelos de negocio y finanzas de proyectos",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar modelos de negocio y finanzas de proyectos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-adm-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Modelos de negocio y finanzas de proyectos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_adm_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-adm-avril-01-act-1",
        "title": "Exploración Inicial: Modelos de negocio y finanzas de proyectos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre modelos de negocio y finanzas de proyectos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-adm-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar tipos de modelos de negocio.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-adm-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Completa una parte del Canvas) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Completa una parte del Canvas",
    "reflectionPrompt": "¿Qué necesidad satisfaces con tu proyecto?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_adm_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_adm_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-adm-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Modelos de negocio y finanzas de proyectos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre modelos de negocio y finanzas de proyectos.",
          "detailedExplanation": "Introducción al emprendimiento y modelos de negocio. En esta fase exploraremos las bases teóricas y el propósito de modelos de negocio y finanzas de proyectos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar tipos de modelos de negocio.",
          "keyTakeaways": [
            "Comprender el propósito de Modelos de negocio y finanzas de proyectos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuál es tu propuesta de valor?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-adm-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de modelos de negocio y finanzas de proyectos.",
          "detailedExplanation": "Profundizamos en identificar tipos de modelos de negocio. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Quién es tu cliente?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-adm-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de modelos de negocio y finanzas de proyectos.",
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
        "id": "class-adm-avril-01-stage-4",
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
        "id": "class-adm-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Modelos de negocio y finanzas de proyectos",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para modelos de negocio y finanzas de proyectos.",
        "alignsWithStages": [
          "class-adm-avril-01-stage-1",
          "class-adm-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-adm-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-adm-avril-01-stage-1",
        "prompt": "¿Cuál es tu propuesta de valor?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-adm-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-adm-avril-01-stage-3",
        "prompt": "¿Quién es tu cliente?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-adm-avril-01-stage-3",
        "criterion": "Comprensión de Modelos de negocio y finanzas de proyectos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-adm-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Completa una parte del Canvas)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-art-avril-01",
    "subjectId": "art-avril",
    "studentId": "avril",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Composición visual",
    "theme": "Educación Cultural y Artística y composición visual",
    "objective": "Explorar la composición visual y la expresión estética",
    "introduction": "Bienvenidos a Arte (ECA). Descubriremos el lenguaje visual.",
    "reading": "Introducción a la composición visual",
    "socraticQuestions": [
      "¿Qué elementos componen una imagen?",
      "¿Cómo transmite emociones el arte?"
    ],
    "resources": [
      {
        "id": "class-art-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Educación Cultural y Artística y composición visual",
        "url": "https://quickdraw.withgoogle.com/",
        "description": "Material de apoyo interactivo para dominar educación cultural y artística y composición visual.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-art-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Educación Cultural y Artística y composición visual",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_art_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-art-avril-01-act-1",
        "title": "Exploración Inicial: Educación Cultural y Artística y composición visual",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre educación cultural y artística y composición visual.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-art-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: explorar la composición visual y la expresión estética.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-art-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Crea una composición visual libre con colores y formas) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Crea una composición visual libre con colores y formas",
    "reflectionPrompt": "¿Qué sentiste al crear tu composición?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_art_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_art_avril_01.pdf",
    "simulatorUrl": "https://quickdraw.withgoogle.com/",
    "learningPath": [
      {
        "id": "class-art-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Educación Cultural y Artística y composición visual",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre educación cultural y artística y composición visual.",
          "detailedExplanation": "Bienvenidos a Arte (ECA). Descubriremos el lenguaje visual. En esta fase exploraremos las bases teóricas y el propósito de educación cultural y artística y composición visual.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: explorar la composición visual y la expresión estética.",
          "keyTakeaways": [
            "Comprender el propósito de Educación Cultural y Artística y composición visual.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué elementos componen una imagen?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-art-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de educación cultural y artística y composición visual.",
          "detailedExplanation": "Profundizamos en explorar la composición visual y la expresión estética. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo transmite emociones el arte?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-art-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de educación cultural y artística y composición visual.",
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
        "id": "class-art-avril-01-stage-4",
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
        "id": "class-art-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Educación Cultural y Artística y composición visual",
        "type": "simulator",
        "url": "https://quickdraw.withgoogle.com/",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para educación cultural y artística y composición visual.",
        "alignsWithStages": [
          "class-art-avril-01-stage-1",
          "class-art-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-art-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-art-avril-01-stage-1",
        "prompt": "¿Qué elementos componen una imagen?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-art-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-art-avril-01-stage-3",
        "prompt": "¿Cómo transmite emociones el arte?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-art-avril-01-stage-3",
        "criterion": "Comprensión de Educación Cultural y Artística y composición visual",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-art-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Crea una composición visual libre con colores y formas)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soft-avril-01",
    "subjectId": "soft-avril",
    "studentId": "avril",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Pensamiento computacional",
    "theme": "Pensamiento computacional, hardware y Scratch",
    "objective": "Comprender los fundamentos del pensamiento computacional",
    "introduction": "Bienvenidos a Software y Programación. Sesión introductoria.",
    "reading": "Qué es el pensamiento computacional",
    "socraticQuestions": [
      "¿Qué es un algoritmo?",
      "¿Cómo descompones un problema?"
    ],
    "resources": [
      {
        "id": "class-soft-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Pensamiento computacional, hardware y Scratch",
        "url": "https://scratch.mit.edu/projects/editor/",
        "description": "Material de apoyo interactivo para dominar pensamiento computacional, hardware y scratch.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soft-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Pensamiento computacional, hardware y Scratch",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-avril-01-act-1",
        "title": "Exploración Inicial: Pensamiento computacional, hardware y Scratch",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre pensamiento computacional, hardware y scratch.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: comprender los fundamentos del pensamiento computacional.",
        "type": "debugging",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soft-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Experimenta con Scratch Jr.) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Experimenta con Scratch Jr.",
    "reflectionPrompt": "¿Qué paso fue más difícil de algoritmicar?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_avril_01.pdf",
    "simulatorUrl": "https://scratch.mit.edu/projects/editor/",
    "learningPath": [
      {
        "id": "class-soft-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Pensamiento computacional, hardware y Scratch",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre pensamiento computacional, hardware y scratch.",
          "detailedExplanation": "Bienvenidos a Software y Programación. Sesión introductoria. En esta fase exploraremos las bases teóricas y el propósito de pensamiento computacional, hardware y scratch.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: comprender los fundamentos del pensamiento computacional.",
          "keyTakeaways": [
            "Comprender el propósito de Pensamiento computacional, hardware y Scratch.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué es un algoritmo?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soft-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de pensamiento computacional, hardware y scratch.",
          "detailedExplanation": "Profundizamos en comprender los fundamentos del pensamiento computacional. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo descompones un problema?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soft-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de pensamiento computacional, hardware y scratch.",
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
        "id": "class-soft-avril-01-stage-4",
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
        "id": "class-soft-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Pensamiento computacional, hardware y Scratch",
        "type": "simulator",
        "url": "https://scratch.mit.edu/projects/editor/",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para pensamiento computacional, hardware y scratch.",
        "alignsWithStages": [
          "class-soft-avril-01-stage-1",
          "class-soft-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soft-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soft-avril-01-stage-1",
        "prompt": "¿Qué es un algoritmo?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soft-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soft-avril-01-stage-3",
        "prompt": "¿Cómo descompones un problema?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soft-avril-01-stage-3",
        "criterion": "Comprensión de Pensamiento computacional, hardware y Scratch",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soft-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Experimenta con Scratch Jr.)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-len-avril-02",
    "subjectId": "len-avril",
    "studentId": "avril",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Continuación: Análisis de texto argumentativo",
    "objective": "Analizar textos argumentativos complejos",
    "introduction": "Hoy profundizamos en la lectura y escritura argumentativa.",
    "reading": "Texto modelo: \"La educación en el siglo XXI\"",
    "socraticQuestions": [
      "Usa la estructura del contexto (Tesis → Argumento → Evidencia). ¿Cuál es la tesis principal que identificarías en el texto?",
      "¿Qué evidencia concreta presentaría el autor para sostener su argumento?"
    ],
    "resources": [
      {
        "id": "class-len-avril-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Continuación: Análisis de texto argumentativo",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar continuación: análisis de texto argumentativo.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Continuación: Análisis de texto argumentativo",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-02-act-1",
        "title": "Exploración Inicial: Continuación: Análisis de texto argumentativo",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre continuación: análisis de texto argumentativo.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: analizar textos argumentativos complejos.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Redacta un ensayo argumentativo breve) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Redacta un ensayo argumentativo breve",
    "reflectionPrompt": "¿Cómo cambió tu perspectiva tras el análisis?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_02.pdf",
    "learningPath": [
      {
        "id": "class-len-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Continuación: Análisis de texto argumentativo",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre continuación: análisis de texto argumentativo.",
          "detailedExplanation": "Hoy profundizamos en la lectura y escritura argumentativa. En esta fase exploraremos las bases teóricas y el propósito de continuación: análisis de texto argumentativo.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: analizar textos argumentativos complejos.",
          "keyTakeaways": [
            "Comprender el propósito de Continuación: Análisis de texto argumentativo.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "Usa la estructura del contexto (Tesis → Argumento → Evidencia). ¿Cuál es la tesis principal que identificarías en el texto?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de continuación: análisis de texto argumentativo.",
          "detailedExplanation": "Profundizamos en analizar textos argumentativos complejos. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué evidencia concreta presentaría el autor para sostener su argumento (estructura Tesis → Argumento → Evidencia)?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de continuación: análisis de texto argumentativo.",
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
        "id": "class-len-avril-02-stage-4",
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
        "id": "class-len-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Continuación: Análisis de texto argumentativo",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para continuación: análisis de texto argumentativo.",
        "alignsWithStages": [
          "class-len-avril-02-stage-1",
          "class-len-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-avril-02-stage-1",
        "prompt": "Usa la estructura del contexto (Tesis → Argumento → Evidencia). ¿Cuál es la tesis principal que identificarías en el texto?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-avril-02-stage-3",
        "prompt": "¿Qué evidencia concreta presentaría el autor para sostener su argumento (estructura Tesis → Argumento → Evidencia)?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-avril-02-stage-3",
        "criterion": "Comprensión de Continuación: Análisis de texto argumentativo",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Redacta un ensayo argumentativo breve)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-mat-avril-02",
    "subjectId": "mat-avril",
    "studentId": "avril",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Ecuaciones de segundo grado",
    "objective": "Resolver ecuaciones cuadráticas básicas",
    "introduction": "Continuamos con álgebra: ecuaciones cuadráticas.",
    "reading": "Fórmula general y ejemplos",
    "socraticQuestions": [
      "Observa la ecuación de ejemplo del contexto: **x² + 4x − 12 = 0**. Identifica los coeficientes a, b y c.",
      "¿Cuántas soluciones puede tener una ecuación cuadrática y cómo lo sabes?"
    ],
    "resources": [
      {
        "id": "class-mat-avril-02-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Ecuaciones de segundo grado",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar ecuaciones de segundo grado.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Ecuaciones de segundo grado",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-avril-02-act-1",
        "title": "Exploración Inicial: Ecuaciones de segundo grado",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre ecuaciones de segundo grado.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: resolver ecuaciones cuadráticas básicas.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Resuelve 5 ejercicios de ecuaciones cuadráticas) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Resuelve 5 ejercicios de ecuaciones cuadráticas",
    "reflectionPrompt": "¿Qué estrategia usaste para resolverlas?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_avril_02.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Ecuaciones de segundo grado",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre ecuaciones de segundo grado.",
          "detailedExplanation": "Continuamos con álgebra: ecuaciones cuadráticas. En esta fase exploraremos las bases teóricas y el propósito de ecuaciones de segundo grado.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: resolver ecuaciones cuadráticas básicas.",
          "keyTakeaways": [
            "Comprender el propósito de Ecuaciones de segundo grado.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "Observa la ecuación de ejemplo del contexto: **x² + 4x − 12 = 0**. Identifica los coeficientes a, b y c.",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de ecuaciones de segundo grado.",
          "detailedExplanation": "Profundizamos en resolver ecuaciones cuadráticas básicas. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cuántas soluciones puede tener una ecuación cuadrática y cómo lo sabes (discriminante)?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de ecuaciones de segundo grado.",
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
        "id": "class-mat-avril-02-stage-4",
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
        "id": "class-mat-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Ecuaciones de segundo grado",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para ecuaciones de segundo grado.",
        "alignsWithStages": [
          "class-mat-avril-02-stage-1",
          "class-mat-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-avril-02-stage-1",
        "prompt": "Observa la ecuación de ejemplo del contexto: **x² + 4x − 12 = 0**. Identifica los coeficientes a, b y c.",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-avril-02-stage-3",
        "prompt": "¿Cuántas soluciones puede tener una ecuación cuadrática y cómo lo sabes (discriminante)?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-avril-02-stage-3",
        "criterion": "Comprensión de Ecuaciones de segundo grado",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Resuelve 5 ejercicios de ecuaciones cuadráticas)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-efi-avril-01",
    "subjectId": "efi-avril",
    "studentId": "avril",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Acondicionamiento físico",
    "theme": "Acondicionamiento físico y salud postural",
    "objective": "Comprender la importancia de la postura corporal",
    "introduction": "Sesión introductoria de Educación Física: cálculo y conceptos básicos.",
    "reading": "Guía de postura correcta",
    "socraticQuestions": [
      "¿Por qué es importante la postura en el ejercicio?",
      "¿Cómo previene lesiones?"
    ],
    "resources": [
      {
        "id": "class-efi-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Acondicionamiento físico y salud postural",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar acondicionamiento físico y salud postural.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-efi-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Acondicionamiento físico y salud postural",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_efi_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-efi-avril-01-act-1",
        "title": "Exploración Inicial: Acondicionamiento físico y salud postural",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre acondicionamiento físico y salud postural.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-efi-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: comprender la importancia de la postura corporal.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-efi-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Realiza 10 min de estiramientos y registra cómo te sientes) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Realiza 10 min de estiramientos y registra cómo te sientes",
    "reflectionPrompt": "¿Qué sensaciones experimentaste durante los estiramientos?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_efi_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_efi_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-efi-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Acondicionamiento físico y salud postural",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre acondicionamiento físico y salud postural.",
          "detailedExplanation": "Sesión introductoria de Educación Física: cálculo y conceptos básicos. En esta fase exploraremos las bases teóricas y el propósito de acondicionamiento físico y salud postural.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: comprender la importancia de la postura corporal.",
          "keyTakeaways": [
            "Comprender el propósito de Acondicionamiento físico y salud postural.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Por qué es importante la postura en el ejercicio?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-efi-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de acondicionamiento físico y salud postural.",
          "detailedExplanation": "Profundizamos en comprender la importancia de la postura corporal. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo previene lesiones?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-efi-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de acondicionamiento físico y salud postural.",
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
        "id": "class-efi-avril-01-stage-4",
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
        "id": "class-efi-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Acondicionamiento físico y salud postural",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para acondicionamiento físico y salud postural.",
        "alignsWithStages": [
          "class-efi-avril-01-stage-1",
          "class-efi-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-efi-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-efi-avril-01-stage-1",
        "prompt": "¿Por qué es importante la postura en el ejercicio?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-efi-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-efi-avril-01-stage-3",
        "prompt": "¿Cómo previene lesiones?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-efi-avril-01-stage-3",
        "criterion": "Comprensión de Acondicionamiento físico y salud postural",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-efi-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Realiza 10 min de estiramientos y registra cómo te sientes)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-sci-avril-02",
    "subjectId": "sci-avril",
    "studentId": "avril",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Continuación: Bioquímica básica",
    "objective": "Identificar biomoléculas y sus funciones",
    "introduction": "Continuación de la estructura celular: explorando biomoléculas.",
    "reading": "Tipos de carbohidratos, proteínas y lípidos",
    "socraticQuestions": [
      "¿Qué son los macronutrientes?",
      "¿Cómo funcionan las enzimas?"
    ],
    "resources": [
      {
        "id": "class-sci-avril-02-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Continuación: Bioquímica básica",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "description": "Material de apoyo interactivo para dominar continuación: bioquímica básica.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Continuación: Bioquímica básica",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-avril-02-act-1",
        "title": "Exploración Inicial: Continuación: Bioquímica básica",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre continuación: bioquímica básica.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar biomoléculas y sus funciones.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-sci-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Investiga una biomolécula específica) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Investiga una biomolécula específica",
    "reflectionPrompt": "¿Por qué son esenciales estas moléculas para la vida?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_sci_avril_02.pdf",
    "simulatorUrl": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
    "learningPath": [
      {
        "id": "class-sci-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Continuación: Bioquímica básica",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre continuación: bioquímica básica.",
          "detailedExplanation": "Continuación de la estructura celular: explorando biomoléculas. En esta fase exploraremos las bases teóricas y el propósito de continuación: bioquímica básica.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar biomoléculas y sus funciones.",
          "keyTakeaways": [
            "Comprender el propósito de Continuación: Bioquímica básica.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué son los macronutrientes?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-sci-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de continuación: bioquímica básica.",
          "detailedExplanation": "Profundizamos en identificar biomoléculas y sus funciones. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo funcionan las enzimas?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-sci-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de continuación: bioquímica básica.",
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
        "id": "class-sci-avril-02-stage-4",
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
        "id": "class-sci-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Continuación: Bioquímica básica",
        "type": "simulator",
        "url": "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_es.html",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para continuación: bioquímica básica.",
        "alignsWithStages": [
          "class-sci-avril-02-stage-1",
          "class-sci-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-sci-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-sci-avril-02-stage-1",
        "prompt": "¿Qué son los macronutrientes?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-sci-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-sci-avril-02-stage-3",
        "prompt": "¿Cómo funcionan las enzimas?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-sci-avril-02-stage-3",
        "criterion": "Comprensión de Continuación: Bioquímica básica",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-sci-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Investiga una biomolécula específica)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-pol-avril-01",
    "subjectId": "pol-avril",
    "studentId": "avril",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Sistemas de gobierno",
    "theme": "Sistemas de gobierno y participación ciudadana",
    "objective": "Comprender los sistemas políticos básicos",
    "introduction": "Introducción a los sistemas de gobierno y ciudadanía.",
    "reading": "Tipos de gobierno: democracia, monarquía, dictadura",
    "socraticQuestions": [
      "¿Cuál es el sistema ideal para una sociedad?",
      "¿Qué derechos y deberes tengo como ciudadano?"
    ],
    "resources": [
      {
        "id": "class-pol-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Sistemas de gobierno y participación ciudadana",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar sistemas de gobierno y participación ciudadana.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-pol-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Sistemas de gobierno y participación ciudadana",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_pol_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-pol-avril-01-act-1",
        "title": "Exploración Inicial: Sistemas de gobierno y participación ciudadana",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre sistemas de gobierno y participación ciudadana.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-pol-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: comprender los sistemas políticos básicos.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-pol-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Investiga tu sistema de gobierno local) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Investiga tu sistema de gobierno local",
    "reflectionPrompt": "¿Cómo participas actualmente en decisiones comunitarias?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_pol_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_pol_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-pol-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Sistemas de gobierno y participación ciudadana",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre sistemas de gobierno y participación ciudadana.",
          "detailedExplanation": "Introducción a los sistemas de gobierno y ciudadanía. En esta fase exploraremos las bases teóricas y el propósito de sistemas de gobierno y participación ciudadana.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: comprender los sistemas políticos básicos.",
          "keyTakeaways": [
            "Comprender el propósito de Sistemas de gobierno y participación ciudadana.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuál es el sistema ideal para una sociedad?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-pol-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de sistemas de gobierno y participación ciudadana.",
          "detailedExplanation": "Profundizamos en comprender los sistemas políticos básicos. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué derechos y deberes tengo como ciudadano?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-pol-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de sistemas de gobierno y participación ciudadana.",
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
        "id": "class-pol-avril-01-stage-4",
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
        "id": "class-pol-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Sistemas de gobierno y participación ciudadana",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para sistemas de gobierno y participación ciudadana.",
        "alignsWithStages": [
          "class-pol-avril-01-stage-1",
          "class-pol-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-pol-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-pol-avril-01-stage-1",
        "prompt": "¿Cuál es el sistema ideal para una sociedad?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-pol-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-pol-avril-01-stage-3",
        "prompt": "¿Qué derechos y deberes tengo como ciudadano?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-pol-avril-01-stage-3",
        "criterion": "Comprensión de Sistemas de gobierno y participación ciudadana",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-pol-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Investiga tu sistema de gobierno local)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-ing-avril-01",
    "subjectId": "ing-avril",
    "studentId": "avril",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Fluidez comunicativa",
    "theme": "Desarrollo de fluidez comunicativa y debates en inglés",
    "objective": "Practicar expresión oral en inglés",
    "introduction": "Bienvenidos a Inglés. Presentaciones y objetivos del curso.",
    "reading": "Introducción al curso de inglés",
    "socraticQuestions": [
      "¿Why are you learning English?",
      "¿What do you hope to achieve?"
    ],
    "resources": [
      {
        "id": "class-ing-avril-01-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Desarrollo de fluidez comunicativa y debates en inglés",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar desarrollo de fluidez comunicativa y debates en inglés.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Desarrollo de fluidez comunicativa y debates en inglés",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_avril_01.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-avril-01-act-1",
        "title": "Exploración Inicial: Desarrollo de fluidez comunicativa y debates en inglés",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre desarrollo de fluidez comunicativa y debates en inglés.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-avril-01-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: practicar expresión oral en inglés.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-ing-avril-01-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Prepara una presentación de 1 minuto sobre ti) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Prepara una presentación de 1 minuto sobre ti",
    "reflectionPrompt": "¿Qué dificultades tienes al hablar en inglés?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_avril_01.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_avril_01.pdf",
    "learningPath": [
      {
        "id": "class-ing-avril-01-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Desarrollo de fluidez comunicativa y debates en inglés",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre desarrollo de fluidez comunicativa y debates en inglés.",
          "detailedExplanation": "Bienvenidos a Inglés. Presentaciones y objetivos del curso. En esta fase exploraremos las bases teóricas y el propósito de desarrollo de fluidez comunicativa y debates en inglés.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: practicar expresión oral en inglés.",
          "keyTakeaways": [
            "Comprender el propósito de Desarrollo de fluidez comunicativa y debates en inglés.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Why are you learning English?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-ing-avril-01-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de desarrollo de fluidez comunicativa y debates en inglés.",
          "detailedExplanation": "Profundizamos en practicar expresión oral en inglés. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿What do you hope to achieve?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-ing-avril-01-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de desarrollo de fluidez comunicativa y debates en inglés.",
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
        "id": "class-ing-avril-01-stage-4",
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
        "id": "class-ing-avril-01-dig-1",
        "title": "Simulador / Video Interactivo: Desarrollo de fluidez comunicativa y debates en inglés",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para desarrollo de fluidez comunicativa y debates en inglés.",
        "alignsWithStages": [
          "class-ing-avril-01-stage-1",
          "class-ing-avril-01-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-ing-avril-01-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-ing-avril-01-stage-1",
        "prompt": "¿Why are you learning English?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-ing-avril-01-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-ing-avril-01-stage-3",
        "prompt": "¿What do you hope to achieve?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-ing-avril-01-stage-3",
        "criterion": "Comprensión de Desarrollo de fluidez comunicativa y debates en inglés",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-ing-avril-01-stage-4",
        "criterion": "Calidad de la Entrega (Prepara una presentación de 1 minuto sobre ti)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-len-avril-03",
    "subjectId": "len-avril",
    "studentId": "avril",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Escritura creativa y argumentación",
    "objective": "Desarrollar ensayos argumentativos con voz crítica",
    "introduction": "Hoy practicamos la escritura argumentativa con estructura sólida.",
    "reading": "Modelo de ensayo argumentativo",
    "socraticQuestions": [
      "Usa la estructura del contexto (Tesis → Argumentos → Evidencias → Conclusión). ¿Cuál es tu postura (tesis) sobre un tema que elijas?",
      "¿Qué evidencias concretas usarías para respaldar tu argumento según la estructura?"
    ],
    "resources": [
      {
        "id": "class-len-avril-03-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Escritura creativa y argumentación",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar escritura creativa y argumentación.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-avril-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Escritura creativa y argumentación",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_03.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-03-act-1",
        "title": "Exploración Inicial: Escritura creativa y argumentación",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre escritura creativa y argumentación.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-03-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: desarrollar ensayos argumentativos con voz crítica.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-len-avril-03-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Escribe un párrafo argumentativo sobre un tema libre) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Escribe un párrafo argumentativo sobre un tema libre",
    "reflectionPrompt": "¿Cómo fue el proceso de argumentar tu postura?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_03.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_len_avril_03.pdf",
    "learningPath": [
      {
        "id": "class-len-avril-03-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Escritura creativa y argumentación",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre escritura creativa y argumentación.",
          "detailedExplanation": "Hoy practicamos la escritura argumentativa con estructura sólida. En esta fase exploraremos las bases teóricas y el propósito de escritura creativa y argumentación.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: desarrollar ensayos argumentativos con voz crítica.",
          "keyTakeaways": [
            "Comprender el propósito de Escritura creativa y argumentación.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "Usa la estructura del contexto (Tesis → Argumentos → Evidencias → Conclusión). ¿Cuál es tu postura (tesis) sobre un tema que elijas?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-len-avril-03-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de escritura creativa y argumentación.",
          "detailedExplanation": "Profundizamos en desarrollar ensayos argumentativos con voz crítica. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué evidencias concretas usarías para respaldar tu argumento según la estructura (Tesis → Argumentos → Evidencias → Conclusión)?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-len-avril-03-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de escritura creativa y argumentación.",
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
        "id": "class-len-avril-03-stage-4",
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
        "id": "class-len-avril-03-dig-1",
        "title": "Simulador / Video Interactivo: Escritura creativa y argumentación",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para escritura creativa y argumentación.",
        "alignsWithStages": [
          "class-len-avril-03-stage-1",
          "class-len-avril-03-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-len-avril-03-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-len-avril-03-stage-1",
        "prompt": "Usa la estructura del contexto (Tesis → Argumentos → Evidencias → Conclusión). ¿Cuál es tu postura (tesis) sobre un tema que elijas?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-len-avril-03-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-len-avril-03-stage-3",
        "prompt": "¿Qué evidencias concretas usarías para respaldar tu argumento según la estructura (Tesis → Argumentos → Evidencias → Conclusión)?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-len-avril-03-stage-3",
        "criterion": "Comprensión de Escritura creativa y argumentación",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-len-avril-03-stage-4",
        "criterion": "Calidad de la Entrega (Escribe un párrafo argumentativo sobre un tema libre)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-adm-avril-03",
    "subjectId": "adm-avril",
    "studentId": "avril",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Estrategias de marketing",
    "objective": "Identificar las 4P del marketing",
    "introduction": "Continuamos con marketing: producto, precio, plaza y promoción.",
    "reading": "Mezcla de marketing - Las 4P",
    "socraticQuestions": [
      "¿Qué producto o servicio te gustaría lanzar?",
      "¿Cómo lo darías a conocer?"
    ],
    "resources": [
      {
        "id": "class-adm-avril-03-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Estrategias de marketing",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar estrategias de marketing.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-adm-avril-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Estrategias de marketing",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_adm_avril_03.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-adm-avril-03-act-1",
        "title": "Exploración Inicial: Estrategias de marketing",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre estrategias de marketing.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-adm-avril-03-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar las 4p del marketing.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-adm-avril-03-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Diseña las 4P para tu emprendimiento) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Diseña las 4P para tu emprendimiento",
    "reflectionPrompt": "¿Qué fue lo más desafiante al diseñar tu mezcla?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_adm_avril_03.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_adm_avril_03.pdf",
    "learningPath": [
      {
        "id": "class-adm-avril-03-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Estrategias de marketing",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre estrategias de marketing.",
          "detailedExplanation": "Continuamos con marketing: producto, precio, plaza y promoción. En esta fase exploraremos las bases teóricas y el propósito de estrategias de marketing.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar las 4p del marketing.",
          "keyTakeaways": [
            "Comprender el propósito de Estrategias de marketing.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué producto o servicio te gustaría lanzar?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-adm-avril-03-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de estrategias de marketing.",
          "detailedExplanation": "Profundizamos en identificar las 4p del marketing. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo lo darías a conocer?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-adm-avril-03-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de estrategias de marketing.",
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
        "id": "class-adm-avril-03-stage-4",
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
        "id": "class-adm-avril-03-dig-1",
        "title": "Simulador / Video Interactivo: Estrategias de marketing",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para estrategias de marketing.",
        "alignsWithStages": [
          "class-adm-avril-03-stage-1",
          "class-adm-avril-03-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-adm-avril-03-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-adm-avril-03-stage-1",
        "prompt": "¿Qué producto o servicio te gustaría lanzar?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-adm-avril-03-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-adm-avril-03-stage-3",
        "prompt": "¿Cómo lo darías a conocer?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-adm-avril-03-stage-3",
        "criterion": "Comprensión de Estrategias de marketing",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-adm-avril-03-stage-4",
        "criterion": "Calidad de la Entrega (Diseña las 4P para tu emprendimiento)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-mat-avril-02",
    "subjectId": "mat-avril",
    "studentId": "avril",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Resolución de problemas cotidianos",
    "objective": "Aplicar álgebra a problemas reales",
    "introduction": "Hoy aplicaremos lo aprendido a problemas de la vida diaria.",
    "reading": "Problemas de aplicación algebraica",
    "socraticQuestions": [
      "¿Qué estrategia usaste para resolver este problema?",
      "¿Cómo verificaste tu solución?"
    ],
    "resources": [
      {
        "id": "class-mat-avril-02-res-1",
        "type": "simulator",
        "title": "Recurso Interactivo: Resolución de problemas cotidianos",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Material de apoyo interactivo para dominar resolución de problemas cotidianos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Resolución de problemas cotidianos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-avril-02-act-1",
        "title": "Exploración Inicial: Resolución de problemas cotidianos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre resolución de problemas cotidianos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: aplicar álgebra a problemas reales.",
        "type": "practice",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-mat-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Resuelve 3 problemas de aplicación) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Resuelve 3 problemas de aplicación",
    "reflectionPrompt": "¿En qué situaciones del mundo real usarías álgebra?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_mat_avril_02.pdf",
    "simulatorUrl": "https://www.geogebra.org/m/XU9z5m9X",
    "learningPath": [
      {
        "id": "class-mat-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Resolución de problemas cotidianos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre resolución de problemas cotidianos.",
          "detailedExplanation": "Hoy aplicaremos lo aprendido a problemas de la vida diaria. En esta fase exploraremos las bases teóricas y el propósito de resolución de problemas cotidianos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: aplicar álgebra a problemas reales.",
          "keyTakeaways": [
            "Comprender el propósito de Resolución de problemas cotidianos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué estrategia usaste para resolver este problema?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-mat-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de resolución de problemas cotidianos.",
          "detailedExplanation": "Profundizamos en aplicar álgebra a problemas reales. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo verificaste tu solución?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-mat-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de resolución de problemas cotidianos.",
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
        "id": "class-mat-avril-02-stage-4",
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
        "id": "class-mat-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Resolución de problemas cotidianos",
        "type": "simulator",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para resolución de problemas cotidianos.",
        "alignsWithStages": [
          "class-mat-avril-02-stage-1",
          "class-mat-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-mat-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-mat-avril-02-stage-1",
        "prompt": "¿Qué estrategia usaste para resolver este problema?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-mat-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-mat-avril-02-stage-3",
        "prompt": "¿Cómo verificaste tu solución?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-mat-avril-02-stage-3",
        "criterion": "Comprensión de Resolución de problemas cotidianos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-mat-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Resuelve 3 problemas de aplicación)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-ing-avril-02",
    "subjectId": "ing-avril",
    "studentId": "avril",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:45 - 09:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Desarrollo de vocabulario en inglés",
    "objective": "Ampliar vocabulario básico en inglés",
    "introduction": "Continuación del curso de inglés. Repaso y práctica.",
    "reading": "Vocabulario básico y saludos",
    "socraticQuestions": [
      "¿Qué saludos conoces en inglés?",
      "¿Cómo te presentas en inglés?"
    ],
    "resources": [
      {
        "id": "class-ing-avril-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Desarrollo de vocabulario en inglés",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar desarrollo de vocabulario en inglés.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Desarrollo de vocabulario en inglés",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-avril-02-act-1",
        "title": "Exploración Inicial: Desarrollo de vocabulario en inglés",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre desarrollo de vocabulario en inglés.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: ampliar vocabulario básico en inglés.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-ing-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Memoriza 10 nuevas palabras en inglés) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Memoriza 10 nuevas palabras en inglés",
    "reflectionPrompt": "¿Qué palabras nuevas aprendiste hoy?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_ing_avril_02.pdf",
    "learningPath": [
      {
        "id": "class-ing-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Desarrollo de vocabulario en inglés",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre desarrollo de vocabulario en inglés.",
          "detailedExplanation": "Continuación del curso de inglés. Repaso y práctica. En esta fase exploraremos las bases teóricas y el propósito de desarrollo de vocabulario en inglés.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: ampliar vocabulario básico en inglés.",
          "keyTakeaways": [
            "Comprender el propósito de Desarrollo de vocabulario en inglés.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué saludos conoces en inglés?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-ing-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de desarrollo de vocabulario en inglés.",
          "detailedExplanation": "Profundizamos en ampliar vocabulario básico en inglés. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Cómo te presentas en inglés?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-ing-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de desarrollo de vocabulario en inglés.",
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
        "id": "class-ing-avril-02-stage-4",
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
        "id": "class-ing-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Desarrollo de vocabulario en inglés",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para desarrollo de vocabulario en inglés.",
        "alignsWithStages": [
          "class-ing-avril-02-stage-1",
          "class-ing-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-ing-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-ing-avril-02-stage-1",
        "prompt": "¿Qué saludos conoces en inglés?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-ing-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-ing-avril-02-stage-3",
        "prompt": "¿Cómo te presentas en inglés?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-ing-avril-02-stage-3",
        "criterion": "Comprensión de Desarrollo de vocabulario en inglés",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-ing-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Memoriza 10 nuevas palabras en inglés)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soc-avril-02",
    "subjectId": "soc-avril",
    "studentId": "avril",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Comprensión de procesos históricos",
    "objective": "Analizar causas y consecuencias históricas",
    "introduction": "Continuación de historia: de la independencia a la república.",
    "reading": "El proceso de independencia en Ecuador",
    "socraticQuestions": [
      "¿Cuáles fueron las causas de la independencia?",
      "¿Qué consecuencias perduran hoy?"
    ],
    "resources": [
      {
        "id": "class-soc-avril-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Comprensión de procesos históricos",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar comprensión de procesos históricos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Comprensión de procesos históricos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-avril-02-act-1",
        "title": "Exploración Inicial: Comprensión de procesos históricos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre comprensión de procesos históricos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: analizar causas y consecuencias históricas.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soc-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Investiga la fecha de independencia de tu país) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Investiga la fecha de independencia de tu país",
    "reflectionPrompt": "¿Cómo impactan los eventos históricos en tu vida actual?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soc_avril_02.pdf",
    "learningPath": [
      {
        "id": "class-soc-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Comprensión de procesos históricos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre comprensión de procesos históricos.",
          "detailedExplanation": "Continuación de historia: de la independencia a la república. En esta fase exploraremos las bases teóricas y el propósito de comprensión de procesos históricos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: analizar causas y consecuencias históricas.",
          "keyTakeaways": [
            "Comprender el propósito de Comprensión de procesos históricos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cuáles fueron las causas de la independencia?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soc-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de comprensión de procesos históricos.",
          "detailedExplanation": "Profundizamos en analizar causas y consecuencias históricas. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué consecuencias perduran hoy?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soc-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de comprensión de procesos históricos.",
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
        "id": "class-soc-avril-02-stage-4",
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
        "id": "class-soc-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Comprensión de procesos históricos",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para comprensión de procesos históricos.",
        "alignsWithStages": [
          "class-soc-avril-02-stage-1",
          "class-soc-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soc-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soc-avril-02-stage-1",
        "prompt": "¿Cuáles fueron las causas de la independencia?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soc-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soc-avril-02-stage-3",
        "prompt": "¿Qué consecuencias perduran hoy?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soc-avril-02-stage-3",
        "criterion": "Comprensión de Comprensión de procesos históricos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soc-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Investiga la fecha de independencia de tu país)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-adm-avril-02",
    "subjectId": "adm-avril",
    "studentId": "avril",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Modelos de negocio y finanzas",
    "objective": "Identificar indicadores financieros básicos",
    "introduction": "Finanzas básicas para emprendimientos: ingresos, costos y utilidades.",
    "reading": "Estados financieros básicos",
    "socraticQuestions": [
      "¿Qué son los ingresos?, ¿Qué son los costos?",
      "¿Qué es la utilidad neta?"
    ],
    "resources": [
      {
        "id": "class-adm-avril-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Modelos de negocio y finanzas",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar modelos de negocio y finanzas.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-adm-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Modelos de negocio y finanzas",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_adm_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-adm-avril-02-act-1",
        "title": "Exploración Inicial: Modelos de negocio y finanzas",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre modelos de negocio y finanzas.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-adm-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: identificar indicadores financieros básicos.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-adm-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Clasifica los costos de tu proyecto en fijos y variables) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Clasifica los costos de tu proyecto en fijos y variables",
    "reflectionPrompt": "¿Por qué es importante distinguir costos fijos de variables?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_adm_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_adm_avril_02.pdf",
    "learningPath": [
      {
        "id": "class-adm-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Modelos de negocio y finanzas",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre modelos de negocio y finanzas.",
          "detailedExplanation": "Finanzas básicas para emprendimientos: ingresos, costos y utilidades. En esta fase exploraremos las bases teóricas y el propósito de modelos de negocio y finanzas.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: identificar indicadores financieros básicos.",
          "keyTakeaways": [
            "Comprender el propósito de Modelos de negocio y finanzas.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué son los ingresos?, ¿Qué son los costos?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-adm-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de modelos de negocio y finanzas.",
          "detailedExplanation": "Profundizamos en identificar indicadores financieros básicos. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué es la utilidad neta?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-adm-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de modelos de negocio y finanzas.",
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
        "id": "class-adm-avril-02-stage-4",
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
        "id": "class-adm-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Modelos de negocio y finanzas",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para modelos de negocio y finanzas.",
        "alignsWithStages": [
          "class-adm-avril-02-stage-1",
          "class-adm-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-adm-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-adm-avril-02-stage-1",
        "prompt": "¿Qué son los ingresos?, ¿Qué son los costos?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-adm-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-adm-avril-02-stage-3",
        "prompt": "¿Qué es la utilidad neta?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-adm-avril-02-stage-3",
        "criterion": "Comprensión de Modelos de negocio y finanzas",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-adm-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Clasifica los costos de tu proyecto en fijos y variables)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-soft-avril-02",
    "subjectId": "soft-avril",
    "studentId": "avril",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:45 - 09:30 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Scratch y creación de proyectos",
    "objective": "Crear un proyecto interactivo en Scratch",
    "introduction": "Continuamos con Scratch: creación de animaciones y juegos.",
    "reading": "Ejemplos de proyectos en Scratch",
    "socraticQuestions": [
      "¿Qué quieres crear hoy?",
      "¿Qué bloques necesitas?"
    ],
    "resources": [
      {
        "id": "class-soft-avril-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Scratch y creación de proyectos",
        "url": "https://scratch.mit.edu/projects/editor/",
        "description": "Material de apoyo interactivo para dominar scratch y creación de proyectos.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soft-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Scratch y creación de proyectos",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-avril-02-act-1",
        "title": "Exploración Inicial: Scratch y creación de proyectos",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre scratch y creación de proyectos.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: crear un proyecto interactivo en scratch.",
        "type": "debugging",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-soft-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Crea un sprite que se mueva) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Crea un sprite que se mueva",
    "reflectionPrompt": "¿Qué fue lo más difícil del proyecto?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_soft_avril_02.pdf",
    "simulatorUrl": "https://scratch.mit.edu/projects/editor/",
    "learningPath": [
      {
        "id": "class-soft-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Scratch y creación de proyectos",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre scratch y creación de proyectos.",
          "detailedExplanation": "Continuamos con Scratch: creación de animaciones y juegos. En esta fase exploraremos las bases teóricas y el propósito de scratch y creación de proyectos.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: crear un proyecto interactivo en scratch.",
          "keyTakeaways": [
            "Comprender el propósito de Scratch y creación de proyectos.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Qué quieres crear hoy?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-soft-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de scratch y creación de proyectos.",
          "detailedExplanation": "Profundizamos en crear un proyecto interactivo en scratch. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué bloques necesitas?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-soft-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de scratch y creación de proyectos.",
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
        "id": "class-soft-avril-02-stage-4",
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
        "id": "class-soft-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Scratch y creación de proyectos",
        "type": "simulator",
        "url": "https://scratch.mit.edu/projects/editor/",
        "platform": "Web Simulator",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para scratch y creación de proyectos.",
        "alignsWithStages": [
          "class-soft-avril-02-stage-1",
          "class-soft-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-soft-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-soft-avril-02-stage-1",
        "prompt": "¿Qué quieres crear hoy?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-soft-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-soft-avril-02-stage-3",
        "prompt": "¿Qué bloques necesitas?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-soft-avril-02-stage-3",
        "criterion": "Comprensión de Scratch y creación de proyectos",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-soft-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Crea un sprite que se mueva)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  },
  {
    "id": "class-pol-avril-02",
    "subjectId": "pol-avril",
    "studentId": "avril",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Continuación",
    "theme": "Participación ciudadana",
    "objective": "Comprender los mecanismos de participación ciudadana",
    "introduction": "Exploramos cómo los ciudadanos participan en decisiones públicas.",
    "reading": "Mecanismos de participación ciudadana",
    "socraticQuestions": [
      "¿Cómo puedes participar en tu comunidad?",
      "¿Qué роль juegas tú?"
    ],
    "resources": [
      {
        "id": "class-pol-avril-02-res-1",
        "type": "video",
        "title": "Recurso Interactivo: Participación ciudadana",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "description": "Material de apoyo interactivo para dominar participación ciudadana.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-pol-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica Impresa - Participación ciudadana",
        "url": "https://wisdom-school.edu/guides/Guia_Didactica_class_pol_avril_02.pdf",
        "description": "Resumen conceptual y ejercicios guiados para la lección de hoy.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-pol-avril-02-act-1",
        "title": "Exploración Inicial: Participación ciudadana",
        "description": "Lee la introducción de la clase y responde la pregunta disparadora sobre participación ciudadana.",
        "type": "reflection",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-pol-avril-02-act-2",
        "title": "Taller Práctico Guiado",
        "description": "Aplica el método socrático para resolver el reto principal de la lección: comprender los mecanismos de participación ciudadana.",
        "type": "analysis",
        "points": 25,
        "completed": false
      },
      {
        "id": "class-pol-avril-02-act-3",
        "title": "Evidencia de Aprendizaje y Creación",
        "description": "Prepara tu entrega final (Investiga un mecanismo de participación en tu ciudad) demostrando tu propio razonamiento.",
        "type": "project",
        "points": 30,
        "completed": false
      }
    ],
    "homeworkTask": "Investiga un mecanismo de participación en tu ciudad",
    "reflectionPrompt": "¿Por qué es importante participar?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_pol_avril_02.pdf",
    "guideUrl": "https://wisdom-school.edu/guides/Guia_Didactica_class_pol_avril_02.pdf",
    "learningPath": [
      {
        "id": "class-pol-avril-02-stage-1",
        "order": 1,
        "title": "1. Descubrimiento: Participación ciudadana",
        "type": "concept",
        "coreConcept": {
          "summary": "Concepto central de la lección sobre participación ciudadana.",
          "detailedExplanation": "Exploramos cómo los ciudadanos participan en decisiones públicas. En esta fase exploraremos las bases teóricas y el propósito de participación ciudadana.",
          "visualAnalogy": "Imagínate esto como un engranaje donde cada pieza encaja para lograr: comprender los mecanismos de participación ciudadana.",
          "keyTakeaways": [
            "Comprender el propósito de Participación ciudadana.",
            "Identificar los elementos clave presentados por el profesor IA.",
            "Relacionar el concepto con ejemplos de la vida cotidiana."
          ]
        },
        "guidingQuestion": "¿Cómo puedes participar en tu comunidad?",
        "socraticHints": [
          "Piensa en cómo se aplica esto en tu día a día.",
          "Observa los detalles en el material de lectura."
        ],
        "minResponseLength": 20,
        "advanceSignal": "¡Excelente comprensión inicial! Pasemos a profundizar.",
        "estimatedMinutes": 15
      },
      {
        "id": "class-pol-avril-02-stage-2",
        "order": 2,
        "title": "2. Profundización Socrática",
        "type": "deepen",
        "coreConcept": {
          "summary": "Análisis detallado de las reglas y principios de participación ciudadana.",
          "detailedExplanation": "Profundizamos en comprender los mecanismos de participación ciudadana. Analizaremos casos concretos y estructuras para consolidar el aprendizaje.",
          "visualAnalogy": "Es como mirar a través de un microscopio para ver las partes internas del concepto.",
          "keyTakeaways": [
            "Descomponer el problema en partes más pequeñas.",
            "Validar hipótesis mediante preguntas de reflexión."
          ]
        },
        "guidingQuestion": "¿Qué роль juegas tú?",
        "socraticHints": [
          "Compara las semejanzas y diferencias.",
          "Intenta explicarlo con tus propias palabras."
        ],
        "minResponseLength": 30,
        "advanceSignal": "¡Gran análisis! Ahora es momento de ponerlo en práctica.",
        "estimatedMinutes": 20
      },
      {
        "id": "class-pol-avril-02-stage-3",
        "order": 3,
        "title": "3. Laboratorio y Aplicación",
        "type": "apply",
        "coreConcept": {
          "summary": "Ejecución práctica de participación ciudadana.",
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
        "id": "class-pol-avril-02-stage-4",
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
        "id": "class-pol-avril-02-dig-1",
        "title": "Simulador / Video Interactivo: Participación ciudadana",
        "type": "video",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "platform": "YouTube Edu",
        "language": "es",
        "durationMinutes": 15,
        "verifiedAt": "2026-09-01",
        "isAccessible": true,
        "description": "Recurso multimedia verificado para participación ciudadana.",
        "alignsWithStages": [
          "class-pol-avril-02-stage-1",
          "class-pol-avril-02-stage-3"
        ]
      }
    ],
    "socraticPauses": [
      {
        "id": "class-pol-avril-02-pause-1",
        "trigger": "afterStage",
        "targetStageId": "class-pol-avril-02-stage-1",
        "prompt": "¿Cómo puedes participar en tu comunidad?",
        "followUpQuestion": "¿Por qué crees que este concepto es relevante en tu vida escolar?",
        "reflectionPrompt": "Tómate un momento para pensar antes de responder."
      },
      {
        "id": "class-pol-avril-02-pause-2",
        "trigger": "midStage",
        "targetStageId": "class-pol-avril-02-stage-3",
        "prompt": "¿Qué роль juegas tú?",
        "followUpQuestion": "¿Qué estrategia te ayudó a superarla?",
        "reflectionPrompt": "Escribe una breve reflexión en tu libreta o comparte con tu profesor IA."
      }
    ],
    "evidenceCriteria": [
      {
        "stageId": "class-pol-avril-02-stage-3",
        "criterion": "Comprensión de Participación ciudadana",
        "indicator": "Demuestra dominio de los conceptos esenciales y resuelve los ejercicios propuestos.",
        "weight": 3
      },
      {
        "stageId": "class-pol-avril-02-stage-4",
        "criterion": "Calidad de la Entrega (Investiga un mecanismo de participación en tu ciudad)",
        "indicator": "Presenta la tarea con claridad, orden y razonamiento propio explicativo.",
        "weight": 5
      }
    ]
  }
];
