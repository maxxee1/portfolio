"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { CvDownload } from "@/components/ui/cv-download";
import { LanguagePicker } from "@/components/ui/language-picker";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { profile } from "@/content/profile";
import { ui, type SectionId } from "@/content/ui";
import { MAIN_LOCALES } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type NavbarProps = {
  active: SectionId;
  menuOpen: boolean;
  onOpenMenu: () => void;
};

/** Barra superior de Horizon: migas + título de la sección activa y una píldora de acciones. */
export function Navbar({ active, menuOpen, onOpenMenu }: NavbarProps) {
  const { locale, setLocale, t } = useLanguage();
  const sectionName = t(ui.nav[active]);

  return (
    <header className="sticky top-3 z-30 mt-3 flex items-center justify-between gap-3 rounded-xl bg-page/70 p-2 backdrop-blur-xl">
      <div className="ml-1.5 min-w-0">
        <p className="hidden truncate text-sm text-body sm:block">
          <a href="#home" className="hover:underline">
            {t(ui.brand)}
          </a>
          <span className="mx-1.5 text-muted">/</span>
          <span>{sectionName}</span>
        </p>
        <p
          key={active}
          aria-live="polite"
          className="animate-fade-in truncate text-2xl leading-tight font-bold text-heading sm:text-[32px]"
        >
          {sectionName}
        </p>
      </div>

      <div className="flex h-[54px] shrink-0 items-center gap-1 rounded-full bg-card px-2 shadow-card sm:h-[61px] sm:gap-2">
        <CvDownload />

        <div
          role="group"
          aria-label={t(ui.switchLanguage)}
          className="flex items-center rounded-full bg-tile p-1"
        >
          {MAIN_LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLocale(code)}
              aria-pressed={locale === code}
              className={cn(
                // Mismo énfasis que el selector de tema: activo = círculo bg-card + texto de acento.
                "h-8 rounded-full px-2.5 text-xs font-bold transition-colors sm:h-9 sm:px-3",
                locale === code ? "bg-card text-accent shadow-sm" : "text-muted hover:text-heading",
              )}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <ThemeToggle />

        <LanguagePicker />

        <button
          type="button"
          onClick={onOpenMenu}
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          aria-label={t(ui.openMenu)}
          className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading xl:hidden"
        >
          <Menu size={20} />
        </button>

        <a
          href="#home"
          className="hidden size-10 overflow-hidden rounded-full ring-2 ring-accent-soft sm:block"
          aria-label={profile.name}
        >
          <Image
            src={profile.photo.src}
            alt=""
            width={40}
            height={40}
            sizes="40px"
            className="size-full object-cover"
          />
        </a>
      </div>
    </header>
  );
}
