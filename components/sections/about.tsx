"use client";

import { GraduationCap, Languages, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { facts, profile, type Fact } from "@/content/profile";
import { ui } from "@/content/ui";

const FACT_ICONS: Record<Fact["id"], LucideIcon> = {
  year: GraduationCap,
  focus: ShieldCheck,
  location: MapPin,
  languages: Languages,
};

/** Tarjeta "General Information" de Horizon: texto + mosaico de datos. */
export function About() {
  const { locale, t } = useLanguage();

  return (
    <Section id="about" title={t(ui.about.title)}>
      <Reveal className="card grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
        <div className="space-y-4">
          {profile.about[locale].map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-body">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="grid content-start gap-3 sm:grid-cols-2 sm:gap-4">
          {facts.map((fact) => {
            const Icon = FACT_ICONS[fact.id];
            return (
              <div key={fact.id} className="flex flex-col gap-3 rounded-2xl bg-tile p-4">
                <span className="grid size-10 place-items-center rounded-full bg-card text-accent">
                  <Icon size={18} />
                </span>
                <div>
                  <dt className="text-sm text-muted">{t(fact.label)}</dt>
                  <dd className="mt-0.5 text-[15px] leading-snug font-semibold text-heading">
                    {t(fact.value)}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </Section>
  );
}
