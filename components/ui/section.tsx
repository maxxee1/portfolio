import type { ReactNode } from "react";

import type { SectionId } from "@/content/ui";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: SectionId;
  title: string;
  /** Etiqueta pequeña sobre el título. */
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, eyebrow, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mb-10 sm:mb-14">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <div className="mt-5 h-px w-full bg-gradient-to-r from-violet-bright/60 via-line to-transparent" />
        </header>
        {children}
      </div>
    </section>
  );
}
