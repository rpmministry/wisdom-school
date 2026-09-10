// Util global de scroll para la SPA.
// El scroll "real" de la app NO vive en window: vive en <main id={APP_SCROLL_CONTAINER_ID} className="... overflow-y-auto">
// (App.tsx). Por eso los window.scrollTo clásicos no hacían nada entre pestañas.
export const APP_SCROLL_CONTAINER_ID = 'app-scroll-root';

export function scrollAppToTop(behavior: ScrollBehavior = 'instant'): void {
  if (typeof window === 'undefined') return;
  const container = window.document.getElementById(APP_SCROLL_CONTAINER_ID);
  if (container && container.scrollTop !== 0) {
    container.scrollTo({ top: 0, left: 0, behavior });
  }
  // window solo por si en algún layout futuro el scroller vuelve a ser el documento.
  if (window.scrollY > 0) {
    window.scrollTo({ top: 0, left: 0, behavior });
  }
}
