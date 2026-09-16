import type { Localized } from "@/lib/i18n";

/** Los íconos se piden a CDN como SVG sueltos y diferidos. La fuente de devicon
 *  pesaba 130 KB de CSS bloqueante + 1,5 MB de fuente para ~30 íconos. */
export type SkillIcon =
  | { source: "devicon"; name: string; variant?: string; invert?: boolean }
  | { source: "simple"; slug: string; color: string }
  | { source: "lucide"; name: LucideSkillIcon; color: string };

export type LucideSkillIcon = "network" | "shield-check" | "hard-drive" | "file-search" | "bot";

export type Skill = {
  /** Las marcas se escriben igual en los dos idiomas; lo demás se traduce. */
  name: string | Localized;
  icon: SkillIcon;
  /** Otras etiquetas (de proyectos o experiencia) que llevan a esta habilidad. */
  aliases?: readonly string[];
};

export type SkillGroup = {
  id: string;
  title: Localized;
  skills: readonly Skill[];
};

const devicon = (name: string, variant = "original", invert = false): SkillIcon => ({
  source: "devicon",
  name,
  variant,
  invert,
});

const simple = (slug: string, color: string): SkillIcon => ({
  source: "simple",
  slug,
  color,
});

export const skillGroups: readonly SkillGroup[] = [
  {
    id: "backend",
    title: {
      es: "Backend & Datos",
      en: "Backend & Data",
      de: "Backend & Daten",
      it: "Backend & Dati",
      nl: "Backend & Data",
    },
    skills: [
      { name: "C++", icon: devicon("cplusplus") },
      { name: "Java", icon: devicon("java") },
      { name: "Python", icon: devicon("python") },
      { name: "Node.js", icon: devicon("nodejs") },
      { name: "Express", icon: simple("express", "ffffff") },
      { name: "FastAPI", icon: devicon("fastapi") },
      { name: "PostgreSQL", icon: devicon("postgresql"), aliases: ["SQL"] },
      { name: "MongoDB", icon: devicon("mongodb") },
      { name: "Redis", icon: devicon("redis") },
      { name: "SupaBase", icon: devicon("supabase") },
      { name: "Vercel", icon: simple("vercel", "ffffff") },
      { name: "Arduino", icon: devicon("arduino") },
    ],
  },
  {
    id: "cloud",
    title: {
      es: "Cloud & Infraestructura",
      en: "Cloud & Infrastructure",
      de: "Cloud & Infrastruktur",
      it: "Cloud & Infrastruttura",
      nl: "Cloud & Infrastructuur",
    },
    skills: [
      { name: "Bash", icon: simple("gnubash", "ffffff") },
      { name: "Docker", icon: devicon("docker") },
      { name: "Kubernetes", icon: devicon("kubernetes") },
      {
        name: "Google Cloud",
        icon: devicon("googlecloud"),
        aliases: ["GCP", "Cloud Run", "BigQuery", "Secret Manager"],
      },
      { name: "AWS", icon: devicon("amazonwebservices", "plain-wordmark") },
      { name: "Cloudflare", icon: devicon("cloudflare") },
      { name: "Nginx", icon: devicon("nginx") },
      { name: "Sentry", icon: simple("sentry", "a78bfa") },
    ],
  },
  {
    id: "frontend",
    title: {
      es: "Frontend & Web Moderno",
      en: "Frontend & Modern Web",
      de: "Frontend & modernes Web",
      it: "Frontend & Web moderno",
      nl: "Frontend & modern web",
    },
    skills: [
      { name: "React", icon: devicon("react") },
      { name: "Next.js", icon: simple("nextdotjs", "ffffff") },
      { name: "Tailwind", icon: devicon("tailwindcss") },
      { name: "TypeScript", icon: devicon("typescript") },
      { name: "JavaScript", icon: devicon("javascript") },
      { name: "HTML", icon: devicon("html5") },
      { name: "CSS", icon: devicon("css3") },
      { name: "Git", icon: devicon("git") },
      // El de Simple Icons es el pájaro, no la marca: devicon trae el logotipo de
      // siempre, pero dibujado en negro, así que se invierte para el fondo oscuro.
      { name: "LaTeX", icon: devicon("latex", "original", true) },
    ],
  },
  {
    id: "security",
    title: {
      es: "Ciberseguridad & Herramientas",
      en: "Cybersecurity & Tools",
      de: "Cybersicherheit & Werkzeuge",
      it: "Cybersicurezza & Strumenti",
      nl: "Cybersecurity & Tools",
    },
    skills: [
      { name: "Wireshark", icon: simple("wireshark", "1679A7") },
      { name: "Burp Suite", icon: simple("burpsuite", "FF6633") },
      { name: "OWASP ZAP", icon: simple("zap", "4A9EFF") },
      { name: "Scapy", icon: { source: "lucide", name: "network", color: "#5eb3f6" } },
      { name: "Wazuh", icon: { source: "lucide", name: "shield-check", color: "#3595F9" } },
      { name: "Autopsy", icon: { source: "lucide", name: "hard-drive", color: "#22c55e" } },
      { name: "FOCA", icon: { source: "lucide", name: "file-search", color: "#f59e0b" } },
    ],
  },
  {
    id: "ai",
    title: {
      es: "IA, Agentes & APIs",
      en: "AI, Agents & APIs",
      de: "KI, Agenten & APIs",
      it: "IA, Agenti & API",
      nl: "AI, Agents & API's",
    },
    skills: [
      { name: "Claude Code", icon: simple("claude", "D97757") },
      { name: "MCP", icon: simple("modelcontextprotocol", "ffffff") },
      {
        name: {
          es: "Multiagentes",
          en: "Multi-agent",
          de: "Multi-Agenten",
          it: "Multi-agente",
          nl: "Multi-agent",
        },
        icon: { source: "lucide", name: "bot", color: "#a855f7" },
      },
      // Chatbots de WhatsApp e Instagram (Game Club) sobre la plataforma de Meta.
      { name: "Meta for Developers", icon: simple("meta", "0467DF"), aliases: ["Meta API"] },
      { name: "WhatsApp Cloud API", icon: simple("whatsapp", "25D366"), aliases: ["WhatsApp"] },
      { name: "Instagram API", icon: simple("instagram", "E4405F"), aliases: ["Instagram"] },
    ],
  },
];

