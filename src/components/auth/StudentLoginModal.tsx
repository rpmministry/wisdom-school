import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import {
  Lock,
  KeyRound,
  Mail,
  CheckCircle,
  AlertCircle,
  X,
  UserCheck,
  Sparkles,
  Shield,
  ArrowRight,
  UserPlus,
  HelpCircle,
} from 'lucide-react';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetStudentId?: string;
  onOpenRegister?: () => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({
  isOpen,
  onClose,
  targetStudentId,
  onOpenRegister,
}) => {
  const { studentsList, loginStudent, currentStudentId, setCurrentStudentId, resetPasswordWithPin } = useSchool();

  const initialTarget = targetStudentId || currentStudentId || 'avril';
  const targetStudent = studentsList.find((s) => s.id === initialTarget) || studentsList[0];

  const [view, setView] = useState<'login' | 'forgot_password'>('login');
  const [loginMode, setLoginMode] = useState<'password' | 'pin'>('password');
  const [identifier, setIdentifier] = useState<string>(targetStudent?.email || '');
  const [password, setPassword] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDemoHint, setShowDemoHint] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSelectQuickStudent = (student: Student) => {
    setIdentifier(student.email || student.pinCode || student.id);
    setPassword(student.password || 'avril');
    setPinCode(student.pinCode || '');
    setErrorMsg(null);
    setView('login');
    setLoginMode('password');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const credInput = loginMode === 'password' ? identifier : pinCode;
    const secretInput = loginMode === 'password' ? password : pinCode;

    if (!credInput.trim()) {
      setErrorMsg(
        loginMode === 'password'
          ? 'Por favor ingresa tu correo electrónico o código de estudiante.'
          : 'Por favor ingresa tu código PIN de acceso.'
      );
      return;
    }

    const result = loginStudent(credInput, secretInput);
    if (result.success && result.student) {
      setSuccessMsg(`¡Bienvenido de nuevo, ${result.student.name}! Accediendo al aula...`);
      setTimeout(() => {
        onClose();
        setView('login');
      }, 700);
    } else {
      setErrorMsg(result.error || 'Credenciales incorrectas. Revisa tu correo, código PIN o contraseña.');
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!identifier.trim() || !pinCode.trim() || !newPassword.trim()) {
      setErrorMsg('Por favor llena todos los campos para restablecer tu contraseña.');
      return;
    }

    const result = resetPasswordWithPin(identifier, pinCode, newPassword);
    if (result.success) {
      setSuccessMsg('Tu contraseña ha sido actualizada correctamente. Inicia sesión ahora.');
      setTimeout(() => {
        setPassword('');
        setLoginMode('password');
        setView('login');
        setSuccessMsg(null);
      }, 2000);
    } else {
      setErrorMsg(result.error || 'Error al restablecer contraseña.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] text-slate-100">
        
        {/* Header decoration */}
        <div className="relative bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 border-b border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
                <Shield className="w-3 h-3" />
                <span>Acceso Privado Protegido</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Ingreso al Colegio Virtual
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            Ingresa con tus credenciales personales (correo y contraseña o código PIN) para acceder a tu perfil y aulas asignadas.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">

          {/* Quick Demo Credentials Helper */}
          {showDemoHint && (
            <div className="p-4 rounded-2xl bg-slate-800/90 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Credenciales de Prueba Rápida (Estudiantes de Muestra)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDemoHint(false)}
                  className="text-[10px] text-slate-400 hover:text-white underline"
                >
                  Ocultar
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleSelectQuickStudent(studentsList.find((s) => s.id === 'avril') || studentsList[0])}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-950/50 border border-indigo-500/30 text-left transition-colors flex items-center gap-2"
                >
                  <StudentAvatar studentId="avril" name="Avril" size="xs" />
                  <div className="overflow-hidden">
                    <p className="font-bold text-white truncate">Avril (8.º EGB)</p>
                    <p className="text-[10px] text-slate-400">PIN: <span className="font-mono text-indigo-300">AVR-2026</span></p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectQuickStudent(studentsList.find((s) => s.id === 'gael') || studentsList[1] || studentsList[0])}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-amber-950/50 border border-amber-500/30 text-left transition-colors flex items-center gap-2"
                >
                  <StudentAvatar studentId="gael" name="Gael" size="xs" />
                  <div className="overflow-hidden">
                    <p className="font-bold text-white truncate">Gael (4.º EGB)</p>
                    <p className="text-[10px] text-slate-400">PIN: <span className="font-mono text-amber-300">GAE-2026</span></p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Mode Switcher Tabs */}
          {view === 'login' && (
            <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setLoginMode('password');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  loginMode === 'password'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Correo y Contraseña</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMode('pin');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  loginMode === 'pin'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Código PIN de Alumno</span>
              </button>
            </div>
          )}

          {/* Alert Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          {view === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginMode === 'password' ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Correo Electrónico o Usuario</span>
                    </label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="ej. avril@wisdomschool.edu o gael@wisdomschool.edu"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Contraseña</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setView('forgot_password');
                          setErrorMsg(null);
                        }}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Código PIN Personalizado</span>
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value.toUpperCase())}
                    placeholder="ej. AVR-2026 o GAE-2026"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                  />
                  <p className="text-[11px] text-slate-400">
                    Ingresa el código alfa-numérico de 8 caracteres asignado durante tu inscripción.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-950/50 transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <UserCheck className="w-4 h-4" />
                <span>Ingresar al Colegio Virtual</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                <p>Usa tu Código PIN único de inscripción para restablecer tu contraseña. Si no lo recuerdas, comunícate con la administración.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Correo Electrónico o Usuario</span>
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ej. avril@wisdomschool.edu"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Tu Código PIN Único</span>
                </label>
                <input
                  type="text"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.toUpperCase())}
                  placeholder="ej. AVR-2026"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Nueva Contraseña</span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setErrorMsg(null);
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Guardar Nueva Contraseña</span>
                </button>
              </div>
            </form>
          )}

          {/* Footer note & link to admission for future students */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span>¿Nuevo estudiante?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenRegister) onOpenRegister();
              }}
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registrar e Inscribir Alumno Futuro</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
