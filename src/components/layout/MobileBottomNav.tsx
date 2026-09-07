import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NavigationTab } from '../../types';
import {
  Home,
  User,
  BookMarked,
  PlayCircle,
  FileCheck2,
  TrendingUp,
  CalendarDays,
  ListTodo,
  ArrowLeft,
  ChevronLeft,
} from 'lucide-react';

interface MobileBottomNavProps {
  onBack?: () => void;
  onHome?: () => void;
  showBackButton?: boolean;
  backLabel?: string;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onBack,
  onHome,
  showBackButton = true,
  backLabel = 'Retroceder',
}) => {
  const { activeTab, setActiveTab, navigateBack, navigateToHome, navigationHistory, todayClasses, submissions, currentStudent } = useSchool();

  const canGoBack = navigationHistory.length > 0;

  const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'space', label: 'Espacio', icon: User },
    { id: 'subjects', label: 'Materias', icon: BookMarked },
    { id: 'classes', label: 'Clases', icon: PlayCircle, badge: todayClasses.length > 0 ? todayClasses.length.toString() : undefined },
    { id: 'activities', label: 'Actividades', icon: ListTodo },
    { id: 'works', label: 'Trabajos', icon: FileCheck2, badge: submissions.filter(s => s.studentId === currentStudent.id && s.status === 'reviewed').length > 0 ? '✓' : undefined },
    { id: 'progress', label: 'Progreso', icon: TrendingUp },
    { id: 'schedule', label: 'Horario', icon: CalendarDays },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-md border-t border-slate-800 pb-safe" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around px-1 py-1.5 overflow-x-auto scrollbar-none">
        {/* Botón de Retroceso (si aplica) */}
        {showBackButton && canGoBack && activeTab !== 'home' && (
          <button
            onClick={onBack || navigateBack}
            disabled={!canGoBack}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-colors min-w-[44px] ${
              canGoBack
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-[9px] font-medium">{backLabel}</span>
          </button>
        )}

        {/* Navegación principal - todas las pestañas */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[44px] relative ${
                isActive
                  ? 'text-indigo-400 bg-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-amber-500 text-[9px] font-black text-slate-950 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-medium ${isActive ? 'text-indigo-400 font-bold' : ''}`}>
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