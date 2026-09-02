import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import { AccountSettingsModal } from '../auth/AccountSettingsModal';
import {
  Lock,
  LogOut,
  ChevronDown,
  ShieldCheck,
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
  } = useSchool();

  // Paso 1: detectamos qué perfil está activo para aplicar el tema visual correcto (Avril o Gael).
  const isAvril = currentStudentId === 'avril';
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md text-slate-100 transition-colors duration-300 ${
      isAvril
        ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900'
        : 'bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">

        
        {/* Paso 2: la marca del colegio y el logo se mantienen visibles para reforzar identidad institucional. */}
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

        {/* Paso 3: el lado derecho muestra "Iniciar sesión de alumno" en la landing page. */}
        <div className="flex items-center gap-2.5">

          {/* Student Selector Switcher or Auth Badge */}
          {authenticatedStudentId && activeTab !== 'home' ? (
            <div className="relative flex items-center">
              {/* Active Student Dropdown Trigger */}
              <button
                type="button"
                onClick={() => openAuthModal(currentStudentId)}
                className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm text-xs font-medium transition-all duration-200"
                title="Perfil autenticado • Click para cambiar de cuenta"
              >
                <div className="relative">
                  <StudentAvatar studentId={currentStudent.id} name={currentStudent.name} size="xs" isActive={true} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-white font-semibold leading-tight">{currentStudent.name}</span>
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    ACTIVO
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* Compact Action Buttons */}
              <div className="flex items-center gap-1 ml-2">
                {/* Account Settings Button */}
                <button
                  type="button"
                  onClick={() => setSettingsModalOpen(true)}
                  className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/30 hover:border-slate-600/50 text-slate-400 hover:text-white transition-all duration-200"
                  title="Seguridad y contraseña"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>

                {/* Log Out Button */}
                <button
                  type="button"
                  onClick={logoutStudent}
                  className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-rose-950/30 border border-slate-700/30 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 transition-all duration-200"
                  title="Cerrar sesión de estudiante"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/30 transition-all transform hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
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
