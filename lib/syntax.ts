import type { ProjectCategory } from "@/content/projects";

/* Colores de resaltado de sintaxis (One Dark en oscuro, gama verde agua en claro).
   Las clases van escritas completas para que Tailwind las detecte. */

const SYNTAX_TEXT = [
  "text-syn-purple",
  "text-syn-blue",
  "text-syn-green",
  "text-syn-yellow",
  "text-syn-red",
  "text-syn-cyan",
] as const;

/** Color de texto rotativo para dar variedad a una lista. */
export function syntaxText(index: number): string {
  return SYNTAX_TEXT[index % SYNTAX_TEXT.length];
}

/** Punto de color de cada categoría de proyecto. */
export const CATEGORY_DOT: Record<ProjectCategory, string> = {
  development: "bg-syn-blue",
  ai: "bg-syn-purple",
  security: "bg-syn-red",
  systems: "bg-syn-yellow",
  data: "bg-syn-cyan",
  collab: "bg-syn-green",
};
