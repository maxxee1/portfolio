"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos, para escalonar elementos de una misma fila. */
  delay?: number;
};

/**
 * Aparición al entrar en pantalla. Solo una vez por elemento.
 * El contenido nace visible en el HTML: solo se oculta cuando hay JavaScript
 * (clase `js` que pone el script del <head>), así buscadores e IAs que leen el
 * HTML sin ejecutar nada lo ven completo.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.shown = "";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
