"use client";

import { Download, ExternalLink, FileUser, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "@/components/providers/language-provider";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";

/** Botón que abre una vista previa del CV (PDF) dentro de la página, con descarga. */
export function CvDownload() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Con el visor abierto: bloquear el scroll de fondo, cerrar con Escape y
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
        aria-label={t(ui.cv.open)}
        title={t(ui.cv.open)}
        className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
      >
        <FileUser size={18} />
      </button>

      {open &&
        createPortal(
          // Portal al <body>: la barra usa backdrop-filter, que atraparía un
          // elemento fixed dentro de sus ~77px de alto.
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t(ui.cv.title)}
            className="fixed inset-0 z-[60] flex justify-center p-3 sm:p-6"
          >
          <div
            aria-hidden
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
          />

          <div className="card animate-fade-in relative flex w-full max-w-4xl flex-col overflow-hidden">
            <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tile text-accent">
                  <FileUser size={17} />
                </span>
                <p className="truncate text-sm font-bold text-heading">{t(ui.cv.title)}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={profile.cv.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(ui.cv.openTab)}
                  title={t(ui.cv.openTab)}
                  className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
                >
                  <ExternalLink size={17} />
                </a>
                <a
                  href={profile.cv.file}
                  download={profile.cv.filename}
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-sm font-bold text-on-accent transition-opacity hover:opacity-90"
                >
                  <Download size={16} /> {t(ui.cv.download)}
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t(ui.cv.close)}
                  className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

              {/* El visor nativo del navegador renderiza el PDF. */}
              <iframe
                src={`${profile.cv.file}#view=FitH`}
                title={t(ui.cv.title)}
                className="min-h-0 w-full flex-1 bg-tile"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
