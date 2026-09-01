import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Home,
  ChevronLeft,
  ArrowLeft,
} from 'lucide-react';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  backLabel?: string;
  showHomeButton?: boolean;
  homeLabel?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  backLabel = 'Retroceder',
  showHomeButton = true,
  homeLabel = 'Inicio',
  rightContent,
  className = '',
}) => {
  const { navigateBack, navigateToHome, navigationHistory, activeTab } = useSchool();
  const canGoBack = navigationHistory.length > 0;

  return (
    <div className={`sticky top-0 z-20 backdrop-blur-md bg-slate-900/95 border-b border-slate-800 ${className}`}>
      <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Botón de Retroceso */}
          {showBackButton && canGoBack && (
            <button
              onClick={navigateBack}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title={backLabel}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">{backLabel}</span>
            </button>
          )}

          {/* Título de la página */}
          {title && (
            <h1 className="text-sm sm:text-base font-bold text-white truncate">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Botón de Home */}
          {showHomeButton && activeTab !== 'home' && (
            <button
              onClick={navigateToHome}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title={homeLabel}
            >
              <Home className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:inline">{homeLabel}</span>
            </button>
          )}

          {/* Contenido derecho personalizado */}
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;