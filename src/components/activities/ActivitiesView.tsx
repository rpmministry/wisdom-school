import React, { useState } from 'react';
import { useSchool, DayOfWeekName } from '../../context/SchoolContext';
import { ClassActivity, DailyClass } from '../../types';
import { ActivityDetailModal } from './ActivityDetailModal';
import { PageHeader } from '../layout/PageHeader';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Play,
  Calendar,
  Award,
} from 'lucide-react';

const DAYS_CONFIG: { day: DayOfWeekName; date: string; isStart?: boolean }[] = [
  { day: 'Martes', date: '01 Sep', isStart: true },
  { day: 'Miércoles', date: '02 Sep' },
  { day: 'Jueves', date: '03 Sep' },
  { day: 'Viernes', date: '04 Sep' },
  { day: 'Lunes', date: '07 Sep' },
];

export const ActivitiesView: React.FC = () => {
  const {
    currentStudent,
    todayClasses,
    allStudentClasses,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    toggleActivityCompletion,
    setActiveClass,
    setActiveTab,
    setActiveSubject,
    studentSubjects,
    openTeacherDrawerWithContext,
  } = useSchool();

  const [selectedModalActivity, setSelectedModalActivity] = useState<ClassActivity | null>(null);
  const [selectedModalClass, setSelectedModalClass] = useState<DailyClass | null>(null);

  const handleOpenActivity = (act: ClassActivity, cls: DailyClass) => {
    setSelectedModalActivity(act);
    setSelectedModalClass(cls);
  };

  const currentClassForModal = selectedModalClass;
  const currentSubjectForModal = currentClassForModal
    ? studentSubjects.find((s) => s.id === currentClassForModal.subjectId) || null
    : null;

  const totalActivities = todayClasses.reduce((acc, c) => acc + c.activities.length, 0);
  const completedActivities = todayClasses.reduce(
    (acc, c) => acc + c.activities.filter((a) => a.completed).length,
    0
  );

  return (
    <div className="space-y-8">
      
      <PageHeader title="Actividades" />
      
      {/* Header with Day Selector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <ListTodo className="w-4 h-4" />
            <span>Taller de Actividades & Retos Prácticos</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Actividades de {currentStudent.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ingresa a cada reto para resolverlo en la libreta digital, consultar con tu profesor IA o adjuntar tu evidencia.
          </p>
        </div>

        {/* Day Pills & Stat */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <Calendar className="w-4 h-4 text-indigo-400 ml-2 mr-1" />
            {DAYS_CONFIG.map(({ day, date, isStart }) => (
              <button
                key={day}
                onClick={() => setSelectedDayOfWeek(day)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                  selectedDayOfWeek === day
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isStart ? `${day} 1 Sep (Primer Día)` : `${day} ${date}`}
              >
                <span>{day.slice(0, 3)}</span>
                <span className="text-[9px] opacity-75 font-mono">{date.slice(0, 2)}</span>
                {isStart && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            ))}
          </div>

          <div className="px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>
              {completedActivities}/{totalActivities} completadas ({selectedDayOfWeek})
            </span>
          </div>
        </div>
      </div>

      {/* Classes Activities List */}
      <div className="space-y-6">
        {todayClasses.map((cls) => {
          const sub = studentSubjects.find((s) => s.id === cls.subjectId);
          return (
            <div
              key={cls.id}
              className="p-6 sm:p-7 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                    {cls.scheduleTime ? cls.scheduleTime.slice(0, 5) : '08:00'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                      {sub?.name || 'Materia'} • {cls.scheduleTime}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{cls.theme}</h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveClass(cls);
                    if (sub) setActiveSubject(sub);
                    setActiveTab('classes');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Ver clase completa</span>
                </button>
              </div>

              <div className="space-y-3">
                {cls.activities.length > 0 ? (
                  cls.activities.map((act, idx) => (
                    <div
                      key={act.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        act.completed
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                          : 'bg-slate-900/80 border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-300'
                      }`}
                    >
                      <div
                        className="flex items-start gap-3.5 flex-1 cursor-pointer"
                        onClick={() => handleOpenActivity(act, cls)}
                      >
                        {/* Quick Checkbox */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleActivityCompletion(cls.id, act.id);
                          }}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all text-xs font-bold ${
                            act.completed
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'border border-slate-600 bg-slate-800 text-slate-400 hover:border-indigo-400 hover:text-white'
                          }`}
                          title={act.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                        >
                          {act.completed ? '✓' : idx + 1}
                        </button>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300">
                              {act.title}
                            </h4>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300">
                              {act.type === 'practice' ? 'Práctica' : act.type === 'project' ? 'Proyecto' : act.type === 'reflection' ? 'Reflexión' : act.type === 'experiment' ? 'Experimento' : 'Evaluación'}
                            </span>
                            {act.completed && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Completada
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                            {act.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                        <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                          +{act.points} pts
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenActivity(act, cls)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                            act.completed
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{act.completed ? 'Ver / Editar Solución' : 'Ingresar y Resolver ▶'}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-700 text-center text-xs text-slate-400">
                    No hay actividades registradas para esta lección.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal */}
      <ActivityDetailModal
        isOpen={Boolean(selectedModalActivity && selectedModalClass)}
        onClose={() => {
          setSelectedModalActivity(null);
          setSelectedModalClass(null);
        }}
        activity={selectedModalActivity}
        dailyClass={selectedModalClass}
        subject={currentSubjectForModal}
        onToggleCompletion={toggleActivityCompletion}
        onAskTeacher={openTeacherDrawerWithContext}
      />

    </div>
  );
};

