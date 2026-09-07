import React, { useState, useEffect } from 'react';
import { AITeacher, Student } from '../../types';
import { Bot, CheckCircle2, XCircle, ArrowRight, Volume2, Trophy } from 'lucide-react';

// Estructura de un Nodo de Lección (Nivel)
export interface LessonNode {
  id: string;
  type: 'concept' | 'quiz' | 'boss';
  title: string;
  teacherDialogue: string; // Lo que dice y lee el profesor
  question?: string;
  options?: string[]; // Opciones si es un quiz de opción múltiple
  correctAnswer?: string;
}

interface InteractiveLessonViewProps {
  teacher: AITeacher;
  student: Student;
  theme: string;
}

// Estos nodos luego serán generados dinámicamente por la IA, por ahora usamos datos de prueba
const MOCK_NODES: LessonNode[] = [
  {
    id: 'node-1',
    type: 'concept',
    title: 'Nivel 1: El Descubrimiento',
    teacherDialogue: '¡Hola! Para entender este tema, primero imagina que eres un detective. El concepto clave aquí es que todo en la naturaleza sigue un orden. ¿Listo para investigar?',
    question: '¿Qué es lo primero que hace un detective científico?',
    options: ['Observar su entorno', 'Adivinar sin mirar', 'Dormir una siesta'],
    correctAnswer: 'Observar su entorno',
  },
  {
    id: 'node-2',
    type: 'concept',
    title: 'Nivel 2: La Conexión',
    teacherDialogue: '¡Exacto! Al observar, nos damos cuenta de los patrones. Por ejemplo, las hojas de los árboles necesitan luz para fabricar su alimento. A esto le llamamos fotosíntesis.',
    question: 'Si metemos una planta en un cuarto totalmente oscuro, ¿qué crees que le pasará a su fotosíntesis?',
    options: ['Se hará más fuerte', 'Se detendrá por falta de luz', 'Cambiará de color a azul'],
    correctAnswer: 'Se detendrá por falta de luz',
  },
  {
    id: 'node-3',
    type: 'boss',
    title: 'Nivel Final: El Reto Socrático',
    teacherDialogue: '¡Brillante deducción! Ahora, el reto final. Conecta todo lo que hemos hablado.',
    question: 'Explícame con tus propias palabras: ¿Por qué el sol es como el "motor" de las plantas?',
    // Al no tener opciones, el sistema pedirá texto libre para que la IA lo evalúe
  }
];

