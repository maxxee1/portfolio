"use client";

import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { skillAnchorFor } from "@/content/skills";
import { ui } from "@/content/ui";

const BASE = "rounded-full bg-tile px-2.5 py-1 text-xs font-medium text-body";

/** Chapita de tecnología. Si la tecnología está en Habilidades, lleva hasta ella. */
export function TechTag({ tag }: { tag: string }) {
  const { t } = useLanguage();
  const anchor = skillAnchorFor(tag);

  if (!anchor) return <span className={BASE}>{tag}</span>;

  const label = t(ui.skills.viewInSkills);

  return (
    <a
      href={`#${anchor}`}
      title={label}
      aria-label={`${tag}: ${label}`}
      className={`${BASE} group/tag inline-flex items-center gap-1 transition-colors hover:bg-accent-soft hover:text-accent`}
    >
      {tag}
      <ArrowUpRight
        size={11}
        aria-hidden
        className="opacity-50 transition-opacity group-hover/tag:opacity-100"
      />
    </a>
  );
}
