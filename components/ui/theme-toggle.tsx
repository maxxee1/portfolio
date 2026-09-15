"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";

import { applyTheme, readStoredTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/* La fuente de verdad es la clase .dark de <html> (la pone el script de <head>);
   React solo se suscribe a ella. */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  // En desarrollo, Strict Mode remonta y React devuelve <html> a su className de JSX:
  // se vuelve a aplicar la preferencia guardada antes de pintar. En producción no hace nada.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme());
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento el cambio igual se aplica, solo que no persiste.
    }
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
