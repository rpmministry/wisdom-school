import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ListTodo,
  Sparkles,
  Bot,
  FileText,
  Upload,
  Image as ImageIcon,
  HelpCircle,
  Award,
  BookOpen,
  Send,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ClassActivity, DailyClass, Subject } from '../../types';

interface ActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: ClassActivity | null;
  dailyClass: DailyClass | null;
  subject: Subject | null;
  onToggleCompletion: (classId: string, activityId: string) => void;
  onAskTeacher: (subject?: Subject, dailyClass?: DailyClass) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  isOpen,
  onClose,
  activity,
  dailyClass,
  subject,
  onToggleCompletion,
  onAskTeacher,
}) => {
  if (!isOpen || !activity || !dailyClass) return null;

  const storageKey = `wisdom_activity_response_${activity.id}`;
  const [responseNotes, setResponseNotes] = useState<string>(() => {
    return localStorage.getItem(storageKey) || '';
  });
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(() => {
    return localStorage.getItem(`${storageKey}_img`) || null;
  });
  const [showSocraticGuide, setShowSocraticGuide] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) || '';
    const savedImg = localStorage.getItem(`${storageKey}_img`) || null;
    setResponseNotes(saved);
    setEvidencePhoto(savedImg);
    setShowCelebration(false);
    setSavedSuccess(false);
  }, [activity.id, storageKey]);

  const handleSaveNotes = (markComplete = false) => {
    localStorage.setItem(storageKey, responseNotes);
    if (evidencePhoto) {
      localStorage.setItem(`${storageKey}_img`, evidencePhoto);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    if (markComplete && !activity.completed) {
      onToggleCompletion(dailyClass.id, activity.id);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEvidencePhoto(result);
        localStorage.setItem(`${storageKey}_img`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertTemplate = () => {
    const template = `1. Planteamiento / Datos clave:\n- \n\n2. Desarrollo / Procedimiento paso a paso:\n- \n\n3. Conclusión / Respuesta final:\n- `;
    if (!responseNotes.trim()) {
      setResponseNotes(template);
    } else {
      setResponseNotes((prev) => `${prev}\n\n${template}`);
    }
  };

  const typeLabels: Record<string, { label: string; color: string }> = {
    practice: { label: 'Taller Práctico', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    project: { label: 'Proyecto Creativo', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    reflection: { label: 'Indagación & Reflexión', color: 'bg-amber-500/20 text-amber-300 border-amber-500/20' },
    experiment: { label: 'Laboratorio Experimental', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
    quiz: { label: 'Reto de Evaluación Formativa', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  };

  const typeInfo = typeLabels[activity.type] || {
    label: 'Actividad Práctica',
    color: 'bg-slate-700 text-slate-200 border-slate-600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-700/80 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
              {subject && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {subject.name}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" />
                <span>+{activity.points} pts</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              {activity.title}
            </h2>
            <p className="text-xs text-slate-400">
              Lección: <span className="text-slate-300 font-medium">{dailyClass.theme}</span> ({dailyClass.dayOfWeek})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Celebration Banner if recently completed */}
          {showCelebration && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 animate-pulse">
              <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-100">¡Excelente trabajo! Actividad completada 🎉</h4>
                <p className="text-xs text-emerald-300">Has ganado +{activity.points} puntos para tu récord pedagógico.</p>
              </div>
            </div>
          )}

          {/* Activity Statement / Prompt */}
          <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Instrucciones & Enunciado de la Actividad</span>
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Socratic Helper Accordion */}
          <div className="rounded-2xl bg-indigo-950/30 border border-indigo-500/30 overflow-hidden">
            <button
              onClick={() => setShowSocraticGuide(!showSocraticGuide)}
              className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-indigo-200 hover:bg-indigo-950/50 transition-all"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>¿Cómo resolver esta actividad paso a paso? (Guía Socrática)</span>
              </div>
              {showSocraticGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSocraticGuide && (
              <div className="p-4 pt-0 border-t border-indigo-500/20 text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  1. <strong>Lectura atenta:</strong> Revisa el enunciado y anota los datos principales en tu libreta.
                </p>
                <p>
                  2. <strong>Aplica el concepto:</strong> Utiliza las fórmulas, reglas o conceptos vistos en el video y la lectura de la lección.
                </p>
                <p>
                  3. <strong>Verificación:</strong> Si tienes dudas, puedes consultar al Profesor IA con el botón inferior para recibir pistas sin que te dé la respuesta directa.
                </p>
                {subject && (
                  <button
                    onClick={() => {
                      onClose();
                      onAskTeacher(subject, dailyClass);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all mt-1"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Preguntar a {subject.teacher.name}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Student Response Workspace */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Tu Libreta Digital / Respuesta del Ejercicio</span>
              </label>
              <button
                type="button"
                onClick={handleInsertTemplate}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                + Insertar plantilla guiada
              </button>
            </div>

            <textarea
              value={responseNotes}
              onChange={(e) => setResponseNotes(e.target.value)}
              placeholder="Escribe aquí tu procedimiento, resolución, respuesta o notas personales sobre este ejercicio..."
              rows={6}
              className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-600 transition-all font-sans leading-relaxed"
            />
          </div>

          {/* Optional Photo / Notebook Evidence Upload */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Foto de Libreta o Evidencia (Opcional)</span>
            </label>

            {evidencePhoto ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-2 space-y-2">
                <img
                  src={evidencePhoto}
                  alt="Evidencia del cuaderno"
                  className="max-h-56 w-full object-contain rounded-xl"
                />
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Foto adjuntada con éxito
                  </span>
                  <button
                    onClick={() => {
                      setEvidencePhoto(null);
                      localStorage.removeItem(`${storageKey}_img`);
                    }}
                    className="text-rose-400 hover:text-rose-300 font-medium"
                  >
                    Eliminar foto
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-indigo-500/60 rounded-2xl bg-slate-950/40 hover:bg-slate-950/80 cursor-pointer transition-all text-center group">
                <ImageIcon className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors mb-2" />
                <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                  Subir foto de tu cuaderno o captura
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">
                  Formatos JPG, PNG (máx. 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Tus notas y evidencias han sido guardadas correctamente.</span>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activity.completed ? (
              <button
                type="button"
                onClick={() => onToggleCompletion(dailyClass.id, activity.id)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Desmarcar como Pendiente</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSaveNotes(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all w-full sm:w-auto"
              >
                <span>Guardar Borrador</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {subject && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onAskTeacher(subject, dailyClass);
                }}
                className="p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                title="Consultar al Profesor IA"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">Pedir Ayuda</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                handleSaveNotes(true);
                if (activity.completed) {
                  onClose();
                }
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activity.completed ? 'Guardar y Cerrar' : 'Marcar como Completada'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
