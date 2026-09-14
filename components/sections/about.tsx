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

export function About() {
  const { locale, t } = useLanguage();

  return (
    <Section id="about" eyebrow="01" title={t(ui.about.title)}>
      <Reveal className="panel p-6 sm:p-10">
        <div className="space-y-5">
          {profile.about[locale].map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-mist">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="mt-9 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          {facts.map((fact) => {
            const Icon = FACT_ICONS[fact.id];
            return (
              <div key={fact.id} className="flex items-start gap-3">
                <span className="mt-0.5 text-violet-bright">
                  <Icon size={18} />
                </span>
                <div>
                  <dt className="eyebrow mb-1">{t(fact.label)}</dt>
                  <dd className="text-sm leading-snug text-chalk">{t(fact.value)}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </Section>
  );
}
