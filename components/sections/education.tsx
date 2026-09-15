"use client";

import { CalendarDays, GraduationCap, Trophy } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { competitions, education, type Ranking } from "@/content/education";
import { ui } from "@/content/ui";

export function Education() {
  const { t } = useLanguage();

  return (
    <Section id="education" title={t(ui.education.title)}>
      <div className="grid gap-5 lg:grid-cols-2">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05} className="h-full">
            <article className="card flex h-full gap-4 p-6 sm:gap-5 sm:p-7">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-tile text-accent">
                <GraduationCap size={22} />
              </span>

              <div className="min-w-0">
                <h3 className="text-lg leading-snug font-bold text-heading">{t(item.degree)}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{item.school}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                  <CalendarDays size={14} /> {t(item.period)}
                </p>

                {item.description && (
                  <p className="mt-4 text-[15px] leading-relaxed text-body">{t(item.description)}</p>
                )}

                {item.courses && (
                  <div className="mt-5">
                    <p className="mb-2.5 text-xs font-bold tracking-wide text-muted uppercase">
                      {t(ui.education.currentCourses)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.courses.map((course) => (
                        <span
                          key={course.en}
                          className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
                        >
                          {t(course)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-10 mb-5 px-1 text-xl font-bold text-heading">
        {t(ui.education.competitions)}
      </h3>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {competitions.map((competition, index) => (
          <Reveal key={competition.id} delay={index * 0.05} className="h-full">
            <article className="card flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-12 place-items-center rounded-xl bg-horizon text-white shadow-lg shadow-brand-500/30">
                  <Trophy size={20} />
                </span>
                <span className="rounded-full bg-tile px-3 py-1 text-xs font-semibold text-muted">
                  {t(competition.date)}
                </span>
              </div>

              <h4 className="mt-5 text-sm font-semibold text-muted">{competition.name}</h4>
              <p className="mt-1 text-2xl font-bold text-heading">{t(competition.achievement)}</p>
              <p className="mt-1.5 text-sm text-body">{t(competition.detail)}</p>

              {competition.rankings && (
                <dl className="mt-auto space-y-4 pt-6">
                  {competition.rankings.map((ranking) => (
                    <RankingBar key={ranking.scope} ranking={ranking} />
                  ))}
                </dl>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function RankingBar({ ranking }: { ranking: Ranking }) {
  const { locale, t } = useLanguage();
  const { rank, total } = ranking;
  const format = (value: number) => value.toLocaleString(locale === "es" ? "es-CL" : "en-US");
  // Primer lugar = barra llena; último lugar = casi vacía.
  const standing = ((total - rank + 1) / total) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <dt className="text-muted">{t(ui.education.rankings[ranking.scope])}</dt>
        <dd className="font-bold text-heading">
          #{format(rank)}{" "}
          <span className="font-medium text-muted">
            {t(ui.education.of)} {format(total)}
          </span>
        </dd>
      </div>
      <Progress value={standing} className="mt-2" />
    </div>
  );
}
