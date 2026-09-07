import React, { useState, useEffect } from 'react';
import { AITeacher, Student, LearningPathStage, SocraticPause } from '../../types';
import { ttsService } from '../../services/ttsService';
import { Bot, CheckCircle2, Sparkles, ArrowRight, Volume2, Trophy, Lightbulb, Heart, Star, BookOpen, ChevronRight, Zap, Target, Eye, Paintbrush } from 'lucide-react';

interface InteractiveLessonViewProps {
  teacher: AITeacher;
  student: Student;
  dailyClass: { theme: string; learningPath?: LearningPathStage[]; socraticPauses?: SocraticPause[] };
}

const getStageIcon = (type: string) => {
  switch (type) {
    case 'concept': return <Target className="w-4 h-4" />;
    case 'deepen': return <Eye className="w-4 h-4" />;
    case 'apply': return <Zap className="w-4 h-4" />;
    case 'create': return <Paintbrush className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const getStageColor = (type: string) => {
  switch (type) {
    case 'concept': return 'from-indigo-600 to-blue-600';
    case 'deepen': return 'from-purple-600 to-violet-600';
    case 'apply': return 'from-amber-600 to-orange-600';
    case 'create': return 'from-emerald-600 to-teal-600';
    default: return 'from-slate-600 to-slate-700';
  }
};

const getStageBadge = (type: string) => {
  switch (type) {
    case 'concept': return 'Concepto Clave';
    case 'deepen': return 'Profundización';
    case 'apply': return 'Aplicación';
    case 'create': return 'Creación';
    default: return 'Etapa';
  }
};

// Fallback theoretical content by theme
const THEORETICAL_CONTENT: Record<string, { summary: string; detailedExplanation: string; visualAnalogy?: string; keyTakeaways: string[] }> = {
  'Modelado algebraico': {
    summary: 'El modelado algebraico usa letras para representar valores desconocidos en situaciones reales.',
    detailedExplanation: 'Las ecuaciones como x + 5 = 12 nos dicen: "algo más 5 da 12". El álgebra convierte problemas cotidianos en cuentas resolubles. Cada incógnita (x) es un misterio que podemos resolver con operaciones inversas.',
    visualAnalogy: 'Imagina una balanza: ambos lados deben estar en equilibrio. Si añades o quitas algo de un lado, debes hacer lo mismo en el otro para mantenerla nivelada.',
    keyTakeaways: ['Las letras representan incógnitas', 'Las ecuaciones son balanzas', 'Las operaciones inversas deshacen']
  },
  'Estructura celular': {
    summary: 'La célula es la unidad mínima de vida con membrana, núcleo y citoplasma.',
    detailedExplanation: 'La membrana controla quién entra y sale. El núcleo contiene el ADN y da instrucciones. El citoplasma es el espacio donde ocurren las reacciones. Las células animales son irregulares; las vegetales tienen pared rígida y cloroplastos.',
    visualAnalogy: 'Piensa en la célula como una fábrica: la membrana es la puerta de seguridad, el núcleo es el director, y el citoplasma es el piso de producción.',
    keyTakeaways: ['Membrana = control de acceso', 'Núcleo = centro de mando', 'Citoplasma = espacio de reacciones']
  },
  'Fotosíntesis': {
    summary: 'Las plantas convierten luz solar, agua y CO₂ en oxígeno y azúcar.',
    detailedExplanation: 'La fotosíntesis ocurre en las hojas, dentro de los cloroplastos. La energía luminosa se transforma en energía química almacenada en azúcares. Produce oxígeno como subproducto.',
    visualAnalogy: 'La hoja es un panel solar vivo: toma luz del sol, agua de las raíces y CO₂ del aire. Produce oxígeno (lo que respiramos) y azúcar (comida para la planta).',
    keyTakeaways: ['Luz + agua + CO₂ → azúcar + oxígeno', 'Ocurre en cloroplastos', 'La energía luminosa se almacena química']
  },
  'Principios de fe': {
    summary: 'Los principios de fe son valores que guían nuestras acciones basados en respeto, honestidad y compasión.',
    detailedExplanation: 'No se imponen: se descubren reflexionando sobre cómo queremos tratar a los demás. La fe viva es practicar esos valores cada día, no solo creer en ellos.',
    visualAnalogy: 'Los valores son como brújulas internas: cuando sabes qué es correcto, cada decisión se alinea con tu norte moral.',
    keyTakeaways: ['Los valores se descubren reflexionando', 'La fe se practica, no solo se cree', 'Cada acción refleja un principio']
  },
  'Escritura creativa y argumentación': {
    summary: 'La escritura argumentativa presenta una postura y la respalda con razones y evidencia.',
    detailedExplanation: 'Estructura: tesis → argumentos → evidencia → conclusión. No es opinión sin base: es una idea clara defendida con lógica.',
    visualAnalogy: 'Un buen argumento es como una torre: la tesis es la base, los argumentos son los pilares, la evidencia es el cemento, y la conclusión es la cima.',
    keyTakeaways: ['Tesis clara y defendible', 'Argumentos con evidencia', 'Conclusión que cierra la idea']
  },
  'Comprensión lectora analítica': {
    summary: 'Comprender un texto va más allá de leer palabras: captar la idea central, las razones y las implicaciones.',
    detailedExplanation: 'Preguntas clave: ¿Qué dice el autor? ¿Por qué lo dice? ¿Qué quiere que el lector piense? La comprensión analítica busca el "porqué" detrás de cada afirmación.',
    visualAnalogy: 'Leer es como explorar una cueva: cada palabra es una estalactita, cada idea un espeleo lumínico que revela algo nuevo.',
    keyTakeaways: ['Pregunta el porqué', 'Identifica la tesis', 'Conecta con tu vida']
  },
  'Historia del Ecuador y América Latina': {
    summary: 'La historia del Ecuador incluye culturas precolombinas, la colonia española y la independencia en 1822.',
    detailedExplanation: 'Cada etapa dejó huellas culturales, sociales y políticas que explican cómo somos hoy. Entender el origen ayuda a comprender el presente.',
    visualAnalogy: 'La historia es como un río: las aguas de hoy vienen de montañas lejanas. Los ríos cambian de curso pero siempre llevan la marca de su fuente.',
    keyTakeaways: ['Cada época deja huellas', 'El origen explica el presente', 'La historia es un río']
  },
  'Modelos de negocio': {
    summary: 'Un modelo de negocio describe cómo una empresa crea, entrega y captura valor.',
    detailedExplanation: 'Responde: ¿Qué vendes? ¿A quién? ¿Cómo llega a ellos? ¿Cómo ganas dinero? El Canvas organiza esto en 9 bloques visuales.',
    visualAnalogy: 'El modelo de negocio es como un mapa de tesoro: tienes el tesoro (valor), el mapa (canal), y la X marca dónde está el oro (ingreso).',
    keyTakeaways: ['¿Qué vendes?', '¿A quién?', '¿Cómo ganas dinero?']
  },
  'Educación Cultural y Artística': {
    summary: 'El arte es expresión visual de ideas y emociones usando línea, color, forma, textura y espacio.',
    detailedExplanation: 'Composición es cómo se organizan los elementos: equilibrio, ritmo, contraste. El arte comunica lo que las palabras no pueden.',
    visualAnalogy: 'Un cuadro oscuro con líneas irregulares transmite tensión. Uno claro con formas suaves transmite calma. Los colores son un lenguaje emocional.',
    keyTakeaways: ['El color transmite emociones', 'La composición organiza', 'El arte es lenguaje visual']
  },
  'Pensamiento computacional, hardware y Scratch': {
    summary: 'El pensamiento computacional descompone problemas, identifica patrones y crea pasos lógicos.',
    detailedExplanation: 'Scratch usa bloques visuales: cada bloque es una instrucción. Juntarlos crea programas. Cocinar es como programar: receta = algoritmo, ingredientes = datos, paso a paso = secuencia.',
    visualAnalogy: 'Cocinar es como programar: la receta es el algoritmo, los ingredientes son los datos, y cada paso es una instrucción. Si falta uno, el resultado cambia.',
    keyTakeaways: ['Descomponer problemas', 'Identificar patrones', 'Crear secuencias lógicas']
  },
  'Sistemas de gobierno y participación ciudadana': {
    summary: 'Un sistema de gobierno organiza cómo una sociedad toma decisiones colectivas.',
    detailedExplanation: 'Tipos: democracia (decide el pueblo), monarquía (un rey), autoritarismo (poder central). La participación ciudadana implica votar, opinar y exigir transparencia.',
    visualAnalogy: 'Elegir estudiantes para el consejo es democracia. Todos votan, todos tienen voz. Sin participación, las decisiones no representan a nadie.',
    keyTakeaways: ['Democracia = voto del pueblo', 'Participación ciudadana', 'Sin participación no hay representación']
  },
  'Inglés básico': {
    summary: 'El inglés se basa en vocabulario, gramática y pronunciación. Las oraciones siguen estructura sujeto-verbo-objeto.',
    detailedExplanation: 'Las palabras cambian según tiempo: "I eat" (presente), "I ate" (pasado), "I will eat" (futuro). El inglés es un código que se descifra practicando.',
    visualAnalogy: 'El inglés es como un código secreto: cada palabra es un símbolo, cada regla gramatical es la clave para descifrar el mensaje.',
    keyTakeaways: ['Vocabulario + gramática = comprensión', 'Tiempos verbales indican cuándo', 'Practicar descifra el código']
  },
  'Matemáticas básicas': {
    summary: 'Las matemáticas son el lenguaje del orden: sumar, restar, multiplicar, dividir.',
    detailedExplanation: 'Cada operación tiene una inversa que la deshace. Si tienes 3 cajas con 4 manzanas cada una, multiplicas 3×4=12. Si repartes 12 entre 3, divides 12÷3=4.',
    visualAnalogy: 'Las matemáticas son el GPS del pensamiento: te dicen exactamente cómo llegar de un dato a una respuesta.',
    keyTakeaways: ['Sumar = juntar', 'Restar = quitar', 'Multiplicar = sumar repetidas', 'Dividir = repartir']
  },
  'Ciencias Naturales - Ecosistemas': {
    summary: 'Un ecosistema es un conjunto de seres vivos que interactúan con su ambiente.',
    detailedExplanation: 'Componentes: seres vivos (flora, fauna), no vivos (agua, suelo, clima) y la relación entre ambos. El equilibrio depende de estas conexiones.',
    visualAnalogy: 'Un bosque es un ecosistema: los árboles producen oxígeno (vivo), el suelo provee nutrientes (no vivo), los animales dispersan semillas (interacción).',
    keyTakeaways: ['Seres vivos + no vivos = ecosistema', 'El equilibrio depende de conexiones', 'Quitar uno desequilibra todo']
  },
  'Ciudad vs campo': {
    summary: 'La ciudad ofrece servicios y diversidad; el campo ofrece naturaleza y tranquilidad.',
    detailedExplanation: 'Ambos tienen ventajas y desafíos que merecen reflexión. La ciudad es como un reloj: preciso, lleno de movimiento. El campo es como un jardín: crece despacio.',
    visualAnalogy: 'La ciudad es un reloj: cada pieza conectada y precisa. El campo es un jardín: cada planta con su espacio y su ritmo.',
    keyTakeaways: ['Ciudad = servicios y ritmo', 'Campo = naturaleza y tranquilidad', 'Ambos son formas válidas']
  },
  'Arte y colores': {
    summary: 'El color transmite emociones: rojo = energía, azul = calma, amarillo = alegría, verde = naturaleza.',
    detailedExplanation: 'La combinación de colores crea armonía o contraste. El arte usa color para comunicar sin palabras.',
    visualAnalogy: 'Un atardecer naranja-rosado transmite calma y belleza. Un cuadro con rojo y negro transmite pasión o tensión.',
    keyTakeaways: ['Rojo = energía', 'Azul = calma', 'Amarillo = alegría', 'Verde = naturaleza']
  },
  'Deporte y salud': {
    summary: 'La actividad física mantiene el cuerpo sano: fortalece músculos, mejora corazón y coordinación.',
    detailedExplanation: 'También beneficia la mente: reduce estrés, mejora sueño y concentración. El deporte enseña disciplina y trabajo en equipo.',
    visualAnalogy: 'Correr 30 minutos al día fortalece el corazón y libera endorfinas: sustancias que producen bienestar.',
    keyTakeaways: ['Fortalece músculos y corazón', 'Reduce estrés', 'Enseña disciplina y equipo']
  },
  'Lectura comprensiva y creación de cuentos': {
    summary: 'Leer comprensivamente es captar la idea central, las razones del autor y las implicaciones.',
    detailedExplanation: 'Preguntas clave: ¿Qué dice el autor? ¿Por qué lo dice? ¿Qué quiere que el lector piense? Un cuento tiene inicio, nudo y desenlace.',
    visualAnalogy: 'Un cuento es un viaje: el inicio es la salida, el nudo es el camino con obstáculos, y el desenlace es llegar a destino.',
    keyTakeaways: ['Identifica la idea central', 'Recuerda inicio-nudo-desenlace', 'Crea tu propio viaje']
  },
  'Multiplicación, áreas y cuerpos 3D': {
    summary: 'La multiplicación es sumar repetidas. El área mide superficies. Los cuerpos 3D tienen volumen.',
    detailedExplanation: '3 cajas con 4 manzanas cada una = 3×4=12 manzanas. Un rectángulo de 3×4 tiene área 12. Un cubo tiene 6 caras, 12 aristas y 8 vértices.',
    visualAnalogy: 'La multiplicación es como apilar filas de Lego: cada fila tiene iguales piezas y cuentas el total apilando.',
    keyTakeaways: ['Multiplicar = sumar repetidas', 'Área = superficie', '3D = volumen']
  },
  'Seres vivos y sus características': {
    summary: 'Los seres vivos crecen, se reproducen, responden al ambiente y necesitan energía.',
    detailedExplanation: 'Se distinguen de los no vivos porque nacen, crecen, se reproducen y mueren. Una piedra no crece; una planta sí.',
    visualAnalogy: 'Un ser vivo es como una máquina que se construye sola, crece, se reproduce y se adapta al ambiente.',
    keyTakeaways: ['Nacen y crecen', 'Se reproducen', 'Necesitan energía']
  },
  'Ciudad vs campo y servicios públicos': {
    summary: 'La ciudad ofrece servicios; el campo ofrece naturaleza. Ambos tienen desafíos.',
    detailedExplanation: 'Servicios públicos: hospital, escuela, bomberos. En la ciudad hay más opciones; en el campo hay más naturaleza.',
    visualAnalogy: 'La ciudad es un reloj精密: cada pieza conectada. El campo es un jardín: cada planta con su espacio.',
    keyTakeaways: ['Ciudad = servicios', 'Campo = naturaleza', 'Ambos son válidos']
  },
  'Cuentos animados en Scratch': {
    summary: 'Crear animaciones en Scratch usa bloques de código: cada bloque es una instrucción.',
    detailedExplanation: 'Juntar bloques crea programas. Un cuento animado necesita escenas, personajes y diálogos.',
    visualAnalogy: 'Programar es como contar una historia con Lego: cada bloque es una pieza, y juntas forman la obra.',
    keyTakeaways: ['Bloques = instrucciones', 'Escenas = capítulos', 'Personajes = actores']
  },
};

export const InteractiveLessonView: React.FC<InteractiveLessonViewProps> = ({ teacher, student, dailyClass }) => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'celebration' | 'guide'>('idle');
  const [aiMessage, setAiMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [completedNodes, setCompletedNodes] = useState<Set<number>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isPrimary = student.grade?.toLowerCase().includes('elemental') || student.age < 10;

  // Use learningPath from dailyClass or generate fallback
  const learningPath = dailyClass.learningPath || buildFallbackPath(dailyClass.theme);

  const currentNode = learningPath[currentNodeIndex];
  const progressPercentage = ((currentNodeIndex) / learningPath.length) * 100;
  const isFinished = currentNodeIndex >= learningPath.length;

  function buildFallbackPath(theme: string): LearningPathStage[] {
    const content = THEORETICAL_CONTENT[theme] || {
      summary: `Hoy vamos a explorar "${theme}". Es un tema importante que tiene que ver con cómo funcionan las cosas a nuestro alrededor.`,
      detailedExplanation: `"${theme}" es un área de estudio que involucra conceptos clave que veremos juntos. Todo conocimiento se construye paso a paso, conectando lo nuevo con lo que ya sabes.`,
      keyTakeaways: ['Presta atención a cada analogía', 'Conecta con tu vida cotidiana', 'Cada paso construye comprensión'],
    };
    return [
      {
        id: `fallback-${theme}-concept`,
        order: 1,
        title: 'Paso 1: Concepto Fundamental',
        type: 'concept',
        coreConcept: { ...content, summary: content.summary },
        guidingQuestion: isPrimary ? '¿Qué parte te llamó más la atención?' : '¿Qué idea central rescates? ¿Qué parte te parece más relevante y por qué?',
        socraticHints: isPrimary
          ? ['¿Qué palabra nueva encontraste?', '¿Hay algún ejemplo que te haya gustado?', '¿Qué querrías saber más?']
          : ['Identifica la idea más importante', '¿Qué conexión ves con tu vida cotidiana?', '¿Qué parte necesitas que te explique de nuevo?'],
        advanceSignal: '¡Perfecto! Has entendido la base. Ahora vamos a profundizar.',
        estimatedMinutes: 10,
      },
      {
        id: `fallback-${theme}-deepen`,
        order: 2,
        title: 'Paso 2: Profundización',
        type: 'deepen',
        coreConcept: { ...content, summary: content.detailedExplanation },
        guidingQuestion: isPrimary ? '¿Puedes explicarme con tus palabras qué dice este segundo concepto?' : 'Explica con tus propias palabras: ¿Cómo se relaciona este concepto con el primero?',
        socraticHints: isPrimary
          ? ['¿En qué se parece o diferencia del primero?', '¿Puedes inventar un ejemplo propio?', 'Tu ejemplo puede ser de tu casa, escuela o barrio.']
          : ['Usa la analogía del texto para explicar', '¿Qué pasaría si este concepto no existiera?', 'Aplica a un problema real que te importe.'],
        advanceSignal: 'Excelente profundización. Ahora vamos a aplicar lo aprendido.',
        estimatedMinutes: 10,
      },
      {
        id: `fallback-${theme}-apply`,
        order: 3,
        title: 'Paso 3: Aplicación',
        type: 'apply',
        coreConcept: { ...content, summary: 'Vamos a conectar lo que sabes con algo nuevo. Cada idea que construyes es como un bloque de Lego.' },
        guidingQuestion: isPrimary ? '¿Cómo se conectan los dos conceptos que aprendiste? ¿Puedes inventar un ejemplo tuyo?' : 'Elabora una conexión: ¿De qué manera estos conceptos se relacionan entre sí? ¿Puedes proponer un ejemplo original?',
        socraticHints: isPrimary
          ? ['Piensa en una historia: ¿qué pasó antes y qué pasa ahora?', '¿Puedes inventar un ejemplo tuyo?', 'Tu experiencia personal es tu mejor herramienta.']
          : ['Usa analogías: "es como cuando..." o "se parece a..."', '¿Qué causas y consecuencias puedes identificar?', '¿Por qué esta conexión importa en la vida real?'],
        advanceSignal: '¡Magnífica aplicación! Ahora demuestra que realmente comprendiste.',
        estimatedMinutes: 10,
      },
      {
        id: `fallback-${theme}-create`,
        order: 4,
        title: 'Paso 4: Creación y Transferencia',
        type: 'create',
        coreConcept: { ...content, summary: 'Has llegado a la cúspide del aprendizaje: la CREACIÓN. Si puedes crear algo nuevo a partir de lo aprendido, realmente lo comprendiste.' },
        guidingQuestion: isPrimary ? 'Crea algo tuyo basado en los conceptos aprendidos: una historia, un dibujo descrito, una canción o una explicación para alguien más.' : 'Genera una explicación original, ejemplo propio o aplicación práctica que demuestre que dominas los conceptos.',
        socraticHints: isPrimary
          ? ['Usa tus palabras, tu estilo, tu mundo.', 'No hay una sola respuesta correcta: ¡hay muchas geniales!', 'Tu creatividad es tu superpoder.']
          : ['La verdadera comprensión se nota cuando puedes enseñar a otros.', 'Aplica el concepto a un problema real que te importe.', 'Innova: agrega una idea que no hayamos mencionado.'],
        advanceSignal: '¡Lección completada con éxito! Has demostrado comprensión genuina.',
        estimatedMinutes: 10,
      },
    ];
  }

  const stageLabels: Record<string, string> = {
    concept: '1. Concepto',
    deepen: '2. Profundizar',
    apply: '3. Aplicar',
    create: '4. Crear',
  };

  const celebrateAndContinue = (message: string) => {
    setFeedback('celebration');
    setAiMessage(message);
    ttsService.play({
      messageId: `celebration-${Date.now()}`,
      text: message,
      teacherName: teacher.name,
      onEnd: () => {},
      onPause: () => {},
      onPlay: () => {},
    });
  };

  const guideWithHints = (message: string) => {
    setFeedback('guide');
    setAiMessage(message);
    ttsService.play({
      messageId: `guide-${Date.now()}`,
      text: message,
      teacherName: teacher.name,
      onEnd: () => {},
      onPause: () => {},
      onPlay: () => {},
    });
  };

  const handleNextStage = () => {
    if (currentNodeIndex < learningPath.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setFeedback('idle');
        setSelectedOption(null);
        setTextAnswer('');
        setShowHint(false);
        setAiMessage('');
        setCurrentNodeIndex((prev) => prev + 1);
        setIsTransitioning(false);
        ttsService.stop();
      }, 400);
    }
  };

  const handleVerify = () => {
    const hasAnswer = (currentNode.socraticHints && selectedOption) || (!currentNode.socraticHints && textAnswer.trim());

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
        `¡Excelente, ${student.name}! Tu aporte demuestra que estás pensando activamente en la etapa "${currentNode.title}". Sigamos construyendo.`,
        `¡Maravillosa reflexión! Cada palabra que compartes construye tu conocimiento genuino en "${dailyClass.theme}". Avancemos.`,
        `¡Brillante! Estás demostrando verdadera comprensión en la etapa de "${currentNode.type}". Esto no es memorización: es construcción de pensamiento.`,
        `¡Impecable, ${student.name}! Tu razonamiento es sólido en esta etapa. La curiosidad es el motor del aprendizaje.`,
        `¡Qué alegría ver tu dedicación! Lo que acabas de compartir revela comprensión profunda en "${currentNode.title}". Continuemos.`,
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

  const handleShowHint = () => setShowHint(true);

  useEffect(() => {
    return () => { ttsService.stop(); };
  }, []);

  if (isFinished) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Progress summary */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-teal-900/30 border-2 border-emerald-500/40 shadow-xl space-y-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 animate-bounce">
            <Trophy className="w-12 h-12 text-slate-900" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white">¡Camino Completado con Éxito!</h2>
            <p className="text-emerald-300 text-sm leading-relaxed">
              {student.name}, has demostrado comprensión genuina de "{dailyClass.theme}". Recorriste {learningPath.length} etapas desde el concepto fundamental hasta la creación. Esto no fue memorización: fue construcción de pensamiento.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: learningPath.length }).map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => { setCurrentNodeIndex(0); setCompletedNodes(new Set()); }}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md"
            >
              Repasar Camino
            </button>
          </div>
        </div>

        {/* Stage-by-stage recap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningPath.map((stage, idx) => (
            <div key={stage.id} className={`p-4 rounded-2xl border shadow-lg space-y-2 ${
              completedNodes.has(idx)
                ? 'bg-emerald-950/30 border-emerald-500/40'
                : 'bg-slate-900/60 border-slate-700'
            }`}>
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                {getStageIcon(stage.type)}
                <span>{stageLabels[stage.type] || `Paso ${idx + 1}`}</span>
              </div>
              <h4 className="text-sm font-bold text-white">{stage.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{stage.coreConcept.summary.substring(0, 80)}...</p>
              {completedNodes.has(idx) && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* PROGRESSIVE PATH BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-700/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
            Camino Progresivo — Etapa {currentNodeIndex + 1} de {learningPath.length}
          </span>
          <span className="text-xs font-mono text-indigo-400">{currentNode.type.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-indigo-500 via-purple-500 via-emerald-400 to-amber-400"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-xs font-bold text-emerald-400 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {completedNodes.size}/{learningPath.length}
          </span>
        </div>
        {/* Stage indicators */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {learningPath.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => {
                  if (idx <= currentNodeIndex || completedNodes.has(idx)) {
                    setCurrentNodeIndex(idx);
                    setFeedback('idle');
                    setShowHint(false);
                    setAiMessage('');
                  }
                }}
                className={`flex-1 min-w-[60px] px-2 py-2 rounded-xl text-[10px] font-black transition-all text-center ${
                  idx === currentNodeIndex
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400 scale-105'
                    : completedNodes.has(idx)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : idx < currentNodeIndex
                    ? 'bg-slate-800 text-slate-400 border border-slate-700'
                    : 'bg-slate-900 text-slate-600 border border-slate-800'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {getStageIcon(stage.type)}
                  <span>{stageLabels[stage.type]}</span>
                </div>
                <div className="truncate mt-0.5">{stage.title.split(':')[1]?.trim() || stage.title}</div>
              </button>
              {idx < learningPath.length - 1 && (
                <ChevronRight className={`w-3 h-3 shrink-0 ${idx < currentNodeIndex ? 'text-emerald-400' : 'text-slate-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Current stage advance signal */}
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
          <span className="font-bold text-indigo-300">📌 Avance:</span> {currentNode.advanceSignal}
        </div>
      </div>

      {/* CORE CONCEPT - Visual and Conceptual Highlight */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/30 border-2 border-indigo-500/30 space-y-4 animate-fade-in shadow-xl">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getStageColor(currentNode.type)} flex items-center justify-center text-white shadow-lg`}>
            {getStageIcon(currentNode.type)}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {getStageBadge(currentNode.type)}
            </span>
            <h3 className="text-lg font-black text-white mt-1">{currentNode.title}</h3>
          </div>
        </div>

        {currentNode.coreConcept.visualAnalogy && (
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
            <span className="font-black text-amber-400 block mb-1">🔍 Analogía Visual:</span>
            {currentNode.coreConcept.visualAnalogy}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2">
          <p className="text-sm text-slate-200 leading-relaxed font-medium">{currentNode.coreConcept.detailedExplanation || currentNode.coreConcept.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {currentNode.coreConcept.keyTakeaways.map((takeaway, idx) => (
            <span key={idx} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              ✓ {takeaway}
            </span>
          ))}
        </div>
      </div>

      {/* Socratic Pauses integrated at this stage */}
      {dailyClass.socraticPauses?.filter(p => p.targetStageId === currentNode.id).map((pause) => (
        <div key={pause.id} className="p-5 rounded-3xl bg-violet-950/30 border border-violet-500/30 space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 text-xs font-black text-violet-300 uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Pausa Socrática</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">{pause.prompt}</p>
          {pause.followUpQuestion && (
            <p className="text-xs text-violet-300 italic">"{pause.followUpQuestion}"</p>
          )}
          <p className="text-[10px] text-slate-500">Reflexiona antes de avanzar: {pause.reflectionPrompt}</p>
        </div>
      ))}

      {/* TEACHER DIALOGUE AREA */}
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
              ttsService.play({
                messageId: `listen-${currentNode.id}`,
                text: currentNode.coreConcept.detailedExplanation || currentNode.coreConcept.summary,
                teacherName: teacher.name,
                onEnd: () => {},
                onPause: () => {},
                onPlay: () => {},
              });
            }}
            title="Escuchar explicación"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 relative">
          <div className="p-5 rounded-3xl rounded-tl-none bg-gradient-to-br from-slate-800 to-slate-900 border border-indigo-500/30 shadow-md text-sm sm:text-base text-slate-100 leading-relaxed">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" />
              Tu Profesor {teacher.name} te guía:
            </h4>
            <p>{currentNode.coreConcept.detailedExplanation || currentNode.coreConcept.summary}</p>
          </div>
        </div>
      </div>

      {/* INTERACTION ZONE */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border-2 border-indigo-500/30 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-start gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span>{currentNode.guidingQuestion}</span>
        </h3>

        <textarea
          value={textAnswer}
          onChange={(e) => setTextAnswer(e.target.value)}
          disabled={feedback !== 'idle'}
          placeholder={`Escribe tu respuesta aquí... (mínimo 10 caracteres)`}
          className="w-full h-40 p-4 rounded-2xl bg-slate-800 border-2 border-slate-600 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-inner placeholder:text-slate-500 text-sm"
        />

        {/* SOCRATIC HINTS */}
        {currentNode.socraticHints && (
          <div className="pt-2 border-t border-slate-700/50 space-y-2">
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

      {/* FEEDBACK / ADVANCE ZONE */}
      <div className="sticky bottom-4 z-10">
        {feedback === 'idle' ? (
          <button
            onClick={handleVerify}
            disabled={!textAnswer.trim() || textAnswer.trim().length < 5}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-black text-lg transition-all shadow-lg active:scale-[0.98]"
          >
            ✨ COMPARTIR MI REFLEXIÓN
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
              onClick={handleNextStage}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black whitespace-nowrap transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              {currentNodeIndex === learningPath.length - 1 ? '¡COMPLETAR CAMINO!' : 'SIGUIENTE ETAPA'}
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
              onClick={() => { setFeedback('idle'); }}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black whitespace-nowrap transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              INTENTS DE NUEVO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};