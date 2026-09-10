import { useEffect, useRef } from 'react';
import { useSchool } from '../context/SchoolContext';
import { nativeBackState } from '../utils/navigationGestures';

/**
 * Sincroniza el "atrás" del navegador (botón físico, gesto de borde, tecla Escape)
 * con la pila de navegación interna de la SPA.
 *
 * Patrón de ENTRADA CENTINELA: la app mantiene UNA sola entrada de historial extra.
 * Cuando el navegador retrocede, consume esa entrada, interceptamos el `popstate`,
 * resolvemos la navegación interna (`navigateBack`) y VOLVEMOS A ARMAR el centinela.
 * Así el gesto siempre retrocede un paso dentro de la app en lugar de colapsar la
 * pila completa y expulsar al usuario a la raíz.
 *
 * La versión anterior hacía `history.pushState` en cada cambio de pestaña (con una
 * comparación inválida), lo que inflaba el historial y desincronizaba la app.
 */
export function useHardwareBackButton() {
  const { navigateBack, navigateToHome, activeTab, navigationHistory, isTeacherDrawerOpen, setIsTeacherDrawerOpen } = useSchool();

  // Refs: leemos el estado actual dentro de los listeners sin re-suscribir el efecto.
  const activeTabRef = useRef(activeTab);
  const historyLengthRef = useRef(navigationHistory.length);
  const drawerRef = useRef(isTeacherDrawerOpen);
  const navigateBackRef = useRef(navigateBack);
  const navigateToHomeRef = useRef(navigateToHome);
  const setDrawerRef = useRef(setIsTeacherDrawerOpen);

  activeTabRef.current = activeTab;
  historyLengthRef.current = navigationHistory.length;
  drawerRef.current = isTeacherDrawerOpen;
  navigateBackRef.current = navigateBack;
  navigateToHomeRef.current = navigateToHome;
  setDrawerRef.current = setIsTeacherDrawerOpen;

  useEffect(() => {
    const armSentinel = () => {
      window.history.pushState({ wisdomApp: true }, '');
    };

    const handlePopState = () => {
      nativeBackState.lastHandledAt = Date.now();

      // 1) Drawer del Profesor IA abierto → ciérralo antes de navegar.
      if (drawerRef.current) {
        setDrawerRef.current(false);
        armSentinel();
        return;
      }

      // 2) Retroceder exactamente una vista dentro de la SPA.
      if (historyLengthRef.current > 0) {
        navigateBackRef.current();
        armSentinel();
        return;
      }

      // 3) Sin historial interno pero fuera de inicio → ir a inicio.
      if (activeTabRef.current !== 'home') {
        navigateToHomeRef.current();
        armSentinel();
        return;
      }

      // 4) En inicio: no re-armamos el centinela para permitir cerrar/salir de la app.
    };

    // Arrancamos con una entrada limpia de la app (evita restos de versiones previas).
    if (!window.history.state?.wisdomApp) armSentinel();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
}

export default useHardwareBackButton;
