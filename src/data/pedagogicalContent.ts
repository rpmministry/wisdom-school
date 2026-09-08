// Wisdom School — Contenido pedagógico por tema.
// Garantiza que cada pregunta socrática muestre el material concreto al que
// hace referencia (ecuaciones, estructuras, textos, simuladores válidos).

export interface MaterialContexto {
  titulo: string;
  observacion: string;
  explicacion: string;
  instruccion: string;
  simuladorUrl?: string;
  simuladorNombre?: string;
}

const SIMULADOR_ALGEBRA = 'https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_es.html';
const SIMULADOR_BIOLOGIA = 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_es.html';
const SIMULADOR_SCRATCH = 'https://scratch.mit.edu/projects/editor/';
const SIMULADOR_ARTE = 'https://quickdraw.withgoogle.com/';
const SIMULADOR_VALORES = 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_es.html';

const CONTEXTOS_POR_TEMA: Record<string, MaterialContexto> = {
  'Modelado algebraico': {
    titulo: 'Ecuación de ejemplo',
    observacion: 'x + 5 = 12',
    explicacion: 'El signo "=" es una balanza: ambos lados valen lo mismo. "x" es el número que buscamos (léelo como "un número"). La operación contraria de sumar 5 es restar 5 en ambos lados: x + 5 − 5 = 12 − 5, por lo tanto x = 7.',
    instruccion: 'Antes de responder, obsérvala y explica qué representa cada elemento de la ecuación. Verifica que x = 7 cumple la igualdad.',
    simuladorUrl: SIMULADOR_ALGEBRA,
    simuladorNombre: 'Explorador de Igualdades (PhET)',
  },
  'Ecuaciones de segundo grado': {
    titulo: 'Ecuación cuadrática de ejemplo',
    observacion: 'x² + 4x − 12 = 0',
    explicacion: 'Tiene forma general ax² + bx + c = 0 con a = 1, b = 4, c = −12. Las soluciones son los valores de x que hacen verdadera la igualdad (x = 2 y x = −6 para este caso).',
    instruccion: 'Identifica los coeficientes a, b y c y comprueba que los valores propuestos cumplen la ecuación.',
    simuladorUrl: SIMULADOR_ALGEBRA,
    simuladorNombre: 'Explorador de Igualdades (PhET)',
  },
  'Resolución de problemas cotidianos': {
    titulo: 'Problema cotidiano de ejemplo',
    observacion: 'Si te sobran $5,50 y compras una caja de lápices que cuesta $3,25, ¿cuánto dinero te queda? (5,50 − 3,25 = ?)',
    explicacion: 'Traducir palabras a números y operaciones es el "modelado": convertir una historia real en una cuenta que podemos resolver pasito a pasito (Montessori: manipulamos los datos con dibujos o monedas).',
    instruccion: 'Plantea la operación y resuélvela; comparte qué pasos seguiste.',
    simuladorUrl: SIMULADOR_ALGEBRA,
    simuladorNombre: 'Explorador de Igualdades (PhET)',
  },
  'Estructura celular': {
    titulo: 'La célula que observamos',
    observacion: 'Célula animal: membrana (borde) → núcleo (centro con instrucciones) → citoplasma (espacio interior). Célula vegetal: además pared rígida y cloroplastos.',
    explicacion: 'La membrana decide quién entra y sale; el núcleo guarda el ADN y da instrucciones; el citoplasma es donde ocurren las reacciones. Así como una fábrica, cada órgano tiene una función.',
    instruccion: 'Identifica cada componente en tu cuaderno y comenta por qué la membrana es clave para la célula. Comenta las diferencias entre la célula animal y vegetal.',
    simuladorUrl: SIMULADOR_BIOLOGIA,
    simuladorNombre: 'Selección Natural (PhET)',
  },
  'Historia del Ecuador y América Latina': {
    titulo: 'Línea de tiempo que observarás',
    observacion: 'Época precolombina → Colonia (desde 1534) → Independencia (Quito, 1809; 1822) → República.',
    explicacion: 'Cada etapa dejó huellas: idiomas, costumbres, leyes. "Comprender el origen explica el presente" (la historia es como un río cuyas aguas vienen de su fuente).',
    instruccion: 'Ubica las fechas de la línea de tiempo y explica qué huella dejó cada época en tu vida actual.',
  },
  'Sistemas de gobierno y participación ciudadana': {
    titulo: 'Ejemplo de participación',
    observacion: 'Seleccionar a tu representante de curso votando es una mini-democracia: todos votan, todas las voces cuentan.',
    explicacion: 'Democracia: el pueblo decide mediante voto y participación. Participación ciudadana: votar, opinar, proponer y exigir transparencia.',
    instruccion: 'Describe con tus palabras cómo funciona la participación en tu comunidad y su importancia.',
    simuladorUrl: SIMULADOR_BIOLOGIA,
    simuladorNombre: 'Selección Natural (PhET)',
  },
  'Participación ciudadana': {
    titulo: 'Caso de participación',
    observacion: 'Pensar en una asamblea estudiantil para el mural de la escuela.',
    explicacion: 'Toda decisión colectiva empieza con una idea expuesta sin miedo ante el grupo: eso es participar.',
    instruccion: 'Menciona una decisión en la que puedas participar esta semana y cómo aportarías.',
  },
  'Principios de fe y valores universales': {
    titulo: 'El valor universal de hoy',
    observacion: 'Respeto: "No hago a los demás lo que no quiero que me hagan".',
    explicacion: 'Los valores se practican: el respeto no se impone, se vive al tratar a otros con el mismo cuidado que queremos para nosotros.',
    instruccion: 'Cuéntame cómo llevaste a la práctica el respeto (o el valor que elijas) en tu día.',
  },
  'Escritura creativa y argumentación': {
    titulo: 'Estructura de un argumento',
    observacion: 'Tesis (qué defiendo) → Argumentos (por qué) → Evidencias (en qué me apoyo) → Conclusión (qué significo).',
    explicacion: 'Argumentar es como construir una torre: base = tesis; pilares = razones; cemento = evidencias.',
    instruccion: 'Construye tu propio miniargumento usando esta estructura antes de responder.',
  },
  'Comprensión lectora analítica': {
    titulo: 'Texto modelo para analizar',
    observacion: 'Lee despacio este párrafo y pregúntate: ¿qué dice?, ¿por qué lo dice?, ¿qué quiere que yo piense?',
    explicacion: 'Comprender no es solo leer palabras: es buscar el "porqué" detrás de cada afirmación y conectar con tu vida.',
    instruccion: 'Responde identificando la idea central y una razón del autor te diste cuenta.',
  },
  'Modelos de negocio y finanzas': {
    titulo: 'Esquema del modelo (Canvas)',
    observacion: '¿Qué vendes? → ¿A quién? → ¿Cómo llega hasta ellos? → ¿Cómo ganas dinero? (9 bloques del Canvas)',
    explicacion: 'Un modelo de negocio describe cómo una empresa crea, entrega y captura valor: es como un mapa del tesoro (tesoro = valor, mapa = canal, X = ingreso).',
    instruccion: 'Plantea qué venderías, a quién y cómo ganarías dinero con tu idea.',
  },
  'Educación Cultural y Artística y composición visual': {
    titulo: 'Objeto visual para analizar',
    observacion: 'Un cuadro con colores cálidos (rojo/naranja) transmite energía; con colores fríos (azul/verde) transmite calma.',
    explicacion: 'El color es un lenguaje emocional; la composición organiza línea, color, forma, textura y espacio.',
    instruccion: 'Elige un color y explique qué emoción comunica en tu entorno.',
    simuladorUrl: SIMULADOR_ARTE,
    simuladorNombre: 'Quick, Draw! (Google)',
  },
  'Acondicionamiento físico y salud postural': {
    titulo: 'Posición correcta',
    observacion: 'Espalda recta, hombros relajados, obra libre para respirar...',
    explicacion: 'La actividad física y la postura cuidada fortalecen el cuerpo y la concentración: "un cuerpo sano alberga mente despierta".',
    instruccion: 'Explica por qué es importante la postura durante el ejercicio y cómo la corregirías.',
  },
  'Comprensión de procesos históricos': {
    titulo: 'Línea de causa y efecto',
    observacion: 'Causa → Suceso → Consecuencia. (Ej.: la independencia de 1822 empezó en Quito en 1809 con un primer gobierno autónomo). ',
    explicacion: 'Los procesos históricos se estudian como una cadena: cada acontecimiento tiene causas y deja consecuencias que se pueden rastrear.',
    instruccion: 'Identifica causa y consecuencia de un suceso trabajado.',
  },
  'Continuación: Bioquímica básica': {
    titulo: 'Muestra bioquímica',
    observacion: 'Célula → tejido → proceso: por ejemplo, la respiración celular convierte al glucosa y oxígeno en energía, CO2 y agua.',
    explicacion: 'En bioquímica se observan cambios de sustancia dentro del ser vivo: la energía se transforma, no se destruye.',
    instruccion: 'Describe un proceso bioquímico con otra forma simple.',
  },
  'Continuación: Análisis de texto argumentativo': {
    titulo: 'Afirmación para analizar',
    observacion: 'Título o idea: compare and analyze as before (usar la estructura tesis-argumento-evidencia).',
    explicacion: 'sigue aplicando la estructura: tesis clara, argumento ordenado y evidencia concreta.',
    instruccion: 'Completa con un párrafo corto que tenga los tres elementos.',
  },
  'Desarrollo de fluidez comunicativa y debates en inglés': {
    titulo: 'Pregunta de discusión',
    observacion: '"Would you rather live in the city or the countryside? Why?"',
    explicacion: 'Debatir en inglés usa vocabulario aprendido (city/countryside, prefer, because) y opinión con razón: no necesitas experto, solo hablar con claridad.',
    instruccion: 'Da tu opinión con una razón y escucha la de tu profesor.',
  },
  'Desarrollo de vocabulario en inglés': {
    titulo: 'Palabra con su contexto',
    observacion: 'Ejemplo: "school (escuela)" → "I go to school every day."',
    explicacion: 'Aprender vocabulario en contexto (una palabra dentro de una oración real) fija el significado con mayor facilidad.',
    instruccion: 'Escribe una palabra nueva en una oración propia.',
  },
  'Estrategias de marketing': {
    titulo: 'Las 4P del marketing',
    observacion: 'Producto, Precio, Plaza (canal) y Promoción.',
    explicacion: 'Cada P responde a una decisión comercial; el marketing busca que el cliente entienda el valor de lo que se ofrece.',
    instruccion: 'Explica cómo usarías las 4P para tu lonchera o una idea de tu aula.',
  },
  'Educación Cultural y Artística and composición visual': {
    titulo: 'Objeto visual para analizar',
    observacion: 'Un cuadro con colores cálidos (rojo/naranja) transmite energía; con colores fríos (azul/verde) transmite calma.',
    explicacion: 'El color es un lenguaje emocional; la composición organiza línea, color, forma, textura y espacio.',
    instruccion: 'Elige un color y explica qué emoción comunica en tu entorno.',
    simuladorUrl: SIMULADOR_ARTE,
    simuladorNombre: 'Quick, Draw! (Google)',
  },
  'Pensamiento computacional, hardware y Scratch': {
    titulo: 'Algoritmo de ejemplo',
    observacion: 'Receta para abrir: 1) obtén los ingredientes (datos); 2) sigue los pasos en orden (algoritmo); 3) verifica que el resultado (plato) sea correcto.',
    explicacion: 'Programar en Scratch es como cocinar: los bloques son instrucciones ordenadas; descomponer problemas, identificar patrones y crear secuencias.',
    instruccion: 'Plantea una secuencia de pasos para resolver una tarea simple.',
    simuladorUrl: SIMULADOR_SCRATCH,
    simuladorNombre: 'Scratch (Editor de proyectos)',
  },
  'Scratch y creación de proyectos': {
    titulo: 'Bloques de Scratch y las escenas',
    observacion: 'Escenas → personajes (actores) → diálogo → acción: un cuento animado necesita guion y bloques de eventos (\"Al presionar bandera\" inicia la animación).',
    explicacion: 'Cada bloque es una instrucción; unirlos en orden correcto crea un programa que realiza una escena.',
    instruccion: 'Describe la escena que crearías con bloques o el guion que seguiría tu personaje.',
    simuladorUrl: SIMULADOR_SCRATCH,
    simuladorNombre: 'Scratch (Editor de proyectos)',
  },
  'Cuentos animados en Scratch': {
    titulo: 'Guion mínimo',
    observacion: 'Escena: inicio → trama (obstáculo) → desenlace. Personajes hablan con diálogos.',
    explicacion: 'Contar una historia con bloques es como contar con Lego: cada pieza construye la obra.',
    instruccion: 'Plantea tu cuento: personaje, problema y solución (participación).',
    simuladorUrl: SIMULADOR_SCRATCH,
    simuladorNombre: 'Scratch (Editor de proyectos)',
  },
  'Cuentos animados en Scratch - Continuación': {
    titulo: 'Bloques para avanzar',
    observacion: 'Eventos (al presionar flag), movimiento (deslizar), apariencia (decir) y control (esperar) forman el esqueleto de cada escena.',
    explicacion: 'Domina los buques que controlan la secuencia de tu escena antes de continuar.',
    instruccion: 'Identifica qué bloques usarías para iniciar, moVe y hablar en tu cuento.',
    simuladorUrl: SIMULADOR_SCRATCH,
    simuladorNombre: 'Scratch (Editor de proyectos)',
  },
  'Multiplicación con área': {
    titulo: 'El reto de área',
    observacion: 'Filas (3) × columnas (4) = piezas totales. Área rectángulo = multiplicar dos medidas (ancho × largo).',
    explicacion: 'Multiplicar es sumatorias de filas iguales; el área es la superficie cubierta por ellas (como Lego).',
    instruccion: 'Calcula el área de un rectángulo de 3×4 dibujándolo en tu libreta.',
    simuladorUrl: SIMULADOR_ALGEBRA,
    simuladorNombre: 'Explorador de Igualdades (PhET)',
  },
  'Multiplicación con áreas y cuerpos 3D': {
    titulo: 'De área a volumen',
    observacion: 'Un rectángulo 3×4 tiene area 12. Un cubo apilado suma volumen: dato lado × lado × lado.',
    explicacion: 'El área mide superficie (2D) y el volumen el espacio dentro (3D): el cubo tiene 6 caras, 12 aristas y 8 vértices.',
    instruccion: 'Completa el área 2D y añade qué pasa cuando lo hacemos 3D (volumen).',
    simuladorUrl: SIMULADOR_ALGEBRA,
    simuladorNombre: 'Explorador de Igualdades (PhET)',
  },
  'Cuerpos 3D': {
    titulo: 'Cuerpos geométricos',
    observacion: 'Cubo: 6 caras, 12 aristas, 8 vértices. Esfera: solo cara curva; volumen: se mide como espacio que llena.',
    explicacion: 'Encuentra cuerpos 3D en tu casa y nombra sus partes (caras, aristas, vértices).',
    instruccion: 'Dibuja un cubo y señala cara, arista y vértice.',
  },
  'Figuras planas y patrones': {
    titulo: 'Patrón de figuras',
    observacion: 'Secuencia: cuadrado, triángulo, cuadrado, triángulo… ¿cuál sigue? „Los patrones repiten una idea”.',
    explicacion: 'Identificar patrones es un proceso base de la matemática y del pensamiento computacional.',
    instruccion: 'Continúa el patrón y crea uno propio con las figuras que conoces.',
  },
  'Ecosistemas y seres vivos': {
    titulo: 'Red del ecosistema',
    observacion: 'Bosque: árboles (oxígeno) + suelo (nutrientes) + animales (dispersan semillas) + agua.',
    explicacion: 'Un ecosistema es el conjunto de seres vivos y ambiente que se conectan: si quitas uno, se desequilibra todo.',
    instruccion: 'Menciona un componente y explica qué pasaría si desaparece del ecosistema que estudiaste.',
    simuladorUrl: SIMULADOR_BIOLOGIA,
    simuladorNombre: 'Selección Natural (PhET)',
  },
  'Seres vivos y sus características': {
    titulo: 'Ciclo de un ser vivo',
    observacion: 'Las plantas nacen, crecen, se reproducen, responden al ambiente y necesitan energía (nunca: una piedra no crece).',
    explicacion: 'Diferenciar lo vivo de lo no vivo según esas características: nacen, crecen, se reproducen, responden, obtienen energía.',
    instruccion: 'Elige un ser vivo de tu casa y comparte cuáles características viste con en él.',
    simuladorUrl: SIMULADOR_BIOLOGIA,
    simuladorNombre: 'Selección Natural (PhET)',
  },
  'Plantas y animales del entorno': {
    titulo: 'Ejemplo del entorno',
    observacion: 'Planta del patio (respira, necesita luz y agua) y un animal (muévese, busca alimento).',
    explicacion: 'Observamos los seres vivos de nuestro barrio para descubrir cómo viven y qué necesitan.',
    instruccion: 'Describir un ser vivo del entorno con sus características.',
  },
  'Ciudad vs campo y servicios públicos': {
    titulo: 'Comparación',
    observacion: 'Ciudad: hospital, escuela, bomberos, trabajo en servicios. Campo: naturaleza, aire limpio, actividades agrícolas.',
    explicacion: 'Ambos lugares tienen dispositivos diferentes que sirven a las personas; tu opinión hace valiosa la comparación.',
    instruccion: 'Elige ciudad o campo y da al menos una razón con base en tus observaciones.',
  },
  'Servicios públicos en la comunidad': {
    titulo: 'Servicios de mi comunidad',
    observacion: 'Hospital (salud), Escuela (educación), Bomberos (seguridad), Agua potable (higiene).',
    explicacion: 'Los servicios públicos son derechos/beneficios que la comunidad organiza para cuidarse.',
    instruccion: 'Dícono un servicio y qué te gustaría a tu vida (necesidad) o menos.',
  },
  'Aprendizaje lúdico de fonética': {
    titulo: 'Mi sonido protagonista',
    observacion: 'El sonido "ma": "mamá", "mapa", "mano" — encuentra 3 palabras que suenan igual.',
    explicacion: 'Entrenar la fonética jugando: escucha y repite los sonidos antes de leer.',
    instruccion: 'Di una palabra con el sonido de hoy y forma una pequeña oración.',
  },
  'Lectura comprensiva y creación de cuentos': {
    titulo: 'Un cuento es un viaje',
    observacion: 'Inicio (salida) → trama (camino con obstáculos) → desenlace (llegada).',
    explicacion: 'Comprender = captar la idea central + las razones del autor; crear = inventar tu propio viaje con esa estructura.',
    instruccion: 'Resume brevemente la historia y inventa un inicio tuyo.',
  },
  'Creación de cuentos propios': {
    titulo: 'Guión de mi cuento',
    observacion: 'Autor → Personaje(s) → Lugar → Problema → Solución → Mensaje final.',
    explicacion: 'Un cuento propio nace de organizar sus partes en orden e imaginación.',
    instruccion: 'Plantea tu cuento: ¿quién?, ¿dónde?, ¿qué problema?, ¿cómo término? ',
  },
  'Repaso de la semana': {
    titulo: 'Recorrido de la semana',
    observacion: 'Repasemos los temas vistos: conceptos claves y sus ejemplos.',
    explicacion: 'El repaso no memorístico fija lo que ya sabes y te permite enseñar a otros lo que dominas.',
    instruccion: 'Elige el concepto de la semana y explícalo con un ejemplo.',
  },
  'Repaso de cuentos': {
    titulo: 'Cuento que volvemos a visitar',
    observacion: 'Lee el cuento de nuevo y busca: personajes, problema, solución y mensaje.',
    explicacion: 'Volver a leer con ojos de narrador ayuda a observar detalles que la primera lectura nos oculta.',
    instruccion: 'Cuéntame qué detalle nuevo descubriste al releer.',
  },
  'Vocabulario en inglés': {
    titulo: 'Palabra en contexto',
    observacion: 'Por ejemplo: "hello" → "Hello, my name is Era."',
    explicacion: 'Aprende una palabra siempre dentro de una oración real para memorizar el uso, no unos solo la palabra.',
    instruccion: 'Usa una palabra nueva en una oración que digas en voz alta.',
  },
  'Valores y empatía': {
    titulo: 'El valor que huele hoy',
    observacion: 'Alegría ayuda y comparte: poner pan para el vecino, esperar tu turno en la fila.',
    explicacion: 'Tus acciones reflejan tus valores: cuando te pones al servicio del otro, demuestras empatía internalizada.',
    instruccion: 'Cuéntame hoy una acción amable (a un compañero, familiar o mascota) y cómo te sentiste.',
  },
  'Psicomotricidad y circuitos': {
    titulo: 'El circuito de hoy',
    observacion: 'Estaciones del circuito: saltar → lanzar → seguir → equilibrio.',
    explicacion: 'El ejercicio de coordinación ordena movimientos pequeños y control de tu cuerpo.',
    instruccion: 'Describe cómo mantendrías el equilibrio cada estación.',
  },
  'Upcycling y colores': {
    titulo: 'Material para transformar',
    observacion: 'Una botella de plástico puede convertirse en una maceta o florero: se reutiliza (upcycling). Colores: mezcla y tonos.',
    explicacion: 'Stopaging revalora la basura convirtiéndola en algo útil y ligado al arte.',
    instruccion: 'Plantea qué crearías con un objeto que ya no uses y qué colores elegirías.',
  },
  'Modelos de negocio y finanzas de proyectos': {
    titulo: 'Comparación de modelos',
    observacion: 'Compara los dos modelos vistos hoy (uno solo producto vs uno de servicio) usando cuatro preguntas: qué/quién/comcanal/ingreso.',
    explicacion: 'Para comparar modelos conviene usar el mismo esqueleto (Canvas) y nota las diferencias.',
    instruccion: 'Señala una diferencia clave entre ambos modelos.',
  },
};

