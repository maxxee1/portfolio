"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { ui } from "@/content/ui";
import {
  applyChoice,
  DEFAULT_CHOICE,
  readChoice,
  setChoice,
  subscribeChoice,
  type ThemeChoice,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

// Orden del control: claro · sistema · oscuro (igual que el conmutador de referencia).
const OPTIONS: readonly { value: ThemeChoice; Icon: LucideIcon; label: keyof typeof ui.theme }[] = [
  { value: "light", Icon: Sun, label: "light" },
  { value: "system", Icon: Monitor, label: "system" },
  { value: "dark", Icon: Moon, label: "dark" },
];

/** Selector de tres modos: claro / sistema / oscuro. */
export function ThemeToggle() {
  const { t } = useLanguage();
  const choice = useSyncExternalStore(subscribeChoice, readChoice, () => DEFAULT_CHOICE);

  // En desarrollo, Strict Mode remonta y React devuelve <html> a su className de JSX:
  // se vuelve a aplicar la preferencia guardada antes de pintar. En producción no hace nada.
  useLayoutEffect(() => {
    applyChoice(readChoice());
  }, []);

  return (
    <div
      role="group"
      aria-label={t(ui.theme.group)}
      className="flex items-center rounded-full bg-tile p-1"
    >
      {OPTIONS.map(({ value, Icon, label }) => {
        const selected = choice === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setChoice(value)}
            aria-pressed={selected}
            title={t(ui.theme[label])}
            aria-label={t(ui.theme[label])}
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors sm:size-9",
              selected
                ? "bg-card text-accent shadow-sm"
                : "text-muted hover:text-heading",
            )}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
