import { useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';

export function useHardwareBackButton() {
  const { navigateBack, navigateToHome, activeTab, navigationHistory, isTeacherDrawerOpen, setIsTeacherDrawerOpen } = useSchool();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();

      // Si el drawer del profesor está abierto, ciérralo primero
      if (isTeacherDrawerOpen) {
        setIsTeacherDrawerOpen(false);
        return;
      }

      // Si hay historial de navegación, retrocede
      if (navigationHistory.length > 0) {
        navigateBack();
      } else if (activeTab !== 'home') {
        // Si no hay historial pero no estamos en home, ve a home
        navigateToHome();
      }
      // Si estamos en home, no hacemos nada (el navegador maneja el cierre de la app)
    };

    // Escuchamos el evento popstate que se dispara con el botón de retroceso del navegador
    window.addEventListener('popstate', handlePopState);

    // Cuando cambia la pestaña activa, agregamos una entrada al historial del navegador
    // para que el botón de retroceso nativo funcione correctamente
    if (activeTab !== 'home') {
      // Solo agregamos si no estamos ya en el estado correcto
      if (window.history.state !== activeTab) {
        window.history.pushState({ tab: activeTab }, '');
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activeTab, navigationHistory, isTeacherDrawerOpen, navigateBack, navigateToHome, setIsTeacherDrawerOpen]);
}

export default useHardwareBackButton;