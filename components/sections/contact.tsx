"use client";

import { Mail, MapPin } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";

export function Contact() {
  const { t } = useLanguage();

  return (
    <Section id="contact" eyebrow="07" title={t(ui.contact.title)}>
      <Reveal className="panel mx-auto max-w-2xl p-7 text-center sm:p-10">
        <p className="text-base text-mist">{t(ui.contact.description)}</p>

        <div className="mt-8 grid gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center justify-center gap-3 rounded-xl border border-line bg-surface-hi/50 px-4 py-3.5 text-sm text-chalk transition-colors hover:border-violet-bright/50"
          >
            <Mail size={18} className="text-violet-bright" />
            {profile.email}
          </a>
          <p className="flex items-center justify-center gap-3 rounded-xl border border-line bg-surface-hi/50 px-4 py-3.5 text-sm text-mist">
            <MapPin size={18} className="text-violet-bright" />
            {t(profile.location)}
          </p>
        </div>

        <div className="mt-7 flex gap-3">
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-deep to-violet text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <LinkedinIcon className="size-4" /> LinkedIn
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold text-chalk transition-colors hover:border-violet-bright/50"
          >
            <GithubIcon className="size-4" /> GitHub
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