export const InteractiveLessonView: React.FC<InteractiveLessonViewProps> = ({ teacher, student, theme }) => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [aiCorrection, setAiCorrection] = useState('');

  // Generate dynamic lesson nodes based on theme and student level
  const isPrimaryStudent = student.grade?.toLowerCase().includes('elemental') || student.age < 10;
  const DYNAMIC_NODES: LessonNode[] = [
    {
      id: 'node-1',
      type: 'concept',
      title: `Nivel 1: Explorando "${theme}"`,
      teacherDialogue: `¡Hola ${student.name}! Vamos a explorar juntos el tema de "${theme}". Primero, cuéntame: ¿Qué sabes sobre esto? ¿Has escuchado esta palabra antes?`,
      question: isPrimaryStudent 
        ? `¿Qué te imaginas cuando escuchas "${theme}"? Dibuja o describe lo que piensas.`
        : `¿Cuál es tu conocimiento previo sobre "${theme}"? Describe brevemente tu comprensión inicial.`,
      options: isPrimaryStudent ? [
        'Sé algo, ¡cuéntame más!',
        'Nunca lo he escuchado',
        'Creo que es sobre algo de la naturaleza'
      ] : [
        'Tengo un conocimiento sólido del tema',
        'Conozco algunos conceptos básicos',
        'No estoy seguro/a de mi conocimiento',
        'Es la primera vez que escucho este tema'
      ],
      correctAnswer: isPrimaryStudent ? 'Sé algo, ¡cuéntame más!' : 'Tengo un conocimiento sólido del tema',
    },
    {
      id: 'node-2',
      type: 'concept',
      title: `Nivel 2: Profundizando en "${theme}"`,
      teacherDialogue: `¡Excelente! Ahora vamos más a fondo. ${isPrimaryStudent 
        ? `Imagina que "${theme}" es como un juego o una aventura. ¿Qué personajes o situaciones encontraríamos?`
        : `¿Cómo se relaciona "${theme}" con algo que ya conoces? Piensa en un ejemplo de la vida real.`}`,
      question: isPrimaryStudent
        ? `¿Por qué crees que es importante aprender sobre "${theme}" en tu vida diaria?`
        : `Explica cómo "${theme}" se aplica en un contexto real o profesional. Usa un ejemplo específico.`,
      options: isPrimaryStudent ? [
        'Para entender mejor el mundo',
        'Porque me gusta aprender cosas nuevas',
        'No estoy seguro de por qué'
      ] : [
        'Se aplica en situaciones laborales cotidianas',
        'Tiene relevancia social y ambiental',
        'Es fundamental para la toma de decisiones',
        'No veo una aplicación práctica inmediata'
      ],
      correctAnswer: isPrimaryStudent ? 'Para entender mejor el mundo' : 'Se aplica en situaciones laborales cotidianas',
    },
    {
      id: 'node-3',
      type: 'boss',
      title: `Reto Final: Dominando "${theme}"`,
      teacherDialogue: `¡Impresionante razonamiento! Ahora el desafío final. ${isPrimaryStudent 
        ? `Demuestra que eres un experto: Explica "${theme}" como si le enseñaras a un amigo o familiar.`
        : `Conecta todos los conceptos: Elabora una explicación completa de "${theme}" integrando los知识点 que hemos discutido.`}`,
      question: isPrimaryStudent
        ? `Explica "${theme}" con tus propias palabras como si le hablaras a un niño/a más pequeño/a.`
        : `Redacta un párrafo argumentativo explicando por qué "${theme}" es relevante en el contexto educativo actual. Justifica tu postura.`,
    }
  ];

  const currentNode = DYNAMIC_NODES[currentNodeIndex];
  const progressPercentage = ((currentNodeIndex) / DYNAMIC_NODES.length) * 100;
  const isFinished = currentNodeIndex >= DYNAMIC_NODES.length;

  const handleVerify = () => {
    // Si es de opciones
    if (currentNode.options) {
      if (selectedOption === currentNode.correctAnswer) {
        setFeedback('correct');
        setAiCorrection(`¡Excelente, ${student.name}! Esa es la respuesta correcta.`);
        // Aquí lanzaríamos el confeti y el sonido de "ding"
      } else {
        setFeedback('incorrect');
        setAiCorrection(`Piénsalo un poco más. Recuerda lo que acabamos de hablar en el diálogo anterior. ¿Quieres intentarlo de nuevo?`);
      }
    } else {
      // Si es texto libre, aquí llamaremos a Gemini para que evalúe si la respuesta escrita es lógica
      setFeedback('correct');
      setAiCorrection('¡Magnífico razonamiento! Has conectado las ideas perfectamente.');
    }
  };

  const handleNextLevel = () => {
    setFeedback('idle');
    setSelectedOption(null);
    setTextAnswer('');
    setCurrentNodeIndex(prev => prev + 1);
  };

  if (isFinished) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-emerald-900/20 border-2 border-emerald-500/40 text-center space-y-6 animate-fade-in shadow-xl">
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
          <Trophy className="w-12 h-12 text-slate-900" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white">¡Lección Dominada!</h2>
          <p className="text-emerald-300 mt-2 font-medium">Has superado todos los niveles de "{theme}".</p>
        </div>
        <button onClick={() => setCurrentNodeIndex(0)} className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md">
          Repasar Lección
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      
      {/* BARRA DE PROGRESO (Estilo Duolingo) */}
      <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
        <span className="text-xs font-bold text-slate-400 whitespace-nowrap">Nivel {currentNodeIndex + 1}</span>
        <div className="flex-1 h-3 rounded-full bg-slate-800 overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* ÁREA DEL PROFESOR Y DIÁLOGO */}
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="shrink-0 relative">
          <img src={teacher.avatar} alt={teacher.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg" />
          <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-500 transition-transform active:scale-95">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 relative">
          {/* Burbuja de diálogo */}
          <div className="p-5 rounded-3xl rounded-tl-none bg-slate-800 border border-slate-600 shadow-md text-sm sm:text-base text-slate-200 leading-relaxed">
            <h4 className="text-xs font-black text-indigo-400 uppercase tracking-wider mb-2">{currentNode.title}</h4>
            {currentNode.teacherDialogue}
          </div>
        </div>
      </div>

      {/* ZONA DE INTERACCIÓN (El Reto) */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-amber-400" />
          {currentNode.question}
        </h3>

        {/* Opciones Múltiples */}
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
                    : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400 hover:bg-slate-700'
                } ${feedback !== 'idle' && selectedOption !== opt ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          /* Respuesta Abierta (Texto Libre) */
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={feedback !== 'idle'}
            placeholder="Escribe tu razonamiento aquí..."
            className="w-full h-32 p-4 rounded-2xl bg-slate-800 border-2 border-slate-600 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-inner"
          />
        )}
      </div>

      {/* ZONA DE FEEDBACK Y BOTÓN DE ACCIÓN */}
      <div className="sticky bottom-4 z-10">
        {feedback === 'idle' ? (
          <button 
            onClick={handleVerify}
            disabled={(!selectedOption && !textAnswer.trim())}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-black text-lg transition-all shadow-lg active:scale-[0.98]"
          >
            COMPROBAR RESPUESTA
          </button>
        ) : (
          <div className={`p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl ${
            feedback === 'correct' ? 'bg-emerald-900/90 border-emerald-500' : 'bg-rose-900/90 border-rose-500'
          }`}>
            <div className="flex items-start gap-3">
              {feedback === 'correct' ? <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" /> : <XCircle className="w-8 h-8 text-rose-400 shrink-0" />}
              <div>
                <h4 className={`font-black text-lg ${feedback === 'correct' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {feedback === 'correct' ? '¡Excelente!' : 'Casi lo tienes'}
                </h4>
                <p className="text-white text-sm mt-1 leading-relaxed">{aiCorrection}</p>
              </div>
            </div>
            
            {feedback === 'correct' ? (
              <button onClick={handleNextLevel} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black whitespace-nowrap transition-transform active:scale-95 shadow-md">
                CONTINUAR <ArrowRight className="w-5 h-5 inline ml-1" />
              </button>
            ) : (
              <button onClick={() => { setFeedback('idle'); setSelectedOption(null); }} className="w-full sm:w-auto px-8 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black whitespace-nowrap transition-transform active:scale-95 shadow-md">
                INTENTAR DE NUEVO
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};