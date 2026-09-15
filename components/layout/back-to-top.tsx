"use client";

import { ArrowUp } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { ui } from "@/content/ui";
import { useScrollThreshold } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const { t } = useLanguage();
  const visible = useScrollThreshold(600);
  const label = t(ui.backToTop);

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full bg-horizon text-white",
        "shadow-lg shadow-brand-500/40 transition-all duration-300 hover:-translate-y-0.5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
