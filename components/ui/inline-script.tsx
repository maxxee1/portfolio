"use client";

/**
 * <script> en línea que corre mientras se parsea el HTML (antes de pintar).
 * En el servidor sale como JavaScript; en el cliente React lo renderiza como
 * text/plain para no avisar "Encountered a script tag" (el script ya corrió).
 * Ver node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
