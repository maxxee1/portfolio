"use client";

import { ArrowRight, BadgeCheck, FolderKanban, Layers, Mail, MapPin, ShieldCheck, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { PixelPhoto } from "@/components/ui/pixel-photo";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { certifications } from "@/content/certifications";
import { competitions } from "@/content/education";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { ui, type SectionId } from "@/content/ui";
import { syntaxText } from "@/lib/syntax";
import { cn } from "@/lib/utils";

type Stat = {
  href: `#${SectionId}`;
  label: keyof typeof ui.hero.stats;
  value: number;
  Icon: LucideIcon;
};

// Las cifras salen del mismo contenido que muestran las secciones: nunca se desfasan.
const STATS: readonly Stat[] = [
  { href: "#projects", label: "projects", value: projects.length, Icon: FolderKanban },
  {
    href: "#skills",
    label: "technologies",
    value: skillGroups.reduce((total, group) => total + group.skills.length, 0),
    Icon: Layers,
  },
  {
    href: "#certifications",
    label: "certifications",
    value: certifications.length,
    Icon: BadgeCheck,
  },
  { href: "#education", label: "competitions", value: competitions.length, Icon: Trophy },
];

export function Hero() {
  const { t } = useLanguage();

  return (
    <Section id="home" label={profile.name}>
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Banner principal (el de "Marketplace" de Horizon) */}
        <Reveal className="lg:col-span-8">
          <div className="bg-hero relative isolate flex h-full flex-col justify-center overflow-hidden rounded-[20px] px-6 py-10 sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,#000_10%,transparent_65%)]"
            />
            <div aria-hidden className="absolute -right-20 -bottom-40 -z-10 size-96 rounded-full bg-hero-glow blur-2xl" />
            <div aria-hidden className="absolute -top-24 right-1/3 -z-10 size-64 rounded-full bg-hero-glow-2 blur-2xl" />

            {/* Rol y ubicación, escritos como líneas de código */}
            <div className="flex flex-wrap gap-2">
              {[
                { name: "role", value: t(profile.role), Icon: ShieldCheck },
                { name: "location", value: t(profile.location), Icon: MapPin },
              ].map(({ name, value, Icon }) => (
                <span
                  key={name}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-hero-chip px-3.5 py-1.5 font-mono text-xs text-hero-text ring-1 ring-hero-ring/40 backdrop-blur"
                >
                  <Icon size={14} className="text-hero-str" />
                  <span>
                    <span className="text-hero-kw">const</span> {name} ={" "}
                    <span className="text-hero-str">&quot;{value}&quot;</span>;
                  </span>
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance text-hero-text sm:text-5xl xl:text-6xl">
              {profile.name}
              <span aria-hidden className="text-hero-str">.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-hero-muted sm:text-lg">
              {t(profile.tagline)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-hero-btn px-6 text-sm font-bold text-hero-btn-text shadow-lg shadow-hero-btn/25 transition hover:opacity-90"
              >
                {t(ui.hero.viewProjects)} <ArrowRight size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold text-hero-text ring-1 ring-hero-ring transition hover:bg-hero-chip"
              >
                <Mail size={16} /> {t(ui.contact.emailMe)}
              </a>
              <div className="flex gap-3">
                {[
                  { href: profile.social.github, label: "GitHub", Icon: GithubIcon },
                  { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-12 place-items-center rounded-xl bg-hero-chip text-hero-text ring-1 ring-hero-ring/40 transition hover:ring-hero-ring"
                  >
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tarjeta de perfil */}
        <Reveal className="lg:col-span-4" delay={0.05}>
          <div className="card flex h-full flex-col p-4">
            <PixelPhoto
              src={profile.photo.src}
              alt={profile.photo.alt}
              className="aspect-square w-full sm:aspect-[4/3] lg:aspect-auto lg:min-h-72 lg:flex-1"
            />
          </div>
        </Reveal>
      </div>

      {/* Widgets de cifras */}
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {STATS.map(({ href, label, value, Icon }, index) => (
          <li key={label}>
            <Reveal delay={0.05 + index * 0.04} className="h-full">
              <a
                href={href}
                className="card flex h-full flex-col items-start gap-3 p-4 transition-transform duration-300 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-full bg-tile sm:size-14",
                    syntaxText(index),
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-muted">
                    {t(ui.hero.stats[label])}
                  </span>
                  <span className="block text-2xl font-bold text-heading">{value}</span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
