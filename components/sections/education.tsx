"use client";

import { Trophy } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { competitions, education } from "@/content/education";
import { ui } from "@/content/ui";

export function Education() {
  const { t } = useLanguage();

  return (
    <Section id="education" eyebrow="05" title={t(ui.education.title)}>
      <div className="grid gap-5">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <article className="panel panel-interactive p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-violet-bright">{t(item.degree)}</h3>
              <p className="mt-1 font-medium text-chalk">{item.school}</p>
              <p className="mt-1 font-mono text-xs text-mist">{t(item.period)}</p>

              {item.description && (
                <p className="mt-4 text-sm leading-relaxed text-mist">{t(item.description)}</p>
              )}

              {item.courses && (
                <div className="mt-5">
                  <p className="eyebrow mb-2.5">{t(ui.education.currentCourses)}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map((course) => (
                      <span key={course.en} className="chip">
                        {t(course)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-14 mb-6 text-xl font-semibold text-chalk">
        {t(ui.education.competitions)}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((competition, index) => (
          <Reveal key={competition.id} delay={index * 0.05} className="h-full">
            <article className="panel panel-interactive h-full p-6">
              <div className="mb-4 flex items-center gap-2 text-violet-bright">
                <Trophy size={16} />
                <h4 className="text-sm font-semibold">{competition.name}</h4>
              </div>
              <p className="text-xl font-bold text-chalk">{t(competition.achievement)}</p>
              <p className="mt-2 text-sm text-mist">{t(competition.detail)}</p>
              <p className="mt-4 font-mono text-xs text-mist/70">{t(competition.date)}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
