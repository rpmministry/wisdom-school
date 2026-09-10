import React, { useState } from 'react';
import { CONTACT_INFO, MAILTO_HREF, WHATSAPP_HREF } from '../../data/contactInfo';
import { Mail, MessageCircle, Headphones, ChevronUp, X, User } from 'lucide-react';

/**
 * Widget de contacto global para el "Modo Demo".
 * - Escritorio: píldora con efecto cristal en la esquina inferior derecha.
 * - Móvil: botón flotante compacto que despliega una tarjeta con los datos.
 * Es neutro (slate + backdrop-blur) para no chocar con el tema Snoopy/Mario.
 */
export const DemoContactWidget: React.FC = () => {
  // En escritorio arranca abierto; en móvil, colapsado en un solo botón.
  const [open, setOpen] = useState<boolean>(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(min-width: 768px)').matches
  );

  return (
    <div className="fixed z-40 right-3 sm:right-5 bottom-20 md:bottom-6 flex flex-col items-end gap-3 pointer-events-none">
      {/* Tarjeta de contacto */}
      {open && (
        <div className="pointer-events-auto w-[min(19rem,calc(100vw-1.5rem))] rounded-2xl border border-white/10 bg-slate-900/75 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-in">
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-300">
                Modo Demo activo
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Ocultar contacto"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2.5 px-2 py-1.5">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-indigo-300">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[9px] font-black uppercase tracking-wider text-slate-500">Asesor académico</span>
                <span className="block text-xs font-bold text-white truncate">{CONTACT_INFO.name}</span>
              </div>
            </div>

            <a
              href={MAILTO_HREF}
              className="flex items-center gap-2.5 px-2 py-2 rounded-xl border border-transparent hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-indigo-300 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                {CONTACT_INFO.email}
              </span>
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-2 py-2 rounded-xl border border-transparent hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors group"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-emerald-300 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                {CONTACT_INFO.whatsappDisplay}
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Píldora / botón flotante */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Contacto del Modo Demo"
        className="pointer-events-auto flex items-center gap-3 pl-2.5 pr-3 py-2 rounded-full border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-black/40 hover:bg-slate-800/80 hover:border-white/20 transition-all active:scale-95 group"
      >
        <span className="relative w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/30 to-emerald-500/30 border border-white/10 flex items-center justify-center text-white shrink-0">
          <Headphones className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight text-left">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Modo Prueba</span>
          <span className="text-xs font-bold text-white">Contáctame</span>
        </span>
        <ChevronUp
          className={`w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};

export default DemoContactWidget;
