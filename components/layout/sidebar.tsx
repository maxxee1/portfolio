"use client";

import { Mail, X } from "lucide-react";
import Image from "next/image";

import { NAV_ICONS } from "@/components/layout/nav-icons";
import { useLanguage } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { SECTION_IDS, ui, type SectionId } from "@/content/ui";
import { cn } from "@/lib/utils";

type SidebarProps = {
  active: SectionId;
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
};

export function Sidebar({ active, open, isDesktop, onClose }: SidebarProps) {
  const { t } = useLanguage();
  const visible = open || isDesktop;

  return (
    <>
      {/* Fondo del cajón en móvil */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        id="sidebar"
        aria-label={t(ui.brand)}
        inert={!visible}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col overflow-y-auto border-r border-line bg-card shadow-2xl shadow-black/20 transition-transform duration-300 ease-out xl:translate-x-0 xl:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t(ui.closeMenu)}
          className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading xl:hidden"
        >
          <X size={18} />
        </button>

        {/* Marca */}
        <a href="#home" onClick={onClose} className="mx-7 mt-10 flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-hero font-mono text-sm font-bold text-hero-str">
            {"<MS/>"}
          </span>
          <span className="min-w-0">
            <span className="block text-base leading-tight font-bold text-heading">
              {profile.name}
            </span>
            <span className="mt-0.5 block text-xs font-medium tracking-wide text-muted uppercase">
              {t(ui.brand)}
            </span>
          </span>
        </a>

        <div className="mt-9 mb-6 h-px bg-line" />

        <nav aria-label={t(ui.brand)}>
          <ul className="space-y-1">
            {SECTION_IDS.map((id) => {
              const Icon = NAV_ICONS[id];
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={onClose}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex items-center gap-4 px-8 py-2.5"
                  >
                    <Icon
                      size={20}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-accent" : "text-muted group-hover:text-heading",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[15px] transition-colors",
                        isActive
                          ? "font-bold text-heading"
                          : "font-medium text-muted group-hover:text-heading",
                      )}
                    >
                      {t(ui.nav[id])}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-1/2 right-0 h-9 w-1 -translate-y-1/2 rounded-l-lg bg-pop shadow-[0_0_12px] shadow-pop/70 transition-opacity",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Tarjeta inferior (la "Upgrade to PRO" de Horizon, convertida en contacto) */}
        <div className="mt-auto px-5 pt-16 pb-8">
          <div className="relative rounded-[20px] bg-hero px-4 pt-14 pb-5 text-center">
            <div className="absolute -top-10 left-1/2 size-20 -translate-x-1/2 overflow-hidden rounded-full border-4 border-card bg-tile">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={80}
                height={80}
                sizes="80px"
                className="size-full object-cover"
              />
            </div>
            <p className="text-base font-bold text-hero-text">{t(profile.role)}</p>
            <p className="mt-1 text-sm text-hero-muted">{t(profile.location)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-hero-btn px-6 py-2.5 text-sm font-bold text-hero-btn-text transition-opacity hover:opacity-90"
            >
              <Mail size={15} /> {t(ui.contact.emailMe)}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
