import { useEffect } from 'react';
import { scrollAppToTop } from '../utils/scrollToTop';

// Hook global de "Scroll Restoration": cada vez que cambia una "ruta" de la SPA
// (pestaña, estudiante, día, sub-pestaña o clase) la vista arranca desde (0,0) del
// contenedor que realmente scrollea (<main id="app-scroll-root" overflow-y-auto>).
// Se programa con doble requestAnimationFrame para ejecutarlo DESPUÉS del repaint del
// nuevo contenido, cuando la altura del contenedor ya es la definitiva.
export function useScrollToTopOnChange(deps: readonly unknown[], behavior: ScrollBehavior = 'instant'): void {
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => scrollAppToTop(behavior));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
