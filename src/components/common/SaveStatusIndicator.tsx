import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

/**
 * Confirmación sutil y honesta de que el avance quedó guardado.
 * Solo aparece tras cambios reales de progreso (no en la carga inicial).
 */
export const SaveStatusIndicator: React.FC = () => {
  const { lastSavedAt } = useSchool();
  const mountRef = useRef(Date.now());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastSavedAt || lastSavedAt <= mountRef.current) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, [lastSavedAt]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-6 z-40 px-3 py-1.5 rounded-full bg-slate-900/95 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 shadow-lg"
    >
      <Check className="w-3.5 h-3.5" />
      <span>Guardado</span>
    </div>
  );
};

export default SaveStatusIndicator;
