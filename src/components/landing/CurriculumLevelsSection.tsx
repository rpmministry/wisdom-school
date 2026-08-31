import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Bot,
  BrainCircuit,
  Cpu,
  Layers,
  CheckCircle2,
  Atom,
  Flame,
  Globe,
  PenTool,
  ArrowRight,
  Calculator,
} from 'lucide-react';

export const CurriculumLevelsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inicial' | 'elemental' | 'media' | 'superior' | 'bachillerato'>('superior');

  const levels = [
    {
      id: 'inicial',
      title: 'Educación Inicial',
      age: '3 - 5 años',
      tagline: 'Juego, Sensorial & Descubrimiento Guiado',
      color: 'from-amber-500 to-yellow-600',
      badge: 'Parvularia & Pre-K',
      subjects: ['Desarrollo del Lenguaje', 'Expresión Artística', 'Sensomotricidad', 'Cuentos Vivientes'],
      methodology: 'Basado en experiencias manipulativas Montessori, canciones y narración de historias vivas.',
      aiRole: 'Tutor de Cuentos: Responde a preguntas de los pequeños con analogías mágicas y comprensión oral.',
    },
    {
      id: 'elemental',
      title: 'Básica Elemental',
      age: '6 - 8 años (2.º a 4.º EGB)',
      tagline: 'Lectoescritura, Lógica & Diario de Naturaleza',
      color: 'from-emerald-500 to-teal-600',
      badge: 'Primaria Inicial (Ej. Gael - 8a)',
      subjects: ['Lengua y Literatura', 'Matemática Visual', 'Ciencias Naturales', 'Estudios Sociales', 'Inglés Fonético', 'ECA & Robótica'],
      methodology: 'Enfoque Charlotte Mason con observación de la naturaleza, narración socrática y proyectos visuales.',
      aiRole: 'Profesor Amigable: Guía la suma, resta y ortografía mediante acertijos sencillos sin dar respuestas directas.',
    },
    {
      id: 'media',
      title: 'Básica Media',
      age: '9 - 11 años (5.º a 7.º EGB)',
      tagline: 'Pensamiento Abstracto & Laboratorios PhET',
      color: 'from-blue-500 to-indigo-600',
      badge: 'Primaria Intermedia',
      subjects: ['Matemática Aritmética', 'Ciencias e Indagación', 'Historia y Geografía', 'Inglés Intermedio', 'Computación y Código'],
      methodology: 'Integración de simulaciones PhET de física/química básica, experimentos guiados y portafolio de trabajos.',
      aiRole: 'Profesor de Indagación: Ayuda a hipotetizar y deducir fórmulas o causas históricas socráticamente.',
    },
    {
      id: 'superior',
      title: 'Básica Superior',
      age: '12 - 14 años (8.º a 10.º EGB)',
      tagline: 'Álgebra, Filosofía & Proyectos Interdisciplinarios',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Secundaria Básica (Ej. Avril - 12a)',
      subjects: ['Álgebra y Geometría', 'Ciencias Físico-Químicas', 'Estudios Políticos y Sociales', 'Literatura e Investigación', 'Inglés Avanzado', 'Emprendimiento'],
      methodology: 'Microcurrículo estricto de 200 días con proyectos interdisciplinarios sin exámenes memorísticos estresantes.',
      aiRole: 'Tutor Socrático Avanzado: Modera debates, analiza ensayos y retroalimenta tareas con precisión formativa.',
    },
    {
      id: 'bachillerato',
      title: 'Bachillerato General / IB',
      age: '15 - 18 años (1.º a 3.º BGU)',
      tagline: 'Pensamiento Crítico, Algoritmos & Preparación Universitaria',
      color: 'from-pink-500 to-rose-600',
      badge: 'Bachillerato & Pre-U',
      subjects: ['Cálculo e Inferencia', 'Física Cuántica Básica', 'Filosofía y Epistemología', 'Programación e IA', 'Redacción de Ensayos Académicos'],
      methodology: 'Investigación guiada con citación académica, análisis de algoritmos y mentoría para admisiones universitarias.',
      aiRole: 'Mentor de Investigación: Revisa metodología, valida fuentes de datos y desafía argumentos lógicos.',
    },
  ];

  const currentLevel = levels.find((l) => l.id === activeTab) || levels[3];

  return (
    <section className="space-y-8 py-6">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>Adaptabilidad Curricular Universal (3 a 18 años)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Diseñado para Cualquier Año y Nivel Académico
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Wisdom School ajusta dinámicamente sus asignaturas, metodologías pedagógicas y profesores virtuales de IA al rango de edad exacto y microcurrículo de cada estudiante.
        </p>
      </div>

      {/* Tabs selector */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {levels.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setActiveTab(lvl.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === lvl.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-950/50 scale-105'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>{lvl.title}</span>
            <span className="text-[10px] opacity-80 bg-slate-950/60 px-2 py-0.5 rounded-md font-mono">
              {lvl.age}
            </span>
          </button>
        ))}
      </div>

      {/* Active Level Card Detail */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl transition-all">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column: General info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${currentLevel.color} shadow-sm`}>
                  {currentLevel.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  Rango de edad: {currentLevel.age}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentLevel.title}
              </h3>
              <p className="text-sm font-semibold text-amber-300">
                "{currentLevel.tagline}"
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Asignaturas & Módulos Destacados</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentLevel.subjects.map((sub, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{sub}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Enfoque Pedagógico Integrado</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {currentLevel.methodology}
              </p>
            </div>
          </div>

          {/* Right Column: AI Tutor Role */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Comportamiento del Profesor IA</h4>
                  <p className="text-[11px] text-indigo-300">Adaptado al nivel cognitivo</p>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/90 p-3.5 rounded-xl border border-slate-800">
                "{currentLevel.aiRole}"
              </p>

              <div className="space-y-2 text-[11px] text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Método Socrático (Preguntas guiadas sin dar respuestas)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Resiliencia IA en Cascada (Modelos gratuitos + Gemini 3.7)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