export const DEVICON_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@2.17.0/icons";
export const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org";

export function skillIconUrl(icon: SkillIcon): string | null {
  if (icon.source === "devicon") {
    return `${DEVICON_CDN}/${icon.name}/${icon.name}-${icon.variant}.svg`;
  }
  if (icon.source === "simple") {
    return `${SIMPLE_ICONS_CDN}/${icon.slug}/${icon.color}`;
  }
  return null;
}

/** id del mosaico de la habilidad en la página: "C++" → "skill-cpp". */
export function skillAnchorId(skill: Skill): string {
  const name = typeof skill.name === "string" ? skill.name : skill.name.en;
  const slug = name
    .toLowerCase()
    .replace(/\+/g, "p")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `skill-${slug}`;
}

const normalize = (text: string) => text.trim().toLowerCase();

/** Nombre o alias (en cualquier idioma) → id del mosaico. */
const SKILL_ANCHORS = new Map<string, string>(
  skillGroups.flatMap((group) =>
    group.skills.flatMap((skill) => {
      const names = typeof skill.name === "string" ? [skill.name] : Object.values(skill.name);
      return [...names, ...(skill.aliases ?? [])].map(
        (label) => [normalize(label), skillAnchorId(skill)] as const,
      );
    }),
  ),
);

/** A qué habilidad lleva una etiqueta; `null` si no está en la sección de habilidades. */
export function skillAnchorFor(tag: string): string | null {
  return SKILL_ANCHORS.get(normalize(tag)) ?? null;
}
