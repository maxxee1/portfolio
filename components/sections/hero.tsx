"use client";

import { ArrowDown, Mail } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { ProfileCanvas } from "@/components/ui/profile-canvas";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";

export function Hero() {
  const { t } = useLanguage();

  const socials = [
    { href: profile.social.github, label: "GitHub", Icon: GithubIcon },
    { href: profile.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: `mailto:${profile.email}`, label: t(ui.contact.emailMe), Icon: Mail },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
      {/* Fondo: malla tenue + halo violeta detrás del retrato */}
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[-5%] size-[36rem] rounded-full bg-violet/20 blur-[140px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <span className="chip">{t(profile.role)}</span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            <span className="text-gradient">{profile.name}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-mist text-pretty sm:text-lg">
            {t(profile.tagline)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-violet-deep to-violet px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {t(ui.hero.viewProjects)}
              <ArrowDown size={16} />
            </a>

            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid size-12 place-items-center rounded-full border border-line bg-surface/60 text-mist transition-colors hover:border-violet-bright/50 hover:text-chalk"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Retrato en puntos: reacciona al puntero (Aceternity PixelatedCanvas) */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="panel relative p-2">
            <ProfileCanvas src={profile.photo.src} alt={profile.photo.alt} />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 translate-y-6 scale-95 rounded-[2rem] bg-violet/25 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
