"use client";

import { useEffect, useState, type ReactNode } from "react";

import { BackToTop } from "@/components/layout/back-to-top";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { useActiveSection, useIsDesktop } from "@/lib/hooks";

/** Estructura de Horizon UI: barra lateral fija + barra superior sticky + contenido. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const active = useActiveSection();
  const isDesktop = useIsDesktop();
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerOpen = menuOpen && !isDesktop;

  // Con el menú abierto en móvil la página de atrás no debe scrollear
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-dvh">
      <Sidebar
        active={active}
        open={menuOpen}
        isDesktop={isDesktop}
        onClose={() => setMenuOpen(false)}
      />

      <div className="px-3 sm:px-5 xl:ml-[290px] xl:px-6">
        <div className="mx-auto w-full max-w-[1400px]">
          <Navbar active={active} menuOpen={drawerOpen} onOpenMenu={() => setMenuOpen(true)} />
          <main className="pb-4">{children}</main>
          <SiteFooter />
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
