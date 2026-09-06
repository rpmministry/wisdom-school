import React, { useState, useEffect } from 'react';
import { useSchool, DayOfWeekName } from '../../context/SchoolContext';
import { DailyClass, ClassActivity } from '../../types';
import { formatYouTubeEmbedUrl, getYouTubeWatchUrl, getYouTubeSearchUrl } from '../../utils/youtube';
import { downloadClassGuide } from '../../utils/guideGenerator';
import { ActivityDetailModal } from '../activities/ActivityDetailModal';
import { ClassVideoPlayer } from './ClassVideoPlayer';
import { PageHeader } from '../layout/PageHeader';
import {
  PlayCircle,
  BookOpen,
  HelpCircle,
  ListTodo,
  Download,
  Upload,
  Bot,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Tv,
  Cpu,
  Layers,
  MessageSquareQuote,
  Lightbulb,
  Timer,
  Video,
  Calendar,
  Languages,
  Search,
  RefreshCw,
  Play,
} from 'lucide-react';

const DAYS_CONFIG: { day: DayOfWeekName; date: string; isStart?: boolean }[] = [
  { day: 'Martes', date: '01 Sep', isStart: true },
  { day: 'Miércoles', date: '02 Sep' },
  { day: 'Jueves', date: '03 Sep' },
  { day: 'Viernes', date: '04 Sep' },
  { day: 'Lunes', date: '07 Sep' },
];

