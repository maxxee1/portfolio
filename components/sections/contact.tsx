"use client";

import { Check, Copy, Mail, MapPin, Send } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
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
          <div className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-[20px] bg-horizon p-7 sm:p-10">
            <div
              aria-hidden
              className="bg-dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom_right,#000_10%,transparent_65%)]"
            />
            <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-white/10" />

            <span className="grid size-14 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur">
              <Send size={24} />
            </span>
            <p className="mt-6 max-w-xl text-2xl leading-snug font-bold text-balance text-white sm:text-3xl">
              {t(ui.contact.description)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-brand-500 shadow-lg shadow-brand-900/20 transition hover:bg-white/90"
              >
                <Mail size={16} /> {t(ui.contact.emailMe)}
              </a>
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white ring-1 ring-white/40 transition hover:bg-white/10"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white ring-1 ring-white/40 transition hover:bg-white/10"
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
