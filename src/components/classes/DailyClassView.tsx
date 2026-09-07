import React, { useState, useEffect } from 'react';
import { useSchool, DayOfWeekName } from '../../context/SchoolContext';
import { DailyClass, ClassActivity } from '../../types';
import { formatYouTubeEmbedUrl, getYouTubeWatchUrl, getYouTubeSearchUrl } from '../../utils/youtube';
import { downloadClassGuide } from '../../utils/guideGenerator';
import { downloadConsolidatedDailyGuide } from '../../utils/consolidatedGuideGenerator';
import { ActivityDetailModal } from '../activities/ActivityDetailModal';
import { ClassVideoPlayer } from './ClassVideoPlayer';
import { InteractiveLessonView } from './InteractiveLessonView';
import { PageHeader } from '../layout/PageHeader';
import {
  PlayCircle, BookOpen, HelpCircle, ListTodo, Download, Upload, Bot, Sparkles, ExternalLink,
  CheckCircle2, Clock, ArrowRight, ArrowLeft, Tv, Cpu, Layers, MessageSquareQuote, Lightbulb,
  Timer, Play, BrainCircuit, Microscope, Calendar, AlertCircle, GraduationCap
} from 'lucide-react';

const DAYS_CONFIG: { day: DayOfWeekName; date: string; isStart?: boolean }[] = [
  { day: 'Lunes', date: '07 Sep', isStart: true },
  { day: 'Martes', date: '08 Sep' },
  { day: 'Miércoles', date: '09 Sep' },
  { day: 'Jueves', date: '10 Sep' },
  { day: 'Viernes', date: '11 Sep' },
];

const forceSpanishUrl = (url: string) => {
  if (!url || url === '#') return '#';
  try {
    const u = new URL(url);
    if (u.hostname.includes('phet.colorado.edu')) u.searchParams.set('locale', 'es');
    if (u.hostname.includes('storyweaver.org.in')) u.searchParams.set('hl', 'es-MX');
    if (u.hostname.includes('youtube.com')) { u.searchParams.set('hl', 'es'); u.searchParams.set('cc_lang_pref', 'es'); }
    return u.toString();
  } catch (e) { return url; }
};

