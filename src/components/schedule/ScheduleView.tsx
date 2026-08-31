import React, { useState } from 'react';
import { useSchool, DayOfWeekName } from '../../context/SchoolContext';
import {
  CalendarDays,
  Clock,
  BookOpen,
  Sparkles,
  ArrowRight,
  Play,
  Coffee,
  CheckCircle2,
  Calendar,
  Layers,
  AlertTriangle,
  Award,
  BookMarked,
  FileText,
  Target,
  Users,
  Compass,
} from 'lucide-react';
import { AVRIL_SCHEDULE_SLOTS, GAEL_SCHEDULE_SLOTS } from '../../data/mockData';

export const ScheduleView: React.FC = () => {
  const {
    currentStudent,
    studentSchedule,
    setActiveTab,
    setActiveClass,
    todayClasses,
    allStudentClasses,
    classesList,
    setSelectedDayOfWeek,
    setActiveSubject,
    studentSubjects,
  } = useSchool();

  const [activeSubTab, setActiveSubTab] = useState<'horario' | 'cronograma' | 'proyectos'>('horario');
  const [selectedDay, setSelectedDay] = useState<'Todos' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes'>('Todos');

  const scheduleDays: { day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes'; date: string; isStart?: boolean }[] = [
    { day: 'Martes', date: '01 Sep', isStart: true },
    { day: 'Miércoles', date: '02 Sep' },
    { day: 'Jueves', date: '03 Sep' },
    { day: 'Viernes', date: '04 Sep' },
    { day: 'Lunes', date: '07 Sep' },
  ];

  const plan = currentStudent.academicPlan;
  const scheduleSlots = currentStudent.id === 'avril' ? AVRIL_SCHEDULE_SLOTS : GAEL_SCHEDULE_SLOTS;

  const handleOpenClass = (classId?: string, subjectId?: string) => {
    if (classId) {
      const cls = allStudentClasses.find((c) => c.id === classId) || classesList.find((c) => c.id === classId);
      if (cls) {
        setSelectedDayOfWeek(cls.dayOfWeek as DayOfWeekName);
        setActiveClass(cls);
        const sub = studentSubjects.find((s) => s.id === cls.subjectId);
        if (sub) setActiveSubject(sub);
      }
    } else if (subjectId) {
      const sub = studentSubjects.find((s) => s.id === subjectId);
      if (sub) setActiveSubject(sub);
      const firstSubCls = allStudentClasses.find((c) => c.subjectId === subjectId);
      if (firstSubCls) {
        setSelectedDayOfWeek(firstSubCls.dayOfWeek as DayOfWeekName);
        setActiveClass(firstSubCls);
      }
    }
    setActiveTab('classes');
  };

  const getSubjectColorBadge = (subjectName: string) => {
    if (subjectName === 'RECREO') return 'bg-slate-700/80 text-amber-300 border-slate-600';
    if (subjectName.includes('Matemáticas')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    if (subjectName.includes('Lengua')) return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    if (subjectName.includes('Ciencias Naturales')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (subjectName.includes('Estudios Sociales')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    if (subjectName.includes('Inglés')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    if (subjectName.includes('Software') || subjectName.includes('Prog.')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    if (subjectName.includes('Ciencias Políticas')) return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
    if (subjectName.includes('Admin') || subjectName.includes('Mkt')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    if (subjectName.includes('Relación con Dios')) return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
    if (subjectName.includes('Arte') || subjectName.includes('ECA')) return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30';
    if (subjectName.includes('Educación Física')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Official Grade and Metadata */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {plan.schoolYear}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {currentStudent.name} • {currentStudent.gradeLong}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Plan Escolar y Calendario Académico
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {plan.ministryStandard}. Enfoque pedagógico basado en {plan.evaluationModel.toLowerCase()}.
            </p>
          </div>

          {/* Quick Metrics Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto shrink-0">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-xl font-extrabold text-white block">{plan.workingDays}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Días Laborables</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-xl font-extrabold text-indigo-300 block">{plan.totalTrimesters}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Trimestres</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-xl font-extrabold text-amber-300 block">{plan.totalSubjects}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">Materias Totales</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-sm font-extrabold text-emerald-300 block truncate">
                {currentStudent.id === 'avril' ? '7.00 / 10' : 'Cualitativa'}
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400">
                {currentStudent.id === 'avril' ? 'Nota Mínima' : 'Portafolio'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('horario')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'horario'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Horario Semanal (08:00 - 12:00)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('cronograma')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'cronograma'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Cronograma Oficial 2026 - 2027</span>
        </button>

        <button
          onClick={() => setActiveSubTab('proyectos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeSubTab === 'proyectos'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Proyectos Interdisciplinarios</span>
        </button>
      </div>

      {/* TAB 1: HORARIO SEMANAL */}
      {activeSubTab === 'horario' && (
        <div className="space-y-6">
          
          {/* Header & Mode Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
                <Clock className="w-4 h-4" />
                <span>Jornada Intensiva: 08:00 - 12:00</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Distribución Semanal de Bloques
              </h2>
            </div>

            {/* Quick Day Filter */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
              <button
                onClick={() => setSelectedDay('Todos')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedDay === 'Todos'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tabla Completa
              </button>
              {scheduleDays.map(({ day, date, isStart }) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selectedDay === day
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{day}</span>
                  <span className="text-[10px] font-mono opacity-80">{date}</span>
                  {isStart && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>
              ))}
            </div>
          </div>

          {/* TABLA OFICIAL (Matching Page 4 of PDF exactly) */}
          {selectedDay === 'Todos' ? (
            <div className="overflow-x-auto rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/90 border-b border-slate-700 text-xs font-extrabold uppercase text-slate-300">
                    <th className="py-3.5 px-4 text-slate-400 w-32 border-r border-slate-700/60">Hora</th>
                    <th className="py-3.5 px-4 border-r border-slate-700/60">
                      <div>Lunes</div>
                      <div className="text-[10px] text-slate-400 font-normal font-mono normal-case">07 Sep</div>
                    </th>
                    <th className="py-3.5 px-4 border-r border-slate-700/60 bg-indigo-950/40">
                      <div className="flex items-center gap-1 text-indigo-300">
                        <span>Martes</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">1.er Día</span>
                      </div>
                      <div className="text-[10px] text-indigo-200 font-normal font-mono normal-case">01 Sep 2026</div>
                    </th>
                    <th className="py-3.5 px-4 border-r border-slate-700/60">
                      <div>Miércoles</div>
                      <div className="text-[10px] text-slate-400 font-normal font-mono normal-case">02 Sep</div>
                    </th>
                    <th className="py-3.5 px-4 border-r border-slate-700/60">
                      <div>Jueves</div>
                      <div className="text-[10px] text-slate-400 font-normal font-mono normal-case">03 Sep</div>
                    </th>
                    <th className="py-3.5 px-4">
                      <div>Viernes</div>
                      <div className="text-[10px] text-slate-400 font-normal font-mono normal-case">04 Sep</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {scheduleSlots.map((slot, index) => {
                    if (slot.isRecess) {
                      return (
                        <tr key={index} className="bg-amber-950/20 border-y border-amber-500/20">
                          <td className="py-2.5 px-4 font-mono font-bold text-amber-300 border-r border-slate-700/60">
                            {slot.timeRange}
                          </td>
                          <td colSpan={5} className="py-2.5 px-4 text-center">
                            <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-amber-300 tracking-wider">
                              <Coffee className="w-4 h-4 text-amber-400 animate-bounce" />
                              <span>☕ RECREO Y DESCANSO ACTIVO (09:30 - 10:00)</span>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-400 border-r border-slate-700/60 whitespace-nowrap bg-slate-800/20">
                          {slot.timeRange}
                        </td>
                        <td className="py-3 px-3 border-r border-slate-700/60">
                          <span className={`inline-block px-2.5 py-1 rounded-lg font-bold border text-[11px] ${getSubjectColorBadge(slot.Lunes)}`}>
                            {slot.Lunes}
                          </span>
                        </td>
                        <td className="py-3 px-3 border-r border-slate-700/60">
                          <span className={`inline-block px-2.5 py-1 rounded-lg font-bold border text-[11px] ${getSubjectColorBadge(slot.Martes)}`}>
                            {slot.Martes}
                          </span>
                        </td>
                        <td className="py-3 px-3 border-r border-slate-700/60">
                          <span className={`inline-block px-2.5 py-1 rounded-lg font-bold border text-[11px] ${getSubjectColorBadge(slot.Miércoles)}`}>
                            {slot.Miércoles}
                          </span>
                        </td>
                        <td className="py-3 px-3 border-r border-slate-700/60">
                          <span className={`inline-block px-2.5 py-1 rounded-lg font-bold border text-[11px] ${getSubjectColorBadge(slot.Jueves)}`}>
                            {slot.Jueves}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-block px-2.5 py-1 rounded-lg font-bold border text-[11px] ${getSubjectColorBadge(slot.Viernes)}`}>
                            {slot.Viernes}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              <div className="p-4 bg-slate-800/70 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Fin de la jornada escolar a las 12:00.</span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {plan.ministryStandard} | {plan.schoolYear}
                </span>
              </div>
            </div>
          ) : (
            /* Vista por Día Individual */
            <div className="max-w-xl mx-auto space-y-3">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-indigo-300 tracking-wider">Horario de</span>
                  <h3 className="text-lg font-bold text-white">{selectedDay}</h3>
                </div>
                {selectedDay === 'Martes' && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    PRIMER DÍA DE CLASES (01 SEP 2026)
                  </span>
                )}
                {selectedDay === 'Viernes' && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    JORNADA DE HOY
                  </span>
                )}
              </div>

              {studentSchedule
                .filter((s) => s.dayOfWeek === selectedDay)
                .map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => !entry.isRecess && handleOpenClass(entry.classId, entry.subjectId)}
                    className={`p-4 rounded-2xl border transition-all ${
                      entry.isRecess
                        ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                        : 'bg-slate-800/80 border-slate-700 hover:border-indigo-500/50 cursor-pointer shadow-sm group'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-400 font-mono font-medium">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        {entry.startTime} - {entry.endTime}
                      </span>
                      {entry.classId && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Clase Activa
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {entry.subjectName}
                      </h4>
                      {!entry.isRecess && (
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: CRONOGRAMA OFICIAL 2026 - 2027 */}
      {activeSubTab === 'cronograma' && (
        <div className="space-y-8">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Calendar className="w-4 h-4" />
              <span>Ministerio de Educación de Ecuador</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              Cronograma Oficial {plan.schoolYear}
            </h2>
            <p className="text-sm text-slate-400">
              Estructura trimestral de 200 días laborables con períodos de diagnóstico, desarrollo y evaluaciones de cierre.
            </p>
          </div>

          {/* Trimesters Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plan.trimesters.map((trim) => (
              <div
                key={trim.trimesterNumber}
                className={`p-6 rounded-3xl border flex flex-col justify-between space-y-6 relative overflow-hidden ${
                  trim.isCurrent
                    ? 'bg-slate-900 border-indigo-500/60 shadow-xl shadow-indigo-950/50 ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800 shadow-md'
                }`}
              >
                {trim.isCurrent && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-indigo-600 to-purple-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow">
                    Trimestre Activo
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                      {trim.trimesterNumber}.º TRIMESTRE
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {trim.title.split(':')[1] || trim.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {trim.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Inicio lectivo:</span>
                      <span className="font-semibold text-slate-200">{trim.startDate}</span>
                    </div>
                    {trim.notes && (
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-amber-300">
                        {trim.notes}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-indigo-300 tracking-wide block">
                    Fecha de Valoración:
                  </span>
                  <p className="text-xs font-bold text-white">
                    {trim.valuationDate}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Exámenes Supletorios / Refuerzo Pedagógico Alert */}
          <div className="p-6 rounded-3xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                Exámenes Supletorios y Refuerzo Pedagógico
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {plan.supletoriosPeriod}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Aplica según la normativa ministerial en caso de requerir nivelación o consolidación de destrezas con criterio de desempeño.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: PROYECTOS INTERDISCIPLINARIOS */}
      {activeSubTab === 'proyectos' && (
        <div className="space-y-8">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Award className="w-4 h-4" />
              <span>Evaluación Práctica y Significativa</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {currentStudent.id === 'avril'
                ? 'Proyectos Interdisciplinarios (Sin exámenes memorísticos)'
                : 'Proyectos Integrados de Aprendizaje'}
            </h2>
            <p className="text-sm text-slate-400">
              Proyectos prácticos integrados que evalúan el pensamiento crítico, la creatividad y la aplicación en el mundo real.
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-6">
            {plan.projects.map((proj) => (
              <div
                key={proj.id}
                className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                  proj.status === 'active'
                    ? 'bg-slate-900 border-indigo-500/60 shadow-xl ring-1 ring-indigo-500/40'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Trimestre {proj.trimesterNumber}
                      </span>
                      {proj.status === 'active' && (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          PROYECTO EN CURSO
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Proyecto: "{proj.title}"
                    </h3>
                  </div>

                  {/* Subjects Involved Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proj.subjectsInvolved.map((subName, i) => (
                      <span
                        key={i}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${getSubjectColorBadge(subName)}`}
                      >
                        {subName}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                  {proj.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4 text-indigo-400" />
                    <span>Entregables y Productos del Proyecto:</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {proj.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evaluation Criteria */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
                  <div>
                    <span className="font-bold text-slate-300">Criterio de Evaluación: </span>
                    <span>{proj.evaluationCriteria}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('classes')}
                    className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-semibold transition-all flex items-center gap-2"
                  >
                    <span>Ver Clases Vinculadas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
