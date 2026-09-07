import React, { useState, useEffect, useRef } from 'react';
import { AITeacher, Student } from '../../types';
import { Bot, CheckCircle2, Sparkles, ArrowRight, Volume2, Trophy, Lightbulb, Heart, Star } from 'lucide-react';

export interface LessonNode {
  id: string;
  type: 'concept' | 'exploration' | 'synthesis' | 'creation';
  title: string;
  teacherDialogue: string;
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

  // Build lesson nodes dynamically with socratic constructionist pedagogy
  // All paths lead to celebration: no "wrong answer" feedback, only guided re-exploration
  const LESSON_NODES: LessonNode[] = [
    {
      id: 'node-1',
      type: 'concept',
      title: isPrimary ? 'Paso 1: Descubriendo juntos' : 'Paso 1: Activando tu curiosidad',
      teacherDialogue: isPrimary
        ? `¡Hola ${student.name}! Soy ${teacher.name} y voy a ser tu guía en esta aventura. Hoy vamos a explorar juntos "${theme}". No te preocupes si nunca has escuchado esto: aquí no se trata de memorizar, sino de descubrir y construir tu propio conocimiento paso a paso. ¿Estás listo/a para empezar?`
        : `¡Bienvenido/a ${student.name}! Soy ${teacher.name}. Hoy exploraremos "${theme}" desde cero. En esta plataforma no memorizamos: construimos el conocimiento. Cada pregunta es una oportunidad para pensar, no para sentirte evaluado/a. Empecemos activando lo que ya sabes.`,
      guidingQuestion: isPrimary
        ? 'Cuéntame: ¿Qué palabra o imagen viene a tu mente cuando escuchas este tema?'
        : '¿Qué sabes, intuyes o te preguntas sobre este tema? No hay respuesta incorrecta.',
      placeholder: isPrimary ? 'Escribe o dibuja con palabras lo que piensas...' : 'Comparte tu intuición inicial...',
      socraticHints: [
        isPrimary ? '💡 Pista: Piensa en algo que ves todos los días en tu casa, escuela o parque.' : '💡 Pista 1: Conecta el tema con algo cotidiano que observes frecuentemente.',
        isPrimary ? '💡 Pista: ¿Has visto esto en una película, libro o video?' : '💡 Pista 2: ¿Qué preguntas te surgen al escuchar este concepto?',
        isPrimary ? '💡 Pista: No hay respuesta mala, ¡solo的好奇心!' : '💡 Pista 3: Tu primera impresión siempre tiene valor; compártela sin filtro.',
      ],
    },
    {
      id: 'node-2',
      type: 'exploration',
      title: isPrimary ? 'Paso 2: Construyendo el concepto' : 'Paso 2: Construyendo desde lo concreto',
      teacherDialogue: isPrimary
        ? `¡Excelente, ${student.name}! Lo que acabas de decir es un gran comienzo. Ahora te voy a compartir el primer pilar del tema y luego reflexionamos juntos. Recuerda: nadie nace sabiendo, todos aprendemos paso a paso.`
        : `Excelente punto de partida. Te comparto el primer concepto fundamental de "${theme}". Léelo con calma y luego me cuentas con tus palabras qué entendiste. Si algo no queda claro, es señal de que vamos bien: las preguntas son el camino del aprendizaje.`,
      guidingQuestion: isPrimary
        ? 'Con esta nueva información: ¿podrías decirme en una frase qué acabas de aprender?'
        : 'Reformula con tus propias palabras: ¿cuál es la idea central que acabas de descubrir?',
      placeholder: isPrimary ? 'Cuéntame con tus palabras...' : 'Reformula la idea principal...',
      socraticHints: [
        isPrimary ? '💡 Pista: Imagina que se lo explicas a tu mascota o peluche.' : '💡 Pista 1: Usa un ejemplo de tu vida diaria para ilustrar el concepto.',
        isPrimary ? '💡 Pista: La idea más simple suele ser la más poderosa.' : '💡 Pista 2: ¿Qué pasaría en el mundo si esto no existiera?',
        isPrimary ? '💡 Pista: Si tuvieras que dibujar lo aprendido, ¿qué dibujarías?' : '💡 Pista 3: Conecta esta idea con algo que estudiaste el año pasado.',
      ],
    },
    {
      id: 'node-3',
      type: 'synthesis',
      title: isPrimary ? 'Paso 3: Conectando ideas' : 'Paso 3: Sintetizando tu aprendizaje',
      teacherDialogue: isPrimary
        ? `¡Lo estás haciendo increíble! Ahora vamos a dar el siguiente salto: conectar lo que sabes con algo nuevo. Cada idea que construyes es como un bloque de Lego: ahora vamos a unirlo con otro bloque.`
        : `Vas muy bien, ${student.name}. Ahora viene la parte más interesante: la síntesis. Vamos a tomar lo que ya construiste y elevarlo un nivel. La síntesis es donde el conocimiento deja de ser información y se convierte en comprensión profunda.`,
      guidingQuestion: isPrimary
        ? '¿Cómo se conecta lo que aprendiste con algo que ya conocías antes?'
        : 'Elabora una conexión: ¿de qué manera este nuevo saber se relaciona con un concepto previo o una experiencia real?',
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
        ? `¡Increíble viaje, ${student.name}! Has llegado al nivel más alto: la creación. Aquí es donde demuestras que realmente ENTENDISTE, no memorizaste. Crea algo tuyo: una historia, un dibujo descrito, una canción, lo que tu imaginación te dicte. ¡Este es tu momento de brillar!`
        : `Has llegado a la cúspide del aprendizaje, ${student.name}: la CREACIÓN. Si puedes crear algo nuevo a partir de lo aprendido, realmente lo comprendiste. Demuéstralo: genera una explicación original, un ejemplo propio o una aplicación que no hayamos discutido. Tu pensamiento crítico es tu mayor logro.`,
      guidingQuestion: isPrimary
        ? 'Crea algo tuyo basado en lo aprendido: una historia, un dibujo, una canción o una explicación para alguien más.'
        : 'Genera una explicación original, ejemplo propio o aplicación práctica que demuestre que dominas el concepto.',
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

    // SOCRATIC PEDAGOGY: There are no "wrong" answers. Every attempt is celebrated
    // and used as a springboard for deeper construction.
    const studentInput = (selectedOption || textAnswer).trim();
    const inputLength = studentInput.length;

    // Validate based on cognitive engagement, not exact wording
    const isEngaged = inputLength >= 5; // Minimum effort

    if (isEngaged) {
      setCompletedNodes((prev) => new Set(prev).add(currentNodeIndex));
      const celebrations = [
        `¡Excelente, ${student.name}! Tu aporte es valioso y demuestra que estás pensando. Sigamos construyendo.`,
        `¡Maravillosa reflexión! Cada palabra que compartes construye tu conocimiento. Avancemos al siguiente nivel.`,
        `¡Brillante! Estás demostrando verdadera comprensión. Esto no es memorización, es construcción de pensamiento.`,
        `¡Impecable, ${student.name}! Tu razonamiento es sólido. La curiosidad es el motor del aprendizaje.`,
        `¡Qué alegría ver tu dedicación! Lo que acabas de compartir revela comprensión genuina. Continuemos.`,
      ];
      celebrateAndContinue(celebrations[Math.floor(Math.random() * celebrations.length)]);
    } else {
      // The response is too short; this is not "wrong" but an invitation to deepen.
      guideWithHints(
        isPrimary
          ? `¡Buen comienzo! ${teacher.name} cree que puedes explayarte un poquito más. Cuéntame con más detalle: ¿qué más piensas o sientes sobre esto?`
          : `${student.name}, tu intuición es un excelente punto de partida. Te invito a profundizar: amplía tu idea con un ejemplo o justificación. Si lo necesitas, activa las 💡 pistas socráticas.`
      );
    }
  };

  const handleNextLevel = () => {
    setFeedback('idle');
    setSelectedOption(null);
    setTextAnswer('');
    setTextAnswer('');
    setShowHint(false);
    setAiMessage('');
    setCurrentNodeIndex((prev) => prev + 1);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  // Stop voice when component unmounts
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