export const DailyClassView: React.FC = () => {
  const [isReviewWeek, setIsReviewWeek] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsReviewWeek(new Date() < new Date('2026-09-07T00:00:00'));
  }, []);

  const {
    activeClass, todayClasses, allStudentClasses, selectedDayOfWeek, setSelectedDayOfWeek,
    setActiveClass, studentSubjects, activeSubject, setActiveSubject, openTeacherDrawerWithContext,
    toggleActivityCompletion, setActiveTab, currentStudent,
  } = useSchool();

  const [activeSubTab, setActiveSubTab] = useState<'content' | 'simulator' | 'activities' | 'homework' | 'reflection'>('content');
  const [viewMode, setViewMode] = useState<'focus' | 'all-classes'>('focus');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<ClassActivity | null>(null);

  const currentClass = activeClass || todayClasses[0] || allStudentClasses[0];
  const subject = currentClass ? studentSubjects.find((s: any) => s.id === currentClass.subjectId) : studentSubjects[0];

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
    setActiveSubTab('content'); setViewMode('focus'); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadGuide = (mode?: 'single' | 'consolidated') => {
    if (mode === 'consolidated' || (mode === undefined && todayClasses.length > 1)) {
      renderConsolidatedGuide();
    } else if (currentClass) {
      downloadClassGuide(currentClass, subject, currentStudent.name, currentStudent.grade);
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const renderConsolidatedGuide = () => {
    const dayClasses = todayClasses.filter((c: any) => c.studentId === currentStudent.id);
    const daySubjects = studentSubjects.filter((s: any) => dayClasses.some((c: any) => c.subjectId === s.id));
    const date = selectedDayOfWeek === 'Lunes' ? '07 Sep' : selectedDayOfWeek === 'Martes' ? '08 Sep' : selectedDayOfWeek === 'Miércoles' ? '09 Sep' : selectedDayOfWeek === 'Jueves' ? '10 Sep' : '11 Sep';
    downloadConsolidatedDailyGuide({
      student: currentStudent,
      dayClasses,
      daySubjects,
      selectedDay: selectedDayOfWeek,
      dateStr: date
    });
  };

  const handleAskSocraticTeacher = (promptText: string) => {
    localStorage.setItem('pending_socratic_prompt', promptText);
    openTeacherDrawerWithContext(subject, currentClass);
  };

  const handleGoToSubmitWork = () => setActiveTab('works');

  if (!isMounted) return null;
  if (!currentClass || !subject) return (<div className="p-12 text-center rounded-3xl bg-slate-800/40 border border-slate-700/40 text-white">No hay clases seleccionadas</div>);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={isReviewWeek ? "Clases de Entrenamiento (Modo Repaso)" : "Clases del Día"} />
      
      {/* Day Selector */}
      <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-400" /><span className="text-sm font-extrabold text-white">Día Escolar ({currentStudent.name}):</span></div>
          <div className="flex flex-wrap items-center gap-2">
            {DAYS_CONFIG.map(({ day, date, isStart }) => {
              const isSelected = day === selectedDayOfWeek;
              const countForDay = allStudentClasses.filter((c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day).length;
              return (
                <button key={day} onClick={() => { setSelectedDayOfWeek(day); const classesOnDay = allStudentClasses.filter((c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day); if (classesOnDay.length > 0) { setActiveClass(classesOnDay[0]); const clsSub = studentSubjects.find((s: any) => s.id === classesOnDay[0].subjectId); if (clsSub) setActiveSubject(clsSub); } }} className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isSelected ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'}`}>
                  <span>{day}</span><span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>{date}</span><span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-800 text-white font-mono' : 'bg-slate-800 text-slate-400 font-mono'}`}>{countForDay}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {viewMode === 'focus' && (
        <>
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{subject.name}</span>
                <span className="text-xs text-slate-400 font-medium">{currentClass.date}</span>
              </div>
              <button onClick={() => openTeacherDrawerWithContext(subject, currentClass)} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all shadow-sm group">
                <img src={subject.teacher.avatar} alt={subject.teacher.name} className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-400" />
                <span>Hablar con {subject.teacher.name}</span><Bot className="w-3.5 h-3.5 text-indigo-400 group-hover:animate-bounce" />
              </button>
            </div>
            <div><h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{currentClass.theme}</h1></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div><span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-0.5">Objetivo de Aprendizaje</span><p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{currentClass.objective}</p></div>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
            {[
              { id: 'content', label: '1. Masterclass Gamificada', icon: BookOpen },
              { id: 'simulator', label: '2. Laboratorio Digital', icon: Cpu },
              { id: 'activities', label: '3. Taller Práctico', icon: ListTodo, badge: `${isReviewWeek ? 0 : activitiesList.filter((a: any) => a.completed).length}/${activitiesList.length}` },
              { id: 'homework', label: '4. Guía & Evidencias', icon: Upload },
              { id: 'reflection', label: '5. Pausa Socrática', icon: MessageSquareQuote },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setActiveSubTab(tab.id as any)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeSubTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
                <tab.icon className="w-3.5 h-3.5" /><span>{tab.label}</span>
                {tab.badge && <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeSubTab === tab.id ? 'bg-indigo-700 text-white' : 'bg-slate-700 text-slate-300'}`}>{tab.badge}</span>}
              </button>
            ))}
          </div>

          {/* SUB-TAB 1: MASTERCLASS GAMIFICADA */}
          {activeSubTab === 'content' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/80 to-slate-900 border-2 border-indigo-500/30 shadow-xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2"><BrainCircuit className="w-6 h-6 text-indigo-400" /> Lección Interactiva</h2>
                  <p className="text-indigo-200 mt-1 text-xs sm:text-sm">Supera los retos de tu profesor para desbloquear el siguiente conocimiento.</p>
                </div>
                <button onClick={() => handleDownloadGuide()} className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Descargar PDF de Apoyo
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <InteractiveLessonView teacher={subject.teacher} student={currentStudent} dailyClass={currentClass} />
                </div>

                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4 sticky top-6 shadow-xl">
                    <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-700 pb-3"><Layers className="w-5 h-5 text-indigo-400" /><span>Recursos de Apoyo</span></h3>
                    {resourcesList.length > 0 && (
                      <div className="flex items-start gap-2 p-3 mb-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <p>Usa estos enlaces si necesitas ayuda extra para pasar los niveles.</p>
                      </div>
                    )}
                    <div className="space-y-3">
                      {resourcesList.length > 0 ? (
                        resourcesList.map((res: any) => (
                          <div key={res.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2 hover:border-slate-500 transition-all">
                            <div className="flex items-center justify-between"><span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{res.type}</span></div>
                            <h4 className="text-xs font-bold text-slate-200 line-clamp-2">{res.title}</h4>
                            {res.url && res.url !== '#' && <a href={forceSpanishUrl(res.type === 'video' ? getYouTubeWatchUrl(res.url, res.title) : res.url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 pt-1.5"><span>{res.type === 'video' ? 'Ver video' : 'Abrir recurso'}</span><ExternalLink className="w-3 h-3" /></a>}
                          </div>
                        ))
                      ) : (
                        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-700/60 text-xs text-slate-400 text-center italic">Material incluido en la Masterclass y la Guía.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: LABORATORIO Y SIMULADOR */}
          {activeSubTab === 'simulator' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-400" /><span>Laboratorio Interactivo</span>
                  </h3>
                  {currentClass.simulatorUrl && (
                    <a href={forceSpanishUrl(currentClass.simulatorUrl)} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      <span>Abrir en nueva pestaña</span><ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {currentClass.simulatorUrl ? (
                  <div className="w-full h-[350px] rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 relative shadow-inner">
                    <iframe src={forceSpanishUrl(currentClass.simulatorUrl)} title="Simulador Interactivo" className="w-full h-full border-0" allowFullScreen />
                  </div>
                ) : (
                  <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-700 flex flex-col items-center justify-center">
                    <Cpu className="w-12 h-12 text-slate-500 mb-3" />
                    <span className="text-sm font-bold text-slate-300">Esta lección no usa un simulador web.</span>
                    <p className="text-xs text-slate-400 mt-1">Los experimentos de hoy se realizan con materiales físicos.</p>
                  </div>
                )}
              </div>
              
              <ClassVideoPlayer
                currentClass={currentClass}
                subject={subject}
                onActivitySelect={(actId: string) => {
                  const act = currentClass.activities?.find((a: any) => a.id === actId);
                  if (act) setSelectedActivityForModal(act);
                }}
              />
            </div>
          )}

          {/* SUB-TAB 3: TALLER PRÁCTICO */}
          {activeSubTab === 'activities' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-6 shadow-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
                <div>
                  <div className="flex items-center gap-2"><ListTodo className="w-5 h-5 text-indigo-400" /><h3 className="text-lg font-bold text-white">Taller Práctico de la Lección</h3></div>
                  <p className="text-xs text-slate-400 mt-1">Actividades temáticas alineadas al camino progresivo de la Masterclass.</p>
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
                    const displayActCompleted = isReviewWeek ? false : act.completed;

                    return (
                      <div key={act.id} className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${displayActCompleted ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200' : 'bg-slate-900/80 border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-300'}`}>
                        <div className="flex items-start gap-3.5 flex-1 cursor-pointer" onClick={() => setSelectedActivityForModal(act)}>
                          <button type="button" onClick={(e) => { e.stopPropagation(); toggleActivityCompletion(currentClass.id, act.id); }} className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all text-xs font-bold ${displayActCompleted ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'border border-slate-600 bg-slate-800 text-slate-400 hover:border-indigo-400 hover:text-white'}`} title={displayActCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}>
                            {displayActCompleted ? '✓' : index + 1}
                          </button>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300">{act.title}</h4>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300">{act.type === 'practice' ? 'Práctica' : act.type === 'project' ? 'Proyecto' : act.type === 'reflection' ? 'Reflexión' : act.type === 'experiment' ? 'Experimento' : 'Evaluación'}</span>
                              {displayActCompleted && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completada</span>}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{act.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                          <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">+{act.points} pts</span>
                          <button type="button" onClick={() => setSelectedActivityForModal(act)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${displayActCompleted ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'}`}>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{displayActCompleted ? 'Ver / Editar' : 'Resolver ▶'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700 text-center space-y-2">
                    <ListTodo className="w-8 h-8 text-slate-500 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-300">Sin actividades adicionales</h4>
                    <p className="text-xs text-slate-500">Todo el taller se realizó dentro de la Masterclass Interactiva.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: GUÍA Y EVIDENCIAS */}
          {activeSubTab === 'homework' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4 flex flex-col justify-between shadow-lg">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Descargar Guía de la Clase</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Descarga tu hoja de trabajo con los ejercicios para imprimir o resolver digitalmente.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-indigo-300 break-all">
                    📄 {currentClass.guideTitle || 'Guia_Didactica_Clase.pdf'}
                  </div>
                </div>
                <div className="space-y-2">
                  <button onClick={() => handleDownloadGuide()} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /><span>Descargar PDF</span>
                  </button>
                  {downloadSuccess && <p className="text-xs text-emerald-400 text-center font-semibold animate-fade-in">✓ PDF descargado correctamente.</p>}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4 flex flex-col justify-between shadow-lg">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Subir Tarea / Evidencia</h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/80">
                    {currentClass.homeworkTask}
                  </p>
                  <p className="text-xs text-slate-400">
                    Sube la foto de tu libreta para que la IA y tu profesor {subject.teacher.name} evalúen tu razonamiento.
                  </p>
                </div>
                <button onClick={handleGoToSubmitWork} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" /><span>Entregar Trabajo</span>
                </button>
              </div>
            </div>
          )}

          {/* SUB-TAB 5: PAUSA SOCRÁTICA */}
          {activeSubTab === 'reflection' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2"><MessageSquareQuote className="w-5 h-5 text-indigo-400" /><span>Pausa Socrática de Cierre</span></h3>
                <p className="text-xs text-slate-400 mt-1">Reflexiona y debate estas preguntas con el profesor IA antes de dar por terminada la clase.</p>
              </div>

              {/* Integrated Socratic Pauses from learning path */}
              <div className="space-y-4">
                {currentClass.socraticPauses && currentClass.socraticPauses.length > 0 ? (
                  currentClass.socraticPauses.map((pause) => (
                    <div key={pause.id} className="p-5 rounded-2xl bg-violet-950/30 border border-violet-500/30 space-y-3 animate-fade-in">
                      <div className="flex items-center gap-2 text-xs font-bold text-violet-300"><HelpCircle className="w-4 h-4" /><span>Pausa Socrática</span></div>
                      <p className="text-sm text-slate-200 font-medium">"{pause.prompt}"</p>
                      {pause.followUpQuestion && (
                        <p className="text-xs text-violet-200 italic">"{pause.followUpQuestion}"</p>
                      )}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
                        <button onClick={() => handleAskSocraticTeacher(`Profesor, sobre esta pregunta: "${pause.prompt}". ¿Me puedes guiar para razonar la respuesta?`)} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                          <span>Debatir con el profesor IA</span><ArrowRight className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] text-slate-500">Reflexiona antes de avanzar: {pause.reflectionPrompt}</span>
                      </div>
                    </div>
                  ))
                ) : socraticQuestionsList.length > 0 ? (
                  socraticQuestionsList.map((q: string, idx: number) => (
                    <div key={idx} className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-300"><HelpCircle className="w-4 h-4 text-indigo-400" /><span>Pregunta de Reflexión #{idx + 1}</span></div>
                      <p className="text-sm text-slate-200 font-medium">"{q}"</p>
                      <button onClick={() => handleAskSocraticTeacher(`Profesor, sobre esta pregunta: "${q}". ¿Me puedes guiar para razonar la respuesta?`)} className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1">
                        <span>Debatir esta pregunta con el profesor IA</span><ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-800/40 border border-slate-700 text-sm text-slate-400 text-center">
                    Abre el chat con el profesor para que te plantee una pregunta sorpresa.
                  </div>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Reflexión Final del Día</span>
                <p className="text-xs text-slate-300 italic">"{currentClass.reflectionPrompt}"</p>
              </div>

              {/* Evidence criteria display */}
              {currentClass.evidenceCriteria && currentClass.evidenceCriteria.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Criterios de Evidencia</span>
                  <div className="space-y-2">
                    {currentClass.evidenceCriteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 text-xs font-black">
                          {criterion.weight}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-white">{criterion.criterion}</p>
                          <p className="text-[10px] text-slate-400">Evidencia: {criterion.indicator}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </>
      )}

      <ActivityDetailModal isOpen={Boolean(selectedActivityForModal)} onClose={() => setSelectedActivityForModal(null)} activity={selectedActivityForModal} dailyClass={currentClass} subject={subject} onToggleCompletion={toggleActivityCompletion} onAskTeacher={openTeacherDrawerWithContext} />
    </div>
  );
};