import { useEffect, useRef } from 'react';
import { useSchool } from '../context/SchoolContext';
import { wasNativeBackHandledRecently } from '../utils/navigationGestures';

const EDGE_ZONE_PX = 28; // el gesto debe iniciar pegado al borde izquierdo
const MIN_SWIPE_PX = 70; // recorrido horizontal mínimo para considerarlo "atrás"
const MAX_VERTICAL_PX = 60; // tolerancia vertical: no robamos el scroll

/**
 * Gesto táctil "deslizar desde el borde izquierdo para volver".
 *
 * Refuerza el `popstate` nativo en navegadores que no ofrecen gesto de borde
 * (o cuando el navegador no lo captura). Si el navegador ya resolvió su propio
 * gesto, `wasNativeBackHandledRecently()` evita una doble navegación.
 */
export function useSwipeBack() {
  const { navigateBack, navigateToHome, activeTab, navigationHistory } = useSchool();

  const stateRef = useRef({
    navigateBack,
    navigateToHome,
    activeTab,
    hasHistory: navigationHistory.length > 0,
  });
  stateRef.current = {
    navigateBack,
    navigateToHome,
    activeTab,
    hasHistory: navigationHistory.length > 0,
  };

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        tracking = false;
        return;
      }
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = startX <= EDGE_ZONE_PX;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - startX;
      const deltaY = Math.abs(touch.clientY - startY);
      if (deltaX < MIN_SWIPE_PX || deltaY > MAX_VERTICAL_PX) return;

      // El navegador ya manejó su gesto nativo: no duplicamos.
      if (wasNativeBackHandledRecently()) return;

      const { activeTab: tab, hasHistory, navigateBack: goBack, navigateToHome: goHome } = stateRef.current;
      if (hasHistory) goBack();
      else if (tab !== 'home') goHome();
    };

    const onTouchCancel = () => {
      tracking = false;
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('touchcancel', onTouchCancel, { passive: true });

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchcancel', onTouchCancel);
    };
  }, []);
}

export default useSwipeBack;
