import type { ReactNode } from "react";

import type { SectionId } from "@/content/ui";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: SectionId;
  /** Sin título la sección se etiqueta con `label` (la portada ya tiene su h1). */
  title?: string;
  label?: string;
  /** Contenido a la derecha del título (filtros, contadores…). */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, label, action, children, className }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : label}
      className={cn("pt-10 first:pt-4 sm:pt-14 sm:first:pt-5", className)}
    >
      {title && (
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 px-1">
          <h2 id={titleId} className="text-2xl font-bold tracking-tight text-heading sm:text-[28px]">
            {title}
          </h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
