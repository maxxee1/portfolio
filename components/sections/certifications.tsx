"use client";

import { Check, Cloud, Copy, ExternalLink, Languages, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { CredentialList } from "@/components/ui/credential-list";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { certificationsIn, type Certification } from "@/content/certifications";
import { ui } from "@/content/ui";
import { useCopyToClipboard } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Certifications() {
  const { t } = useLanguage();

  // Ciberseguridad y redes comparten tarjeta: la columna izquierda de la sección.
  const secNet = [...certificationsIn("security"), ...certificationsIn("networking")];

  return (
    <Section id="certifications" title={t(ui.certifications.title)}>
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <CertificationGroup
            title={t(ui.certifications.groups.securityNetworking)}
            certs={secNet}
            columns
          />
        </Reveal>

        <div className="grid gap-5">
          <Reveal delay={0.05}>
            <CertificationGroup
              title={t(ui.certifications.groups.languages)}
              certs={certificationsIn("languages")}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <CertificationGroup
              title={t(ui.certifications.groups.cloud)}
              certs={certificationsIn("cloud")}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

type CertificationGroupProps = {
  title: string;
  certs: readonly Certification[];
  /** Reparte las fichas en dos columnas en vez de apilarlas. */
  columns?: boolean;
};

function CertificationGroup({ title, certs, columns }: CertificationGroupProps) {
  const { t } = useLanguage();
  // Una ficha que agrupa credenciales cuenta por todas las que agrupa.
  const weight = (cert: Certification) => cert.credentials?.length ?? 1;
  const total = certs.reduce((count, cert) => count + weight(cert), 0);
  const done = certs.reduce(
    (count, cert) => count + (cert.status === "completed" ? weight(cert) : 0),
    0,
  );

  return (
    <div className="card flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-heading">{title}</h3>
        <p className="text-sm text-muted">
          <span className="font-bold text-heading">
            {done}/{total}
          </span>{" "}
          {t(ui.certifications.completedCount)}
        </p>
      </div>
      <Progress value={(done / total) * 100} className="mt-3" />

      <ul
        className={cn(
          // Las fichas se reparten el alto sobrante en vez de dejar hueco entre ellas.
          "mt-5 grid flex-1 auto-rows-fr gap-3",
          columns && "sm:grid-cols-2",
        )}
      >
        {certs.map((cert) => (
          <li key={cert.id}>
            <CertificationTile cert={cert} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function CertificationTile({ cert }: { cert: Certification }) {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();
  const completed = cert.status === "completed";

  return (
    <article className="flex h-full items-start gap-4 rounded-2xl bg-tile p-4">
      <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-card ring-1 ring-line">
        {cert.image ? (
          <Image
            src={`/images/credentials/${cert.image}`}
            alt=""
            width={112}
            height={112}
            className="size-full object-cover"
          />
        ) : cert.category === "languages" ? (
          <Languages size={24} className="text-accent" />
        ) : cert.category === "cloud" ? (
          <Cloud size={24} className="text-accent" />
        ) : (
          <ShieldCheck size={24} className="text-accent" />
        )}
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <h4 className="text-sm leading-snug font-bold text-heading">{t(cert.title)}</h4>
        <p className="mt-0.5 text-xs text-muted">{t(cert.provider)}</p>
        {cert.details && <p className="mt-1.5 text-xs leading-relaxed text-muted">{t(cert.details)}</p>}
        {cert.issued && <p className="mt-1 text-[11px] text-muted/80">{t(cert.issued)}</p>}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-bold",
              completed ? "bg-success-soft text-success" : "bg-warning-soft text-warning",
            )}
          >
            {completed ? t(ui.certifications.completed) : t(ui.certifications.inProgress)}
          </span>

          {cert.url && <TileLink href={cert.url}>{t(ui.certifications.verify)}</TileLink>}

          {cert.credentials && (
            <CredentialList
              title={t(cert.title)}
              subtitle={t(cert.provider)}
              credentials={cert.credentials}
            />
          )}

          {cert.verify && (
            <>
              <TileLink href={cert.verify.url}>{t(ui.certifications.verify)}</TileLink>
              <button
                type="button"
                onClick={() => copy(cert.verify!.code)}
                title={t(ui.certifications.copyCode)}
                aria-label={`${t(ui.certifications.code)}: ${cert.verify.code}. ${t(ui.certifications.copyCode)}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-accent/50 bg-card px-2 py-0.5 font-mono text-[11px] text-heading transition-colors hover:border-accent"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-success" /> {t(ui.certifications.copied)}
                  </>
                ) : (
                  <>
                    <Copy size={11} className="text-muted" /> {cert.verify.code}
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function TileLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:underline"
    >
      {children} <ExternalLink size={11} />
    </a>
  );
}
