"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { DEFAULT_LOCALE, pick, type Locale, type Text } from "@/lib/i18n";

const STORAGE_KEY = "portfolio:locale";

/* localStorage como "tienda externa": React se suscribe con useSyncExternalStore.
   Leerlo con un setState dentro de un efecto provocaba un render en cascada. */

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // El evento "storage" solo llega desde otras pestañas; el cambio propio lo avisa notify().
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readLocale(): Locale {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "es" || saved === "en" ? saved : DEFAULT_LOCALE;
}

/** En el servidor no hay preferencia guardada: el HTML sale en el idioma por defecto. */
function readServerLocale(): Locale {
  return DEFAULT_LOCALE;
}

type LanguageValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Resuelve un texto bilingüe al idioma activo. */
  t: (text: Text) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, readServerLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    notify();
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ locale, setLocale, t: (text) => pick(text, locale) }),
    [locale, setLocale],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useLanguage(): LanguageValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return context;
}
