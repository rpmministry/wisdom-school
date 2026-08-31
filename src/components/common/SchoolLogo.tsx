import React from 'react';

interface SchoolLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withContainer?: boolean;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  withContainer = false,
}) => {
  const svgContent = (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClasses[size]} ${className} shrink-0 transition-transform duration-300`}
      aria-label="Wisdom School Logo"
    >
      {/* Top Left - Vibrant Leaf Green */}
      <path
        d="M 16 56 L 16 24 C 33.67 24 48 38.33 48 56 Z"
        fill="#78C043"
      />
      
      {/* Bottom Left - Crimson Coral Red */}
      <path
        d="M 16 56 H 48 V 88 C 30.33 88 16 73.67 16 56 Z"
        fill="#E5234A"
      />

      {/* Center Bottom - Radiant Orange Quarter Arc */}
      <path
        d="M 48 88 V 56 C 65.67 56 80 70.33 80 88 Z"
        fill="#F37023"
      />

      {/* Top Right - Sky Cyan */}
      <path
        d="M 112 56 H 80 C 80 38.33 94.33 24 112 24 Z"
        fill="#00AEEF"
      />

      {/* Bottom Right - Royal Violet Purple */}
      <path
        d="M 80 56 H 112 C 112 73.67 97.67 88 80 88 Z"
        fill="#583F8C"
      />
    </svg>
  );

  if (withContainer) {
    return (
      <div className="relative p-2 rounded-2xl bg-white/95 dark:bg-slate-900/90 border border-slate-700/60 shadow-lg shadow-black/20 flex items-center justify-center backdrop-blur-sm">
        {svgContent}
      </div>
    );
  }

  return svgContent;
};
