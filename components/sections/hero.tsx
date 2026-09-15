"use client";

import { ArrowRight, BadgeCheck, FolderKanban, Layers, Mail, MapPin, ShieldCheck, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { certifications } from "@/content/certifications";
import { competitions } from "@/content/education";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { ui, type SectionId } from "@/content/ui";

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
          <div className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-[20px] bg-horizon px-6 py-10 sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,#000_10%,transparent_65%)]"
            />
            <div aria-hidden className="absolute -right-20 -bottom-40 -z-10 size-96 rounded-full bg-white/10" />
            <div aria-hidden className="absolute -right-4 -bottom-24 -z-10 size-56 rounded-full bg-white/10" />

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur">
              <ShieldCheck size={14} /> {t(profile.role)}
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl xl:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-[#e3daff] sm:text-lg">
              {t(profile.tagline)}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-brand-500 shadow-lg shadow-brand-900/20 transition hover:bg-white/90"
              >
                {t(ui.hero.viewProjects)} <ArrowRight size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white ring-1 ring-white/40 transition hover:bg-white/10"
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
                    className="grid size-12 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
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
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-tile sm:aspect-[4/3] lg:aspect-auto lg:min-h-72 lg:flex-1">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
            </div>
            <div className="mt-4 px-1 pb-1">
              <p className="text-lg font-bold text-heading">{profile.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
                <MapPin size={14} /> {t(profile.location)}
              </p>
            </div>
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
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-tile text-accent sm:size-14">
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
