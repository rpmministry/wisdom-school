import React from 'react';
import { BookOpen, Cpu, ListTodo, Upload, CheckCircle2, Clock, Lock, ArrowRight } from 'lucide-react';

interface LessonTimelineProps {
  activeStep: string;
  onStepClick: (step: string) => void;
  completedSteps: string[];
  totalMinutes?: number;
  /** Pasos que el niño todavía no puede abrir (aún no llega su turno en la ruta). */
  lockedSteps?: string[];
  /** Paso sugerido por el sistema para que el niño no tenga que decidir. */
  nextStepId?: string;
  nextStepLabel?: string;
  nextStepSublabel?: string;
}

const STEPS = [
  { id: 'content', label: 'Masterclass Gamificada', short: 'Masterclass', icon: BookOpen, description: 'Teoría y desarrollo del tema' },
  { id: 'simulator', label: 'Laboratorio Digital', short: 'Laboratorio', icon: Cpu, description: 'Simulaciones y videos verificados' },
  { id: 'activities', label: 'Taller Práctico', short: 'Taller', icon: ListTodo, description: 'Actividades y proyectos aplicados' },
  { id: 'homework', label: 'Guía & Evidencias', short: 'Evidencias', icon: Upload, description: 'Guía descargable y entrega de tareas' },
];

const getStepColor = (stepId: string) => {
  switch (stepId) {
    case 'content': return 'from-indigo-500 to-blue-500';
    case 'simulator': return 'from-cyan-500 to-teal-500';
    case 'activities': return 'from-emerald-500 to-green-500';
    case 'homework': return 'from-amber-500 to-orange-500';
    default: return 'from-slate-500 to-slate-600';
  }
};

const getStepStatus = (stepId: string, activeStep: string, completedSteps: string[]) => {
  if (activeStep === stepId) return 'active';
  if (completedSteps.includes(stepId)) return 'completed';
  return 'pending';
};

export const LessonTimeline: React.FC<LessonTimelineProps> = ({
  activeStep,
  onStepClick,
  completedSteps,
  totalMinutes = 90,
  lockedSteps = [],
  nextStepId,
  nextStepLabel,
  nextStepSublabel,
}) => {
  const completedCount = completedSteps.filter((s) => s !== 'reflection').length;
  const percent = Math.min(100, Math.round((completedCount / 4) * 100));
  const nextStep = STEPS.find((s) => s.id === nextStepId);

  return (
    <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            Camino de Aprendizaje
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {nextStep ? <>Tu siguiente paso es <strong className="text-slate-200">{nextStep.short}</strong>.</> : 'Ya completaste toda la clase de hoy.'}
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black font-mono text-indigo-400">{percent}%</span>
          <div className="w-32 h-2 rounded-full bg-slate-900 border border-slate-700 overflow-hidden mt-1">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-[11px] text-slate-500 font-mono">{completedCount}/4 pasos</span>
        </div>
      </div>

      {nextStep && (
        <button
          onClick={() => onStepClick(nextStep.id)}
          className="w-full mb-6 px-5 py-4 rounded-2xl flex items-center justify-between gap-3 text-left bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg transition-all active:scale-[0.99]"
        >
          <span className="min-w-0">
            <span className="block text-[10px] font-black uppercase tracking-widest text-white/70">Continuar donde vas</span>
            <span className="block text-base font-black leading-tight">{nextStepLabel || nextStep.short}</span>
            {nextStepSublabel && <span className="block text-[11px] text-white/80 truncate">{nextStepSublabel}</span>}
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const status = getStepStatus(step.id, activeStep, completedSteps);
          const isActive = status === 'active';
          const isCompleted = status === 'completed';
          const isLocked = lockedSteps.includes(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              disabled={isLocked}
              aria-disabled={isLocked}
              className={`relative flex flex-col items-center justify-center text-center gap-2 sm:gap-3 p-4 sm:p-6 min-h-[128px] sm:min-h-[190px] rounded-2xl border transition-all touch-lift active:scale-95 ${
                isLocked
                  ? 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                  : isActive
                    ? `bg-gradient-to-br ${getStepColor(step.id)} text-white shadow-lg shadow-indigo-600/20 border-transparent hover:-translate-y-0.5`
                    : isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 hover:border-emerald-400/60 hover:-translate-y-0.5'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:-translate-y-0.5'
              }`}
            >
              <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border ${
                isLocked ? 'bg-slate-900 border-slate-800' : isActive ? 'bg-white/20 border-white/30' : isCompleted ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-slate-800 border-slate-700'
              }`}>
                {isLocked ? <Lock className="w-5 h-5 sm:w-6 sm:h-6" /> : isCompleted ? <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" /> : <Icon className="w-6 h-6 sm:w-7 sm:h-7" />}
              </div>
              <div className="space-y-1">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white/80' : 'text-slate-500'}`}>Paso {idx + 1}</span>
                <span className={`text-base font-bold block ${isActive ? 'text-white' : isCompleted ? 'text-emerald-300' : isLocked ? 'text-slate-500' : 'text-slate-200'}`}>{step.short}</span>
              </div>
              <span className="text-[11px] leading-snug opacity-75 max-w-[180px]">{step.description}</span>
              {isActive && <span className="text-[10px] font-bold uppercase tracking-wider animate-pulse">En curso</span>}
              {isLocked && <span className="text-[10px] font-bold uppercase tracking-wider">Se abre después</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Duración estimada: {totalMinutes} min</span>
        <span className="font-mono">4 etapas · aprendizaje activo</span>
      </div>
    </div>
  );
};
