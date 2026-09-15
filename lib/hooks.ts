"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { SECTION_IDS, type SectionId } from "@/content/ui";

/**
 * Sección visible en el centro de la pantalla. Usa IntersectionObserver en vez de
 * leer offsetTop en cada scroll (eso forzaba layout en cada frame).
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0]);

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      // Solo cuenta la sección que cruza la franja central de la ventana.
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return active;
}

/** `true` cuando la página está scrolleada más allá de `offset` píxeles. */
export function useScrollThreshold(offset: number): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setPassed(window.scrollY > offset);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // por si la página carga ya scrolleada
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return passed;
}

/** Coincide con el breakpoint `xl` de Tailwind, donde la barra lateral queda fija. */
const DESKTOP_QUERY = "(min-width: 80rem)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/** Copia texto al portapapeles y deja `copied` en true durante dos segundos. */
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Navegadores sin Clipboard API (o sin contexto seguro)
      const input = document.createElement("textarea");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  return { copied, copy };
}
