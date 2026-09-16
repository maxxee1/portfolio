"use client";

import { BadgeCheck, ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "@/components/providers/language-provider";
import type { Microcredential } from "@/content/certifications";
import { ui } from "@/content/ui";

type CredentialListProps = {
  /** Título del modal: el de la ficha que agrupa las credenciales. */
  title: string;
  subtitle: string;
  credentials: readonly Microcredential[];
};

/** Enlace de la ficha que abre la lista de credenciales que agrupa. */
export function CredentialList({ title, subtitle, credentials }: CredentialListProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Con el modal abierto: bloquear el scroll de fondo, cerrar con Escape y
  // llevar el foco al botón de cerrar.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"
      >
        {t(ui.certifications.viewCredentials)} <BadgeCheck size={12} />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[60] flex justify-center p-3 sm:p-6"
          >
            <div
              aria-hidden
              onClick={() => setOpen(false)}
              className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="card animate-fade-in relative m-auto flex max-h-full w-full max-w-lg flex-col overflow-hidden">
              <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tile text-accent">
                    <BadgeCheck size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-heading">{title}</p>
                    <p className="truncate text-xs text-muted">{subtitle}</p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t(ui.certifications.close)}
                  className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
                >
                  <X size={18} />
                </button>
              </header>

              <ul className="flex flex-col gap-2 overflow-y-auto p-4">
                {credentials.map((credential) => (
                  <li key={credential.id}>
                    <CredentialRow credential={credential} />
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/** Fila enlazada a la credencial; sin URL emitida queda como texto con su estado. */
function CredentialRow({ credential }: { credential: Microcredential }) {
  const { t } = useLanguage();

  const content = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-snug font-bold text-heading">
          {t(credential.name)}
        </span>
        <span className="block truncate text-xs text-muted">{t(credential.domain)}</span>
      </span>
      {credential.url ? (
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-accent">
          {t(ui.certifications.verify)} <ExternalLink size={12} />
        </span>
      ) : (
        <span className="shrink-0 rounded-full bg-warning-soft px-2.5 py-0.5 text-[11px] font-bold text-warning">
          {t(ui.certifications.inProgress)}
        </span>
      )}
    </>
  );

  if (!credential.url) {
    return <div className="flex items-center gap-3 rounded-2xl bg-tile px-4 py-3.5">{content}</div>;
  }

  return (
    <a
      href={credential.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-2xl bg-tile px-4 py-3.5 ring-1 ring-transparent transition-all hover:ring-accent/40"
    >
      {content}
    </a>
  );
}