function themeKey(theme: string): string {
  const t = theme.trim().toLowerCase();
  if (Object.prototype.hasOwnProperty.call(CONTEXTOS_POR_TEMA, t)) return t;
  const match = Object.keys(CONTEXTOS_POR_TEMA).find((k) => t === k.trim().toLowerCase());
  return match || '';
}

export function obtenerContextoTema(theme: string): MaterialContexto | null {
  const key = themeKey(theme);
  return key ? CONTEXTOS_POR_TEMA[key] : null;
}

const INDICADORES_TEMATICO: Array<{ patron: RegExp; nombre: string; url: string }> = [
  { patron: /algebra|ecuacion|ecuaci/i, nombre: 'Explorador de Igualdades (PhET)', url: SIMULADOR_ALGEBRA },
  { patron: /celul|bio|cél|animal|seres|ecosistema|planta|naturaleza/i, nombre: 'Selección Natural (PhET)', url: SIMULADOR_BIOLOGIA },
  { patron: /scratch|programa|computacional|algoritmo/i, nombre: 'Scratch (Editor de proyectos)', url: SIMULADOR_SCRATCH },
  { patron: /arte|artistic|dibujo|colores|composicion/i, nombre: 'Quick, Draw! (Google)', url: SIMULADOR_ARTE },
];

