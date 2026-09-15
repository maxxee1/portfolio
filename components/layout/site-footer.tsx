"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";

export function SiteFooter() {
  const { t } = useLanguage();

  const links = [
    { href: profile.social.github, label: "GitHub" },
    { href: profile.social.linkedin, label: "LinkedIn" },
    { href: `mailto:${profile.email}`, label: t(ui.contact.email) },
  ];

  return (
    // Margen extra abajo (móvil) y a la derecha (escritorio) para el botón flotante de volver arriba
    <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line px-2 pt-6 pb-20 lg:flex-row lg:pr-16 lg:pb-8">
      <div className="text-center lg:text-left">
        <p className="text-sm font-medium text-muted">{t(ui.footer.rights)}</p>
        <p className="mt-1 text-xs text-muted">{t(ui.footer.builtWith)}</p>
      </div>

      <ul className="flex flex-wrap items-center gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-muted transition-colors hover:text-heading"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
