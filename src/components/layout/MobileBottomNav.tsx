import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NavigationTab } from '../../types';
import { isNavItemActive } from '../../utils/navigation';
import {
  LayoutDashboard,
  BookMarked,
  CalendarDays,
  TrendingUp,
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  fullLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, todayClasses, currentStudent } = useSchool();

  // Tema visual dinámico: Snoopy (ámbar) para Avril/Karen, Mario (rojo) para Gael.
  const isAvril = currentStudent.id === 'avril' || currentStudent.id === 'karen';

  // Mapa de sitio unificado: "Mi Espacio de Estudio" absorbe "Clases del Día" y
  // "Actividades" ya no existe como pestaña (vive dentro de cada clase).
  const navItems: NavItem[] = [
    {
      id: 'space',
      label: 'Mi Espacio',
      fullLabel: 'Mi Espacio de Estudio',
      icon: LayoutDashboard,
      badge: todayClasses.length > 0 ? todayClasses.length.toString() : undefined,
    },
    { id: 'subjects', label: 'Materias', icon: BookMarked },
    { id: 'schedule', label: 'Horario', icon: CalendarDays },
    { id: 'progress', label: 'Progreso', icon: TrendingUp },
  ];

  const activeClasses = isAvril
    ? 'text-amber-300 bg-amber-500/15 border-amber-500/40'
    : 'text-red-300 bg-red-500/15 border-red-500/40';

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-md border-t border-slate-800 pb-safe" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around px-1 py-1 overflow-x-auto scrollbar-none touch-scroll-x">
        {/* Navegación principal unificada (el "atrás" vive solo en el PageHeader). */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(item.id, activeTab);
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.fullLabel || item.label}
              aria-label={item.fullLabel || item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[56px] min-h-[52px] relative border ${
                isActive
                  ? `${activeClasses} font-bold`
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-black flex items-center justify-center ${
                      isAvril ? 'bg-amber-500 text-slate-950' : 'bg-red-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
