import type { Localized, Text } from "@/lib/i18n";

export const CERT_GROUPS = ["security", "aws", "networking", "languages"] as const;

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
    status: "completed",
    category: "security",
    image: "itc.webp",
    url: "https://www.credly.com/badges/ef56a8d5-1ba8-4dde-90b2-295ad5da6b3c/public_url",
  },
  {
    id: "ce",
    title: "Cybersecurity Essentials",
    provider: "Cisco Networking Academy",
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
    id: "ne",
    title: "Networking Essentials",
    provider: "Cisco Networking Academy",
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
    id: "aws-incident-response",
    title: {
      es: "AWS Respuesta a Incidentes Demostrada",
      en: "AWS Incident Response Demonstrated",
    },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Seguridad", en: "Exam Lab · Security" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-application-networking",
    title: {
      es: "AWS Redes de Aplicaciones Demostrado",
      en: "AWS Application Networking Demonstrated",
    },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Redes", en: "Exam Lab · Networking" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-serverless",
    title: { es: "AWS Serverless Demostrado", en: "AWS Serverless Demonstrated" },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Serverless", en: "Exam Lab · Serverless" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-agentic-ai",
    title: { es: "AWS Agentic AI Demostrado", en: "AWS Agentic AI Demonstrated" },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · IA agéntica", en: "Exam Lab · Agentic AI" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-mlops",
    title: { es: "AWS MLOps Demostrado", en: "AWS MLOps Demonstrated" },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Machine Learning", en: "Exam Lab · Machine Learning" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-data-streaming",
    title: { es: "AWS Data Streaming Demostrado", en: "AWS Data Streaming Demonstrated" },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Análisis de datos", en: "Exam Lab · Data Analytics" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-data-lakehouse",
    title: { es: "AWS Data Lakehouse Demostrado", en: "AWS Data Lakehouse Demonstrated" },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Análisis de datos", en: "Exam Lab · Data Analytics" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "aws-data-visualization",
    title: { es: "AWS Data Visualization Demostrado", en: "AWS Data Visualization Demonstrated" },
    provider: "AWS Skill Builder",
    details: { es: "Exam Lab · Análisis de datos", en: "Exam Lab · Data Analytics" },
    status: "in-progress",
    category: "aws",
  },
  {
    id: "efd",
    title: "English for Developers",
    provider: "FreeCodeCamp",
    status: "in-progress",
    category: "languages",
    image: "efd.webp",
  },
];

export function certificationsIn(group: CertGroup): readonly Certification[] {
  return certifications.filter((cert) => cert.category === group);
}
