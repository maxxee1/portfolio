/** El usuario elige oscuro, claro o "seguir al sistema". */
export type ThemeChoice = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "portfolio:theme";

/** Sin preferencia guardada el sitio nace en oscuro. */
export const DEFAULT_CHOICE: ThemeChoice = "dark";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Corre en <head> antes del primer pintado, así no hay destello del tema equivocado.
 * Resuelve "system" contra prefers-color-scheme y marca `js` para las apariciones (Reveal).
 * Ver node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export const THEME_SCRIPT = `(function(){document.documentElement.classList.add("js");try{var c=localStorage.getItem("${THEME_STORAGE_KEY}");if(c!=="light"&&c!=="dark"&&c!=="system")c="${DEFAULT_CHOICE}";var d=c==="dark"||(c==="system"&&matchMedia("${DARK_QUERY}").matches);document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;

function isChoice(value: string | null): value is ThemeChoice {
  return value === "light" || value === "dark" || value === "system";
}

export function readChoice(): ThemeChoice {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isChoice(value) ? value : DEFAULT_CHOICE;
  } catch {
    return DEFAULT_CHOICE;
  }
}

/** El tema realmente aplicado: "system" se resuelve contra el sistema operativo. */
export function resolveChoice(choice: ThemeChoice): "light" | "dark" {
  if (choice !== "system") return choice;
  try {
    return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
  } catch {
    return "dark";
  }
}

export function applyChoice(choice: ThemeChoice) {
  document.documentElement.classList.toggle("dark", resolveChoice(choice) === "dark");
}

/* Tienda mínima para que React se suscriba a la elección y a los cambios del sistema. */

const listeners = new Set<() => void>();

export function setChoice(choice: ThemeChoice) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Sin almacenamiento el cambio igual se aplica, solo que no persiste.
  }
  applyChoice(choice);
  for (const listener of listeners) listener();
}

export function subscribeChoice(onChange: () => void) {
  listeners.add(onChange);

  // El evento "storage" solo llega desde otras pestañas.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    applyChoice(readChoice());
    onChange();
  };
  window.addEventListener("storage", onStorage);

  // Si el modo es "system", reaccionar cuando el sistema operativo cambia de tema.
  const media = window.matchMedia(DARK_QUERY);
  const onSystem = () => {
    if (readChoice() === "system") {
      applyChoice("system");
      onChange();
    }
  };
  media.addEventListener("change", onSystem);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystem);
  };
}
