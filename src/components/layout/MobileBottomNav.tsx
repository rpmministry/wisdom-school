import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NavigationTab } from '../../types';
import {
  Home,
  ChevronLeft,
  ArrowLeft,
} from 'lucide-react';

interface MobileBottomNavProps {
  onBack?: () => void;
  onHome?: () => void;
  showBackButton?: boolean;
  backLabel?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onBack,
  onHome,
  showBackButton = true,
  backLabel = 'Retroceder',
}) => {
  const { activeTab, navigateBack, navigateToHome, navigationHistory } = useSchool();

  const canGoBack = navigationHistory.length > 0;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
      <div className="flex items-center justify-around px-2 py-2">
        {/* Botón de Retroceso */}
        {showBackButton && canGoBack && (
          <button
            onClick={onBack || navigateBack}
            disabled={!canGoBack}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
              canGoBack
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[10px] font-medium">{backLabel}</span>
          </button>
        )}

        {/* Botón de Home */}
        <button
          onClick={onHome || navigateToHome}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
            activeTab === 'home'
              ? 'text-indigo-400 bg-indigo-500/10'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Inicio</span>
        </button>

        {/* Espaciador para balancear el layout */}
        <div className="w-12" />
      </div>
    </div>
  );
};

export default MobileBottomNav;