"use client";

import { CalendarDays, GraduationCap, Trophy } from "lucide-react";

import { useLanguage } from "@/components/providers/language-provider";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { competitions, education, type Ranking } from "@/content/education";
import { ui } from "@/content/ui";
import { syntaxText } from "@/lib/syntax";
import { cn } from "@/lib/utils";

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
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-xl bg-tile ring-1 ring-line",
                    syntaxText(index + 3),
                  )}
                >
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
                    <RankingScale key={ranking.scope} ranking={ranking} />
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

/**
 * Escala del #1 (izquierda) al último puesto (derecha) con un punto donde quedó.
 * Se lee como "dónde estoy entre todos", no como una barra que se llena.
 */
function RankingScale({ ranking }: { ranking: Ranking }) {
  const { locale, t } = useLanguage();
  const { rank, total } = ranking;
  const format = (value: number) => value.toLocaleString(locale === "es" ? "es-CL" : "en-US");
  const position = total > 1 ? ((rank - 1) / (total - 1)) * 100 : 0;
  const topPercent = Math.max(1, Math.ceil((rank / total) * 100));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
        <dt className="text-muted">{t(ui.education.rankings[ranking.scope])}</dt>
        <dd className="flex items-center gap-2">
          <span className="font-bold text-heading">
            #{format(rank)}{" "}
            <span className="font-medium text-muted">
              {t(ui.education.of)} {format(total)}
            </span>
          </span>
          <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-bold text-success">
            Top {topPercent}%
          </span>
        </dd>
      </div>

      <div aria-hidden className="mt-3 px-1.5">
        <div className="relative h-1.5 rounded-full bg-tile">
          <span
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pop shadow-[0_0_10px] shadow-pop/60 ring-4 ring-pop/25"
            style={{ left: `${position}%` }}
          />
        </div>
      </div>
      <div aria-hidden className="mt-1.5 flex justify-between font-mono text-[11px] text-muted">
        <span>#1</span>
        <span>#{format(total)}</span>
      </div>
    </div>
  );
}
