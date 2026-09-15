"use client";

import { Mail, X } from "lucide-react";
import Image from "next/image";

import { NAV_ICONS } from "@/components/layout/nav-icons";
import { SidebarTerminal } from "@/components/layout/sidebar-terminal";
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
          "fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col overflow-y-auto border-r border-line bg-card shadow-2xl shadow-black/20 transition-transform duration-300 ease-out xl:translate-x-0 xl:shadow-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* En móvil el botón de cerrar va en su propia fila para no tapar la terminal */}
        <div className="flex justify-end px-3 pt-3 xl:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label={t(ui.closeMenu)}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
          >
            <X size={18} />
          </button>
        </div>

        <a
          href="#home"
          onClick={onClose}
          aria-label={t(ui.nav.home)}
          className="mx-4 mt-1 block xl:mt-6"
        >
          <SidebarTerminal />
        </a>

        <div className="mt-6 mb-4 h-px bg-line" />

        <nav aria-label={t(ui.brand)}>
          <ul className="space-y-0.5">
            {SECTION_IDS.map((id) => {
              const Icon = NAV_ICONS[id];
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={onClose}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex items-center gap-3 px-6 py-2.5"
                  >
                    <Icon
                      size={19}
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive ? "text-accent" : "text-muted group-hover:text-heading",
                      )}
                    />
                    <span
                      className={cn(
                        "truncate text-[15px] transition-colors",
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
        <div className="mt-auto px-4 pt-14 pb-6">
          <div className="relative rounded-[20px] bg-hero px-3 pt-12 pb-4 text-center">
            <div className="absolute -top-9 left-1/2 size-[72px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-card bg-tile">
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={72}
                height={72}
                sizes="72px"
                className="size-full object-cover"
              />
            </div>
            <p className="text-sm font-bold text-hero-text">{t(profile.role)}</p>
            <p className="mt-0.5 text-xs text-hero-muted">{t(profile.location)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-hero-btn px-5 py-2 text-sm font-bold text-hero-btn-text transition-opacity hover:opacity-90"
            >
              <Mail size={15} /> {t(ui.contact.emailMe)}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
