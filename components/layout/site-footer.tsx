"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-line bg-ink-soft">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm text-mist">{t(ui.footer.rights)}</p>
          <p className="mt-1 font-mono text-xs text-mist/60">{t(ui.footer.builtWith)}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-10 place-items-center rounded-full border border-line text-mist transition-colors hover:border-violet-bright/50 hover:text-chalk"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-10 place-items-center rounded-full border border-line text-mist transition-colors hover:border-violet-bright/50 hover:text-chalk"
          >
            <LinkedinIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
