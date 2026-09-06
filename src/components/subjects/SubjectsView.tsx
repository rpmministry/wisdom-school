import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Subject, CurriculumUnit, MicrocurriculumItem, DailyClass } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import {
  BookMarked,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ChevronRight,
  Play,
  ArrowRight,
  MessageSquare,
  Award,
  ExternalLink,
  HelpCircle,
  Activity,
  Compass,
  FileCheck,
  Search,
  Filter,
} from 'lucide-react';

export const SubjectsView: React.FC = () => {
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
    studentSubjects,
    activeSubject,
    setActiveSubject,
    setActiveTab,
    setActiveClass,
    todayClasses,
    openTeacherDrawerWithContext,
    currentStudent,
  } = useSchool();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    activeSubject?.id || studentSubjects[0]?.id || ''
  );
  const [viewMode, setViewMode] = useState<'micro' | 'macro'>('micro');
  const [searchFilter, setSearchFilter] = useState('');

  const selectedSubject =
    studentSubjects.find((s: any) => s.id === selectedSubjectId) || studentSubjects[0];

  const handleSelectMicroClass = (item: MicrocurriculumItem) => {
    const matchingClass = todayClasses.find((c: any) => c.id === item.classId);
    if (matchingClass) {
      setActiveClass(matchingClass);
      setActiveSubject(selectedSubject);
      setActiveTab('classes');
    } else {
      // Build a full DailyClass matching the interface
      const syntheticClass: DailyClass = {
        id: item.classId,
        subjectId: selectedSubject.id,
        studentId: currentStudent.id,
        date: item.date || '2026-09-01',
        dayOfWeek: item.teachingDay || 'Lunes',
        unit: `Unidad Curricular - ${selectedSubject.name}`,
        theme: item.theme,
        objective: item.objective || 'Desarrollar el razonamiento conceptual y la comprensión del tema.',
        introduction: `En esta sesión de ${selectedSubject.name}, abordaremos "${item.theme}" mediante el método socrático e indagación activa.`,
        reading: item.dynamicActivity
          ? `Objetivo Pedagógico:\n${item.objective || item.theme}\n\nActividad y Reto Dinámico:\n${item.dynamicActivity}`
          : `Exploración y desarrollo conceptual guiado para ${item.theme}.`,
        videoUrl: item.verifiedResource?.url?.includes('youtube')
          ? item.verifiedResource.url
          : undefined,
        simulatorUrl:
          item.verifiedResource?.url?.includes('phet') ||
          item.verifiedResource?.url?.includes('scratch') ||
          item.verifiedResource?.url?.includes('mathigon')
            ? item.verifiedResource.url
            : undefined,
        socraticQuestions: item.socraticQuestion
          ? [
              item.socraticQuestion,
              '¿Cómo aplicarías este conocimiento a una situación cotidiana o de tu entorno?',
              '¿Qué patrón o regla lógica puedes deducir de lo observado?',
            ]
          : [
              '¿Qué observas al reflexionar sobre este concepto?',
              '¿Por qué consideras que este proceso funciona de esta manera?',
            ],
        resources: item.verifiedResource
          ? [
              {
                id: `res-${item.id}`,
                type: 'simulator',
                title:
                  item.verifiedResource.title ||
                  item.verifiedResource.name ||
                  `Recurso Educativo: ${item.theme}`,
                url: item.verifiedResource.url,
                description:
                  item.verifiedResource.description ||
                  'Herramienta interactiva y material didáctico para la clase.',
                order: 1,
              },
            ]
          : [],
        activities: [
          {
            id: `act-${item.id}-1`,
            title: 'Exploración e Indagación Inicial',
            description:
              item.socraticQuestion ||
              'Analiza el problema inicial y formula una hipótesis en tu libreta.',
            type: 'reflection',
            points: 10,
            completed: item.status === 'completed',
          },
          {
            id: `act-${item.id}-2`,
            title: 'Desarrollo Práctico / Proyecto',
            description:
              item.dynamicActivity ||
              'Aplica lo aprendido realizando los ejercicios o el diseño práctico de la sesión.',
            type: 'practice',
            points: 15,
            completed: item.status === 'completed',
          },
        ],
        guideTitle: `Guia_${selectedSubject.code}_Dia_${item.dayNumber}.pdf`,
        homeworkTask: `Elabora en tu libreta de evidencias o bitácora digital la resolución de los retos planteados para "${item.theme}". Documenta tus conclusiones.`,
        reflectionPrompt:
          item.socraticQuestion ||
          '¿De qué forma lo que aprendiste hoy transforma tu comprensión del entorno?',
        isCompleted: item.status === 'completed',
      };
      setActiveClass(syntheticClass);
      setActiveSubject(selectedSubject);
      setActiveTab('classes');
    }
  };

  // Prevenir errores de hidratación y cálculos sin montar
  if (!isMounted) return null;

  // Intercepción de los valores visuales por Semana de Repaso
  const displayClassesCompleted = isReviewWeek ? 0 : selectedSubject?.classesCompleted || 0;
  const displayProgressPercentage = isReviewWeek ? 0 : selectedSubject?.progressPercentage || 0;

  return (
    <div className="space-y-8">
      
      <PageHeader title={isReviewWeek ? `Materias de ${currentStudent.name} (Modo Repaso)` : `Materias de ${currentStudent.name}`} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <BookMarked className="w-4 h-4" />
            <span>Plan de Estudios & Microcurrículo Oficial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Materias de {currentStudent.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isReviewWeek 
              ? "Semana de repaso activa. El registro de avance curricular oficial comenzará el 7 de septiembre." 
              : "Currículo oficial 2026-2027 adaptado con enfoque socrático, ABP y recursos verificados día a día."}
          </p>
        </div>

        {selectedSubject && (
          <button
            onClick={() => openTeacherDrawerWithContext(selectedSubject)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold transition-all self-start"
          >
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Consultar con {selectedSubject.teacher.name}</span>
          </button>
        )}
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {studentSubjects.map((sub: any) => {
          const isSelected = sub.id === selectedSubject?.id;
          const displayTabProgress = isReviewWeek ? 0 : sub.progressPercentage;

          return (
            <button
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setActiveSubject(sub);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition-all border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700/60'
              }`}
            >
              <img
                src={sub.teacher.avatar}
                alt={sub.teacher.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{sub.name}</span>
              <span className="text-[10px] opacity-75">({displayTabProgress}%)</span>
            </button>
          );
        })}
      </div>

      {/* Main Subject Detail Container */}
      {selectedSubject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Microcurriculum & Units */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Subject Overview Card */}
            <div className="p-6 rounded-3xl bg-slate-800/70 border border-slate-700/80 space-y-4 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                    Código: {selectedSubject.code}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-0.5">
                    {selectedSubject.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{selectedSubject.scheduleTime}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedSubject.description}
              </p>

              {/* View Mode Toggle: Micro vs Macro */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-700/60">
                <button
                  onClick={() => setViewMode('micro')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    viewMode === 'micro'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Microcurrículo Día a Día ({(selectedSubject.units || []).reduce((acc: number, u: any) => acc + (u.microcurriculum?.length || 0), 0)} Clases)</span>
                </button>
                {selectedSubject.macroCurriculum && (
                  <button
                    onClick={() => setViewMode('macro')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      viewMode === 'macro'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Macrocurrículo Anual (3 Trimestres)</span>
                  </button>
                )}
              </div>

              {/* Progress Summary */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Avance Curricular: <strong>{displayClassesCompleted}</strong> de <strong>{selectedSubject.totalClasses}</strong> completadas
                  </span>
                  <span className="font-bold text-indigo-400">{displayProgressPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${displayProgressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* If Macrocurriculum view is active */}
            {viewMode === 'macro' && selectedSubject.macroCurriculum && (
              <div className="space-y-6">
                
                {/* General Competency */}
                <div className="p-6 rounded-3xl bg-slate-800/70 border border-slate-700/80 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wide">
                    <Award className="w-4 h-4" />
                    <span>Competencia General / Perfil de Salida</span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {selectedSubject.macroCurriculum.generalCompetency || selectedSubject.macroCurriculum.pedagogicalDirective}
                  </p>
                  <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                    <strong>Enfoque Pedagógico:</strong> {selectedSubject.macroCurriculum.methodologicalApproach || selectedSubject.macroCurriculum.methodology}
                  </div>
                </div>

                {/* 3 Trimesters */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Desglose por Trimestres (Año Lectivo 2026-2027)</span>
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {(selectedSubject.macroCurriculum.trimesters || selectedSubject.macroCurriculum.trimestersOverview || []).map((tri: any) => (
                      <div
                        key={tri.trimesterNumber}
                        className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
                            Trimestre {tri.trimesterNumber}
                          </span>
                          <span className="text-xs text-slate-400">{tri.durationWeeks || 14} Semanas</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{tri.title}</h4>
                        
                        <div className="space-y-2 text-xs">
                          {tri.guidingSocraticQuestion && (
                            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/40 text-slate-300">
                              <span className="font-bold text-indigo-300 block mb-0.5">Pregunta Orientadora Socrática:</span>
                              "{tri.guidingSocraticQuestion}"
                            </div>
                          )}
                          <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30">
                              <span className="font-bold text-slate-400 block mb-0.5 text-[11px]">PROYECTO INTEGRADOR</span>
                              <span className="text-slate-200 font-medium">{tri.integrativeProject || tri.projectIntegration}</span>
                            </div>
                            <div className="flex-1 p-3 rounded-xl bg-slate-900/40 border border-slate-700/30">
                              <span className="font-bold text-slate-400 block mb-0.5 text-[11px]">PRODUCTO EVALUATIVO</span>
                              <span className="text-emerald-300 font-medium">{tri.evaluativeDeliverable || tri.learningAxis}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* If Microcurriculum view is active */}
            {viewMode === 'micro' && (
              <div className="space-y-4">
                
                {/* Search Bar */}
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-800/60 border border-slate-700/60">
                  <Search className="w-4 h-4 text-slate-400 ml-2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Buscar por tema, pregunta socrática o actividad..."
                    className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {(selectedSubject.units || []).length > 0 ? (
                  (selectedSubject.units || []).map((unit: any) => {
                    const filteredItems = (unit.microcurriculum || []).filter(
                      (item: any) => {
                        const target = `${item.theme || ''} ${item.objective || ''} ${item.socraticQuestion || ''} ${item.dynamicActivity || ''}`.toLowerCase();
                        return target.includes(searchFilter.toLowerCase());
                      }
                    );

                    if (filteredItems.length === 0 && searchFilter) return null;

                    return (
                      <div
                        key={unit.id}
                        className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase text-indigo-400">
                              Unidad {unit.unitNumber} ({unit.durationWeeks} semanas)
                            </span>
                            <h4 className="text-base font-bold text-white">{unit.title}</h4>
                            <p className="text-xs text-slate-400 mt-1">{unit.description}</p>
                          </div>
                        </div>

                        {/* Microcurriculum Days Detailed Cards */}
                        <div className="space-y-3 pt-2 border-t border-slate-700/40">
                          {filteredItems.map((dayItem: any) => {
                            const isTodayClass = todayClasses.some((c: any) => c.id === dayItem.classId);
                            // Interceptar estado de la clase por semana de repaso
                            const displayStatusCompleted = isReviewWeek ? false : dayItem.status === 'completed';

                            return (
                              <div
                                key={dayItem.id}
                                className={`p-4 rounded-2xl border space-y-3 transition-all ${
                                  isTodayClass
                                    ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md'
                                    : 'bg-slate-900/60 border-slate-700/50 hover:border-slate-600'
                                }`}
                              >
                                {/* Day Top Header */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2.5">
                                    <span
                                      className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                        displayStatusCompleted
                                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                          : isTodayClass
                                          ? 'bg-indigo-500 text-white shadow'
                                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                                      }`}
                                    >
                                      {displayStatusCompleted ? '✓ Completada' : `Día ${dayItem.dayNumber}`}
                                    </span>
                                    <span className="text-xs text-slate-400">{dayItem.date}</span>
                                    {isTodayClass && (
                                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                                        CLASE DE HOY
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    onClick={() => handleSelectMicroClass(dayItem)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                                      isTodayClass
                                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                    }`}
                                  >
                                    <Play className="w-3 h-3 fill-current" />
                                    <span>Abrir Clase</span>
                                  </button>
                                </div>

                                {/* Theme & Objective */}
                                <div>
                                  <h5 className="text-sm font-bold text-white">
                                    {dayItem.theme}
                                  </h5>
                                  <p className="text-xs text-slate-300 mt-1">
                                    <strong>Objetivo:</strong> {dayItem.objective}
                                  </p>
                                </div>

                                {/* Socratic Question Box */}
                                {dayItem.socraticQuestion && (
                                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-2.5 text-xs text-indigo-200">
                                    <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-bold block text-indigo-300">Detonante Socrático de Apertura:</span>
                                      "{dayItem.socraticQuestion}"
                                    </div>
                                  </div>
                                )}

                                {/* Dynamic Activity & Resource */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                  {dayItem.dynamicActivity && (
                                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                                      <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] uppercase tracking-wide">
                                        <Activity className="w-3.5 h-3.5" />
                                        <span>Actividad Dinámica</span>
                                      </div>
                                      <p className="text-slate-300 text-xs line-clamp-2">{dayItem.dynamicActivity}</p>
                                    </div>
                                  )}

                                  {dayItem.verifiedResource && (
                                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 space-y-1">
                                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wide">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span>Recurso Verificado{dayItem.verifiedResource.type ? `: ${dayItem.verifiedResource.type}` : ''}</span>
                                      </div>
                                      <p className="text-slate-200 font-semibold text-xs truncate">
                                        {dayItem.verifiedResource.name || dayItem.verifiedResource.title || 'Recurso didáctico'}
                                      </p>
                                    </div>
                                  )}
                                </div>

                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/40 text-center text-slate-400 text-xs">
                    Próximamente se publicará el microcurrículo detallado de esta materia.
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column: Virtual Teacher Profile */}
          <div className="space-y-6">
            
            {/* Teacher Profile Card */}
            <div className="p-6 rounded-3xl bg-slate-800/70 border border-slate-700/80 space-y-5 shadow-md sticky top-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Bot className="w-4 h-4" />
                <span>Profesor Virtual Especializado</span>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={selectedSubject.teacher.avatar}
                  alt={selectedSubject.teacher.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40 shadow-lg"
                />
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedSubject.teacher.name}
                  </h3>
                  <p className="text-xs text-indigo-300 font-medium">{selectedSubject.teacher.title}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {selectedSubject.teacher.specialty}
                  </span>
                </div>
              </div>

              {/* Speech bubble welcome */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed italic">
                "{selectedSubject.teacher.welcomeMessage}"
              </div>

              {/* Teacher Pedagogy Specs */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-300 block mb-1">Personalidad Pedagógica:</span>
                  <p className="text-slate-400">{selectedSubject.teacher.personality}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-300 block mb-1">Enfoque Didáctico:</span>
                  <p className="text-slate-400">{selectedSubject.teacher.pedagogicalStyle}</p>
                </div>
              </div>

              <button
                onClick={() => openTeacherDrawerWithContext(selectedSubject)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir Tutoría Socrática</span>
              </button>

              {/* Quick Socratic Tip */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Metodología Socrática</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El profesor IA de {selectedSubject.name} guía a {currentStudent.name} con preguntas detonantes, retos activos y cero memorización de planas.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};