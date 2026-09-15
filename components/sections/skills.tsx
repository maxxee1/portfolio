"use client";

import { Bot, FileSearch, HardDrive, Network, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  skillAnchorId,
  skillGroups,
  skillIconUrl,
  type LucideSkillIcon,
  type Skill,
} from "@/content/skills";
import { ui } from "@/content/ui";
import { syntaxText } from "@/lib/syntax";
import { cn } from "@/lib/utils";

const LUCIDE_ICONS: Record<LucideSkillIcon, LucideIcon> = {
  network: Network,
  "shield-check": ShieldCheck,
  "hard-drive": HardDrive,
  "file-search": FileSearch,
  bot: Bot,
};

export function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t(ui.skills.title)}>
      <div className="grid gap-5 lg:grid-cols-2">
        {skillGroups.map((group, index) => {
          // Con un número impar de grupos, el último ocupa todo el ancho.
          const spansFull = index === skillGroups.length - 1 && skillGroups.length % 2 === 1;
          return (
            <Reveal
              key={group.id}
              delay={index * 0.05}
              className={cn("h-full", spansFull && "lg:col-span-2")}
            >
              <div className="card h-full p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-heading">{t(group.title)}</h3>
                  <span
                    className={cn(
                      "rounded-full bg-tile px-2.5 py-0.5 font-mono text-xs font-bold",
                      syntaxText(index),
                    )}
                  >
                    {group.skills.length}
                  </span>
                </div>
                <ul className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))] gap-3">
                  {group.skills.map((skill) => {
                    const label = typeof skill.name === "string" ? skill.name : t(skill.name);
                    return <SkillTile key={label} skill={skill} label={label} />;
                  })}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function SkillTile({ skill, label }: { skill: Skill; label: string }) {
  const { icon } = skill;
  const url = skillIconUrl(icon);
  const LucideSkill = icon.source === "lucide" ? LUCIDE_ICONS[icon.name] : null;

  // Los logos blancos desaparecen en el tema claro y el de LaTeX (negro) en el oscuro:
  // se invierten solo en el tema donde no se verían.
  const whiteLogo = icon.source === "simple" && icon.color.toLowerCase() === "ffffff";
  const blackLogo = icon.source === "devicon" && icon.invert === true;

  return (
    <li
      id={skillAnchorId(skill)}
      className="skill-tile flex flex-col items-center justify-center gap-2.5 rounded-2xl bg-tile px-2 py-4 text-center ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:ring-accent/40"
    >
      <span className="grid size-10 place-items-center">
        {url ? (
          // Íconos sueltos y diferidos desde CDN: son SVG de ~1 KB, no pasan por
          // el optimizador de Next (no tendría nada que optimizar).
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            width={36}
            height={36}
            loading="lazy"
            decoding="async"
            className={cn(
              "size-9 object-contain",
              whiteLogo && "invert dark:invert-0",
              blackLogo && "dark:invert",
            )}
          />
        ) : (
          LucideSkill &&
          icon.source === "lucide" && <LucideSkill size={32} color={icon.color} />
        )}
      </span>
      <span className="text-xs font-semibold text-heading">{label}</span>
    </li>
  );
}
