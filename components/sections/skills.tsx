"use client";

import { FileSearch, HardDrive, Network, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  skillGroups,
  skillIconUrl,
  type LucideSkillIcon,
  type Skill,
} from "@/content/skills";
import { ui } from "@/content/ui";

const LUCIDE_ICONS: Record<LucideSkillIcon, LucideIcon> = {
  network: Network,
  "shield-check": ShieldCheck,
  "hard-drive": HardDrive,
  "file-search": FileSearch,
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" eyebrow="04" title={t(ui.skills.title)}>
      <div className="grid gap-5 lg:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.05} className="h-full">
            <div className="panel h-full p-6">
              <h3 className="eyebrow mb-5">{t(group.title)}</h3>
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const url = skillIconUrl(skill.icon);
  const LucideSkill = skill.icon.source === "lucide" ? LUCIDE_ICONS[skill.icon.name] : null;

  return (
    <li className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-line bg-surface-hi/60 px-2 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-violet/60 hover:bg-violet-deep/20">
      <span className="grid size-10 place-items-center">
        {url ? (
          // Íconos sueltos y diferidos desde CDN: son SVG de ~1 KB, no pasan por
          // el optimizador de Next (no tendría nada que optimizar).
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" width={40} height={40} loading="lazy" decoding="async" />
        ) : (
          LucideSkill &&
          skill.icon.source === "lucide" && (
            <LucideSkill size={34} color={skill.icon.color} />
          )
        )}
      </span>
      <span className="text-[11px] font-semibold text-chalk">{skill.name}</span>
    </li>
  );
}
