import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  ArrowLeft,
} from 'lucide-react';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  backLabel?: string;
  rightContent?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  backLabel = 'Retroceder',
  rightContent,
  className = '',
}) => {
  const { navigateBack, navigationHistory } = useSchool();
  const canGoBack = navigationHistory.length > 0;

  return (
    <div className={`sticky top-0 z-20 backdrop-blur-md bg-slate-900/95 border-b border-slate-800 ${className}`}>
      <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2 min-w-0">
          {/* Única acción "atrás" visible: evita duplicar la de la barra inferior. */}
          {showBackButton && canGoBack && (
            <button
              onClick={navigateBack}
              className="flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title={backLabel}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">{backLabel}</span>
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
          {/* Contenido derecho personalizado */}
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
