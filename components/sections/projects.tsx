"use client";

import { Code2, ExternalLink, Globe, Lock, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
import { cn } from "@/lib/utils";

export function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visible = projects.filter(
    (project) => filter === "all" || project.categories.includes(filter),
  );

  return (
    <Section id="projects" eyebrow="03" title={t(ui.projects.title)}>
      {/* En teléfono la fila se desliza en horizontal; los bordes se desvanecen
          para que se note que hay más filtros al costado. */}
      <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 [mask-image:linear-gradient(to_right,transparent,#000_1.25rem,#000_calc(100%-1.25rem),transparent)] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:[mask-image:none]">
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
              "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
              filter === option
                ? "border-transparent bg-gradient-to-r from-violet-deep to-violet text-white"
                : "border-line bg-surface/60 text-mist hover:text-chalk",
            )}
          >
            {t(ui.projects.filters[option])}
            <span className="rounded-full bg-white/10 px-1.5 font-mono text-[10px]">
              {countByFilter(option)}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index, 5) * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-10 text-center text-sm text-mist">{t(ui.projects.empty)}</p>
      )}
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const title = t(project.title);
  const links = project.links ?? {};
  const codeHref = links.code === true ? links.github : links.code;

  return (
    <article className="panel panel-interactive group flex h-full flex-col overflow-hidden">
      <div className="relative h-36 overflow-hidden border-b border-line">
        {project.image ? (
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-gradient-to-br from-violet-deep to-violet text-5xl">
            <span aria-hidden>{project.emoji}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {project.role === "collaborator" && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-cyan/15 px-2.5 py-0.5 text-[11px] font-semibold text-cyan">
            <Users size={12} /> {t(ui.projects.collaborator)}
          </span>
        )}

        <h3 className="text-base font-semibold text-chalk">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{t(project.description)}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {links.github && (
            <ProjectLink href={links.github}>
              <GithubIcon className="size-4" /> {t(ui.projects.viewProject)}
            </ProjectLink>
          )}
          {codeHref && (
            <ProjectLink href={codeHref}>
              <Code2 size={15} /> {t(ui.projects.viewCode)}
            </ProjectLink>
          )}
          {links.demo && (
            <ProjectLink href={links.demo}>
              <ExternalLink size={15} /> {t(ui.projects.demo)}
            </ProjectLink>
          )}
          {links.website && (
            <ProjectLink href={links.website}>
              <Globe size={15} /> {t(ui.projects.website)}
            </ProjectLink>
          )}
          {project.private && (
            <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-dashed border-line px-3 py-2 text-xs text-mist">
              <Lock size={14} /> {t(ui.projects.privateProject)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-2 text-xs font-medium text-chalk transition-colors hover:border-violet-bright/50 hover:bg-violet-deep/20"
    >
      {children}
    </a>
  );
}
