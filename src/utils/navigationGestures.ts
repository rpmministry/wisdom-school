// Estado compartido entre el manejo de "atrás" nativo (popstate: botón físico o
// gesto de borde del navegador) y nuestro gesto táctil propio. Guardamos la marca
// de tiempo del último popstate ya procesado para que el gesto táctil no repita la
// misma navegación cuando el navegador ya la resolvió por su cuenta.
export const nativeBackState = {
  lastHandledAt: 0,
};

/** Indica si el navegador acaba de manejar un "atrás" (evita doble navegación). */
export const wasNativeBackHandledRecently = (windowMs = 600): boolean =>
  Date.now() - nativeBackState.lastHandledAt < windowMs;
