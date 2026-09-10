import React from 'react';
import { BookOpen, Cpu, ListTodo, Upload, CheckCircle2, Clock } from 'lucide-react';

interface LessonTimelineProps {
  activeStep: string;
  onStepClick: (step: string) => void;
  completedSteps: string[];
  totalMinutes?: number;
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

export const LessonTimeline: React.FC<LessonTimelineProps> = ({ activeStep, onStepClick, completedSteps, totalMinutes = 90 }) => {
  const completedCount = completedSteps.filter((s) => s !== 'reflection').length;
  const percent = Math.min(100, Math.round((completedCount / 4) * 100));

  return (
    <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            Camino de Aprendizaje
          </h3>
          <p className="text-xs text-slate-400 mt-1">Sigue los 4 pasos para dominar la clase de hoy.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black font-mono text-indigo-400">{percent}%</span>
          <div className="w-32 h-2 rounded-full bg-slate-900 border border-slate-700 overflow-hidden mt-1">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${percent}%` }} />
          </div>
          <span className="text-[10px] text-slate-500 font-mono">{completedCount}/4 pasos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const status = getStepStatus(step.id, activeStep, completedSteps);
          const isActive = status === 'active';
          const isCompleted = status === 'completed';

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`relative flex flex-col items-center text-center gap-2 p-3.5 rounded-2xl border transition-all active:scale-95 ${
                isActive
                  ? `bg-gradient-to-br ${getStepColor(step.id)} text-white shadow-lg shadow-indigo-600/20 border-transparent`
                  : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                isActive ? 'bg-white/20 border-white/30' : isCompleted ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-slate-800 border-slate-700'
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <div className="space-y-0.5">
                <span className={`text-[10px] font-black uppercase tracking-wide ${isActive ? 'text-white/80' : 'text-slate-500'}`}>{idx + 1}</span>
                <span className={`text-xs font-bold block ${isActive ? 'text-white' : isCompleted ? 'text-emerald-300' : 'text-slate-300'}`}>{step.short}</span>
              </div>
              <span className="text-[9px] leading-tight opacity-70 max-w-[110px]">{step.description}</span>
              {isActive && <span className="text-[9px] font-bold uppercase tracking-wider animate-pulse">En curso</span>}
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