export const DailyClassView: React.FC = () => {
  // Lógica de validación de la Semana de Repaso
  const [isReviewWeek, setIsReviewWeek] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    // Fecha oficial de inicio: 7 de Septiembre de 2026
    const schoolStart = new Date('2026-09-07T00:00:00');
    setIsReviewWeek(today < schoolStart);
  }, []);

  const {
    activeClass,
    todayClasses,
    allStudentClasses,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    setActiveClass,
    studentSubjects,
    activeSubject,
    setActiveSubject,
    openTeacherDrawerWithContext,
    toggleActivityCompletion,
    setActiveTab,
    currentStudent,
    todaySchedule,
  } = useSchool();

  const [activeSubTab, setActiveSubTab] = useState<'content' | 'simulator' | 'activities' | 'homework' | 'reflection'>('content');
  const [viewMode, setViewMode] = useState<'focus' | 'all-classes'>('focus');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<ClassActivity | null>(null);
  const [videoOverrideUrl, setVideoOverrideUrl] = useState<string | null>(null);
  const [showVideoSearch, setShowVideoSearch] = useState(false);
  const [customVideoInput, setCustomVideoInput] = useState('');

  const currentClass = activeClass || todayClasses[0] || allStudentClasses[0];
  const subject = currentClass
    ? studentSubjects.find((s: any) => s.id === currentClass.subjectId)
    : studentSubjects[0];

  const activeVideoUrl = videoOverrideUrl || currentClass?.videoUrl;
  const videoSearchQuery = `${subject?.name || 'Educación'} ${currentClass?.theme || ''} explicación clase`;

  const activitiesList = currentClass?.activities || [];
  const resourcesList = currentClass?.resources || [];
  const socraticQuestionsList = currentClass?.socraticQuestions || [];

  const currentClassIndex = currentClass ? todayClasses.findIndex((c: any) => c.id === currentClass.id) : -1;
  const prevClass = currentClassIndex > 0 ? todayClasses[currentClassIndex - 1] : null;
  const nextClass = currentClassIndex >= 0 && currentClassIndex < todayClasses.length - 1 ? todayClasses[currentClassIndex + 1] : null;

  const handleSelectClass = (targetClass: DailyClass) => {
    setActiveClass(targetClass);
    const targetSub = studentSubjects.find((s: any) => s.id === targetClass.subjectId);
    if (targetSub) setActiveSubject(targetSub);
    setVideoOverrideUrl(null);
    setCustomVideoInput('');
    setShowVideoSearch(false);
    setActiveSubTab('content');
    setViewMode('focus');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadGuide = () => {
    if (currentClass) {
      downloadClassGuide(
        currentClass,
        subject,
        currentStudent.name,
        currentStudent.grade
      );
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleGoToSubmitWork = () => {
    setActiveTab('works');
  };

  if (!isMounted) return null;

  if (!currentClass || !subject) {
    return (
      <div className="p-12 text-center rounded-3xl bg-slate-800/40 border border-slate-700/40 space-y-4">
        <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
        <h3 className="text-lg font-bold text-white">No hay clases seleccionadas</h3>
        <p className="text-sm text-slate-400">Selecciona una materia o día en el microcurrículo para comenzar.</p>
        <button
          onClick={() => setActiveTab('subjects')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
        >
          Explorar Materias
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <PageHeader title={isReviewWeek ? "Clases de Entrenamiento (Modo Repaso)" : "Clases del Día"} />
      
      {/* Day Selector & Official Schedule Ribbon */}
      <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-extrabold text-white">Día Escolar ({currentStudent.name}):</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {DAYS_CONFIG.map(({ day, date, isStart }) => {
              const isSelected = day === selectedDayOfWeek;
              const countForDay = allStudentClasses.filter(
                (c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day
              ).length;

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDayOfWeek(day);
                    const classesOnDay = allStudentClasses.filter(
                      (c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day
                    );
                    if (classesOnDay.length > 0) {
                      setActiveClass(classesOnDay[0]);
                      const clsSub = studentSubjects.find((s: any) => s.id === classesOnDay[0].subjectId);
                      if (clsSub) setActiveSubject(clsSub);
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <span>{day}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {date}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-800 text-white font-mono' : 'bg-slate-800 text-slate-400 font-mono'}`}>
                    {countForDay}
                  </span>
                  {isStart && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Primer Día de Clases (1 Sep 2026)" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Classes on Selected Day Carousel / Timeline */}
        {todayClasses.length > 0 ? (
          <div className="pt-3 border-t border-slate-700/60 space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-indigo-300 font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Horario Oficial ({selectedDayOfWeek} • {todayClasses.length} clases programadas):</span>
              </span>

              {/* View mode toggle */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setViewMode('focus')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'focus'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lección Seleccionada
                </button>
                <button
                  onClick={() => setViewMode('all-classes')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'all-classes'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Ver Todas ({todayClasses.length})
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
              {todayClasses.map((cls: any, idx: number) => {
                const clsSub = studentSubjects.find((s: any) => s.id === cls.subjectId);
                const isSelected = cls.id === currentClass.id && viewMode === 'focus';
                // En semana de repaso ninguna clase está completada aún
                const displayIsCompleted = isReviewWeek ? false : cls.isCompleted;

                return (
                  <button
                    key={cls.id}
                    onClick={() => {
                      setActiveClass(cls);
                      if (clsSub) setActiveSubject(clsSub);
                      setViewMode('focus');
                    }}
                    className={`p-3.5 rounded-2xl text-left transition-all relative flex flex-col justify-between gap-2 border ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-400 shadow-md ring-2 ring-indigo-500/40 text-white'
                        : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 w-full">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-indigo-300">
                        {idx + 1}.ª Clase
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{cls.scheduleTime?.slice(0, 13) || '08:00'}</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white truncate">
                        {clsSub?.name || 'Materia'}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate line-clamp-1">
                        {cls.theme}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-700/40 text-[10px]">
                      <span className="text-slate-400">{cls.activities.length} actividades</span>
                      {displayIsCompleted ? (
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Lista
                        </span>
                      ) : (
                        <span className="text-indigo-400 font-semibold flex items-center gap-0.5">
                          Abrir ▶
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pt-2 border-t border-slate-700/60 text-xs text-slate-400 italic">
            No hay clases registradas para este día en particular.
          </div>
        )}
      </div>

      {/* ALL CLASSES ITINERARY VIEW (When user clicks 'Ver Todas') */}
      {viewMode === 'all-classes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Itinerario Completo del {selectedDayOfWeek} ({todayClasses.length} Clases)</span>
            </h2>
            <button
              onClick={() => setViewMode('focus')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Cambiar a Vista Detallada de Lección
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {todayClasses.map((cls: any, idx: number) => {
              const clsSub = studentSubjects.find((s: any) => s.id === cls.subjectId);
              // Interceptar completados en semana de repaso
              const displayCompletedActivities = isReviewWeek ? 0 : cls.activities.filter((a: any) => a.completed).length;

              return (
                <div
                  key={cls.id}
                  className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 shadow-xl space-y-4 hover:border-slate-600 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-extrabold flex items-center justify-center text-sm font-mono">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {clsSub?.name || 'Materia'}
                          </span>
                          <span className="text-xs text-amber-300 font-mono font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span>{cls.scheduleTime}</span>
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                          {cls.theme}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectClass(cls)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Abrir Lección Completa</span>
                      </button>
                      {clsSub && (
                        <button
                          onClick={() => openTeacherDrawerWithContext(clsSub, cls)}
                          className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 transition-all"
                          title="Consultar al Profesor IA"
                        >
                          <Bot className="w-4 h-4 text-indigo-300" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {cls.objective}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-indigo-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> Recursos & Lectura
                      </span>
                      <p className="text-xs text-slate-300">{cls.resources.length} materiales listos</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                        <ListTodo className="w-3.5 h-3.5" /> Actividades Prácticas
                      </span>
                      <p className="text-xs text-slate-300">
                        {displayCompletedActivities} de {cls.activities.length} completadas
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" /> Tarea del Día
                      </span>
                      <p className="text-xs text-slate-300 truncate">{cls.homeworkTask}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FOCUS LESSON VIEW (Active Class) */}
      {viewMode === 'focus' && (
        <>
          {/* Class Main Header Banner */}
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {subject.name}
                </span>
                <span className="text-xs text-slate-400 font-medium">{currentClass.date} ({currentClass.dayOfWeek})</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-indigo-300 border border-slate-700 font-bold">
                  Clase {currentClassIndex >= 0 ? currentClassIndex + 1 : 1} de {todayClasses.length}
                </span>
              </div>

              {/* Socratic Teacher Direct summon */}
              <button
                onClick={() => openTeacherDrawerWithContext(subject, currentClass)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all shadow-sm group"
              >
                <img
                  src={subject.teacher.avatar}
                  alt={subject.teacher.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-400"
                />
                <span>Preguntar a {subject.teacher.name}</span>
                <Bot className="w-3.5 h-3.5 text-indigo-400 group-hover:animate-bounce" />
              </button>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {currentClass.unit || `Unidad Curricular - ${subject.name}`}
                </span>
                {currentClass.scheduleTime && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Horario: {currentClass.scheduleTime}</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {currentClass.theme}
              </h1>
            </div>

            {/* Objective Box & Time Phases */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-0.5">
                    Objetivo de Aprendizaje
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentClass.objective}
                  </p>
                </div>
              </div>

              {/* Time Structure Badge Box */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Estructura de la Clase</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{currentClass.scheduleTime || subject.scheduleTime}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Desarrollada en 4 momentos socráticos: Indagación, Video Explicativo en Español, Taller Práctico y Cierre Formativo.
                </p>
              </div>
            </div>

            {/* HIGH-VISIBILITY INITIAL CLASS GUIDE & TASK ACTION CARDS */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* CARD 1: DOWNLOAD WORK GUIDE (High contrast Blue/Gold) */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border-2 border-indigo-400/80 shadow-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 ring-2 ring-indigo-500/30">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                        📄 1. GUÍA DIDÁCTICA IMPRESA (PDF)
                      </span>
                      <span className="text-[11px] font-mono text-amber-300 font-bold bg-slate-950/80 px-2.5 py-0.5 rounded-md border border-amber-500/30">
                        {currentClass.guideTitle || 'Guia_Didactica_Clase.pdf'}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border-2 border-amber-400/50 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
                        <Download className="w-6 h-6 text-amber-300 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                          ¡Descarga tu Guía para seguir la Clase!
                        </h3>
                        <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                          Imprime o abre en pantalla tu hoja de trabajo con ejercicios interactivos y lecturas guiadas.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Big High-Contrast Download Button */}
                  <div className="pt-2">
                    <button
                      id="btn-download-guide-top"
                      onClick={handleDownloadGuide}
                      className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2.5 border-2 border-amber-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <Download className="w-5 h-5 text-slate-950 stroke-[3]" />
                      <span>DESCARGAR GUÍA DE TRABAJO IMPRESA (PDF)</span>
                    </button>
                  </div>
                </div>

                {/* CARD 2: HOMEWORK & TASK SUBMISSION (High contrast Emerald/Green) */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-400/80 shadow-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 ring-2 ring-emerald-500/30">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider bg-emerald-400 text-slate-950 shadow-md">
                        🎯 2. TAREA Y MISIÓN PRINCIPAL DEL DÍA
                      </span>
                      <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded-md border border-emerald-500/40 font-mono">
                        Evidencia en Libreta
                      </span>
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
                        <Sparkles className="w-6 h-6 text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                          {currentClass.homeworkTask}
                        </h3>
                        <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                          Resuelve la actividad en tu libreta y sube tu foto o documento para recibir la retroalimentación de tu profesor.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Big High-Contrast Submit Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleGoToSubmitWork}
                      className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 border-2 border-emerald-200 hover:scale-[1.02] cursor-pointer"
                    >
                      <Upload className="w-5 h-5 text-slate-950 stroke-[3]" />
                      <span>ENTREGAR TAREA / SUBIR EVIDENCIA</span>
                    </button>
                  </div>
                </div>
              </div>

              {downloadSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/90 border-2 border-emerald-400/80 text-xs text-emerald-200 font-extrabold flex items-center justify-center gap-2 animate-fade-in shadow-xl text-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>✓ ¡Guía descargada exitosamente! Imprímela o ábrela en tu pantalla para resolver los ejercicios paso a paso.</span>
                </div>
              )}

              {/* Special Pedagogy & Interactive 4-Step Didactic Flow Container */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-indigo-500/40 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Ruta Didáctica de la Clase (Haz clic para avanzar en cada etapa):</span>
                  </span>
                  <span className="text-[10px] font-black text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {currentStudent.id === 'avril' ? '🐶 Método Snoopy' : '🍄 Reino Mario'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('content')}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                      activeSubTab === 'content'
                        ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500/40 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-indigo-300">Paso 1 • Indagación</span>
                      <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{currentStudent.id === 'avril' ? '🐾 Cuento Vivo con Snoopy' : '🍄 Cuento del Reino'}</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2">Lectura inicial del concepto e historia viva.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('simulator')}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                      activeSubTab === 'simulator'
                        ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500/40 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-emerald-300">Paso 2 • Video & Lab</span>
                      <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{currentStudent.id === 'avril' ? '✏️ Apuntes de Woodstock' : '❓ Caja [?] & Video'}</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2">Explicación en video y laboratorio de experimentos.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('activities')}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                      activeSubTab === 'activities'
                        ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500/40 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-amber-300">Paso 3 • Taller Práctico</span>
                      <ListTodo className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{currentStudent.id === 'avril' ? '💬 Puesto de Lucy (5¢)' : '🦖 Círculo con Yoshi'}</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2">Resuelve los ejercicios en tu libreta impresa.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSubTab('homework')}
                    className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                      activeSubTab === 'homework'
                        ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-500/40 text-white shadow-md'
                        : 'bg-slate-900/80 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-rose-300">Paso 4 • Tarea & Cierre</span>
                      <Upload className="w-3.5 h-3.5 text-rose-400" />
                    </div>
                    <h5 className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{currentStudent.id === 'avril' ? '🏆 Máquina de Escribir' : '🏁 Bandera Final'}</span>
                    </h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2">Sube tu evidencia y reflexiona sobre lo aprendido.</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Pedagogical Breakdown Steps if available */}
            {currentClass.timeBreakdown && currentClass.timeBreakdown.length > 0 && (
              <div className="pt-2 border-t border-slate-700/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Momentos Pedagógicos del Horario:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {currentClass.timeBreakdown.map((tb: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 space-y-1 hover:border-indigo-500/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-indigo-300">Momento {idx + 1}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-200 font-mono font-bold">
                          {tb.minutes} min
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200">{tb.phase}</h4>
                      <p className="text-[11px] text-slate-400 leading-snug">{tb.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

      {/* Navigation Sub-Tabs for the Class */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'content', label: '1. Lectura y Recursos', icon: BookOpen },
          { id: 'simulator', label: '2. Simulador & Video', icon: Cpu },
          { id: 'activities', label: '3. Actividades & Test', icon: ListTodo, badge: `${isReviewWeek ? 0 : activitiesList.filter((a: any) => a.completed).length}/${activitiesList.length}` },
          { id: 'homework', label: '4. Guía & Tarea', icon: Upload },
          { id: 'reflection', label: '5. Preguntas Socráticas', icon: MessageSquareQuote },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-700 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-Tab 1: Content & Reading */}
      {activeSubTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Introduction Card */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Introducción al Tema</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentClass.introduction || `Bienvenido a la lección sobre "${currentClass.theme}".`}
              </p>
            </div>

            {/* Core Reading */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Desarrollo Conceptual</span>
              </h3>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
                {currentClass.reading || `Exploración y desarrollo guiado de los conceptos clave para ${currentClass.theme}.`}
              </div>
            </div>

          </div>

          {/* Right Column: Resources List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Recursos del Día ({resourcesList.length})</span>
            </h3>

            <div className="space-y-3">
              {resourcesList.length > 0 ? (
                resourcesList.map((res: any) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 hover:border-slate-600 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {res.type}
                      </span>
                      {res.duration && (
                        <span className="text-[11px] text-slate-400">{res.duration}</span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-slate-200">{res.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{res.description}</p>
                    
                    {res.url && res.url !== '#' && (
                      <a
                        href={res.type === 'video' ? getYouTubeWatchUrl(res.url, res.title) : res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-1"
                      >
                        <span>{res.type === 'video' ? 'Ver video en YouTube' : 'Abrir recurso'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-xs text-slate-400 text-center">
                  Material y recursos disponibles en la guía de trabajo.
                </div>
              )}
            </div>

            {/* Quick Socratic nudge */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 text-xs space-y-2">
              <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                <span>¿Dudas con la lectura?</span>
              </span>
              <p className="text-slate-400">
                Pídele a {subject.teacher.name} que te explique con un ejemplo cotidiano.
              </p>
              <button
                onClick={() => openTeacherDrawerWithContext(subject, currentClass)}
                className="w-full py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all"
              >
                Preguntar ahora
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Sub-Tab 2: Simulator & Video */}
      {activeSubTab === 'simulator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Interactive Simulator Section */}
            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Laboratorio / Simulador Interactivo</span>
                </h3>
                {currentClass.simulatorUrl && (
                  <a
                    href={currentClass.simulatorUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    <span>Abrir en nueva pestaña</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {currentClass.simulatorUrl ? (
                <div className="w-full h-80 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 relative">
                  <iframe
                    src={currentClass.simulatorUrl}
                    title="Simulador PhET Interactivo"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-700 text-slate-400 text-xs">
                  Esta lección utiliza ejercicios manipulativos en libreta.
                </div>
              )}
            </div>

            {/* Video & Interactive Multimedia Classroom Section */}
            <ClassVideoPlayer
              currentClass={currentClass}
              subject={subject}
              onActivitySelect={(actId: string) => {
                const act = currentClass.activities?.find((a: any) => a.id === actId);
                if (act) setSelectedActivityForModal(act);
              }}
            />

          </div>
        </div>
      )}

      {/* Sub-Tab 3: Activities & Test */}
      {activeSubTab === 'activities' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
            <div>
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">
                  Actividades Prácticas & Retos de la Lección
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Haz clic en cualquier actividad para abrir su <strong>Taller Interactivo</strong>, escribir tu desarrollo en la libreta digital o adjuntar tu evidencia.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-medium">
                Completadas: <strong className="text-emerald-400 font-mono">{isReviewWeek ? 0 : activitiesList.filter((a: any) => a.completed).length}</strong> / {activitiesList.length}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {activitiesList.length > 0 ? (
              activitiesList.map((act: any, index: number) => {
                // Forzar completado a false en semana de repaso
                const displayActCompleted = isReviewWeek ? false : act.completed;

                return (
                  <div
                    key={act.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      displayActCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-900/80 border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-300'
                    }`}
                  >
                    <div
                      className="flex items-start gap-3.5 flex-1 cursor-pointer"
                      onClick={() => setSelectedActivityForModal(act)}
                    >
                      {/* Quick check toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleActivityCompletion(currentClass.id, act.id);
                        }}
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all text-xs font-bold ${
                          displayActCompleted
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'border border-slate-600 bg-slate-800 text-slate-400 hover:border-indigo-400 hover:text-white'
                        }`}
                        title={displayActCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                      >
                        {displayActCompleted ? '✓' : index + 1}
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300">
                            {act.title}
                          </h4>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300">
                            {act.type === 'practice' ? 'Práctica' : act.type === 'project' ? 'Proyecto' : act.type === 'reflection' ? 'Reflexión' : act.type === 'experiment' ? 'Experimento' : 'Evaluación'}
                          </span>
                          {displayActCompleted && (
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

                    {/* Actions column */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                      <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                        +{act.points} pts
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedActivityForModal(act)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                          displayActCompleted
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{displayActCompleted ? 'Ver / Editar Solución' : 'Ingresar y Resolver ▶'}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700 text-center space-y-2">
                <ListTodo className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-300">Sin actividades pendientes</h4>
                <p className="text-xs text-slate-500">
                  Las actividades prácticas de esta lección se desarrollan en la libreta física guiada.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Guide & Homework */}
      {activeSubTab === 'homework' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Download Guide Card */}
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Guía de Trabajo Descargable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Descarga la guía estructurada en PDF con los ejercicios del día, diagramas conceptuales y espacio para resolver paso a paso.
              </p>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-indigo-300">
                📄 {currentClass.guideTitle || 'Guia_Didactica_Clase.pdf'}
              </div>
            </div>

            <div className="space-y-2">
              <button
                id="btn-download-guide"
                onClick={handleDownloadGuide}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Guía de Trabajo</span>
              </button>
              {downloadSuccess && (
                <p className="text-xs text-emerald-400 text-center font-semibold animate-fade-in">
                  ✓ Guía descargada correctamente. ¡Listo para trabajar!
                </p>
              )}
            </div>
          </div>

          {/* Homework Assignment & Upload Prompt */}
          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Tarea del Día</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/80">
                {currentClass.homeworkTask}
              </p>
              <p className="text-xs text-slate-400">
                Una vez resuelta en tu libreta o computadora, sube la foto o PDF para que la IA y {subject.teacher.name} analicen tu nivel de comprensión.
              </p>
            </div>

            <button
              onClick={handleGoToSubmitWork}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Subir Trabajo para Análisis IA</span>
            </button>
          </div>

        </div>
      )}

      {/* Sub-Tab 5: Socratic Reflection */}
      {activeSubTab === 'reflection' && (
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
              <span>Preguntas Socráticas de Autoindagación</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Estas preguntas te retan a razonar antes de pasar a la siguiente lección.
            </p>
          </div>

          <div className="space-y-4">
            {socraticQuestionsList.length > 0 ? (
              socraticQuestionsList.map((q: string, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>Pregunta de Razonamiento #{idx + 1}</span>
                  </div>
                  <p className="text-sm text-slate-200 font-medium">"{q}"</p>
                  <button
                    onClick={() => openTeacherDrawerWithContext(subject, currentClass)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold pt-1 flex items-center gap-1"
                  >
                    <span>Debatir esta pregunta con el profesor IA</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 text-xs text-slate-400 text-center">
                Reflexiona sobre lo aprendido en tu bitácora de clases.
              </div>
            )}
          </div>

          {/* Daily Reflection Prompt */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Reflexión Final del Día
            </span>
            <p className="text-xs text-slate-300 italic">
              "{currentClass.reflectionPrompt}"
            </p>
          </div>
        </div>
      )}

      {/* Class-to-Class Day Navigator Footer */}
      {todayClasses.length > 1 && (
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">
                Progreso del Día ({selectedDayOfWeek})
              </p>
              <p className="text-[11px] text-slate-400">
                {currentClassIndex >= 0 ? `Clase ${currentClassIndex + 1} de ${todayClasses.length}` : ''}: {subject.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {prevClass ? (
              <button
                onClick={() => handleSelectClass(prevClass)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Clase Anterior</span>
              </button>
            ) : (
              <div className="flex-1 sm:flex-initial" />
            )}

            {nextClass ? (
              <button
                onClick={() => handleSelectClass(nextClass)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Siguiente Clase ({nextClass.scheduleTime?.slice(0, 5) || '10:00'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('home')}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Jornada Completa! Ir al Inicio</span>
              </button>
            )}
          </div>
        </div>
      )}
      </>
      )}

      {/* Interactive Activity Solver Modal */}
      <ActivityDetailModal
        isOpen={Boolean(selectedActivityForModal)}
        onClose={() => setSelectedActivityForModal(null)}
        activity={selectedActivityForModal}
        dailyClass={currentClass}
        subject={subject}
        onToggleCompletion={toggleActivityCompletion}
        onAskTeacher={openTeacherDrawerWithContext}
      />

    </div>
  );
};