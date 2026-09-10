import React from 'react';
import { SchoolLogo } from '../common/SchoolLogo';
import { CONTACT_INFO, MAILTO_HREF, WHATSAPP_HREF } from '../../data/contactInfo';
import { Mail, MessageCircle, User } from 'lucide-react';

/**
 * Pie de página institucional de Wisdom School.
 * Minimalista, se funde con el tema oscuro de la app y expone el contacto oficial.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-2 py-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Marca */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-1.5 flex items-center justify-center shadow-lg shadow-black/30">
              <SchoolLogo size="sm" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block font-extrabold text-base tracking-tight text-white">WISDOM SCHOOL</span>
              <span className="block text-xs text-slate-400">Plataforma Pedagógica &amp; Colegio Virtual</span>
            </div>
          </div>

          {/* Contacto oficial */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-bold text-slate-200">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              {CONTACT_INFO.name}
            </span>

            <a
              href={MAILTO_HREF}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 hover:text-white text-xs font-bold text-slate-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              {CONTACT_INFO.email}
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:text-white text-xs font-bold text-slate-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp: {CONTACT_INFO.whatsappDisplay}
            </a>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>Copyright © 2026 Wisdom School by RPM Ministry</span>
          <span className="font-mono">Año Lectivo 2026 - 2027</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
