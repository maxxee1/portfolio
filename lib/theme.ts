export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio:theme";

/** El sitio nace en oscuro; el claro solo se aplica si el visitante lo eligió. */
export const DEFAULT_THEME: Theme = "dark";

/**
 * Corre en <head> antes del primer pintado, así no hay destello del tema equivocado.
 * Ver node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){}})()`;

export function readStoredTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
