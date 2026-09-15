"use client";

import { BriefcaseBusiness, CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experience, type Experience as Role } from "@/content/experience";
import { ui } from "@/content/ui";
import { syntaxText } from "@/lib/syntax";
import { cn } from "@/lib/utils";

export function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" title={t(ui.experience.title)}>
      <ol className="space-y-5">
        {experience.map((role, index) => (
          <li key={role.id} className="relative pl-12 sm:pl-16">
            {/* Línea de tiempo: une el ícono de cada puesto con el siguiente */}
            {index < experience.length - 1 && (
              <span
                aria-hidden
                className="absolute top-12 -bottom-5 left-5 w-px bg-gradient-to-b from-pop/60 to-line sm:left-6"
              />
            )}
            <span
              aria-hidden
              className={cn(
                "absolute top-5 left-0 grid size-10 place-items-center rounded-full bg-card ring-1 ring-line sm:size-12",
                syntaxText(index + 1),
              )}
            >
              <BriefcaseBusiness size={18} />
            </span>

            <Reveal delay={index * 0.05}>
              <RoleCard role={role} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function RoleCard({ role }: { role: Role }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelId = `${role.id}-highlights`;

  return (
    <article className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-heading sm:text-xl">{t(role.role)}</h3>
          <p className="mt-0.5 font-semibold text-accent">{role.company}</p>
        </div>
        {role.current && (
          <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-pop opacity-60" />
              <span className="relative size-2 rounded-full bg-pop" />
            </span>
            {t(ui.experience.present)}
          </span>
        )}
      </div>

      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
        <CalendarDays size={14} className="shrink-0" /> {t(role.meta)}
      </p>

      {role.summary && (
        <p className="mt-4 text-[15px] leading-relaxed text-body">{t(role.summary)}</p>
      )}

      {/* Las viñetas se despliegan animando la fila del grid de 0fr a 1fr:
          así no hace falta conocer la altura del contenido. */}
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <ul className="mt-4 space-y-2.5 rounded-2xl bg-tile p-4 sm:p-5">
            {role.highlights.map((highlight) => (
              <li
                key={t(highlight.text).slice(0, 40)}
                className="relative pl-5 text-sm leading-relaxed text-body before:absolute before:top-[0.55rem] before:left-0 before:size-1.5 before:rounded-full before:bg-accent"
              >
                {highlight.lead && (
                  <strong className="font-semibold text-heading">{t(highlight.lead)}: </strong>
                )}
                {t(highlight.text)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {role.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-tile px-3 py-1 text-xs font-medium text-body"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-accent-soft px-4 py-2 text-sm font-bold text-accent transition-opacity hover:opacity-80"
      >
        {open ? t(ui.experience.seeLess) : t(ui.experience.seeMore)}
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
    </article>
  );
}
