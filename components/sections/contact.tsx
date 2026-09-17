"use client";

import { Check, Copy, FileUser, Mail, MapPin, Send } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { profile, resumes } from "@/content/profile";
import { ui } from "@/content/ui";
import { useCopyToClipboard } from "@/lib/hooks";

/** "github.com/usuario" a partir de la URL completa. */
const handle = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

export function Contact() {
  const { t } = useLanguage();
  const { copied, copy } = useCopyToClipboard();

  return (
    <Section id="contact" title={t(ui.contact.title)}>
      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="bg-hero relative isolate flex h-full flex-col justify-center overflow-hidden rounded-[20px] p-7 sm:p-10">
            <div
              aria-hidden
              className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom_right,#000_10%,transparent_65%)]"
            />
            <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-hero-glow blur-2xl" />
            <div aria-hidden className="absolute -bottom-28 left-1/4 -z-10 size-64 rounded-full bg-hero-glow-2 blur-2xl" />

            <span className="grid size-14 place-items-center rounded-2xl bg-hero-chip text-hero-str ring-1 ring-hero-ring/40 backdrop-blur">
              <Send size={24} />
            </span>
            <p className="mt-6 max-w-xl text-2xl leading-snug font-bold text-balance text-hero-text sm:text-3xl">
              {t(ui.contact.description)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-hero-btn px-6 text-sm font-bold text-hero-btn-text shadow-lg shadow-hero-btn/25 transition hover:opacity-90"
              >
                <Mail size={16} /> {t(ui.contact.emailMe)}
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold text-hero-text ring-1 ring-hero-ring transition hover:bg-hero-chip"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold text-hero-text ring-1 ring-hero-ring transition hover:bg-hero-chip"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-2" delay={0.05}>
          <ul className="card flex h-full flex-col justify-center gap-3 p-5 sm:p-6">
            <ContactRow Icon={Mail} label={t(ui.contact.email)} value={profile.email} href={`mailto:${profile.email}`}>
              <button
                type="button"
                onClick={() => copy(profile.email)}
                aria-label={copied ? t(ui.contact.copied) : t(ui.contact.copyEmail)}
                title={copied ? t(ui.contact.copied) : t(ui.contact.copyEmail)}
                className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-card hover:text-heading"
              >
                {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </ContactRow>
            <ContactRow Icon={MapPin} label={t(ui.contact.location)} value={t(profile.location)} />
            <ContactRow
              Icon={LinkedinIcon}
              label="LinkedIn"
              value={handle(profile.social.linkedin)}
              href={profile.social.linkedin}
            />
            <ContactRow
              Icon={GithubIcon}
              label="GitHub"
              value={handle(profile.social.github)}
              href={profile.social.github}
            />
            {/* Enlaces directos a los PDF: visibles para buscadores e IAs sin abrir el modal. */}
            <li className="flex items-center gap-4 rounded-2xl bg-tile p-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-accent">
                <FileUser className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted">{t(ui.cv.title)}</p>
                <p className="flex flex-wrap gap-x-3 text-sm font-semibold text-heading">
                  {resumes.map((resume) => (
                    <a
                      key={resume.id}
                      href={resume.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      hrefLang={resume.id}
                      type="application/pdf"
                      className="hover:text-accent"
                    >
                      {resume.native}
                    </a>
                  ))}
                </p>
              </div>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

type ContactRowProps = {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  children?: ReactNode;
};

function ContactRow({ Icon, label, value, href, children }: ContactRowProps) {
  const external = href?.startsWith("http");

  return (
    <li className="flex items-center gap-4 rounded-2xl bg-tile p-3.5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-accent">
        <Icon className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted">{label}</p>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="block truncate text-sm font-semibold text-heading hover:text-accent"
          >
            {value}
          </a>
        ) : (
          <p className="truncate text-sm font-semibold text-heading">{value}</p>
        )}
      </div>
      {children}
    </li>
  );
}
