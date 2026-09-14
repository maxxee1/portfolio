"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { SECTION_IDS, ui } from "@/content/ui";
import { useActiveSection, useScrollThreshold } from "@/lib/hooks";
import { LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { locale, setLocale, t } = useLanguage();
  const active = useActiveSection();
  const scrolled = useScrollThreshold(24);
  const [menuOpen, setMenuOpen] = useState(false);

  // Con el menú abierto la página de atrás no debe scrollear
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const languageSwitch = (
    <div
      className="flex items-center gap-1 rounded-full border border-line bg-surface/80 p-1"
      role="group"
      aria-label={t(ui.switchLanguage)}
    >
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-3 py-1 font-mono text-xs font-semibold transition-colors",
            locale === code
              ? "bg-gradient-to-r from-violet-deep to-violet text-white"
              : "text-mist hover:text-chalk",
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          className="text-gradient font-mono text-sm font-semibold tracking-tight sm:text-base"
        >
          {t(ui.brand)}
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t(ui.brand)}>
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                active === id
                  ? "bg-violet-deep/30 text-violet-bright"
                  : "text-mist hover:text-chalk",
              )}
            >
              {t(ui.nav[id])}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">{languageSwitch}</div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t(ui.closeMenu) : t(ui.openMenu)}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface/80 text-chalk lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-5 pb-6 sm:px-8">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-line/60 py-3.5 text-base transition-colors",
                  active === id ? "text-violet-bright" : "text-mist",
                )}
              >
                {t(ui.nav[id])}
              </a>
            ))}
            <div className="pt-5">{languageSwitch}</div>
          </nav>
        </div>
      )}
    </header>
  );
}
