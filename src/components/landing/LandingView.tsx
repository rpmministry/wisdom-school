import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { NewStudentModal } from './NewStudentModal';
import { CurriculumLevelsSection } from './CurriculumLevelsSection';
import { AITeacherTryoutWidget } from './AITeacherTryoutWidget';
import {
  Sparkles,
  Bot,
  BrainCircuit,
  FileCheck2,
  CalendarCheck,
  Award,
  Compass,
  CheckCircle,
  Lightbulb,
  Camera,
  UserPlus,
  GraduationCap,
  Globe,
  Layers,
  Cpu,
  ShieldCheck,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  // Paso 1: leemos el estado de autenticación para decidir si el usuario ya está dentro de su espacio privado.
  const {
    authenticatedStudentId,
    openAuthModal,
    setActiveTab,
  } = useSchool();

  // Paso 2: controlamos el modal de inscripción para nuevos estudiantes desde la landing page pública.
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pt-0 pb-8">
      
      {/* Paso 3: el hero principal presenta la marca del colegio y el valor educativo de la plataforma en una sola primera vista. */}
      <section className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/20 px-6 py-6 sm:px-10 sm:py-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

<div className="relative z-10 space-y-4">
            
            {/* Paso 4: la primera fila incluye identidad institucional y acceso rápido a ingresar o registrar. */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-black/40 flex items-center justify-center">
                <SchoolLogo size="md" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Plataforma Pedagógica & Colegio Virtual Global</span>
                </div>
                <h2 className="text-xs text-slate-400 font-mono mt-0.5">Año Lectivo 2026 - 2027</h2>
              </div>
            </div>

            {/* Paso 5 + Auth Banner: dos columnas - contenido principal a la izquierda, banner de sesión a la derecha */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="max-w-5xl space-y-4 lg:max-w-2xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 shadow-[0_0_25px_rgba(99,102,241,0.12)] backdrop-blur-sm">
                  <SchoolLogo size="sm" className="w-8 h-8 object-contain" />
                  <span className="text-sm sm:text-base font-black uppercase tracking-[0.28em] text-indigo-100">WISDOM SCHOOL</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-indigo-300/80">Colegio Virtual • Plataforma Pedagógica</p>
                  <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.06em] text-white leading-[0.9]">
                    Una plataforma pedagógica <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-300">inteligente y adaptativa</span>
                  </h1>
                </div>

                <p className="max-w-3xl text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
                  Diseñada para la formación integral en homeschooling y aulas virtuales. Acompaña a cada estudiante desde la educación inicial hasta el bachillerato con microcurrículo estructurado día a día, profesores virtuales socráticos y evaluación por evidencias sin exámenes memorísticos.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => setAdmissionModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-amber-950/50 transition-all hover:scale-[1.02]"
                  >
                    <UserPlus className="w-4 h-4" />
                    Registrar Nuevo Estudiante
                  </button>
                </div>
              </div>

              {/* Active Session Banner - moved to the right of title/subtitle when authenticated */}
              {authenticatedStudentId && (
                <div className="lg:w-80 lg:flex-shrink-0 w-full">
                  <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 flex flex-col items-start justify-center gap-4 shadow-xl min-h-[180px]">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                          <span>Sesión Autenticada Activa</span>
                        </div>
                        <h3 className="text-lg font-extrabold text-white">
                          ¡Bienvenido/a de nuevo!
                        </h3>
                        <p className="text-[11px] text-slate-300">
                          Has ingresado a tu perfil privado. Accede directamente a tus materias y aula virtual.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full pt-2 border-t border-emerald-500/20">
                      <button
                        onClick={() => setActiveTab('space')}
                        className="flex-1 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 transform hover:scale-105"
                      >
                        <span>Ir a mi Espacio Educativo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => openAuthModal()}
                        className="px-3 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors whitespace-nowrap"
                      >
                        Cambiar Cuenta
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Paso 6: estas cuatro tarjetas resumen de un vistazo el valor de la plataforma y su alcance curricular. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
            {[
              { label: 'Currículo Adaptativo', value: '3 a 18 años', icon: GraduationCap, color: 'text-indigo-400' },
              { label: 'Microcurrículo Diario', value: '200 Días Lectivos', icon: CalendarCheck, color: 'text-amber-400' },
              { label: 'Tutoría Pedagógica', value: 'IA Socrática 24/7', icon: Bot, color: 'text-emerald-400' },
              { label: 'Evaluación Formativa', value: 'Portafolio & Tareas', icon: FileCheck2, color: 'text-purple-400' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3.5 shadow-[0_10px_30px_rgba(15,23,42,0.22)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/90 border border-slate-700">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">{stat.label}</span>
                  </div>
                  <p className="text-base font-extrabold text-white leading-tight">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Paso 7: zona de acceso privado solo para usuarios no autenticados (el banner autenticado ya está arriba a la derecha) */}
          {!authenticatedStudentId && (
            <div className="pt-6 border-t border-slate-800/80">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      Acceso Privado al Aula Virtual
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Por motivos de seguridad y privacidad estudiantil, los perfiles de los alumnos inscritos no se muestran de manera pública. Ingrese con sus credenciales personales (correo electrónico o código PIN) para ingresar a su espacio educativo.
                    </p>
                  </div>
                  <button
                    onClick={() => openAuthModal()}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-950/50 transition-all flex items-center gap-2 transform hover:scale-105"
                  >
                    <Lock className="w-4 h-4" />
                    Iniciar Sesión de Alumno
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 📚 CURRICULUM LEVELS & GRADE ADAPTABILITY SECTION */}
      <CurriculumLevelsSection />

      {/* 🤖 LIVE DEMO OF SOCRATIC AI TEACHER */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Motor de Resiliencia IA de Doble Capa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interacción Socrática en Tiempo Real
          </h2>
          <p className="text-sm text-slate-300">
            Los profesores virtuales de Wisdom School utilizan el Método Socrático para formular preguntas guiadas y pistas progresivas en lugar de regalar respuestas mecánicas.
          </p>
        </div>

        <AITeacherTryoutWidget />
      </section>

      {/* 🏛️ CORE PEDAGOGICAL PILLARS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Pilares de la Plataforma Wisdom School</h2>
          <p className="text-sm text-slate-400">
            Un ecosistema integral diseñado para cultivar el pensamiento autónomo, la disciplina de estudio y el amor por el aprendizaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Profesores IA Socráticos</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Cada asignatura cuenta con un tutor virtual adaptado a la edad del alumno. Guía paso a paso con preguntas razonadas, explicaciones fonéticas para inglés y ejemplos contextualizados.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-inner">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Microcurrículo Estructurado</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Planificación anual dividida día a día en 3 trimestres con lecturas vivas, recursos PhET interactivas, videos instructivos y guías de trabajo listas para imprimir o resolver digitalmente.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-inner">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Análisis Formativo por Evidencias</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Los estudiantes suben fotos o archivos de sus cuadernos y tareas. La IA evalúa la precisión, felicita los aciertos y señala errores conceptuales de forma constructiva.
            </p>
          </div>

        </div>
      </section>

      {/* MODALS */}
      {admissionModalOpen && (
        <NewStudentModal
          isOpen={admissionModalOpen}
          onClose={() => setAdmissionModalOpen(false)}
        />
      )}

    </div>
  );
};
