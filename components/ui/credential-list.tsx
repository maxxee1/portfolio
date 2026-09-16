"use client";

import { ArrowLeft, BadgeCheck, Check, ChevronRight, ExternalLink, FlaskConical, X } from "lucide-react";
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
  // Credencial abierta en detalle; null muestra la lista completa.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const backRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const lastSelectedRef = useRef<string | null>(null);

  const selected = credentials.find((credential) => credential.id === selectedId) ?? null;

  const close = () => {
    setOpen(false);
    setSelectedId(null);
  };

  // Con el modal abierto: bloquear el scroll de fondo, cerrar con Escape y
  // llevar el foco al botón de cerrar.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Al entrar al detalle el foco va a "volver"; al regresar, a la fila que se abrió.
  useEffect(() => {
    if (!open) return;
    if (selectedId) {
      lastSelectedRef.current = selectedId;
      backRef.current?.focus();
    } else if (lastSelectedRef.current) {
      listRef.current
        ?.querySelector<HTMLButtonElement>(`[data-credential="${lastSelectedRef.current}"]`)
        ?.focus();
    }
  }, [open, selectedId]);

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
            aria-label={selected ? t(selected.name) : title}
            className="fixed inset-0 z-[60] flex justify-center p-3 sm:p-6"
          >
            <div
              aria-hidden
              onClick={close}
              className="animate-fade-in absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <div className="card animate-fade-in relative m-auto flex max-h-full w-full max-w-lg flex-col overflow-hidden">
              <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  {selected ? (
                    <button
                      ref={backRef}
                      type="button"
                      onClick={() => setSelectedId(null)}
                      aria-label={t(ui.certifications.back)}
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-tile text-accent transition-colors hover:text-heading"
                    >
                      <ArrowLeft size={18} />
                    </button>
                  ) : (
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-tile text-accent">
                      <BadgeCheck size={18} />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-heading">{title}</p>
                    <p className="truncate text-xs text-muted">{subtitle}</p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={t(ui.certifications.close)}
                  className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-tile hover:text-heading"
                >
                  <X size={18} />
                </button>
              </header>

              {selected ? (
                <CredentialDetail
                  key={selected.id}
                  credential={selected}
                  onBack={() => setSelectedId(null)}
                  onClose={close}
                />
              ) : (
                <ul ref={listRef} className="animate-fade-in flex flex-col gap-2 overflow-y-auto p-4">
                  {credentials.map((credential) => (
                    <li key={credential.id}>
                      <CredentialRow
                        credential={credential}
                        onSelect={() => setSelectedId(credential.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function StatusBadge({ credential }: { credential: Microcredential }) {
  const { t } = useLanguage();

  return credential.url ? (
    <span className="shrink-0 rounded-full bg-tile px-2.5 py-0.5 text-[11px] font-bold text-accent">
      {t(ui.certifications.completed)}
    </span>
  ) : (
    <span className="shrink-0 rounded-full bg-warning-soft px-2.5 py-0.5 text-[11px] font-bold text-warning">
      {t(ui.certifications.inProgress)}
    </span>
  );
}

/** Fila de la lista: abre el detalle de la credencial. */
function CredentialRow({
  credential,
  onSelect,
}: {
  credential: Microcredential;
  onSelect: () => void;
}) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onSelect}
      data-credential={credential.id}
      className="group flex w-full items-center gap-3 rounded-2xl bg-tile px-4 py-3.5 text-left ring-1 ring-transparent transition-all hover:ring-accent/40"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-snug font-bold text-heading">
          {t(credential.name)}
        </span>
        <span className="block truncate text-xs text-muted">{t(credential.domain)}</span>
      </span>
      <StatusBadge credential={credential} />
      <ChevronRight
        size={16}
        className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </button>
  );
}

/** Detalle de una credencial: en qué consiste el lab y lo que se implementa. */
function CredentialDetail({
  credential,
  onBack,
  onClose,
}: {
  credential: Microcredential;
  onBack: () => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();

  return (
    <>
      <div className="animate-fade-in flex flex-col gap-4 overflow-y-auto p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted">{t(credential.domain)}</span>
            <StatusBadge credential={credential} />
          </div>
          <h3 className="mt-1 text-lg leading-snug font-bold text-heading">{t(credential.name)}</h3>
          <p className="mt-2 text-sm text-body">{t(credential.summary)}</p>
        </div>

        <p className="flex gap-2.5 rounded-2xl bg-tile px-4 py-3 text-xs leading-relaxed text-muted">
          <FlaskConical size={16} className="mt-0.5 shrink-0 text-accent" />
          {t(ui.certifications.labIntro)}
        </p>

        <div>
          <p className="text-xs font-bold tracking-wide text-heading uppercase">
            {t(ui.certifications.labTasks)}
          </p>
          <ul className="mt-2 flex flex-col gap-2">
            {credential.tasks.map((task) => (
              <li key={task.en} className="flex gap-2.5 text-sm text-body">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                {t(task)}
              </li>
            ))}
          </ul>
        </div>

        {credential.url && (
          <a
            href={credential.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 self-start text-xs font-bold text-accent hover:underline"
          >
            {t(ui.certifications.verify)} <ExternalLink size={12} />
          </a>
        )}
      </div>

      <footer className="flex justify-end gap-2 border-t border-line px-5 py-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full bg-tile px-4 py-2 text-xs font-bold text-heading transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} /> {t(ui.certifications.back)}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full px-4 py-2 text-xs font-bold text-muted transition-colors hover:bg-tile hover:text-heading"
        >
          {t(ui.certifications.close)}
        </button>
      </footer>
    </>
  );
}
