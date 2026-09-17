import { certifications, CERT_GROUPS } from "@/content/certifications";
import { competitions, education } from "@/content/education";
import { experience } from "@/content/experience";
import { facts, profile, resumes } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { ui } from "@/content/ui";
import { pick, type Locale, type Text } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const GROUP_TITLES = {
  security: ui.certifications.groups.securityNetworking,
  networking: ui.certifications.groups.securityNetworking,
  languages: ui.certifications.groups.languages,
  cloud: ui.certifications.groups.cloud,
};

/**
 * Todo el contenido del portafolio en Markdown plano (formato llms.txt), sacado
 * de los mismos módulos que la página. Incluye lo que en la web queda detrás de
 * un clic, como el detalle de cada microcredencial AWS.
 */
export function buildLlmsText(locale: Locale): string {
  const t = (text: Text) => pick(text, locale);
  const en = locale === "en";
  const lines: string[] = [];
  const push = (...rows: string[]) => lines.push(...rows);
  // Mismo formato y redondeo que las tarjetas de la web (13,3% en español).
  const numberLocale = en ? "en-US" : "es-CL";
  const formatNumber = (value: number) => value.toLocaleString(numberLocale);
  const percent = (part: number, whole: number) =>
    ((part / whole) * 100).toLocaleString(numberLocale, { maximumFractionDigits: 1 });

  push(`# ${profile.name} — ${t(profile.role)}`, "", `> ${t(profile.tagline)}`, "");
  push(
    en
      ? `Portfolio: ${SITE_URL} · Spanish version: ${SITE_URL}/llms.txt`
      : `Portafolio: ${SITE_URL} · Versión en inglés: ${SITE_URL}/llms-en.txt`,
    "",
  );

  push(`## ${t(ui.about.title)}`, "", ...profile.about[locale].flatMap((p) => [p, ""]));
  for (const fact of facts) push(`- **${t(fact.label)}:** ${t(fact.value)}`);
  push("");

  push(`## ${t(ui.contact.title)}`, "");
  push(`- Email: ${profile.email}`);
  push(`- GitHub: ${profile.social.github}`);
  push(`- LinkedIn: ${profile.social.linkedin}`);
  push(`- ${t(ui.cv.title)}: ${resumes.map((r) => `[${r.native}](${SITE_URL}${r.file})`).join(" · ")}`);
  push("");

  push(`## ${t(ui.experience.title)}`, "");
  for (const job of experience) {
    push(`### ${t(job.role)} — ${job.company}`, "", t(job.meta), "");
    if (job.summary) push(t(job.summary), "");
    for (const item of job.highlights) {
      push(item.lead ? `- **${t(item.lead)}:** ${t(item.text)}` : `- ${t(item.text)}`);
    }
    push("", `Stack: ${job.tags.join(", ")}`, "");
  }

  push(`## ${t(ui.projects.title)}`, "");
  for (const project of projects) {
    push(`### ${t(project.title)}`, "", t(project.description), "");
    const meta = [`Stack: ${project.tags.join(", ")}`];
    if (project.role === "collaborator") meta.push(t(ui.projects.collaborator));
    if (project.private) meta.push(t(ui.projects.privateProject));
    const links = project.links ?? {};
    if (links.github) meta.push(`GitHub: ${links.github}`);
    if (links.demo) meta.push(`Demo: ${links.demo}`);
    if (links.website && links.website !== links.github) meta.push(`${t(ui.projects.website)}: ${links.website}`);
    if (typeof links.code === "string") meta.push(`${t(ui.projects.viewCode)}: ${links.code}`);
    push(...meta.map((m) => `- ${m}`), "");
  }

  push(`## ${t(ui.skills.title)}`, "");
  for (const group of skillGroups) {
    push(`- **${t(group.title)}:** ${group.skills.map((s) => t(s.name)).join(", ")}`);
  }
  push("");

  push(`## ${t(ui.education.title)}`, "");
  for (const item of education) {
    push(`### ${t(item.degree)} — ${t(item.school)}`, "", t(item.period), "");
    if (item.description) push(t(item.description), "");
    if (item.courses) push(`${t(ui.education.currentCourses)}: ${item.courses.map(t).join(", ")}`, "");
  }

  push(`### ${t(ui.education.competitions)}`, "");
  for (const comp of competitions) {
    push(`#### ${comp.name} — ${t(comp.achievement)}`, "", `${t(comp.detail)} · ${t(comp.date)}`, "");
    if (comp.highlight) push(`- ${t(comp.highlight)}`);
    if (comp.categories) push(`- ${t(ui.education.categories)}: ${comp.categories.map(t).join(", ")}`);
    for (const r of comp.rankings ?? []) {
      const parts = [`${r.rank !== undefined ? `#${r.rank}` : "—"} ${t(ui.education.of)} ${r.total}`];
      if (r.rank !== undefined) parts.push(`Top ${percent(r.rank, r.total)}%`);
      if (r.score !== undefined) parts.push(`${formatNumber(r.score)} ${t(ui.education.points)}`);
      if (r.topScore !== undefined) parts.push(`${t(ui.education.leader)}: ${formatNumber(r.topScore)}`);
      push(`- ${t(ui.education.rankings[r.scope])}: ${parts.join(" · ")}`);
    }
    const team = comp.rankings?.find((r) => r.scope === "team");
    const individual = comp.rankings?.find((r) => r.scope === "individual");
    if (team?.score && individual?.score) {
      push(`- ${percent(individual.score, team.score)}% ${t(ui.education.contribution)}`);
    }
    if (comp.link) push(`- ${t(ui.education.aboutEvent)}: ${comp.link}`);
    push("");
  }

  push(`## ${t(ui.certifications.title)}`, "");
  const seenGroups = new Set<string>();
  for (const group of CERT_GROUPS) {
    const title = t(GROUP_TITLES[group]);
    if (!seenGroups.has(title)) {
      seenGroups.add(title);
      push(`### ${title}`, "");
    }
    for (const cert of certifications.filter((c) => c.category === group)) {
      const status = cert.status === "completed" ? t(ui.certifications.completed) : t(ui.certifications.inProgress);
      push(`#### ${t(cert.title)}`, "", `${t(cert.provider)} · ${status}`, "");
      if (cert.details) push(t(cert.details), "");
      if (cert.issued) push(t(cert.issued), "");
      const url = cert.url ?? cert.verify?.url;
      if (url) push(`${t(ui.certifications.verify)}: ${url}`, "");
      if (cert.verify) push(`${t(ui.certifications.code)}: ${cert.verify.code}`, "");

      for (const credential of cert.credentials ?? []) {
        push(`- **${t(credential.name)}** (${t(credential.domain)}): ${t(credential.summary)}`);
        for (const task of credential.tasks) push(`  - ${t(task)}`);
        if (credential.url) push(`  - ${t(ui.certifications.verify)}: ${credential.url}`);
      }
      if (cert.credentials) push("", t(ui.certifications.labIntro), "");
    }
  }

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

export function llmsResponse(locale: Locale): Response {
  return new Response(buildLlmsText(locale), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
