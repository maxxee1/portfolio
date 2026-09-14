"use client";

import { Check, Languages } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import {
  CERT_GROUPS,
  certificationsIn,
  type Certification,
} from "@/content/certifications";
import { ui } from "@/content/ui";
import { cn } from "@/lib/utils";

export function Certifications() {
  const { t } = useLanguage();

  return (
    <Section id="certifications" eyebrow="06" title={t(ui.certifications.title)}>
      <div className="space-y-10">
        {CERT_GROUPS.map((group) => (
          <div key={group}>
            <h3 className="eyebrow mb-5">{t(ui.certifications.groups[group])}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificationsIn(group).map((cert, index) => (
                <Reveal key={cert.id} delay={Math.min(index, 4) * 0.05} className="h-full">
                  <CertificationCard cert={cert} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const completed = cert.status === "completed";

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Navegadores sin Clipboard API (o sin contexto seguro)
      const input = document.createElement("textarea");
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="panel panel-interactive flex h-full gap-4 p-5">
      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-violet-deep/30">
        {cert.image ? (
          <Image
            src={`/images/credentials/${cert.image}`}
            alt=""
            width={80}
            height={80}
            className="size-full scale-125 object-cover"
          />
        ) : (
          <Languages size={26} className="text-violet-bright" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm leading-snug font-semibold text-chalk">{t(cert.title)}</h4>
        <p className="mt-1 text-xs text-mist">{t(cert.provider)}</p>
        {cert.details && <p className="mt-1.5 text-[11px] text-mist/80">{t(cert.details)}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              completed
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-amber-500/15 text-amber-400",
            )}
          >
            {completed ? t(ui.certifications.completed) : t(ui.certifications.inProgress)}
          </span>

          {cert.url && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-chalk transition-colors hover:border-violet-bright/50"
            >
              {t(ui.certifications.viewCredential)}
            </a>
          )}

          {cert.verify && (
            <>
              <a
                href={cert.verify.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-chalk transition-colors hover:border-violet-bright/50"
              >
                {t(ui.certifications.verify)}
              </a>
              <button
                type="button"
                onClick={() => copyCode(cert.verify!.code)}
                title={t(ui.certifications.copyCode)}
                className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-violet/60 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-chalk"
              >
                {copied ? (
                  <>
                    <Check size={11} /> {t(ui.certifications.copied)}
                  </>
                ) : (
                  cert.verify.code
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
