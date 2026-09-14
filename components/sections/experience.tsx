"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experience, type Experience as Role } from "@/content/experience";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

export function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" eyebrow="02" title={t(ui.experience.title)}>
      {/* Línea de tiempo: el degradado vertical une los puntos de cada puesto */}
      <div className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-gradient-to-b before:from-violet-bright before:via-violet-deep before:to-transparent">
        {experience.map((role, index) => (
          <Reveal key={role.id} delay={index * 0.05} className="relative pl-8">
            <span className="absolute top-7 left-0 size-[15px] rounded-full border-[3px] border-ink bg-violet-bright" />
            <RoleCard role={role} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function RoleCard({ role }: { role: Role }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <article className="panel panel-interactive p-6 sm:p-7">
      <h3 className="text-lg font-semibold text-violet-bright">{t(role.role)}</h3>
      <p className="mt-1 font-medium text-chalk">{role.company}</p>
      <p className="mt-1 font-mono text-xs text-mist">{t(role.meta)}</p>

      {role.summary && (
        <p className="mt-4 text-sm leading-relaxed text-mist">{t(role.summary)}</p>
      )}

      {/* Las viñetas se despliegan animando la fila del grid de 0fr a 1fr:
          así no hace falta conocer la altura del contenido. */}
      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <ul className="mt-4 space-y-2.5">
            {role.highlights.map((highlight) => (
              <li
                key={t(highlight.text).slice(0, 40)}
                className="relative pl-5 text-sm leading-relaxed text-mist before:absolute before:top-2 before:left-0 before:size-1.5 before:rounded-full before:bg-violet-deep"
              >
                {highlight.lead && (
                  <strong className="font-semibold text-chalk">{t(highlight.lead)}: </strong>
                )}
                {t(highlight.text)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {role.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-violet-bright transition-colors hover:border-violet-bright/50"
      >
        {open ? t(ui.experience.seeLess) : t(ui.experience.seeMore)}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
    </article>
  );
}
