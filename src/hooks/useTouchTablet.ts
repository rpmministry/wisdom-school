import { useEffect, useState } from 'react';

/** Media query reactiva, compatible con Safari/iOS antiguos (addListener) y modernos (addEventListener). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}

/**
 * true en tablets táctiles (iPad, Android…) de ancho ≥768px, sin importar la orientación.
 * Cubre también iPadOS con teclado/trackpad (`any-pointer: coarse`) y navegadores que solo
 * reportan `hover: none`. El escritorio de Windows (puntero fino con hover) devuelve false,
 * por lo que conserva su diseño de columnas/panel lateral.
 */
export function useTouchTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (any-pointer: coarse), (min-width: 768px) and (hover: none)');
}