const PLACEHOLDER_PATTERNS: Array<RegExp> = [
  /wisdom-school\.edu/i,
  /example\.com/i,
  /^#$/,
  /dQw4w9WgXcQ/i,
];

export function corregirUrlRecurso(url: string | undefined, theme = ''): { url: string; sitio: string } {
  if (!url) {
    const sugerido = theme ? obtenerContextoTema(theme) : null;
    if (sugerido && sugerido.simuladorUrl) {
      return { url: sugerido.simuladorUrl, sitio: sugerido.simuladorNombre || '' };
    }
    return { url: '', sitio: 'Disponible en la plataforma. Usa los materiales físicos de tu libreta.' };
  }
  if (PLACEHOLDER_PATTERNS.some((r) => r.test(url))) {
    const sugerido = theme ? obtenerContextoTema(theme) : null;
    if (sugerido && sugerido.simuladorUrl) return { url: sugerido.simuladorUrl, sitio: sugerido.simuladorNombre || '' };
    return { url: '', sitio: 'Disponible en la plataforma.' };
  }
  return { url, sitio: url.startsWith('https://t') ? '' : '' };
}

export const LAB_RESOURCES = {
  algebra: { name: 'Explorador de Igualdades (PhET)', url: SIMULADOR_ALGEBRA },
  biologia: { name: 'Selección Natural (PhET)', url: SIMULADOR_BIOLOGIA },
  scratch: { name: 'Scratch (Editor de proyectos)', url: SIMULADOR_SCRATCH },
  arte: { name: 'Quick, Draw! (Google)', url: SIMULADOR_ARTE },
};

export function arreglarUrlRecurso(url: string | undefined, theme = ''): { url: string; sitio: string } {
  return corregirUrlRecurso(url, theme);
}