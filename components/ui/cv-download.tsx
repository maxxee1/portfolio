"use client";

import {
  ArrowLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileUser,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useLanguage } from "@/components/providers/language-provider";
import { resumes, type Resume } from "@/content/profile";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

/** Botón que abre un modal para elegir el idioma del CV y ver/descargar el PDF. */
export function CvDownload() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Resume | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setOpen(false);
    setSelected(null);
  };

  // Con el modal abierto: bloquear el scroll de fondo, cerrar con Escape y
  // llevar el foco al botón de cerrar.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selected) setSelected(null);
        else setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, selected]);

  return (
    <>
      {/* Enlace real al PDF en español: sin JavaScript (crawlers, lectores sin JS)
          abre el archivo; con JavaScript abre el modal. Ctrl/Cmd+clic mantiene
          el comportamiento normal del enlace. */}
      <a
        href={resumes[0].file}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
          event.preventDefault();
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-label={t(ui.cv.open)}
        title={t(ui.cv.open)}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-tile px-2.5 text-sm font-bold text-heading transition-colors hover:bg-accent hover:text-on-accent active:bg-accent active:text-on-accent sm:h-10 sm:pr-3.5 sm:pl-3"
      >
        <FileUser size={17} />
        {/* En el teléfono la píldora ya lleva idiomas, tema y el globo: solo el ícono. */}
        <span className="hidden sm:inline">{t(ui.cv.open)}</span>
      </a>

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
              onClick={close}
              className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {selected ? (
              <Viewer
                key={selected.id}
                resume={selected}
                onBack={() => setSelected(null)}
                onClose={close}
                closeRef={closeRef}
              />
            ) : (
              <Chooser onPick={setSelected} onClose={close} closeRef={closeRef} />
            )}
          </div>,
          document.body,
        )}
    </>
  );
}

type CloseRef = React.RefObject<HTMLButtonElement | null>;

/** Lista de idiomas, con la estética de tarjetas de la página. */
function Chooser({
  onPick,
  onClose,
  closeRef,
}: {
  onPick: (resume: Resume) => void;
  onClose: () => void;
  closeRef: CloseRef;
}) {
  const { t } = useLanguage();

  return (
    <div className="card animate-fade-in relative m-auto flex w-full max-w-md flex-col overflow-hidden">
      <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tile text-accent">
            <FileUser size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-heading">{t(ui.cv.title)}</p>
            <p className="truncate text-xs text-muted">{t(ui.cv.choose)}</p>
          </div>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t(ui.cv.close)}
          className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
        >
          <X size={18} />
        </button>
      </header>

      <ul className="flex flex-col gap-2 p-4">
        {resumes.map((resume) => (
          <li key={resume.id}>
            <button
              type="button"
              onClick={() => onPick(resume)}
              className="group flex w-full items-center gap-3 rounded-2xl bg-tile px-4 py-3.5 text-left ring-1 ring-transparent transition-all hover:ring-accent/40"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-bold text-heading">
                  {resume.title}
                </span>
                <span className="block truncate text-xs text-muted">{resume.native}</span>
              </span>
              <ChevronRight
                size={18}
                className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Visor del PDF elegido, con volver / abrir en pestaña / descargar / cerrar. */
const ZOOM_MIN = 50;
const ZOOM_MAX = 250;
const ZOOM_STEP = 25;

function Viewer({
  resume,
  onBack,
  onClose,
  closeRef,
}: {
  resume: Resume;
  onBack: () => void;
  onClose: () => void;
  closeRef: CloseRef;
}) {
  const { t } = useLanguage();
  // El Viewer se remonta por CV (key en el padre), así que parte en 100% solo.
  const [zoom, setZoom] = useState(100);

  const changeZoom = (delta: number) =>
    setZoom((value) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value + delta)));

  return (
    <div className="card animate-fade-in relative flex w-full max-w-4xl flex-col overflow-hidden">
      <header className="flex items-center justify-between gap-2 border-b border-line px-3 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label={t(ui.cv.back)}
            title={t(ui.cv.back)}
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
          >
            <ArrowLeft size={18} />
          </button>
          <span className="hidden size-9 shrink-0 place-items-center rounded-full bg-tile text-accent sm:grid">
            <FileUser size={17} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-heading">{t(ui.cv.title)}</p>
            <p className="truncate text-xs text-muted">
              {resume.title} · {resume.native}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Zoom propio (reemplaza la barra nativa del visor). */}
          <div className="flex items-center rounded-full bg-tile p-1">
            <button
              type="button"
              onClick={() => changeZoom(-ZOOM_STEP)}
              disabled={zoom <= ZOOM_MIN}
              aria-label={t(ui.cv.zoomOut)}
              title={t(ui.cv.zoomOut)}
              className="grid size-7 place-items-center rounded-full text-accent transition-colors hover:bg-accent hover:text-on-accent disabled:pointer-events-none disabled:opacity-40 sm:size-8"
            >
              <ZoomOut size={15} />
            </button>
            <span className="w-9 text-center font-mono text-[11px] font-bold text-heading tabular-nums">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={() => changeZoom(ZOOM_STEP)}
              disabled={zoom >= ZOOM_MAX}
              aria-label={t(ui.cv.zoomIn)}
              title={t(ui.cv.zoomIn)}
              className="grid size-7 place-items-center rounded-full text-accent transition-colors hover:bg-accent hover:text-on-accent disabled:pointer-events-none disabled:opacity-40 sm:size-8"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          <a
            href={resume.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(ui.cv.openTab)}
            title={t(ui.cv.openTab)}
            className="hidden size-9 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading sm:grid"
          >
            <ExternalLink size={17} />
          </a>
          <a
            href={resume.file}
            download={resume.filename}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-3 text-sm font-bold text-on-accent transition-opacity hover:opacity-90 sm:px-4"
          >
            <Download size={16} />
            <span className="hidden sm:inline">{t(ui.cv.download)}</span>
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t(ui.cv.close)}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* El visor nativo renderiza el PDF; toolbar=0 quita su barra y navpanes=0 las
          miniaturas. El zoom se pasa por el parámetro y la key fuerza recarga al cambiar. */}
      <iframe
        key={`${resume.id}-${zoom}`}
        src={`${resume.file}#toolbar=0&navpanes=0&statusbar=0&zoom=${zoom}`}
        title={`${t(ui.cv.title)} — ${resume.native}`}
        className={cn("min-h-0 w-full flex-1 bg-tile")}
      />
    </div>
  );
}
