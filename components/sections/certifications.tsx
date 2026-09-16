"use client";

import { Check, Cloud, Copy, ExternalLink, Languages, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/components/providers/language-provider";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  CERT_GROUPS,
  certificationsIn,
  type Certification,
} from "@/content/certifications";
import { ui } from "@/content/ui";
import { useCopyToClipboard } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function Certifications() {
  const { t } = useLanguage();

  return (
    <Section id="certifications" title={t(ui.certifications.title)}>
      <div className="grid gap-5 lg:grid-cols-2">
        {CERT_GROUPS.map((group, index) => {
          const certs = certificationsIn(group);
          const done = certs.filter((cert) => cert.status === "completed").length;
          // Los grupos grandes ocupan todo el ancho y reparten sus fichas en columnas.
          const wide = certs.length >= 4;

          return (
            <Reveal key={group} delay={index * 0.05} className={cn("h-full", wide && "lg:col-span-2")}>
              <div className="card h-full p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-heading">
                    {t(ui.certifications.groups[group])}
                  </h3>
                  <p className="text-sm text-muted">
                    <span className="font-bold text-heading">
                      {done}/{certs.length}
                    </span>{" "}
                    {t(ui.certifications.completedCount)}
                  </p>
                </div>
                <Progress value={(done / certs.length) * 100} className="mt-3" />

                <ul
                  className={cn(
                    "mt-5 grid gap-3",
                    wide && "md:grid-cols-2 xl:grid-cols-3",
                  )}
                >
                  {certs.map((cert) => (
                    <li key={cert.id}>
                      <CertificationTile cert={cert} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function CertificationTile({ cert }: { cert: Certification }) {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();
  const completed = cert.status === "completed";

  return (
    <article className="flex h-full items-start gap-4 rounded-2xl bg-tile p-4">
      <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full bg-card">
        {cert.image ? (
          <Image
            src={`/images/credentials/${cert.image}`}
            alt=""
            width={72}
            height={72}
            className="size-full scale-125 object-cover"
          />
        ) : cert.category === "languages" ? (
          <Languages size={24} className="text-accent" />
        ) : cert.category === "aws" ? (
          <Cloud size={24} className="text-accent" />
        ) : (
          <ShieldCheck size={24} className="text-accent" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm leading-snug font-bold text-heading">{t(cert.title)}</h4>
        <p className="mt-0.5 text-xs text-muted">{t(cert.provider)}</p>
        {cert.details && <p className="mt-1 text-xs text-muted">{t(cert.details)}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-bold",
              completed ? "bg-success-soft text-success" : "bg-warning-soft text-warning",
            )}
          >
            {completed ? t(ui.certifications.completed) : t(ui.certifications.inProgress)}
          </span>

          {cert.url && <TileLink href={cert.url}>{t(ui.certifications.viewCredential)}</TileLink>}

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
