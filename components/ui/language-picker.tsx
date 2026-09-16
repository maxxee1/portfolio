"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Globe } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { ui } from "@/content/ui";
import { LOCALE_NAMES, NICHE_LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Píldora del globo: despliega los idiomas nicho en una lista, sin modal. */
export function LanguagePicker() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();

  const active = NICHE_LOCALES.some((code) => code === locale);

  // Cerrar al hacer clic fuera o con Escape: la lista no atrapa el foco como un modal.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t(ui.moreLanguages)}
        title={t(ui.moreLanguages)}
        className={cn(
          "grid size-9 place-items-center rounded-full transition-colors sm:size-10",
          active || open
            ? "bg-tile text-accent"
            : "text-muted hover:bg-tile hover:text-heading",
        )}
      >
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          <Globe size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={listId}
            role="listbox"
            aria-label={t(ui.moreLanguages)}
            initial={{ opacity: 0, scaleY: 0.6, y: -6 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.6, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="card absolute top-[calc(100%+10px)] right-0 z-40 w-48 origin-top overflow-hidden p-1.5"
          >
            {NICHE_LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors",
                  locale === code
                    ? "bg-tile text-accent"
                    : "text-body hover:bg-tile hover:text-heading",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="font-mono text-[11px] text-muted uppercase">{code}</span>
                  <span className="truncate">{LOCALE_NAMES[code]}</span>
                </span>
                {locale === code && <Check size={15} className="shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
