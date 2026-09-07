import React, { useState, useEffect, useRef } from 'react';
import { AITeacher, Student } from '../../types';
import { Bot, CheckCircle2, Sparkles, ArrowRight, Volume2, Trophy, Lightbulb, Heart, Star, BookOpen } from 'lucide-react';

export interface LessonNode {
  id: string;
  type: 'concept' | 'exploration' | 'synthesis' | 'creation';
  title: string;
  teacherDialogue: string;
  conceptContent?: string; // El contenido teórico que se presenta ANTES de preguntar
  guidingQuestion?: string;
  options?: string[];
  placeholder?: string;
  socraticHints?: string[];
}

interface InteractiveLessonViewProps {
  teacher: AITeacher;
  student: Student;
  theme: string;
}

// Conceptos teóricos por tema - el profesor los presenta en el Paso 1
// El estudiante luego responde basándose en ESTE contenido
const THEORETICAL_CONTENT: Record<string, { primary: string; secondary: string }> = {
  'Modelado algebraico': {
    primary: 'El modelado algebraico es representar situaciones de la vida real usando números, letras y operaciones. Las letras (como x) representan valores desconocidos. Una ecuación como "x + 5 = 12" nos dice: "algo más 5 da 12". El modelo nos permite encontrar ese "algo".',
    secondary: 'Ejemplo: Si tienes una caja con frutas y dentro hay 5 manzanas más, y en total hay 12 frutas, la ecuación x + 5 = 12 te dice cuántas manzanas había originalmente. x = 7. El álgebra convierte problemas cotidianos en cuentas resolubles.',
  },
  'Estructura celular': {
    primary: 'La célula es la unidad mínima de vida. Tiene membrana (corteza protectora), núcleo (centro de control con ADN) y citoplasma (gel donde ocurren las reacciones). Las células animales tienen forma irregular; las vegetales tienen pared rígida y cloroplastos.',
    secondary: 'Analogía: La célula es como una fábrica. La membrana es la puerta que controla quién entra y sale. El núcleo es el director que da órdenes. El citoplasma es el piso de fábrica donde se produce todo. Sin cada parte, la fábrica no funciona.',
  },
  'Fotosíntesis': {
    primary: 'La fotosíntesis es el proceso que usan las plantas para convertir luz solar, agua y CO₂ en oxígeno y azúcar. Ocurre en las hojas, dentro de los cloroplastos (contenidos verdes). La energía luminosa se transforma en energía química almacenada.',
    secondary: 'Analogía: La hoja es un panel solar vivo. Toma luz del sol, agua de las raíces y CO₂ del aire. Produce oxígeno (lo que respiramos) y azúcar (comida para la planta). Sin fotosíntesis, no habría oxígeno ni vida animal.',
  },
  'Principios de fe': {
    primary: 'Los principios de fe son valores fundamentales que guían nuestras acciones y decisiones. Se basan en el respeto, la honestidad, la compasión y la responsabilidad. No se imponen: se descubren reflexionando sobre cómo queremos tratar a los demás.',
    secondary: 'Ejemplo: Si ves a alguien caer, tu principio de compasión te hace ayudar. No es una regla obligatoria: es una elección basada en valores. La fe viva es practicar esos valores cada día, no solo creer en ellos.',
  },
  'Escritura creativa y argumentación': {
    primary: 'La escritura argumentativa presenta una postura sobre un tema y la respalda con razones y evidencia. No es opinión sin base: es una idea clara defendida con lógica. Estructura: tesis → argumentos → evidencia → conclusión.',
    secondary: 'Ejemplo: "Las ciudades deberían tener más parques" es una tesis. Los argumentos: mejoran la salud, reducen contaminación, fomentan comunidad. La evidencia: estudios muestran menos estrés en zonas verdes. La conclusión cierra la idea.',
  },
  'Comprensión lectora analítica': {
    primary: 'Comprender un texto va más allá de leer palabras: es captar la idea central, las razones del autor y las implicaciones. Preguntas clave: ¿Qué dice el autor? ¿Por qué lo dice? ¿Qué quiere que el lector piense o sienta?',
    secondary: 'Ejemplo: Si lees "El gobierno aumentó impuestos", pregunta: ¿Por qué? ¿Para qué? ¿Quién paga más? ¿Es justo? La comprensión analítica busca el "porqué" detrás de cada afirmación.',
  },
  'Historia del Ecuador y América Latina': {
    primary: 'La historia del Ecuador incluye culturas precolombinas (Caranqui, Cañari), la colonia española y la independencia en 1822. Cada etapa dejó huellas culturales, sociales y políticas que explican cómo somos hoy.',
    secondary: 'Analogía: La historia es como un río: las aguas de hoy vienen de montañas lejanas. Entender el origen ayuda a comprender el presente. Los ríos cambian de curso pero siempre llevan la marca de su fuente.',
  },
  'Modelos de negocio': {
    primary: 'Un modelo de negocio describe cómo una empresa crea, entrega y captura valor. Responde: ¿Qué vendes? ¿A quién? ¿Cómo llega a ellos? ¿Cómo ganas dinero? El Canvas organiza esto en 9 bloques visuales.',
    secondary: 'Ejemplo: Una tienda de jugos vende salud (valor) a estudiantes (clientes) en la escuela (canal) cobrando precio justo (ingreso). El modelo explica cómo cada pieza encaja para que el negocio funcione.',
  },
  'Educación Cultural y Artística': {
    primary: 'El arte es expresión visual de ideas y emociones. Elementos: línea, color, forma, textura, espacio. Composición es cómo se organizan: equilibrio, ritmo, contraste. El arte comunica lo que las palabras no pueden.',
    secondary: 'Ejemplo: Un cuadro oscuro con líneas irregulares transmite tensión. Uno claro con formas suaves transmite calma. El color y la forma son un lenguaje visual que todos podemos aprender a leer y crear.',
  },
  'Pensamiento computacional, hardware y Scratch': {
    primary: 'El pensamiento computacional descompone problemas en partes pequeñas, identifica patrones y crea pasos lógicos (algoritmos). Scratch usa bloques visuales: cada bloque es una instrucción. Juntarlos crea programas.',
    secondary: 'Analogía: Cocinar es como programar. Receta = algoritmo. Ingredientes = datos. Paso a paso = secuencia. Si falta un paso, el resultado cambia. Pensar computacionalmente es pensar como un chef: ordenado y preciso.',
  },
  'Sistemas de gobierno y participación ciudadana': {
    primary: 'Un sistema de gobierno organiza cómo una sociedad toma decisiones colectivas. Tipos: democracia (decide el pueblo), monarquía (un rey), autoritarismo (poder central). La participación ciudadana implica votar, opinar y exigir transparencia.',
    secondary: 'Ejemplo: Elegir estudiantes para el consejo es democracia. Todos votan, todos tienen voz. Sin participación, las decisiones no representan a nadie. La ciudadanía activa hace que el sistema funcione.',
  },
  'Inglés básico': {
    primary: 'El inglés se basa en vocabulario, gramática y pronunciación. Las oraciones siguen estructura sujeto-verbo-objeto. Las palabras cambian según tiempo: "I eat" (presente), "I ate" (pasado), "I will eat" (futuro).',
    secondary: 'Ejemplo: "I read books" = Leo libros. "I read a book" = Leí un libro. El contexto y la forma de la palabra indican cuándo ocurre. El inglés es un código que se descifra practicando.',
  },
  'Matemáticas básicas': {
    primary: 'Las matemáticas son el lenguaje del orden. Operaciones básicas: sumar (juntar), restar (quitar), multiplicar (sumar repetidas), dividir (repartir). Cada una tiene una operación inversa que la deshace.',
    secondary: 'Ejemplo: Si tienes 3 cajas con 4 manzanas cada una, multiplicas 3×4=12. Si repartes 12 entre 3, divides 12÷3=4. Las matemáticas describen relaciones cuantitativas que existen en el mundo real.',
  },
  'Ciencias Naturales - Ecosistemas': {
    primary: 'Un ecosistema es un conjunto de seres vivos que interactúan con su ambiente. Componentes: seres vivos (flora, fauna), no vivos (agua, suelo, clima) y la relación entre ambos. El equilibrio depende de estas conexiones.',
    secondary: 'Ejemplo: Un bosque es un ecosistema. Los árboles producen oxígeno (vivo), el suelo provee nutrientes (no vivo), los animales dispersan semillas (interacción). Si quitas uno, todo se desequilibra.',
  },
  'Ciudad vs campo': {
    primary: 'La ciudad ofrece servicios, trabajo y diversidad, pero también contaminación y ritmo rápido. El campo ofrece naturaleza, espacio y tranquilidad, pero menos servicios. Ambos tienen ventajas y desafíos que merecen reflexión.',
    secondary: 'Analogía: La ciudad es como un reloj: preciso, lleno de movimiento, cada pieza conectada. El campo es como un jardín: crece despacio, cada planta tiene su espacio. Ambos son formas válidas de vivir.',
  },
  'Arte y colores': {
    primary: 'El color transmite emociones: rojo = energía, azul = calma, amarillo = alegría, verde = naturaleza. La combinación de colores crea armonía o contraste. El arte usa color para comunicar sin palabras.',
    secondary: 'Ejemplo: Un atardecer naranja-rosado transmite calma y belleza. Un cuadro con rojo y negro transmite pasión o tensión. Los colores son un lenguaje emocional que usamos sin darnos cuenta.',
  },
  'Deporte y salud': {
    primary: 'La actividad física mantiene el cuerpo sano: fortalece músculos, mejora corazón y coordinación. También beneficia la mente: reduce estrés, mejora sueño y concentración. El deporte enseña disciplina y trabajo en equipo.',
    secondary: 'Ejemplo: Correr 30 minutos al día fortalece el corazón y libera endorfinas (sustancias que producen bienestar). El deporte no es solo físico: es también mental y social.',
  },
};

