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
        "fixed right-5 bottom-5 z-50 grid size-11 place-items-center rounded-full",
        "bg-gradient-to-br from-violet-deep to-violet text-white",
        "shadow-[0_10px_30px_-10px] shadow-violet/80 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
