import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import { AccountSettingsModal } from '../auth/AccountSettingsModal';
import {
  Sparkles,
  Bot,
  UserCheck,
  Lock,
  LogOut,
  ChevronDown,
  ShieldCheck,
  UserPlus,
  Settings,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    studentsList,
    currentStudent,
    currentStudentId,
    setCurrentStudentId,
    authenticatedStudentId,
    logoutStudent,
    openAuthModal,
    activeTab,
    setActiveTab,
    setIsTeacherDrawerOpen,
    activeSubject,
  } = useSchool();

  const isAvril = currentStudentId === 'avril';
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md text-slate-100 transition-colors duration-300 ${
      isAvril
        ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900'
        : 'bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">

        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className={`w-10 h-10 rounded-xl bg-slate-800/90 border p-1.5 shadow-md shadow-black/30 flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${
            isAvril ? 'border-indigo-500/40 group-hover:border-indigo-400' : 'border-amber-500/40 group-hover:border-amber-400'
          }`}>
            <SchoolLogo size="sm" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
                WISDOM SCHOOL
              </span>
              <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border shadow-sm ${
                isAvril
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {currentStudent.name} ({currentStudent.grade.split(' ')[0]})
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Plataforma Pedagógica & Colegio Virtual
            </p>
          </div>
        </div>

        {/* Center / Right Action Buttons */}
        <div className="flex items-center gap-2.5">

          {/* Quick AI Teacher Summon */}
          <button
            id="btn-open-ai-teacher"
            onClick={() => setIsTeacherDrawerOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] ${
              isAvril
                ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 hover:from-indigo-600/50 hover:to-purple-600/50 border-indigo-500/40 text-indigo-200'
                : 'bg-gradient-to-r from-amber-600/30 to-emerald-600/30 hover:from-amber-600/50 hover:to-emerald-600/50 border-amber-500/40 text-amber-200'
            }`}
            title="Abrir Profesor IA Socrático"
          >
            <Bot className={`w-4 h-4 animate-pulse ${isAvril ? 'text-indigo-400' : 'text-amber-400'}`} />
            <span className="hidden sm:inline">
              {activeSubject ? activeSubject.teacher.name : 'Profesor IA'}
            </span>
            <span className="inline sm:hidden">Profesor IA</span>
          </button>

          {/* Student Selector Switcher or Auth Badge */}
          {authenticatedStudentId ? (
            <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 shadow-inner">
              
              {/* Active Student Pill */}
              <button
                type="button"
                onClick={() => openAuthModal(currentStudentId)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-xs font-bold transition-all"
                title="Perfil autenticado • Click para cambiar de cuenta"
              >
                <StudentAvatar studentId={currentStudent.id} name={currentStudent.name} size="xs" />
                <span className="text-white hidden sm:inline">{currentStudent.name}</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="hidden md:inline">Acceso Activo</span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Account Settings Button */}
              <button
                type="button"
                onClick={() => setSettingsModalOpen(true)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-colors"
                title="Seguridad y contraseña"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Log Out Button */}
              <button
                type="button"
                onClick={logoutStudent}
                className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 transition-colors"
                title="Cerrar sesión de estudiante"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/50 transition-all transform hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Iniciar Sesión de Alumno</span>
            </button>
          )}

        </div>

      </div>

      <AccountSettingsModal 
        isOpen={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </header>
  );
};
