import { DailyClass } from '../types';

export const GAEL_DAILY_CLASSES: DailyClass[] = [
  // ==========================================
  // LUNES (4 CLASES OFICIALES - 07 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-len-gael-02',
    subjectId: 'len-gael',
    studentId: 'gael',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: El Cofre de las Historias Mágicas', minutes: 15, description: 'Presentación del personaje aventurero y pregunta disparadora sobre qué hace emocionante a un cuento.' },
      { phase: 'Fase 2: Video del Cuento y Estructura en 3 Pasos', minutes: 25, description: 'Visualización del video explicativo: Inicio, Nudo (el gran problema) y Desenlace feliz.' },
      { phase: 'Fase 3: Taller de Dibujo y Escritura en Cuaderno', minutes: 35, description: 'Dibujar la secuencia del cuento y escribir 3 oraciones completas con mayúsculas y puntos.' },
      { phase: 'Fase 4: Cierre con la Profa. Valentina', minutes: 15, description: 'Compartir la moraleja aprendida y ganar la estrella dorada del día.' },
    ],
    unit: 'Unidad 1: Lectura Comprensiva y Creatividad Narrativa',
    theme: 'Estructura del Cuento: Inicio, Nudo y Desenlace Creativo',
    objective: 'Identificar las tres partes principales de una narración (inicio, nudo y desenlace) y crear una historia propia con personajes y lugares mágicos.',
    introduction: '¡Bienvenidos al mundo de los cuentos! Cada historia es un viaje fantástico donde conocemos amigos increíbles, resolvemos retos divertidos y aprendemos valores que nos acompañan siempre.',
    reading: `Las Tres Partes de un Cuento:
1. El Inicio: "Había una vez..." Aquí conocemos a los personajes, dónde viven y qué les gusta hacer.
2. El Nudo: "De repente..." Ocurre un problema misterioso o una aventura que los personajes deben resolver juntos.
3. El Desenlace: "Al final..." Los personajes encuentran una solución con inteligencia y bondad, viviendo felices.`,
    videoUrl: 'https://www.youtube.com/embed/9N6D_j6Wc9g',
    socraticQuestions: [
      '¿Qué pasaría en una historia si no hubiera ningún problema por resolver?',
      'Si fueras el héroe de tu cuento, ¿qué superpoder de bondad elegirías para ayudar a tus amigos?',
    ],
    resources: [
      {
        id: 'res-len-g2-1',
        type: 'video',
        title: 'Video Infantil: Las Partes del Cuento para Niños (Español)',
        url: 'https://www.youtube.com/embed/9N6D_j6Wc9g',
        description: 'Aprende qué es el inicio, nudo y desenlace con dibujos animados.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-len-g2-1',
        title: 'Dibuja y Escribe tu Mini-Cuento Mágico',
        description: 'Dibuja en 3 viñetas el inicio, el nudo y el final de una aventura con tu animal favorito.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Partes_Del_Cuento.pdf',
    homeworkTask: 'Léeles tu cuento a tus papás antes de dormir y anota qué fue lo que más les gustó.',
    reflectionPrompt: '¿Qué aprendiste sobre la importancia de ayudar a los demás cuando tienen un problema?',
    isCompleted: false,
  },

  {
    id: 'class-mat-gael-01',
    subjectId: 'mat-gael',
    studentId: 'gael',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: La Tiendita de Monedas y Billetes', minutes: 10, description: 'Juego simbólico de compras escolares con monedas de 10, 50 centavos y 1 dólar.' },
      { phase: 'Fase 2: Video de Sumas con Reagrupación', minutes: 15, description: 'Cómo transformar 10 unidades en 1 decena usando bloques base 10 de colores.' },
      { phase: 'Fase 3: Práctica en Cuaderno Cuadriculado', minutes: 15, description: 'Resolver 4 sumas llevando y verificar con palitos o fichas.' },
      { phase: 'Fase 4: Reto de Rapidez Numérica', minutes: 5, description: 'Juego de preguntas rápidas con el Profe Alex.' },
    ],
    unit: 'Unidad 1: Números Naturales hasta 9999 y Operaciones Fundamentales',
    theme: 'Suma y Resta con Reagrupación en la Tiendita Escolar',
    objective: 'Comprender el concepto de reagrupación (llevar) en la suma y resta de números hasta 3 cifras utilizando material concreto y representaciones gráficas.',
    introduction: '¡Vamos de compras a la tiendita escolar! Aprender a sumar y restar con reagrupación nos permite calcular los vueltos, ahorrar nuestras monedas y ser grandes administradores.',
    reading: `El Secreto de la Reagrupación (Llevar):
- Recuerda: En la columna de las unidades solo caben números del 0 al 9.
- Cuando la suma de las unidades es 10 o más (por ejemplo 7 + 8 = 15), dejamos el 5 en las unidades y "regalamos" 1 decena a la columna vecina.
- ¡Luego sumamos esa decena extra con las demás decenas con mucha alegría!`,
    videoUrl: 'https://www.youtube.com/embed/a-W26_a8T20',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html',
    socraticQuestions: [
      '¿Por qué no podemos escribir dos cifras juntas en la casilla de las unidades?',
      'Si tienes $25 y compras un libro de $12 y una manzana de $3, ¿cuánto dinero te queda?',
    ],
    resources: [
      {
        id: 'res-mat-g1-1',
        type: 'video',
        title: 'Video Infantil: Sumas Llevando Fáciles y Divertidas (Español)',
        url: 'https://www.youtube.com/embed/a-W26_a8T20',
        description: 'Explicación paso a paso con animalitos y bloques de colores.',
        duration: '9 min',
        order: 1,
      },
      {
        id: 'res-mat-g1-2',
        type: 'simulator',
        title: 'Laboratorio de Números y Bloques (PhET)',
        url: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html',
        description: 'Juego interactivo para contar y agrupar centenas, decenas y unidades.',
        duration: '15 min',
        order: 2,
      },
    ],
    activities: [
      {
        id: 'act-mat-g1-1',
        title: 'Resuelve las 4 Compras de la Tiendita',
        description: 'Escribe en tu libreta las operaciones de suma con reagrupación y encierra con rojo la decena que llevas.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Sumas_Reagrupacion_Tiendita.pdf',
    homeworkTask: 'Pide a un adulto que juegue contigo a la tiendita con 3 objetos de casa y anota las sumas.',
    reflectionPrompt: '¿Cómo te sientes cuando resuelves un reto matemático por ti mismo?',
    isCompleted: false,
  },

  {
    id: 'class-sci-gael-02',
    subjectId: 'sci-gael',
    studentId: 'gael',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Adivinanzas de Animales Asombrosos', minutes: 10, description: '¿Quién tiene plumas, quién tiene escamas y quién tiene columna vertebral?' },
      { phase: 'Fase 2: Video del Reino Animal', minutes: 15, description: 'Los 5 grupos de vertebrados: mamíferos, aves, reptiles, anfibios y peces.' },
      { phase: 'Fase 3: Clasificación en el Álbum de la Naturaleza', minutes: 15, description: 'Recortar o dibujar animales en sus hábitats correspondientes.' },
      { phase: 'Fase 4: Cierre con la Profa. Clara', minutes: 5, description: 'Preguntas sobre el cuidado de nuestras mascotas y animales silvestres.' },
    ],
    unit: 'Unidad 1: Exploración de los Seres Vivos y sus Hábitats',
    theme: 'Clasificación de Animales: Vertebrados e Invertebrados',
    objective: 'Reconocer las diferencias fundamentales entre animales vertebrados e invertebrados y clasificar a los vertebrados en sus 5 grandes familias.',
    introduction: '¡El planeta Tierra está lleno de vida maravillosa! Desde el enorme oso de anteojos andino hasta la pequeña mariposa morpho, cada criatura tiene características únicas para vivir y ser feliz.',
    reading: `¿Vertebrados o Invertebrados?
- Vertebrados: Son animales que tienen un esqueleto interno con columna vertebral que sostiene su cuerpo (ej. perro, delfín, águila, rana, pez dorado).
  * Mamíferos: Nacen del vientre materno y toman leche.
  * Aves: Tienen plumas, pico y nacen de huevos.
  * Reptiles: Tienen escamas duras y se arrastran.
  * Anfibios: Viven en agua y tierra y tienen piel húmeda.
  * Peces: Respiran por branquias y nadan con aletas.
- Invertebrados: No tienen huesos ni columna vertebral (ej. mariposa, abeja, pulpo, lombriz).`,
    videoUrl: 'https://www.youtube.com/embed/5gPzRk5cE_M',
    socraticQuestions: [
      '¿Por qué crees que los peces tienen escamas y aletas en lugar de plumas y alas?',
      '¿Qué animal vertebrado te gusta más y por qué es especial su cuerpo?',
    ],
    resources: [
      {
        id: 'res-sci-g2-1',
        type: 'video',
        title: 'Video Infantil: Animales Vertebrados e Invertebrados (Español)',
        url: 'https://www.youtube.com/embed/5gPzRk5cE_M',
        description: 'Explicación colorida de las 5 familias de vertebrados.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-sci-g2-1',
        title: 'El Mural de los 5 Grupos de Vertebrados',
        description: 'Dibuja 1 animal para cada uno de los 5 grupos de vertebrados y escribe su nombre con bonita letra.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Animales_Vertebrados.pdf',
    homeworkTask: 'Investiga qué come el oso de anteojos del Ecuador y dibújalo en tu libreta.',
    reflectionPrompt: '¿Cómo podemos proteger los bosques para que los animales no pierdan su hogar?',
    isCompleted: false,
  },

  {
    id: 'class-rel-gael-01',
    subjectId: 'rel-gael',
    studentId: 'gael',
    date: '2026-09-07',
    dayOfWeek: 'Lunes',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Historia del Buen Samaritano', minutes: 10, description: 'Narración infantil ilustrada sobre ayudar al prójimo con alegría.' },
      { phase: 'Fase 2: Conversación sobre la Bondad y el Compartir', minutes: 12, description: '¿Cómo podemos ser buenos samaritanos en nuestra familia y escuela?' },
      { phase: 'Fase 3: Dibujo del Corazón Agradecido', minutes: 8, description: 'Momento de gratitud y compromiso de una buena acción para hoy.' },
    ],
    unit: 'Unidad 1: Valores Familiares y Buenas Acciones',
    theme: 'La Historia del Buen Samaritano: Ayudar con Amor y Alegría',
    objective: 'Aprender el valor de la compasión, la empatía y la ayuda desinteresada hacia quienes nos rodean.',
    introduction: 'Tener un corazón bondadoso nos hace verdaderos héroes cotidianos: cuando compartimos un juguete, ayudamos a levantar a un amigo o decimos gracias, llenamos el mundo de luz.',
    reading: `Valores de Oro para Cada Día:
1. Bondad: Tratar a todos con cariño y respeto, sin importar quiénes sean.
2. Generosidad: Compartir con alegría lo que tenemos con los demás.
3. Obediencia con Amor: Escuchar y respetar los consejos sabios de papá y mamá.
4. Gratitud: Dar gracias a Dios por la familia, los alimentos y un nuevo día de vida.`,
    videoUrl: 'https://www.youtube.com/embed/u_Fv0V0_68s',
    socraticQuestions: [
      '¿Qué hiciste hoy para hacer sonreír a alguien de tu familia?',
      '¿Por qué es importante ayudar a alguien que lo necesita aunque no sea nuestro amigo cercano?',
    ],
    resources: [
      {
        id: 'res-rel-g1',
        type: 'video',
        title: 'Video Cuento: La Parábola del Buen Samaritano para Niños (Español)',
        url: 'https://www.youtube.com/embed/u_Fv0V0_68s',
        description: 'Historia con valores para niños de primaria.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-rel-g1',
        title: 'El Árbol de las Buenas Acciones',
        description: 'Dibuja en tu libreta un árbol frutal y escribe en cada manzana una buena acción que harás esta semana.',
        type: 'reflection',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Valores_Buen_Samaritano.pdf',
    homeworkTask: 'Dale un abrazo fuerte a tu familia y diles una razón por la que estás agradecido con ellos.',
    reflectionPrompt: '¿Cómo te hace sentir en tu corazón ayudar a otra persona sin esperar nada a cambio?',
    isCompleted: false,
  },

  // ==========================================
  // MARTES (4 CLASES OFICIALES - 01 DE SEPTIEMBRE 2026 - PRIMER DÍA DE CLASES)
  // ==========================================
  {
    id: 'class-mat-gael-02',
    subjectId: 'mat-gael',
    studentId: 'gael',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: El Desfile de las Filas y Columnas', minutes: 15, description: 'Contar estrellas en grupos iguales de 2 en 2, 3 en 3 y 5 en 5.' },
      { phase: 'Fase 2: Video de la Multiplicación Divertida', minutes: 25, description: 'Descubrir que multiplicar es sumar el mismo número varias veces de forma rápida.' },
      { phase: 'Fase 3: Taller con Cuadrículas y Fichas', minutes: 35, description: 'Construir matrices de 3 filas con 4 estrellas (3 x 4 = 12).' },
      { phase: 'Fase 4: Desafío de la Tabla Mágica', minutes: 15, description: 'Juego interactivo de multiplicaciones básicas.' },
    ],
    unit: 'Unidad 1: Números Naturales hasta 9999 y Operaciones Fundamentales',
    theme: 'Introducción a la Multiplicación como Suma Repetida y Matrices',
    objective: 'Comprender el concepto de la multiplicación como una suma abreviada de sumandos iguales y representarla en arreglos rectangulares.',
    introduction: '¡Multiplicar es el superpoder más rápido de las matemáticas! En lugar de sumar 2 + 2 + 2 + 2 + 2 despacio, decimos 2 x 5 = 10 en un solo instante mágico.',
    reading: `¿Qué es Multiplicar?
- Multiplicar significa sumar un mismo número varias veces.
- Ejemplo con manzanas:
  * Tengo 4 canastas con 3 manzanas cada una.
  * Suma larga: 3 + 3 + 3 + 3 = 12 manzanas.
  * Multiplicación mágica: 4 veces 3 = 4 x 3 = 12 manzanas.
- ¡El signo "x" se lee "veces"!`,
    videoUrl: 'https://www.youtube.com/embed/CpBVPMBXvt4',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html',
    socraticQuestions: [
      'Si tienes 3 cajas y en cada una hay 5 lápices de colores, ¿cuántos lápices tienes en total?',
      '¿Por qué 3 x 4 da exactamente el mismo resultado que 4 x 3?',
    ],
    resources: [
      {
        id: 'res-mat-g2-1',
        type: 'video',
        title: 'Video Infantil: Qué es la Multiplicación y Cómo Funciona (Español)',
        url: 'https://www.youtube.com/embed/CpBVPMBXvt4',
        description: 'Aprende a multiplicar jugando con frutas y caramelos.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-mat-g2-1',
        title: 'Dibuja las Matrices de Multiplicación',
        description: 'Dibuja en tu cuaderno cuadriculado 2 filas de 6 corazones y escribe la multiplicación correspondiente (2 x 6 = 12).',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Introduccion_Multiplicacion.pdf',
    homeworkTask: 'Resuelve los 4 ejercicios con dibujos de la tiendita de multiplicaciones.',
    reflectionPrompt: '¿Qué truco te ayuda a recordar que multiplicar es sumar grupos iguales?',
    isCompleted: false,
  },

  {
    id: 'class-sci-gael-03',
    subjectId: 'sci-gael',
    studentId: 'gael',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: El Secreto de la Semilla Mágica', minutes: 10, description: 'Observar cómo nace una plantita a partir de una pequeña semilla.' },
      { phase: 'Fase 2: Video de las Partes de la Planta', minutes: 15, description: 'Raíz, tallo, hojas, flores y frutos: para qué sirve cada una.' },
      { phase: 'Fase 3: Experimento del Fríjol en Algodón', minutes: 15, description: 'Sembrar una semilla en un vasito transparente con agua y luz solar.' },
      { phase: 'Fase 4: Cuaderno de Pequeño Científico', minutes: 5, description: 'Dibujar la planta completa con sus nombres.' },
    ],
    unit: 'Unidad 1: Exploración de los Seres Vivos y sus Hábitats',
    theme: 'Las Plantas y sus Partes: Fotosíntesis y Germinación',
    objective: 'Identificar las partes principales de una planta (raíz, tallo, hojas, flor y fruto) y describir los elementos que necesita para crecer sana (agua, tierra, aire y luz solar).',
    introduction: '¡Las plantas son las mejores amigas del planeta! Ellas fabrican su propio alimento con la luz del sol y nos regalan el oxígeno puro que respiramos todos los días.',
    reading: `Las 5 Partes de una Planta:
1. La Raíz: Está bajo la tierra, sujeta a la planta y bebe agua y nutrientes.
2. El Tallo: Sostiene las hojas y transporta el agua hacia arriba como una pajilla mágica.
3. Las Hojas: Son las cocinitas de la planta; atrapan la luz solar para hacer fotosíntesis.
4. Las Flores: Son hermosas y de colores para atraer abejas y formar semillas.
5. Los Frutos: Guardan y protegen las semillas ricas y deliciosas.`,
    videoUrl: 'https://www.youtube.com/embed/zIDVm8_aLDI',
    socraticQuestions: [
      '¿Qué le sucedería a una planta si la encerramos en una caja oscura sin agua?',
      '¿Por qué las raíces crecen hacia abajo en la tierra en lugar de hacia arriba?',
    ],
    resources: [
      {
        id: 'res-sci-g3-1',
        type: 'video',
        title: 'Video Infantil: Las Partes de las Plantas y la Fotosíntesis (Español)',
        url: 'https://www.youtube.com/embed/zIDVm8_aLDI',
        description: 'Explicación animada de cómo crecen las flores y los árboles.',
        duration: '9 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-sci-g3-1',
        title: 'Dibuja la Planta y Señala sus 5 Partes',
        description: 'Dibuja una planta con flores en tu cuaderno de ciencias y escribe con flechas: raíz, tallo, hoja, flor y fruto.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Partes_De_Las_Plantas.pdf',
    homeworkTask: 'Prepara tu vasito de germinación con un fríjol y algodón húmedo y anota el día de inicio.',
    reflectionPrompt: '¿Qué cuidado amoroso necesitan las plantas de tu jardín para vivir alegres?',
    isCompleted: false,
  },

  {
    id: 'class-ing-gael-02',
    subjectId: 'ing-gael',
    studentId: 'gael',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Juego del Espejo y Verbos de Acción (10 min)', minutes: 10, description: 'Explicación en español y juego dinámico para mover el cuerpo: jump (saltar), run (correr), dance (bailar), read (leer) y write (escribir).' },
      { phase: 'Fase 2: Video Animado y Presente Continuo (15 min)', minutes: 15, description: 'Aprenderemos cómo decir lo que estamos haciendo en este momento agregando "-ing" (por ejemplo: "I am jumping" = ¡Estoy saltando!).' },
      { phase: 'Fase 3: Taller de Dibujo y Construcción de Frases (15 min)', minutes: 15, description: 'Dibuja en tu libreta a tu personaje favorito realizando una acción y escribe la frase en inglés con su significado en español.' },
      { phase: 'Fase 4: Canción de Despedida y Medalla de Estrella (5 min)', minutes: 5, description: 'Cierre cantado con tu Teacher Emma repasando las 5 palabras mágicas del día.' },
    ],
    unit: 'Unidad 1: Aventuras Cotidianas y Rutinas (Everyday Adventures)',
    theme: 'Verbos de Acción y Presente Continuo en Inglés (Action Verbs & Present Continuous)',
    objective: 'Reconocer verbos de acción cotidianos en inglés y aprender a describir lo que una persona o animal está haciendo en el momento usando la terminación "-ing".',
    introduction: '¡Bienvenido al Club Mágico de Inglés, Gael! Hoy vamos a mover el cuerpo, cantar y aprender cómo decir en inglés todo lo que hacemos jugando, saltando y estudiando. ¡Todo te lo explicamos paso a paso en español para que lo disfrutes y entiendas al 100%!',
    reading: `📘 Palabras Mágicas de Acción y Cómo Usarlas (con pronunciación y significado):

1. Verbos de Acción:
   • Jump [se dice "yamp"] = Saltar
     -> "I am jumping!" = ¡Yo estoy saltando!
   • Run [se dice "ran"] = Correr
     -> "The dog is running!" = ¡El perrito está corriendo!
   • Read [se dice "riid"] = Leer
     -> "She is reading a book!" = ¡Ella está leyendo un libro!
   • Sing [se dice "sing"] = Cantar
     -> "We are singing happy songs!" = ¡Estamos cantando canciones felices!
   • Play [se dice "plei"] = Jugar
     -> "They are playing soccer!" = ¡Ellos están jugando fútbol!

💡 Regla Mágica: Cuando estás haciendo algo AHORA MISMO, le agregas "-ing" al final del verbo (ejemplo: play -> play-ing).`,
    videoUrl: 'https://www.youtube.com/embed/dUXk8Nc5qQ8',
    socraticQuestions: [
      '¿Qué acción estás haciendo tú en este momento en tu clase de inglés? (Por ejemplo: "I am learning" o "I am reading").',
      '¿Cómo dirías en inglés que tu perrito o gato está corriendo rápido en la casa?',
    ],
    resources: [
      {
        id: 'res-ing-g2-1',
        type: 'video',
        title: 'Video Animado para Niños: Canción de los Verbos de Acción (con subtítulos)',
        url: 'https://www.youtube.com/embed/dUXk8Nc5qQ8',
        description: 'Canta, baila y repite las acciones en inglés con personajes divertidos.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-ing-g2-1',
        title: 'Taller Creativo: Dibuja 3 Acciones y Escribe sus Frases',
        description: '¿Qué vas a hacer paso a paso?\n1. Abre tu cuaderno de Inglés y divídelo en 3 cuadros.\n2. En el primer cuadro dibuja a un niño jugando (Play -> "I am playing").\n3. En el segundo dibuja a una niña leyendo (Read -> "She is reading").\n4. En el tercero dibuja a una mascota corriendo (Run -> "The dog is running").\n5. Colorea tus dibujos y escribe debajo cada frase en inglés con su traducción al español.\n6. Pídele a un adulto que le tome una foto para subirla al taller.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Ingles_Verbos_Accion_Magicos.pdf',
    homeworkTask: 'Muéstrale a tu familia 2 acciones con mímica (saltar y bailar) y diles la frase en inglés: "I am jumping!" y "I am dancing!".',
    reflectionPrompt: '¿Cuál es tu verbo de acción favorito para actuar y pronunciar en inglés?',
    isCompleted: false,
  },

  {
    id: 'class-art-gael-01',
    subjectId: 'art-gael',
    studentId: 'gael',
    date: '2026-09-01',
    dayOfWeek: 'Martes',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: El Arcoíris de los Colores Primarios', minutes: 8, description: 'Rojo, azul y amarillo: los 3 colores mágicos que crean todos los demás.' },
      { phase: 'Fase 2: La Mezcla Secreta de Plastilina', minutes: 12, description: 'Mezclar amarillo + azul para crear verde; rojo + amarillo para crear naranja.' },
      { phase: 'Fase 3: Escultura de tu Animal Favorito', minutes: 10, description: 'Modelar un animalito con texturas y detalles coloridos.' },
    ],
    unit: 'Unidad 1: Expresión Plástica y Creatividad con Texturas',
    theme: 'Modelado con Arcilla/Plastilina y Colores Primarios/Secundarios',
    objective: 'Experimentar con mezclas de colores primarios para obtener colores secundarios y modelar figuras tridimensionales desarrollando la motricidad fina.',
    introduction: '¡El taller de arte es un lugar de pura imaginación! Con tus manos puedes transformar plastilina y pintura en mundos llenos de color y criaturas asombrosas.',
    reading: `La Magia de la Mezcla de Colores:
- Colores Primarios (no se pueden crear mezclando otros): Rojo, Azul y Amarillo.
- Colores Secundarios (¡nacen de la magia de mezclar dos primarios!):
  * Rojo + Amarillo = ¡Naranja brillante!
  * Azul + Amarillo = ¡Verde esmeralda!
  * Rojo + Azul = ¡Morado misterioso!`,
    videoUrl: 'https://www.youtube.com/embed/5sP12n78Eec',
    socraticQuestions: [
      '¿Qué color obtienes si mezclas plastilina amarilla con azul?',
      '¿Qué textura tiene la piel de un reptil en comparación con las plumas de un pájaro?',
    ],
    resources: [
      {
        id: 'res-art-g1',
        type: 'video',
        title: 'Video Infantil: Colores Primarios y Secundarios con Plastilina (Español)',
        url: 'https://www.youtube.com/embed/5sP12n78Eec',
        description: 'Diviértete mezclando colores y modelando animalitos.',
        duration: '9 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-art-g1',
        title: 'Crea tu Escultura de Plastilina Multicolor',
        description: 'Modela un animalito de la naturaleza utilizando al menos 3 colores mezclados por ti y tómale una foto.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Arte_Plastilina_Colores.pdf',
    homeworkTask: 'Coloca tu escultura en un lugar especial de tu cuarto y compártela en la galería virtual.',
    reflectionPrompt: '¿Qué sentiste al crear una figura con tus propias manos y colores?',
    isCompleted: false,
  },

  // ==========================================
  // MIÉRCOLES (4 CLASES OFICIALES - 02 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-len-gael-01',
    subjectId: 'len-gael',
    studentId: 'gael',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Rincón del Cuentacuentos', minutes: 15, description: 'Lectura animada de la fábula clásica con efectos de sonido e inflexiones de voz.' },
      { phase: 'Fase 2: Video Animado de la Fábula', minutes: 25, description: 'Visualización del video infantil en español y preguntas de comprensión socrática.' },
      { phase: 'Fase 3: Taller de Dibujo y Escritura en Cuaderno', minutes: 35, description: 'Dibujar la escena favorita y escribir la moraleja con bonita caligrafía.' },
      { phase: 'Fase 4: Rueda de Valores y Síntesis', minutes: 15, description: 'Conversación guiada con la Profa. Valentina sobre ayudar a los amigos.' },
    ],
    unit: 'Unidad 1: Cuentos Mágicos y Fábulas Tradicionales',
    theme: 'El León y el Ratón Agradecido: Moraleja y Valores',
    objective: 'Desarrollar la comprensión lectora literal e inferencial a través de la fábula, identificando la moraleja sobre la gratitud y la humildad.',
    introduction: '¡Hola Gael! Hoy viajaremos a la gran sabana para conocer la historia de un rey león poderoso y un ratoncito valiente que nos enseñará que nadie es tan pequeño para ayudar a los demás.',
    reading: `Fábula del León y el Ratón:
Dormía tranquilamente un gran león bajo la sombra de un árbol cuando un pequeño ratón comenzó a corretear sobre su lomo. El león despertó y atrapó al ratoncito entre sus enormes garras.
— ¡Por favor, señor león, perdóname la vida! —suplicó el ratón—. Si me dejas libre, algún día te devolveré el favor.
El león se rio a carcajadas pensando: "¿Cómo un ratón tan diminuto podría ayudar al rey de la selva?". Sin embargo, decidió soltarlo con bondad.

Días después, el león cayó en una red colocada por cazadores y rugió con desesperación. El ratoncito escuchó sus rugidos, corrió hacia él y con sus afilados dientecillos comenzó a roer la cuerda hasta romper la trampa y liberar a su amigo.

Moraleja: Los actos de bondad siempre son recompensados y nadie debe ser subestimado por su tamaño.`,
    videoUrl: 'https://www.youtube.com/embed/t_L97j1v2X4',
    socraticQuestions: [
      '¿Por qué el león se rio al inicio cuando el ratón le prometió devolverle el favor?',
      '¿Qué hubiese ocurrido si el ratón no hubiese sido valiente y agradecido?',
      '¿En qué ocasión has ayudado a alguien mayor que tú con tus propios talentos?',
    ],
    resources: [
      {
        id: 'res-len-g1',
        type: 'video',
        title: 'Video Animado: El León y el Ratón - Cuentos Infantiles en Español',
        url: 'https://www.youtube.com/embed/t_L97j1v2X4',
        description: 'Fábula educativa con moraleja sobre la gratitud y la amistad.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-len-g1',
        title: 'Dibuja la Escena del Rescate y la Moraleja',
        description: 'En tu cuaderno de Lengua, dibuja al ratoncito royendo la cuerda y escribe abajo la moraleja con mayúscula inicial y punto final.',
        type: 'project',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Fabula_Leon_Raton.pdf',
    homeworkTask: 'Cuéntale la fábula a un familiar utilizando tus propios muñecos o dibujos y graba un audio de 30 segundos compartiendo qué aprendiste.',
    reflectionPrompt: '¿Cómo puedes ser un buen amigo como el ratoncito con tus compañeros y familia?',
    isCompleted: false,
  },

  {
    id: 'class-soc-gael-02',
    subjectId: 'soc-gael',
    studentId: 'gael',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Los Héroes de mi Ciudad', minutes: 10, description: 'Bomberos, médicos, policías, maestros y recolectores: ¿quién nos ayuda cada día?' },
      { phase: 'Fase 2: Video de los Servicios Públicos', minutes: 15, description: 'Cómo llega el agua potable, la electricidad y los servicios de emergencia a nuestras casas.' },
      { phase: 'Fase 3: Dibujo del Croquis del Vecindario', minutes: 15, description: 'Ubicar el parque, la farmacia, la escuela y el hospital en un mapa amigable.' },
      { phase: 'Fase 4: Reglas de Convivencia con el Vecino', minutes: 5, description: 'Cuidar los parques y no botar basura.' },
    ],
    unit: 'Unidad 1: Mi Familia, mi Escuela y mi Comunidad',
    theme: 'Mi Barrio y mi Ciudad: Servicios Públicos y Normas de Convivencia',
    objective: 'Reconocer los servicios públicos esenciales de la comunidad y valorar el trabajo de las personas que hacen posible el bienestar de nuestro barrio.',
    introduction: '¡Nuestra comunidad es como una gran familia! Para que todo funcione bien, muchas personas trabajan con amor: los doctores curan a los enfermos, los bomberos apagan incendios y los maestros nos enseñan con paciencia.',
    reading: `Servicios Esenciales de mi Barrio:
- Hospitales y Centros de Salud: Cuidan de nuestra salud y nos vacunan.
- Estación de Bomberos: Acuden de inmediato ante emergencias y rescates.
- Policía Nacional: Protegen la seguridad y el orden en las calles.
- Escuelas y Bibliotecas: Lugares para aprender, jugar y crecer juntos.
- Parques y Zonas Verdes: Espacios para respirar aire puro y hacer deporte en familia.`,
    videoUrl: 'https://www.youtube.com/embed/0G6L39Y-n4g',
    socraticQuestions: [
      '¿Qué pasaría en una ciudad si no hubiera recolectores de basura durante una semana?',
      '¿Qué norma de respeto aplicas cuando sales a jugar al parque con otros niños?',
    ],
    resources: [
      {
        id: 'res-soc-g2-1',
        type: 'video',
        title: 'Video Infantil: Mi Barrio, Servicios Públicos y los Servidores de la Comunidad (Español)',
        url: 'https://www.youtube.com/embed/0G6L39Y-n4g',
        description: 'Aprende sobre las personas que ayudan en nuestra ciudad.',
        duration: '9 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soc-g2-1',
        title: 'Dibuja a tu Servidor de la Comunidad Favorito',
        description: 'Dibuja en tu libreta al servidor público que más admiras (bombero, doctora, maestro) y escribe cómo ayuda a todos.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Mi_Barrio_Servicios_Publicos.pdf',
    homeworkTask: 'Anota el número de emergencias (911) en una tarjeta decorada para ponerla en la nevera de casa.',
    reflectionPrompt: '¿Cómo puedes ser un buen vecino manteniendo limpia la vereda de tu casa?',
    isCompleted: false,
  },

  {
    id: 'class-mat-gael-04',
    subjectId: 'mat-gael',
    studentId: 'gael',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: La Búsqueda de Formas en Casa', minutes: 10, description: 'Encontrar objetos en forma de pelota (esfera), caja de zapatos (prisma) y lata de jugo (cilindro).' },
      { phase: 'Fase 2: Video de Cuerpos Geométricos 3D', minutes: 15, description: 'Caras, aristas y vértices en cubos, pirámides, cilindros y conos.' },
      { phase: 'Fase 3: Construcción con Palillos y Plastilina', minutes: 15, description: 'Armar la estructura de un cubo tridimensional con 8 bolitas y 12 palillos.' },
      { phase: 'Fase 4: Conteo de Vértices y Caras', minutes: 5, description: 'Revisar la solidez de la figura.' },
    ],
    unit: 'Unidad 1: Geometría Básica y Medidas del Entorno',
    theme: 'Cuerpos Geométricos en el Mundo Real: Cubos, Cilindros y Esferas',
    objective: 'Reconocer y diferenciar figuras planas (2D) de cuerpos geométricos con volumen (3D) identificando caras, aristas y vértices en objetos cotidianos.',
    introduction: '¡El mundo que nos rodea no es plano, tiene tres dimensiones! Cada edificio, juguete y planeta tiene una forma geométrica fascinante que los arquitectos e ingenieros usan para construir maravillas.',
    reading: `Cuerpos Geométricos Famosos:
- Cubo: Tiene 6 caras cuadradas iguales, 8 vértices (esquinas) y 12 aristas (lados rectos) como un dado de juego.
- Esfera: Es redonda por todos lados como un balón de fútbol y puede rodar fácilmente.
- Cilindro: Tiene 2 bases circulares planas y una cara curva como un vaso o un tambor.
- Cono: Tiene 1 base circular y termina en una punta como un gorrito de fiesta o un barquillo de helado.`,
    videoUrl: 'https://www.youtube.com/embed/5GLduNQ5kA4',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_all.html',
    socraticQuestions: [
      '¿Por qué una pelota puede rodar pero un dado se detiene al deslizarse?',
      '¿Cuántas esquinas (vértices) tiene una caja de regalos cúbica?',
    ],
    resources: [
      {
        id: 'res-mat-g4-1',
        type: 'video',
        title: 'Video Infantil: Los Cuerpos Geométricos para Niños (Español)',
        url: 'https://www.youtube.com/embed/5GLduNQ5kA4',
        description: 'Explicación interactiva de cubos, esferas, conos y cilindros.',
        duration: '9 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-mat-g4-1',
        title: 'Construye tu Cubo con Palillos y Plastilina',
        description: 'Arma tu cubo 3D usando 12 palillos de dientes y 8 bolitas de plastilina como esquinas y tómale una foto.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Cuerpos_Geometricos_3D.pdf',
    homeworkTask: 'Busca en tu cocina 3 objetos cilíndricos y 1 objeto esférico y anótalos en tu libreta.',
    reflectionPrompt: '¿Cómo utilizan los constructores las formas geométricas para hacer casas resistentes?',
    isCompleted: false,
  },

  {
    id: 'class-efi-gael-01',
    subjectId: 'efi-gael',
    studentId: 'gael',
    date: '2026-09-02',
    dayOfWeek: 'Miércoles',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Calentamiento de los Animalitos', minutes: 8, description: 'Imitar el salto de la rana, el andar del oso y el vuelo del cóndor.' },
      { phase: 'Fase 2: Circuito de Coordinación y Equilibrio', minutes: 14, description: 'Caminar sobre una línea recta con un libro en la cabeza y lanzar pelotitas al cesto.' },
      { phase: 'Fase 3: Estiramientos Suaves e Hidratación', minutes: 8, description: 'Beber agua fresca y respirar profundo inflando la barriguita como un globo.' },
    ],
    unit: 'Unidad 1: Coordinación Motriz, Juegos Tradicionales y Ritmo',
    theme: 'Juegos de Coordinación Ojo-Mano y Desafíos de Equilibrio Dinámico',
    objective: 'Desarrollar habilidades motrices básicas como el equilibrio, la coordinación óculo-manual y la agilidad a través de juegos lúdicos.',
    introduction: '¡A mover el cuerpo con alegría y energía! El deporte nos hace fuertes, saludables y felices mientras jugamos y nos divertimos.',
    reading: `Consejos de un Pequeño Campeón:
1. Tomar Agua: Beber agua pura antes, durante y después del juego para estar bien hidratado.
2. Usar Ropa Cómoda: Ropa deportiva y zapatillas ajustadas para correr con seguridad.
3. Respirar Bien: Tomar aire por la nariz como oliendo una flor, y soltarlo por la boca como apagando una vela.
4. Jugar Limpio: Felicitar a los amigos y sonreír siempre.`,
    videoUrl: 'https://www.youtube.com/embed/3_oE6eyOCG8',
    socraticQuestions: [
      '¿Por qué nuestro corazón late más rápido cuando corremos o saltamos la cuerda?',
      '¿Qué sientes en tu cuerpo después de beber un buen vaso de agua fresca al terminar de jugar?',
    ],
    resources: [
      {
        id: 'res-efi-g1',
        type: 'video',
        title: 'Video Infantil: Rutina de Ejercicios y Juegos de Coordinación en Casa (Español)',
        url: 'https://www.youtube.com/embed/3_oE6eyOCG8',
        description: 'Juegos divertidos para saltar y coordinar movimientos.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-efi-g1',
        title: 'El Reto de los 10 Saltos de Rana y Equilibrio',
        description: 'Realiza el reto de coordinación en el patio o sala y anota cuántos encestes lograste con la pelotita.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Juegos_Coordinacion_Equilibrio.pdf',
    homeworkTask: 'Juega a la rayuela o al salto de cuerda con tu familia durante 15 minutos.',
    reflectionPrompt: '¿Cómo te ayuda el ejercicio a tener más energía y alegría para estudiar?',
    isCompleted: false,
  },

  // ==========================================
  // JUEVES (4 CLASES OFICIALES - 03 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-sci-gael-01',
    subjectId: 'sci-gael',
    studentId: 'gael',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '08:00 - 09:30 (90 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apertura y Pregunta de Asombro', minutes: 15, description: 'Observación guiada de una flor real y pregunta: ¿Por qué las abejas visitan las flores de colores?' },
      { phase: 'Fase 2: Video Educativo en Español', minutes: 25, description: 'Visualización del video de CuriosaMente: La polinización y el trabajo incansable de las abejas.' },
      { phase: 'Fase 3: Taller Práctico en Libreta', minutes: 35, description: 'Dibujar el ciclo del polen y la flor con etiquetas explicativas claras y colores vivos.' },
      { phase: 'Fase 4: Cierre con la Profa. Clara', minutes: 15, description: 'Compromiso de cuidar a las abejitas y no molestarlas en el jardín escolar.' },
    ],
    unit: 'Unidad 1: El Fascinante Reino Animal y Vegetal',
    theme: 'La Gran Misión de las Abejas y las Flores Polinizadoras',
    objective: 'Reconocer el proceso de polinización como un trabajo de equipo entre insectos y plantas que permite el nacimiento de deliciosas frutas y semillas.',
    introduction: '¿Sabías que una de cada tres cucharadas de comida que comemos existe gracias al vuelo alegre de las abejitas? Hoy nos convertiremos en exploradores botánicos para descubrir su increíble labor.',
    reading: `¿Cómo funciona la Polinización?
1. Las flores tienen polen dorado en sus pétalos y un néctar dulce muy rico.
2. Las abejitas llegan volando para beber el néctar y sus patitas peluditas se llenan de granos de polen.
3. Cuando la abeja vuela hacia otra flor, parte de ese polen cae en la nueva flor.
4. ¡Gracias a ese polvito mágico, la flor se transforma en una jugosa manzana, frutilla o naranja!`,
    videoUrl: 'https://www.youtube.com/embed/4M8Ue2L5-1k',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_all.html',
    socraticQuestions: [
      '¿Qué crees que pasaría con los árboles de manzanas si no hubiera abejas en el campo?',
      '¿Por qué las flores tienen colores tan brillantes como el rojo, amarillo y morado?',
      '¿Qué podemos sembrar en nuestro patio para ayudar a los polinizadores?',
    ],
    resources: [
      {
        id: 'res-sci-g1',
        type: 'video',
        title: 'Video Infantil: La Importancia de las Abejas y la Polinización (Español)',
        url: 'https://www.youtube.com/embed/4M8Ue2L5-1k',
        description: 'Explicación animada de cómo los insectos ayudan a las plantas a dar frutos.',
        duration: '7 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-sci-g1',
        title: 'Dibuja el Viaje de la Abejita Polinizadora',
        description: 'Dibuja en tu cuaderno de Ciencias el camino que hace la abeja desde la flor hasta el panal, indicando las partes de la flor.',
        type: 'project',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Polinizacion_Flores_Abejas.pdf',
    homeworkTask: 'Sal al jardín o a un parque cercano con un adulto, busca una flor con lupa o con tus ojos atentos, y anota en tu libreta si viste algún insecto visitándola.',
    reflectionPrompt: '¿Por qué debemos cuidar y respetar a todos los insectos pequeños de la naturaleza?',
    isCompleted: false,
  },

  {
    id: 'class-ing-gael-03',
    subjectId: 'ing-gael',
    studentId: 'gael',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Safari de Sonidos de la Selva (10 min)', minutes: 10, description: 'Juego de adivinanzas con sonidos en español e inglés: monkey (mono), toucan (tucán), jaguar (jaguar), frog (rana) y snake (serpiente).' },
      { phase: 'Fase 2: Video Aventura por el Amazonas (15 min)', minutes: 15, description: 'Palabras para describir tamaños y colores: big (grande), small (pequeño), fast (rápido), colorful (colorido).' },
      { phase: 'Fase 3: Taller de Dibujo y Frases de Explorador (15 min)', minutes: 15, description: 'Dibuja un tucán amazónico en tu libreta y escribe oraciones guiadas en inglés con su traducción al español.' },
      { phase: 'Fase 4: Coronación del Pequeño Explorador (5 min)', minutes: 5, description: 'Cierre y repaso con Teacher Emma de los 4 animales mágicos de la Amazonía.' },
    ],
    unit: 'Unidad 1: Aventuras Cotidianas y Rutinas (Everyday Adventures)',
    theme: 'Animales de la Selva Amazónica y Adjetivos Descriptivos (Rainforest Animals & Adjectives)',
    objective: 'Aprender los nombres en inglés de animales emblemáticos de la Amazonía del Ecuador y usar adjetivos sencillos para describir sus colores y tamaños.',
    introduction: '¡Hola explorador Gael! Hoy viajaremos con la imaginación a la selva del Oriente ecuatoriano para conocer a sus animales más asombrosos. Aprenderemos cómo se llaman en inglés, cómo se pronuncian y cómo describirlos con explicaciones claras en español.',
    reading: `📘 Vocabulario de la Selva Amazónica (con pronunciación y significado en español):

1. Los Animales y sus Nombres:
   • Jaguar [se dice "yág-uar"] = Jaguar
     -> "The jaguar is strong and fast!" = ¡El jaguar es fuerte y rápido!
   • Toucan [se dice "túu-can"] = Tucán
     -> "The toucan has a colorful beak!" = ¡El tucán tiene un pico colorido!
   • Monkey [se dice "món-ki"] = Mono
     -> "The monkey is jumping on the trees!" = ¡El mono está saltando en los árboles!
   • Tree Frog [se dice "trii frog"] = Ranita de árbol
     -> "The frog is green and small!" = ¡La ranita es verde y pequeña!

2. Palabras Mágicas para Describir (Adjetivos):
   • Big [big] = Grande | Small [smol] = Pequeño
   • Fast [fast] = Rápido | Colorful [cólorful] = Lleno de colores`,
    videoUrl: 'https://www.youtube.com/embed/p5qwOxl4wa8',
    socraticQuestions: [
      '¿Cuál es tu animal favorito de la selva y qué colores tiene en inglés? (Por ejemplo: yellow, green, black).',
      '¿Cómo le dirías a un amigo que el tucán tiene un pico muy grande y colorido usando palabras en inglés?',
    ],
    resources: [
      {
        id: 'res-ing-g3-1',
        type: 'video',
        title: 'Video Infantil: Canción de los Animales de la Selva en Inglés (con subtítulos)',
        url: 'https://www.youtube.com/embed/p5qwOxl4wa8',
        description: 'Recorre la selva amazónica cantando y aprendiendo nombres de animales.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-ing-g3-1',
        title: 'Taller de Arte: Dibuja y Colorea al Tucán Amazónico',
        description: '¿Qué vas a hacer paso a paso?\n1. Dibuja un tucán en tu cuaderno de Inglés con su pico grande y ramas verdes.\n2. Colorea el pico con amarillo (Yellow), naranja (Orange) y azul (Blue).\n3. Escribe debajo del dibujo la oración: "The toucan is colorful" y su significado: [El tucán es colorido].\n4. Escribe los 4 nombres de animales que aprendiste hoy (Jaguar, Toucan, Monkey, Frog).\n5. Sube la foto de tu dibujo para recibir la insignia de Pequeño Explorador.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Ingles_Animales_Selva_Amazonica.pdf',
    homeworkTask: 'Cuéntale a tu familia en la cena 3 nombres de animales de la selva en inglés imitando sus sonidos (Jaguar, Monkey y Frog).',
    reflectionPrompt: '¿Por qué es importante cuidar los bosques y la selva amazónica de nuestro país Ecuador?',
    isCompleted: false,
  },

  {
    id: 'class-soft-gael-02',
    subjectId: 'soft-gael',
    studentId: 'gael',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: El Robot que Obedece Órdenes', minutes: 10, description: 'Juego del robot: dar pasos adelante, girar a la derecha y saltar siguiendo tarjetas de flechas.' },
      { phase: 'Fase 2: Video de Scratch Jr y Bloques de Código', minutes: 15, description: 'Cómo encajar bloques de bandera verde, movimiento y sonidos divertidos.' },
      { phase: 'Fase 3: Práctica de Programación Interactiva', minutes: 15, description: 'Hacer que el gatito camine 5 pasos, diga "¡Hola!" y salte un obstáculo.' },
      { phase: 'Fase 4: Demostración y Aplausos', minutes: 5, description: 'Probar el proyecto animado en la pantalla.' },
    ],
    unit: 'Unidad 1: Pensamiento Lógico y Primeros Pasos con Scratch Jr',
    theme: 'Creación de Historias Interactivas con Bloques de Movimiento y Sonido',
    objective: 'Comprender la secuencia de instrucciones ordenadas en un programa informático y crear una animación interactiva sencilla con bloques visuales.',
    introduction: '¡Programar es como armar un rompecabezas mágico donde cada pieza le dice a tu personaje qué hacer! Hoy crearemos nuestra primera historia animada.',
    reading: `Los Bloques Mágicos de Scratch Jr:
- Bloque Bandera Amarilla: ¡Es el botón de inicio! "Al presionar la bandera, comienza la magia".
- Bloques Azules de Movimiento: Flecha a la derecha (caminar adelante), flecha arriba (saltar).
- Bloque Rosa de Diálogo: Escribir mensajes para que tu personaje hable con burbujas de texto.
- Bloque Verde de Sonido: ¡Reproducir risas, maullidos o notas musicales alegres!`,
    videoUrl: 'https://www.youtube.com/embed/nKIu9yen5nc',
    simulatorUrl: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted',
    socraticQuestions: [
      '¿Qué pasa si colocas el bloque de saltar antes del bloque de caminar?',
      '¿Por qué las computadoras necesitan que les demos instrucciones en el orden exacto?',
    ],
    resources: [
      {
        id: 'res-soft-g2-1',
        type: 'video',
        title: 'Video Infantil: Primeros Pasos en Scratch Jr para Niños (Español)',
        url: 'https://www.youtube.com/embed/nKIu9yen5nc',
        description: 'Aprende a mover personajes con bloques de colores.',
        duration: '10 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soft-g2-1',
        title: 'Dibuja la Secuencia de Bloques de tu Historia',
        description: 'Dibuja en tu libreta las 4 piezas de código que hacen que el personaje camine, salte y diga hola.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Programacion_Scratch_Jr.pdf',
    homeworkTask: 'Juega en casa con un familiar a ser el programador y el robot dando órdenes paso a paso.',
    reflectionPrompt: '¿Qué historia divertida te gustaría crear en tu próximo videojuego?',
    isCompleted: false,
  },

  {
    id: 'class-len-gael-03',
    subjectId: 'len-gael',
    studentId: 'gael',
    date: '2026-09-03',
    dayOfWeek: 'Jueves',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Los Detectives de las Mayúsculas', minutes: 8, description: 'Descubrir qué palabras siempre deben llevar corona mayúscula (nombres de personas y ciudades).' },
      { phase: 'Fase 2: Video de Signos de Puntuación', minutes: 12, description: 'El punto final (el semáforo rojo de la lectura) y los signos de exclamación ¡! e interrogación ¿?' },
      { phase: 'Fase 3: Práctica de Escritura Creativa', minutes: 10, description: 'Escribir 3 oraciones completas sobre un viaje espacial con signos correctos.' },
    ],
    unit: 'Unidad 1: Escritura Creativa y Ortografía Divertida',
    theme: 'Uso de la Mayúscula, Punto Final y Signos de Interrogación/Exclamación',
    objective: 'Aplicar correctamente las reglas de uso de la letra mayúscula (al inicio de una oración y en nombres propios) y colocar el punto final y signos de entonación.',
    introduction: '¡Las palabras tienen música y reglas especiales! Cuando usamos mayúsculas y puntos, nuestras historias se leen claritas y todo el mundo comprende nuestros pensamientos.',
    reading: `Reglas de Oro de la Escritura:
1. La Corona Mayúscula: Se usa SIEMPRE al inicio de cualquier texto y en los nombres de personas y lugares (ej. Gael, Avril, Quito, Ecuador).
2. El Semáforo del Punto Final (.): Avisa al lector que la idea terminó y que debemos respirar.
3. Signos de Pregunta (¿?): Se usan al inicio y al final cuando tenemos una duda: "¿Vamos al parque a jugar?".
4. Signos de Alegría (¡!): Se usan cuando estamos emocionados o sorprendidos: "¡Qué golazo tan maravilloso!".`,
    videoUrl: 'https://www.youtube.com/embed/wOqX7nE3T7M',
    socraticQuestions: [
      '¿Por qué en español debemos poner signo de interrogación al inicio (¿) y al final (?)?',
      '¿Qué le falta a esta oración: "gael juega con su perrito"?',
    ],
    resources: [
      {
        id: 'res-len-g3-1',
        type: 'video',
        title: 'Video Infantil: El Uso de las Mayúsculas y los Puntos (Español)',
        url: 'https://www.youtube.com/embed/wOqX7nE3T7M',
        description: 'Canción didáctica para recordar la ortografía fácil.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-len-g3-1',
        title: 'Corrige las 3 Oraciones de los Astronautas',
        description: 'Copia en tu cuaderno las 3 oraciones agregando las mayúsculas con color rojo y el punto final.',
        type: 'practice',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Ortografia_Mayusculas_Puntos.pdf',
    homeworkTask: 'Escribe una carta de 3 renglones para tu mejor amigo usando al menos un signo de exclamación ¡! y punto final.',
    reflectionPrompt: '¿Por qué escribir con buena ortografía ayuda a que los demás entiendan con cariño tus mensajes?',
    isCompleted: false,
  },

  // ==========================================
  // VIERNES (5 CLASES OFICIALES - 04 DE SEPTIEMBRE 2026)
  // ==========================================
  {
    id: 'class-mat-gael-03',
    subjectId: 'mat-gael',
    studentId: 'gael',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '08:00 - 08:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apertura y Desafío de Conteo', minutes: 10, description: 'Juego interactivo con bloques base 10: ¿Cuántas decenas hay en 340?' },
      { phase: 'Fase 2: Video Didáctico en Español', minutes: 15, description: 'Visualización guiada del valor posicional: Unidades, Decenas y Centenas.' },
      { phase: 'Fase 3: Práctica en Ábaco y Cuaderno', minutes: 15, description: 'Descomposición aditiva de números de tres cifras (ej. 458 = 400 + 50 + 8).' },
      { phase: 'Fase 4: Cierre con el Profe Alex', minutes: 5, description: 'Preguntas rápidas de cálculo mental y comprobación de respuestas.' },
    ],
    unit: 'Unidad 1: Números de 3 Cifras y Valor Posicional',
    theme: 'Descubriendo el Valor Posicional con Bloques Base 10 y Ábaco',
    objective: 'Comprender que el valor de un dígito depende del lugar que ocupa en el número (Unidades, Decenas, Centenas) mediante la descomposición aditiva y material concreto.',
    introduction: '¡Hola pequeño matemático! Los números son como un castillo de tres pisos: en el primer piso viven las Unidades (del 1 al 9), en el segundo piso las Decenas (de 10 en 10) y en el tercer piso las Centenas (¡de 100 en 100!).',
    reading: `¿Cómo funciona el Valor Posicional?
- Unidades (U): Valen 1 cada una (bloquecitos sueltos color azul).
- Decenas (D): Una barrita de 10 unidades juntas (color rojo).
- Centenas (C): Una placa cuadrada de 100 bloquecitos (color verde).

Ejemplo mágico:
En el número 345:
- El 3 vale 300 (3 centenas).
- El 4 vale 40 (4 decenas).
- El 5 vale 5 (5 unidades sueltas).
¡300 + 40 + 5 = 345!`,
    videoUrl: 'https://www.youtube.com/embed/2e_Gg6a8Z_4',
    simulatorUrl: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html',
    socraticQuestions: [
      '¿Qué número es más grande: uno que tiene 5 centenas o uno que tiene 8 decenas?',
      'Si tienes el número 729 y cambias de lugar el 7 con el 9, ¿el nuevo número es mayor o menor?',
      '¿Cuántas monedas de 10 centavos necesitas para completar 1 dólar entero (100 centavos)?',
    ],
    resources: [
      {
        id: 'res-mat-g1',
        type: 'video',
        title: 'Video Explicativo: Unidades, Decenas y Centenas para Niños (Español)',
        url: 'https://www.youtube.com/embed/2e_Gg6a8Z_4',
        description: 'Aprende a descomponer números de forma visual y divertida.',
        duration: '8 min',
        order: 1,
      },
      {
        id: 'res-mat-g2',
        type: 'simulator',
        title: 'Laboratorio de Conteo con Bloques (PhET)',
        url: 'https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html',
        description: 'Arrastra cubos, barritas y placas para formar números gigantes.',
        duration: '15 min de juego',
        order: 2,
      },
    ],
    activities: [
      {
        id: 'act-mat-g1',
        title: 'Descomposición en el Ábaco Mágico',
        description: 'Dibuja en tu cuaderno 3 ábacos y representa con bolitas de colores los números 234, 518 y 603.',
        type: 'practice',
        points: 50,
        completed: false,
      },
      {
        id: 'act-mat-g2',
        title: 'Reto de Sumas de Centenas',
        description: 'Resuelve las sumas 300 + 40 + 7 y 500 + 90 + 2 escribiendo el número final completo.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Valor_Posicional_Centenas.pdf',
    homeworkTask: 'Busca 3 precios de cosas en tu casa (como una caja de cereal o un juguete) y anótalos en tu libreta descomponiendo sus centenas, decenas y unidades.',
    reflectionPrompt: '¿Por qué es importante saber cuánto vale cada número para no equivocarnos al contar dinero?',
    isCompleted: false,
  },

  {
    id: 'class-soc-gael-01',
    subjectId: 'soc-gael',
    studentId: 'gael',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '08:45 - 09:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Apertura con el Mapa del Tesoro', minutes: 10, description: 'Presentación de un plano ilustrado del barrio y cómo ubicarse con puntos de referencia.' },
      { phase: 'Fase 2: Video de Educación Social', minutes: 15, description: 'La convivencia armónica con los vecinos, el respeto a los espacios públicos y la solidaridad.' },
      { phase: 'Fase 3: Taller de Dibujo del Croquis', minutes: 15, description: 'Dibujar la ruta desde la casa hasta el parque con las calles principales y señales.' },
      { phase: 'Fase 4: Cierre con la Profa. Valentina', minutes: 5, description: 'Conversación sobre cómo cuidar el parque de juegos y las plantas de la vereda.' },
    ],
    unit: 'Unidad 1: Mi Familia, mi Escuela y mi Comunidad',
    theme: 'El Croquis de mi Comunidad y la Importancia de la Colaboración Vecinal',
    objective: 'Reconocer los puntos cardinales y referencias espaciales para orientarse en el barrio, valorando el trabajo conjunto de la comunidad.',
    introduction: '¡Bienvenidos a nuestra comunidad! Cada vecindario es un equipo grande donde todos nos cuidamos y ayudamos: los vecinos limpian las calles, los bomberos nos protegen y los parques nos dan alegría.',
    reading: `¿Qué es un Croquis?
Un croquis es un mapa sencillo hecho a mano que nos muestra cómo llegar de un lugar a otro usando puntos de referencia conocidos:
- La tienda de Don Pepe en la esquina.
- El parque con los columpios amarillos.
- La farmacia frente a la parada de autobús.
- Las señales de tránsito que nos cuidan al cruzar la calle por el paso cebra.`,
    videoUrl: 'https://www.youtube.com/embed/8w1b8n1_4nU',
    socraticQuestions: [
      '¿Qué punto de referencia utilizas para saber que ya estás cerca de tu casa?',
      '¿Cómo podemos ayudar a un vecino mayor cuando regresa de hacer las compras?',
      '¿Por qué debemos cruzar la calle siempre de la mano de un adulto por el paso cebra?',
    ],
    resources: [
      {
        id: 'res-soc-g1',
        type: 'video',
        title: 'Video Infantil: Mi Barrio y la Convivencia Vecinal (Español)',
        url: 'https://www.youtube.com/embed/8w1b8n1_4nU',
        description: 'Aprende qué es una comunidad y cómo ser un buen ciudadano desde pequeño.',
        duration: '7 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soc-g1',
        title: 'Dibuja el Croquis de tu Cuadra',
        description: 'En una hoja de tu cuaderno, dibuja tu casa, la calle y 2 lugares que estén cerca (la tienda, el parque o la panadería).',
        type: 'project',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Croquis_Comunidad_Vecinos.pdf',
    homeworkTask: 'Pregúntale a tus papás el nombre de la calle donde vives y el número de tu casa, y anótalo con bonita letra en tu cuaderno.',
    reflectionPrompt: '¿Qué es lo que más te gusta de tu barrio y cómo puedes cuidarlo?',
    isCompleted: false,
  },

  {
    id: 'class-soc-gael-03',
    subjectId: 'soc-gael',
    studentId: 'gael',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '10:00 - 10:45 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: La Bandera Tricolor y el Escudo', minutes: 10, description: 'Significado de los colores Amarillo (oro y sol), Azul (cielo y mar) y Rojo (sangre de los héroes).' },
      { phase: 'Fase 2: Video de los Símbolos Patrios del Ecuador', minutes: 15, description: 'El Cóndor andino, el Chimborazo y el Río Guayas en nuestro escudo nacional.' },
      { phase: 'Fase 3: Taller de Pintura y Coloreado', minutes: 15, description: 'Pintar la bandera del Ecuador respetando el orden exacto de los colores.' },
      { phase: 'Fase 4: Canto del Himno Nacional', minutes: 5, description: 'Aprender la postura de respeto con la mano en el corazón.' },
    ],
    unit: 'Unidad 1: Mi Familia, mi Escuela y mi Comunidad',
    theme: 'Símbolos Patrios y Costumbres Tradicionales del Ecuador',
    objective: 'Reconocer los símbolos patrios del Ecuador (Bandera, Escudo e Himno Nacional) y valorar las tradiciones y fiestas de nuestro país con orgullo y respeto.',
    introduction: '¡Ecuador es nuestro hermoso hogar lleno de volcanes, playas, selvas y gente buena! Nuestros símbolos patrios nos recuerdan la historia y nos unen como una gran familia.',
    reading: `Nuestra Bandera Tricolor:
- Amarillo: La mitad de la bandera, representa el oro brillante, las cosechas de maíz y la luz del sol ecuatorial.
- Azul: Representa el cielo despejado y las aguas del Océano Pacífico.
- Rojo: Representa la valentía y el corazón de nuestros héroes de la patria.
- El Cóndor Andino: El ave majestuosa que corona nuestro escudo con alas abiertas de libertad.`,
    videoUrl: 'https://www.youtube.com/embed/sL1t3gq6iQk',
    socraticQuestions: [
      '¿Por qué la franja amarilla de la bandera es el doble de ancha que la azul y la roja?',
      '¿Qué sentimiento te da escuchar el Himno Nacional del Ecuador con tu mano en el corazón?',
    ],
    resources: [
      {
        id: 'res-soc-g3-1',
        type: 'video',
        title: 'Video Infantil: Los Símbolos Patrios del Ecuador Explicados para Niños (Español)',
        url: 'https://www.youtube.com/embed/sL1t3gq6iQk',
        description: 'Conoce la historia de nuestra bandera y el escudo nacional.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-soc-g3-1',
        title: 'Pinta la Bandera del Ecuador y Escribe sus Colores',
        description: 'Dibuja en tu cuaderno la bandera tricolor con regla y colorea con lápices o témperas.',
        type: 'project',
        points: 100,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Simbolos_Patrios_Ecuador.pdf',
    homeworkTask: 'Pregúntale a tus abuelitos o papás qué comida tradicional ecuatoriana les gusta más y dibújala.',
    reflectionPrompt: '¿Por qué debemos sentirnos orgullosos de ser ecuatorianos?',
    isCompleted: false,
  },

  {
    id: 'class-soft-gael-01',
    subjectId: 'soft-gael',
    studentId: 'gael',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '10:45 - 11:30 (45 min)',
    timeBreakdown: [
      { phase: 'Fase 1: El Robot que Come Manzanas', minutes: 10, description: 'Desafío de pensamiento lógico: ¿Cómo guiar al robot paso a paso sin chocar con las piedras?' },
      { phase: 'Fase 2: Video de Algoritmos para Niños', minutes: 15, description: 'Aprender qué es un algoritmo: una receta de pasos ordenados para resolver un reto.' },
      { phase: 'Fase 3: Laberinto de Flechas en el Cuaderno', minutes: 15, description: 'Trazar la secuencia de flechas (Arriba, Abajo, Derecha, Izquierda) en la cuadrícula.' },
      { phase: 'Fase 4: Comprobación con el Profe David', minutes: 5, description: 'Celebrar que el robot llegó a la meta con éxito rotundo.' },
    ],
    unit: 'Unidad 1: Pensamiento Computacional para Niños',
    theme: 'Algoritmos con Flechas y el Laberinto del Robot Inteligente',
    objective: 'Desarrollar el pensamiento algorítmico mediante secuencias de instrucciones de dirección (arriba, abajo, izquierda, derecha) para resolver laberintos simples.',
    introduction: '¡Las computadoras no son adivinas, necesitan que les enseñemos con instrucciones muy claras! Hoy seremos los directores de un robot inteligente que aprenderá a seguir nuestros pasos mágicos.',
    reading: `¿Qué es un Algoritmo?
Un algoritmo es como una receta de galletas deliciosa: si sigues los pasos en orden, ¡las galletas quedan perfectas!
1. Paso 1: Caminar 2 pasos al frente (⬆️ ⬆️).
2. Paso 2: Girar a la derecha (➡️).
3. Paso 3: Caminar 3 pasos al frente (⬆️ ⬆️ ⬆️).
4. Paso 4: ¡Recoger la manzana mágica y celebrar! 🎉`,
    videoUrl: 'https://www.youtube.com/embed/U3CGMyjzpdM',
    simulatorUrl: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted',
    socraticQuestions: [
      '¿Qué pasaría si te pones los zapatos antes de ponerte las medias?',
      '¿Por qué es importante darle las órdenes al robot en el orden correcto?',
      '¿Qué algoritmo sigues todas las mañanas para lavarte los dientes?',
    ],
    resources: [
      {
        id: 'res-soft-g1',
        type: 'video',
        title: 'Video Infantil: Qué es un Algoritmo y Cómo Piensan las Computadoras (Español)',
        url: 'https://www.youtube.com/embed/U3CGMyjzpdM',
        description: 'Explicación lúdica con dibujos animados sobre secuencias lógicas.',
        duration: '6 min',
        order: 1,
      },
      {
        id: 'res-soft-g2',
        type: 'simulator',
        title: 'Simulador de Bloques Scratch Jr',
        url: 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted',
        description: 'Conecta bloques de colores para mover personajes en la pantalla.',
        duration: '15 min de creatividad',
        order: 2,
      },
    ],
    activities: [
      {
        id: 'act-soft-g1',
        title: 'El Laberinto del Robot Espacial',
        description: 'Dibuja en tu libreta el camino con flechas (⬆️ ⬇️ ⬅️ ➡️) para que el robot llegue a la nave espacial.',
        type: 'practice',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Algoritmos_Laberintos_Robot.pdf',
    homeworkTask: 'Escribe en 4 pasos la receta para preparar un vaso con leche y chocolate (¡tu propio algoritmo culinario!).',
    reflectionPrompt: '¿Cómo te ayuda el orden a no olvidar tus tareas escolares?',
    isCompleted: false,
  },

  {
    id: 'class-ing-gael-01',
    subjectId: 'ing-gael',
    studentId: 'gael',
    date: '2026-09-04',
    dayOfWeek: 'Viernes',
    scheduleTime: '11:30 - 12:00 (30 min)',
    timeBreakdown: [
      { phase: 'Fase 1: Saludos Mágicos y Calentamiento (8 min)', minutes: 8, description: 'Explicación en español y canción de bienvenida: aprender a saludar con alegría ("Good morning!", "Hello!", "How are you?").' },
      { phase: 'Fase 2: El Arcoíris y los Números del 1 al 20 (12 min)', minutes: 12, description: 'Video con las estrellas mágicas para contar en inglés y descubrir los 6 colores principales del arcoíris.' },
      { phase: 'Fase 3: Taller de Dibujo del Arcoíris Mágico (10 min)', minutes: 10, description: 'Dibuja el arcoíris en tu libreta, colorea cada franja y escribe sus nombres en inglés con traducción al español.' },
    ],
    unit: 'Unidad 1: ¡Bienvenidos al Club Mágico de Inglés! (Magic English Club)',
    theme: 'Colores del Arcoíris, Números del 1 al 20 y Saludos en Acción (Colors, Numbers & Greetings)',
    objective: 'Aprender y practicar saludos cotidianos, los colores principales y el conteo del 1 al 20 en inglés mediante canciones infantiles, juegos interactivos y dibujos guiados.',
    introduction: '¡Bienvenido al Club Mágico de Inglés, Gael! El inglés es como una llave mágica que te permite hacer amigos en todo el planeta. En esta divertida clase de 30 minutos, te explicamos todo en español para que cantes, juegues y dibujes con total facilidad.',
    reading: `📘 Palabras Mágicas de Hoy (con pronunciación y significado en español):

1. Saludos para cada momento del día:
   • "Hello!" [se dice "je-lóu"] = ¡Hola!
   • "Good morning!" [se dice "gud mór-ning"] = ¡Buenos días!
   • "¿How are you?" [se dice "jáu ar yu"] = ¿Cómo estás?
     -> Respuesta feliz: "I am happy!" [ai am já-pi] = ¡Estoy feliz!

2. Los Colores del Arcoíris (Colors):
   • Red [red] = Rojo | Blue [blu] = Azul | Yellow [yé-lou] = Amarillo
   • Green [griin] = Verde | Orange [ó-ranch] = Naranja | Purple [pér-pol] = Morado

3. Conteo Mágico del 1 al 10:
   • One (1), Two (2), Three (3), Four (4), Five (5),
   • Six (6), Seven (7), Eight (8), Nine (9), Ten (10)!`,
    videoUrl: 'https://www.youtube.com/embed/tVlcKp3bWH8',
    socraticQuestions: [
      '¿Cuál es tu color favorito del arcoíris en inglés? (Por ejemplo: Red, Blue, Green).',
      '¿Puedes contar 5 objetos que tengas cerca en tu mesa en inglés (One, Two, Three, Four, Five)?',
      '¿Cómo saludarías en inglés por la mañana con una gran sonrisa a mamá o papá?',
    ],
    resources: [
      {
        id: 'res-ing-g1',
        type: 'video',
        title: 'Video Canción Infantil: Los Colores del Arcoíris y Números Mágicos (con subtítulos)',
        url: 'https://www.youtube.com/embed/tVlcKp3bWH8',
        description: 'Canta con animalitos animados y aprende los colores y números en inglés.',
        duration: '8 min',
        order: 1,
      },
    ],
    activities: [
      {
        id: 'act-ing-g1',
        title: 'Taller de Arte: Dibuja y Pinta el Arcoíris Mágico en Inglés',
        description: '¿Qué vas a hacer paso a paso?\n1. Dibuja un gran arcoíris con nubes en tu libreta de Inglés.\n2. Pinta cada franja con sus colores: Rojo (Red), Naranja (Orange), Amarillo (Yellow), Verde (Green), Azul (Blue) y Morado (Purple).\n3. Escribe el nombre de cada color en inglés al lado de cada franja.\n4. Cuenta las 6 franjas en inglés en voz alta: "One, Two, Three, Four, Five, Six!".\n5. Sube la foto de tu arcoíris al taller para recibir tu insignia mágica.',
        type: 'project',
        points: 50,
        completed: false,
      },
    ],
    guideTitle: 'Guia_Gael_Ingles_Colores_Arcoiris_Numeros.pdf',
    homeworkTask: 'Saluda a tu familia mañana por la mañana diciendo: "Good morning!" con una gran sonrisa y muéstrales tu dibujo del arcoíris.',
    reflectionPrompt: '¿Qué tan emocionante y divertido es aprender palabras en un nuevo idioma?',
    isCompleted: false,
  },
];
