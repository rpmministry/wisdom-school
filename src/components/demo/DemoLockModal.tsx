import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CONTACT_INFO, MAILTO_HREF, WHATSAPP_HREF } from '../../data/contactInfo';
import { Lock, Sparkles, UserPlus, X, Mail, MessageCircle, User } from 'lucide-react';

interface DemoLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

/**
 * "Candado Demo": se muestra cuando un perfil de prueba (Karen o Mauricio)
 * intenta completar la clase o avanzar en el plan de estudios.
 * La interacción con la IA es libre, pero el progreso no se desbloquea.
 */
export const DemoLockModal: React.FC<DemoLockModalProps> = ({ isOpen, onClose, onRegister }) => {
  const { currentStudent } = useSchool();

  if (!isOpen) return null;

  const isAvril = currentStudent.id === 'avril' || currentStudent.id === 'karen';

  const accentBadge = isAvril
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    : 'bg-red-500/20 text-red-300 border-red-500/40';
  const accentButton = isAvril
    ? 'from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950'
    : 'from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white';
  const accentIcon = isAvril
    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
    : 'bg-red-500/15 border-red-500/40 text-red-300';
  const accentLink = isAvril
    ? 'hover:border-amber-400/60 hover:bg-amber-500/10'
    : 'hover:border-red-400/60 hover:bg-red-500/10';
  const accentLinkIcon = isAvril ? 'text-amber-400' : 'text-red-400';
  const worldLabel = isAvril ? '🐶 Mundo Snoopy' : '🍄 Mundo Mario';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden bg-slate-900 ${
        isAvril ? 'border-amber-500/40' : 'border-red-500/40'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`p-6 sm:p-8 bg-gradient-to-br max-h-[90vh] overflow-y-auto overscroll-contain ${
          isAvril ? 'from-amber-950/60 via-slate-900 to-slate-900' : 'from-red-950/60 via-slate-900 to-slate-900'
        }`}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center ${accentIcon}`}>
              <Lock className="w-8 h-8" />
            </div>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-wider ${accentBadge}`}>
              <Sparkles className="w-3.5 h-3.5" />
              Modo Demo · {worldLabel}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              ¡Excelente trabajo, {currentStudent.name}!
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
              Has completado la clase de prueba. Para continuar aprendiendo y desbloquear el plan de estudios
              completo, contáctanos:
            </p>
          </div>

          {/* Datos de contacto oficiales */}
          <div className="mt-6 space-y-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 ${accentLinkIcon}`}>
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Asesor académico</span>
                <span className="block text-sm font-bold text-white truncate">{CONTACT_INFO.name}</span>
              </div>
            </div>

            <a
              href={MAILTO_HREF}
              className={`p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 transition-colors ${accentLink}`}
            >
              <div className={`w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 ${accentLinkIcon}`}>
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Correo</span>
                <span className="block text-sm font-bold text-white truncate">{CONTACT_INFO.email}</span>
              </div>
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 transition-colors ${accentLink}`}
            >
              <div className={`w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 ${accentLinkIcon}`}>
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">WhatsApp</span>
                <span className="block text-sm font-bold text-white">{CONTACT_INFO.whatsappDisplay}</span>
              </div>
            </a>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRegister}
              className={`flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r font-black text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${accentButton}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrarme ahora</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-sm transition-colors"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLockModal;
