"use client";

import { CodeXml, ExternalLink, Globe, Lock, Users } from "lucide-react";
import Image from "next/image";
import { useState, type ComponentType } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  countByFilter,
  projects,
  PROJECT_FILTERS,
  type Project,
  type ProjectFilter,
} from "@/content/projects";
import { ui } from "@/content/ui";
import { CATEGORY_DOT } from "@/lib/syntax";
import { cn } from "@/lib/utils";

export function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visible = projects.filter(
    (project) => filter === "all" || project.categories.includes(filter),
  );

  const filters = (
    // En teléfono la fila se desliza en horizontal dentro de la píldora.
    <div className="w-full max-w-full overflow-x-auto rounded-full bg-card p-1 shadow-card [scrollbar-width:none] lg:w-auto">
      <div className="flex w-max gap-1">
        {PROJECT_FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={(event) => {
              setFilter(option);
              event.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }}
            aria-pressed={filter === option}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
              filter === option ? "bg-accent text-on-accent" : "text-muted hover:text-heading",
            )}
          >
            {t(ui.projects.filters[option])}
            <span
              className={cn(
                "rounded-full px-1.5 text-[11px] leading-5 font-bold",
                filter === option ? "bg-on-accent/15" : "bg-tile",
              )}
            >
              {countByFilter(option)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Section id="projects" title={t(ui.projects.title)} action={filters}>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index, 5) * 0.05} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="card py-10 text-center text-sm text-muted">{t(ui.projects.empty)}</p>
      )}
    </Section>
  );
}

type ProjectAction = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

/** Tarjeta de proyecto con la forma de la NftCard de Horizon. */
function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const title = t(project.title);
  const links = project.links ?? {};
  const codeHref = links.code === true ? links.github : links.code;

  const candidates: [string | undefined, string, ProjectAction["Icon"]][] = [
    [links.github, t(ui.projects.viewProject), GithubIcon],
    [codeHref, t(ui.projects.viewCode), CodeXml],
    [links.demo, t(ui.projects.demo), ExternalLink],
    [links.website, t(ui.projects.website), Globe],
  ];
  const actions: ProjectAction[] = candidates.flatMap(([href, label, Icon]) =>
    href ? [{ href, label, Icon }] : [],
  );

  return (
    <article className="card group flex h-full flex-col p-4">
      <div className="relative h-44 overflow-hidden rounded-xl bg-tile">
        {project.image ? (
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative grid size-full place-items-center overflow-hidden rounded-xl bg-hero">
            <div aria-hidden className="bg-dots absolute inset-0" />
            <div aria-hidden className="absolute -right-10 -bottom-16 size-40 rounded-full bg-hero-glow blur-2xl" />
            <span
              aria-hidden
              className="relative grid size-20 place-items-center rounded-2xl bg-hero-chip text-4xl ring-1 ring-hero-ring/40 backdrop-blur transition-transform duration-500 group-hover:scale-110"
            >
              {project.emoji}
            </span>
          </div>
        )}

        <div className="absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold text-heading backdrop-blur">
            <span aria-hidden className={cn("size-1.5 rounded-full", CATEGORY_DOT[project.categories[0]])} />
            {t(ui.projects.filters[project.categories[0]])}
          </span>
          {project.role === "collaborator" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
              <Users size={12} /> {t(ui.projects.collaborator)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="text-lg leading-snug font-bold text-heading">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{t(project.description)}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-tile px-2.5 py-1 text-xs font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {(actions.length > 0 || project.private) && (
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            {actions.map(({ href, label, Icon }, index) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-bold transition-colors",
                  index === 0
                    ? "bg-accent text-on-accent hover:opacity-90"
                    : "text-heading ring-1 ring-line hover:bg-tile",
                )}
              >
                <Icon className="size-3.5" /> {label}
              </a>
            ))}
            {project.private && (
              <span className="inline-flex h-9 items-center gap-1.5 text-xs font-medium text-muted">
                <Lock size={14} /> {t(ui.projects.privateProject)}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