export const InteractiveLessonView: React.FC<InteractiveLessonViewProps> = ({ teacher, student, theme }) => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'celebration' | 'guide'>('idle');
  const [aiMessage, setAiMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [completedNodes, setCompletedNodes] = useState<Set<number>>(new Set());
  const voiceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isPrimary = student.grade?.toLowerCase().includes('elemental') || student.age < 10;

  // Get theoretical content for the current theme
  const conceptContent = THEORETICAL_CONTENT[theme] || {
    primary: `Hoy vamos a aprender sobre "${theme}". Es un tema importante que tiene que ver con cómo funcionan las cosas a nuestro alrededor. Piensa: ¿qué crees que significa esta palabra? ¿La has escuchado antes?`,
    secondary: `"${theme}" es un área de estudio que involucra conceptos clave que veremos juntos. Te comparto primero la idea central: todo conocimiento se construye paso a paso, conectando lo nuevo con lo que ya sabes. Presta atención a cada analogía y ejemplo que te presento.`,
  };

  // Build lesson nodes with correct pedagogical sequence:
  // 1. CONCEPT: Teacher presents content (theory first)
  // 2. CHECK: Teacher asks about what was presented
  // 3. PRACTICE: Student applies with guidance
  // 4. CREATION: Student creates independently
  const LESSON_NODES: LessonNode[] = [
    {
      id: 'node-1',
      type: 'concept',
      title: isPrimary ? 'Paso 1: Aquí está el conocimiento' : 'Paso 1: Concepto fundamental',
      teacherDialogue: isPrimary
        ? `¡Hola ${student.name}! Soy ${teacher.name}. Hoy vamos a explorar "${theme}". Antes de preguntarte, te voy a compartir el conocimiento fundamental. Escúchame con atención:`
        : `¡Bienvenido/a ${student.name}! Soy ${teacher.name}. Antes de reflexionar, te presento el concepto clave de "${theme}". Léelo con calma; es la base de todo lo que sigue:`,
      conceptContent: conceptContent.primary,
      guidingQuestion: isPrimary
        ? 'Ahora que leíste el concepto: ¿Qué parte te llamó más la atención o te pareció más interesante?'
        : 'Con base en lo que acabas de leer: ¿Qué idea central rescates? ¿Qué parte te parece más relevante y por qué?',
      placeholder: isPrimary ? 'Cuéntame qué entendiste...' : 'Reformula la idea central...',
      socraticHints: [
        isPrimary ? '💡 Pista: ¿Qué palabra nueva encontraste? ¿Qué significa?' : '💡 Pista 1: Identifica la idea más importante del texto.',
        isPrimary ? '💡 Pista: ¿Hay algún ejemplo que te haya gustado?' : '💡 Pista 2: ¿Qué conexión ves con tu vida cotidiana?',
        isPrimary ? '💡 Pista: ¿Qué querrías saber más sobre esto?' : '💡 Pista 3: ¿Qué parte necesitas que te explique de nuevo?',
      ],
    },
    {
      id: 'node-2',
      type: 'exploration',
      title: isPrimary ? 'Paso 2: Profundizando' : 'Paso 2: Verificando comprensión',
      teacherDialogue: isPrimary
        ? `¡Muy bien, ${student.name}! Ahora te comparto un segundo dato importante sobre "${theme}". Es como una pieza más del rompecabezas:`
        : `Excelente reflexión. Ahora te presento un segundo concepto que profundiza en "${theme}". Aquí hay una conexión clave que debes considerar:`,
      conceptContent: conceptContent.secondary,
      guidingQuestion: isPrimary
        ? '¿Puedes explicarme con tus palabras qué dice este segundo concepto? ¿Tiene que ver con lo que leíste antes?'
        : 'Explica con tus propias palabras: ¿Cómo se relaciona este segundo concepto con el primero? ¿Qué nueva comprensión agrega?',
      placeholder: isPrimary ? 'Cuéntame con tus palabras...' : 'Conecta ambos conceptos...',
      socraticHints: [
        isPrimary ? '💡 Pista: ¿En qué se parece o diferencia del primer concepto?' : '💡 Pista 1: Usa la analogía del texto para explicar.',
        isPrimary ? '💡 Pista: ¿Puedes inventar un ejemplo propio?' : '💡 Pista 2: ¿Qué pasaría si este concepto no existiera?',
        isPrimary ? '💡 Pista: Tu ejemplo puede ser de tu casa, escuela o barrio.' : '💡 Pista 3: Aplica a un problema real que te importe.',
      ],
    },
    {
      id: 'node-3',
      type: 'synthesis',
      title: isPrimary ? 'Paso 3: Conectando ideas' : 'Paso 3: Sintetizando tu aprendizaje',
      teacherDialogue: isPrimary
        ? `¡Lo estás haciendo increíble! Ahora vamos a dar el siguiente salto: conectar lo que sabes con algo nuevo. Cada idea que construyes es como un bloque de Lego:`
        : `Vas muy bien, ${student.name}. Ahora viene la parte más interesante: la síntesis. Vamos a tomar los dos conceptos que aprendiste y elevarlos un nivel. La síntesis es donde el conocimiento deja de ser información y se convierte en comprensión profunda.`,
      guidingQuestion: isPrimary
        ? '¿Cómo se conectan los dos conceptos que aprendiste? ¿Puedes inventar un ejemplo tuyo que los use juntos?'
        : 'Elabora una conexión: ¿De qué manera estos conceptos se relacionan entre sí? ¿Puedes proponer un ejemplo original que integre ambos?',
      placeholder: isPrimary ? 'Describe la conexión que encontraste...' : 'Desarrolla la conexión entre conceptos...',
      socraticHints: [
        isPrimary ? '💡 Pista: Piensa en una historia: ¿qué pasó antes y qué pasa ahora?' : '💡 Pista 1: Usa analogías: "es como cuando..." o "se parece a..."',
        isPrimary ? '💡 Pista: ¿Puedes inventar un ejemplo tuyo?' : '💡 Pista 2: ¿Qué causa y qué consecuencia puedes identificar?',
        isPrimary ? '💡 Pista: Tu experiencia personal es tu mejor herramienta.' : '💡 Pista 3: ¿Por qué esta conexión importa en la vida real?',
      ],
    },
    {
      id: 'node-4',
      type: 'creation',
      title: isPrimary ? 'Paso Final: ¡Tu creación magistral!' : 'Reto Final: Creación y transferencia',
      teacherDialogue: isPrimary
        ? `¡Increíble viaje, ${student.name}! Has llegado al nivel más alto: la creación. Aquí es donde demuestras que realmente ENTENDISTE, no memorizaste. Crea algo tuyo basado en los conceptos que aprendiste:`
        : `Has llegado a la cúspide del aprendizaje, ${student.name}: la CREACIÓN. Si puedes crear algo nuevo a partir de lo aprendido, realmente lo comprendiste. Demuéstralo: genera una explicación original, un ejemplo propio o una aplicación que no hayamos discutido.`,
      guidingQuestion: isPrimary
        ? 'Crea algo tuyo basado en los conceptos aprendidos: una historia, un dibujo descrito, una canción o una explicación para alguien más.'
        : 'Genera una explicación original, ejemplo propio o aplicación práctica que demuestre que dominas los conceptos presentados.',
      placeholder: isPrimary ? '¡Crea tu obra maestra aquí!' : 'Desarrolla tu creación original...',
      socraticHints: [
        isPrimary ? '💡 Pista: Usa tus palabras, tu estilo, tu mundo.' : '💡 Pista 1: La verdadera comprensión se nota cuando puedes enseñar a otros.',
        isPrimary ? '💡 Pista: No hay una sola respuesta correcta: ¡hay muchas geniales!' : '💡 Pista 2: Aplica el concepto a un problema real que te importe.',
        isPrimary ? '💡 Pista: Tu creatividad es tu superpoder.' : '💡 Pista 3: Innova: agrega una idea que no hayamos mencionado.',
      ],
    },
  ];

  const currentNode = LESSON_NODES[currentNodeIndex];
  const progressPercentage = ((currentNodeIndex) / LESSON_NODES.length) * 100;
  const isFinished = currentNodeIndex >= LESSON_NODES.length;

  const celebrateAndContinue = (message: string) => {
    setFeedback('celebration');
    setAiMessage(message);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(message);
      utt.lang = 'es-ES';
      utt.rate = 0.95;
      voiceRef.current = utt;
      window.speechSynthesis.speak(utt);
    }
  };

  const guideWithHints = (message: string) => {
    setFeedback('guide');
    setAiMessage(message);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(message);
      utt.lang = 'es-ES';
      utt.rate = 0.95;
      voiceRef.current = utt;
      window.speechSynthesis.speak(utt);
    }
  };

  const handleVerify = () => {
    const hasAnswer = (currentNode.options && selectedOption) || (!currentNode.options && textAnswer.trim());

    if (!hasAnswer) {
      guideWithHints(
        isPrimary
          ? `¡Hola! Veo que aún no has compartido tu idea. ${teacher.name} está aquí para acompañarte. ¿Quieres que te dé pistas para empezar? Toca el botón de 💡.`
          : `${student.name}, tu reflexión es importante. Si necesitas un punto de partida, las pistas socráticas te guiarán sin darte la respuesta: construiremos juntos el conocimiento.`
      );
      return;
    }

    const studentInput = (selectedOption || textAnswer).trim();
    const inputLength = studentInput.length;
    const isEngaged = inputLength >= 5;

    if (isEngaged) {
      setCompletedNodes((prev) => new Set(prev).add(currentNodeIndex));
      const celebrations = [
        `¡Excelente, ${student.name}! Tu aporte demuestra que estás pensando activamente. Sigamos construyendo.`,
        `¡Maravillosa reflexión! Cada palabra que compartes construye tu conocimiento genuino. Avancemos.`,
        `¡Brillante! Estás demostrando verdadera comprensión. Esto no es memorización: es construcción de pensamiento.`,
        `¡Impecable, ${student.name}! Tu razonamiento es sólido. La curiosidad es el motor del aprendizaje.`,
        `¡Qué alegría ver tu dedicación! Lo que acabas de compartir revela comprensión profunda. Continuemos.`,
      ];
      celebrateAndContinue(celebrations[Math.floor(Math.random() * celebrations.length)]);
    } else {
      guideWithHints(
        isPrimary
          ? `¡Buen comienzo! ${teacher.name} cree que puedes explayarte un poquito más. Cuéntame con más detalle.`
          : `${student.name}, tu intuición es un excelente punto de partida. Amplía tu idea con un ejemplo o justificación.`
      );
    }
  };

  const handleNextLevel = () => {
    setFeedback('idle');
    setSelectedOption(null);
    setTextAnswer('');
    setShowHint(false);
    setAiMessage('');
    setCurrentNodeIndex((prev) => prev + 1);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  if (isFinished) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-emerald-900/20 border-2 border-emerald-500/40 text-center space-y-6 animate-fade-in shadow-xl">
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
          <Trophy className="w-12 h-12 text-slate-900" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">¡Lección Construida con Éxito!</h2>
          <p className="text-emerald-300 mt-2 font-medium">
            {student.name}, has demostrado comprensión genuina de "{theme}". Esto no fue memorización: fue construcción de pensamiento.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: LESSON_NODES.length }).map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <button
          onClick={() => {
            setCurrentNodeIndex(0);
            setCompletedNodes(new Set());
          }}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md"
        >
          Repasar Lección
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* BARRA DE PROGRESO */}
      <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
        <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
          Paso {currentNodeIndex + 1} de {LESSON_NODES.length}
        </span>
        <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="text-xs font-bold text-emerald-400 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          {completedNodes.size}/{LESSON_NODES.length}
        </span>
      </div>

      {/* CONCEPTO TEÓRICO (solo en Paso 1 y 2) */}
      {currentNode.conceptContent && (
        <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-2">
            <BookOpen className="w-4 h-4" />
            {currentNodeIndex === 0 ? '📖 Concepto fundamental' : '📖 Profundización'}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{currentNode.conceptContent}</p>
        </div>
      )}

      {/* ÁREA DEL PROFESOR Y DIÁLOGO */}
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="shrink-0 relative">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg"
          />
          <button
            className="absolute -bottom-2 -right-2 p-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-500 transition-transform active:scale-95"
            onClick={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utt = new SpeechSynthesisUtterance(currentNode.teacherDialogue);
                utt.lang = 'es-ES';
                utt.rate = 0.95;
                window.speechSynthesis.speak(utt);
              }
            }}
            title="Escuchar de nuevo"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 relative">
          <div className="p-5 rounded-3xl rounded-tl-none bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 shadow-md text-sm sm:text-base text-slate-100 leading-relaxed">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" />
              {currentNode.title}
            </h4>
            {currentNode.teacherDialogue}
          </div>
        </div>
      </div>

      {/* ZONA DE INTERACCIÓN */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border-2 border-indigo-500/30 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>{currentNode.guidingQuestion}</span>
        </h3>

        {currentNode.options ? (
          <div className="space-y-3">
            {currentNode.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={feedback !== 'idle'}
                onClick={() => setSelectedOption(opt)}
                className={`w-full p-4 rounded-2xl border-2 text-left font-semibold transition-all ${
                  selectedOption === opt
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-inner'
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-indigo-400 hover:bg-slate-700'
                } ${feedback !== 'idle' && selectedOption !== opt ? 'opacity-60' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={feedback !== 'idle'}
            placeholder={currentNode.placeholder}
            className="w-full h-36 p-4 rounded-2xl bg-slate-800 border-2 border-slate-600 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-inner placeholder:text-slate-500"
          />
        )}

        {/* PISTAS SOCRÁTICAS */}
        {currentNode.socraticHints && (
          <div className="pt-2 border-t border-slate-700/50">
            {!showHint ? (
              <button
                onClick={handleShowHint}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                ¿Necesitas pistas socráticas para construir tu respuesta?
              </button>
            ) : (
              <div className="space-y-2 animate-fade-in">
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" />
                  Pistas para construir (sin darte la respuesta):
                </p>
                {currentNode.socraticHints.map((hint, idx) => (
                  <p key={idx} className="text-xs text-slate-300 bg-amber-950/30 border border-amber-500/20 rounded-lg p-2.5 leading-relaxed">
                    {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ZONA DE FEEDBACK */}
      <div className="sticky bottom-4 z-10">
        {feedback === 'idle' ? (
          <button
            onClick={handleVerify}
            disabled={!selectedOption && !textAnswer.trim()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-black text-lg transition-all shadow-lg active:scale-[0.98]"
          >
            {isPrimary ? '✨ COMPARTIR MI IDEA' : '✨ COMPARTIR MI REFLEXIÓN'}
          </button>
        ) : feedback === 'celebration' ? (
          <div className="p-5 rounded-2xl border-2 bg-gradient-to-r from-emerald-900/95 to-teal-900/95 border-emerald-400 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl animate-fade-in">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-300 shrink-0" />
              <div>
                <h4 className="font-black text-lg text-emerald-200">¡Lo lograste!</h4>
                <p className="text-white text-sm mt-1 leading-relaxed">{aiMessage}</p>
              </div>
            </div>
            <button
              onClick={handleNextLevel}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black whitespace-nowrap transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              {currentNodeIndex === LESSON_NODES.length - 1 ? 'VER MI LOGRO' : 'SIGUIENTE PASO'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl border-2 bg-gradient-to-r from-indigo-900/95 to-purple-900/95 border-indigo-400 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl animate-fade-in">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-8 h-8 text-amber-300 shrink-0" />
              <div>
                <h4 className="font-black text-lg text-amber-200">Sigamos construyendo juntos</h4>
                <p className="text-white text-sm mt-1 leading-relaxed">{aiMessage}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setFeedback('idle');
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black whitespace-nowrap transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              PROFUNDIZAR MI RESPUESTA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};