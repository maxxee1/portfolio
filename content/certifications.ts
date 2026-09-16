import type { Localized, Text } from "@/lib/i18n";

export const CERT_GROUPS = ["security", "networking", "languages", "cloud"] as const;

export type CertGroup = (typeof CERT_GROUPS)[number];

export type Certification = {
  id: string;
  title: Text;
  provider: Text;
  status: "completed" | "in-progress";
  category: CertGroup;
  details?: Localized;
  /** Insignia en /public/images/credentials. */
  image?: string;
  /** Credencial pública (Credly). */
  url?: string;
  /** Verificación con código copiable. */
  verify?: { url: string; code: string };
};

export const certifications: readonly Certification[] = [
  {
    id: "itc",
    title: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    details: { es: "Emitida el 5 de junio de 2025", en: "Issued June 5, 2025" },
    status: "completed",
    category: "security",
    image: "itc.webp",
    url: "https://www.credly.com/badges/ef56a8d5-1ba8-4dde-90b2-295ad5da6b3c/public_url",
  },
  {
    id: "jcap",
    title: "Junior Cybersecurity Analyst Career Path",
    provider: "Cisco Networking Academy",
    details: { es: "Emitida el 7 de julio de 2025", en: "Issued July 7, 2025" },
    status: "completed",
    category: "security",
    image: "ce.webp",
    url: "https://www.credly.com/badges/0e8d7cb2-4e8d-4aa0-bfaa-24977276b72e/public_url",
  },
  {
    id: "eh",
    title: "Ethical Hacking",
    provider: "Cisco Networking Academy",
    status: "in-progress",
    category: "security",
    image: "eh.webp",
  },
  {
    id: "osint",
    title: { es: "OSINT Avanzado", en: "Advanced OSINT" },
    provider: {
      es: "Inteligencia de Fuentes Abiertas",
      en: "Open Source Intelligence",
    },
    status: "in-progress",
    category: "security",
    image: "oa.webp",
  },
  {
    id: "metasploit",
    title: "Ethical Hacking: Metasploit & Python",
    provider: { es: "Herramientas y Scripting", en: "Tools & Scripting" },
    status: "in-progress",
    category: "security",
    image: "oau.webp",
  },
  {
    id: "networking-basics",
    title: "Networking Basics",
    provider: "Cisco Networking Academy",
    details: { es: "Emitida el 22 de julio de 2025", en: "Issued July 22, 2025" },
    status: "completed",
    category: "networking",
    image: "ne.webp",
    url: "https://www.credly.com/badges/98ddfe39-d619-4956-91f4-7d4080b0960f/public_url",
  },
  {
    id: "englishscore",
    title: {
      es: "Inglés CEFR B2 (Upper Intermediate)",
      en: "English CEFR B2 (Upper Intermediate)",
    },
    provider: "Universidad Diego Portales × EnglishScore",
    details: {
      es: "Core skills B2 · Speaking B1 · Writing B1 · Junio 2026",
      en: "Core skills B2 · Speaking B1 · Writing B1 · June 2026",
    },
    status: "completed",
    category: "languages",
    // Misma URL a la que redirige el formulario de englishscore.com/verify:
    // devuelve el certificado en PDF servido por EnglishScore.
    verify: { url: "https://api2.englishscore.com/verify/2a2a20290143", code: "2a2a20290143" },
  },
  {
    id: "efd",
    title: "English for Developers",
    provider: "FreeCodeCamp",
    status: "in-progress",
    category: "languages",
    image: "efd.webp",
  },
  {
    id: "aws-microcredentials",
    title: { es: "Microcredenciales AWS", en: "AWS Microcredentials" },
    provider: "AWS Skill Builder",
    details: {
      es: "8 Exam Labs prácticos · Seguridad, redes, serverless, IA agéntica, MLOps y análisis de datos",
      en: "8 hands-on Exam Labs · Security, networking, serverless, agentic AI, MLOps and data analytics",
    },
    status: "in-progress",
    category: "cloud",
    url: "https://www.credly.com/users/maximiliano-adonis-solorza-madrid/badges/credly",
  },
];

export function certificationsIn(group: CertGroup): readonly Certification[] {
  return certifications.filter((cert) => cert.category === group);
}
