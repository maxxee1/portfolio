"use client";

import { useEffect, useState } from "react";

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
