import type { Localized, Text } from "@/lib/i18n";

export const CERT_GROUPS = ["security", "networking", "languages", "cloud"] as const;

export type CertGroup = (typeof CERT_GROUPS)[number];

/** Una de las microcredenciales que agrupa una ficha (se listan en un modal). */
export type Microcredential = {
  id: string;
  name: Text;
  domain: Localized;
  /** Credencial pública en Credly. Sin ella la fila no enlaza a ninguna parte. */
  url?: string;
};

export type Certification = {
  id: string;
  title: Text;
  provider: Text;
  status: "completed" | "in-progress";
  category: CertGroup;
  details?: Localized;
  /** Fecha de emisión, en su propia línea. */
  issued?: Localized;
  /** Insignia en /public/images/credentials. */
  image?: string;
  /** Credencial pública (Credly). */
  url?: string;
  /** Verificación con código copiable. */
  verify?: { url: string; code: string };
  /** Microcredenciales que agrupa la ficha: abren un modal con la lista. */
  credentials?: readonly Microcredential[];
};

/** Exam Labs de AWS Skill Builder. La URL se agrega cuando Credly emite la insignia. */
export const awsMicrocredentials: readonly Microcredential[] = [
  {
    id: "incident-response",
    name: {
      es: "AWS Respuesta a Incidentes Demostrada",
      en: "AWS Incident Response Demonstrated",
    },
    domain: { es: "Seguridad", en: "Security" },
  },
  {
    id: "application-networking",
    name: {
      es: "AWS Redes de Aplicaciones Demostrado",
      en: "AWS Application Networking Demonstrated",
    },
    domain: { es: "Redes", en: "Networking" },
  },
  {
    id: "serverless",
    name: { es: "AWS Serverless Demostrado", en: "AWS Serverless Demonstrated" },
    domain: { es: "Serverless", en: "Serverless" },
  },
  {
    id: "agentic-ai",
    name: { es: "AWS Agentic AI Demostrado", en: "AWS Agentic AI Demonstrated" },
    domain: { es: "IA agéntica", en: "Agentic AI" },
  },
  {
    id: "mlops",
    name: { es: "AWS MLOps Demostrado", en: "AWS MLOps Demonstrated" },
    domain: { es: "Machine Learning", en: "Machine Learning" },
  },
  {
    id: "data-streaming",
    name: { es: "AWS Data Streaming Demostrado", en: "AWS Data Streaming Demonstrated" },
    domain: { es: "Análisis de datos", en: "Data Analytics" },
  },
  {
    id: "data-lakehouse",
    name: { es: "AWS Data Lakehouse Demostrado", en: "AWS Data Lakehouse Demonstrated" },
    domain: { es: "Análisis de datos", en: "Data Analytics" },
  },
  {
    id: "data-visualization",
    name: {
      es: "AWS Data Visualization Demostrado",
      en: "AWS Data Visualization Demonstrated",
    },
    domain: { es: "Análisis de datos", en: "Data Analytics" },
  },
];

export const certifications: readonly Certification[] = [
  {
    id: "itc",
    title: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    details: {
      es: "Amenazas, ataques y buenas prácticas para proteger datos y dispositivos",
      en: "Threats, attacks and best practices for protecting data and devices",
    },
    issued: { es: "Emitida el 5 de junio de 2025", en: "Issued June 5, 2025" },
    status: "completed",
    category: "security",
    image: "itc.webp",
    url: "https://www.credly.com/badges/ef56a8d5-1ba8-4dde-90b2-295ad5da6b3c/public_url",
  },
  {
    id: "jcap",
    title: "Junior Cybersecurity Analyst Career Path",
    provider: "Cisco Networking Academy",
    details: {
      es: "Ruta de analista junior: monitoreo en el SOC, respuesta a incidentes y análisis de tráfico",
      en: "Junior analyst path: SOC monitoring, incident response and traffic analysis",
    },
    issued: { es: "Emitida el 7 de julio de 2025", en: "Issued July 7, 2025" },
    status: "completed",
    category: "security",
    image: "ce.webp",
    url: "https://www.credly.com/badges/0e8d7cb2-4e8d-4aa0-bfaa-24977276b72e/public_url",
  },
  {
    id: "eh",
    title: "Ethical Hacking",
    provider: "Cisco Networking Academy",
    details: {
      es: "Pentesting de principio a fin: reconocimiento, escaneo, explotación y reporte",
      en: "End-to-end pentesting: reconnaissance, scanning, exploitation and reporting",
    },
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
    details: {
      es: "Búsqueda avanzada, huella digital, metadatos y geolocalización de fuentes públicas",
      en: "Advanced search, digital footprint, metadata and geolocation from public sources",
    },
    status: "in-progress",
    category: "security",
    image: "oa.webp",
  },
  {
    id: "metasploit",
    title: "Ethical Hacking: Metasploit & Python",
    provider: { es: "Herramientas y Scripting", en: "Tools & Scripting" },
    details: {
      es: "Explotación con Metasploit y automatización de herramientas ofensivas en Python",
      en: "Exploitation with Metasploit and offensive tooling automation in Python",
    },
    status: "in-progress",
    category: "security",
    image: "oau.webp",
  },
  {
    id: "networking-basics",
    title: "Networking Basics",
    provider: "Cisco Networking Academy",
    details: {
      es: "Modelo OSI, direccionamiento IP, enrutamiento y configuración de redes pequeñas",
      en: "OSI model, IP addressing, routing and small-network configuration",
    },
    issued: { es: "Emitida el 22 de julio de 2025", en: "Issued July 22, 2025" },
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
      es: "Core skills B2 · Speaking B1 · Writing B1",
      en: "Core skills B2 · Speaking B1 · Writing B1",
    },
    issued: { es: "Emitido en junio de 2026", en: "Issued June 2026" },
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
    details: {
      es: "Inglés técnico para trabajar en equipos de desarrollo: reuniones, code reviews y documentación",
      en: "Technical English for development teams: meetings, code reviews and documentation",
    },
    status: "in-progress",
    category: "languages",
    image: "efd.webp",
  },
  {
    id: "aws-microcredentials",
    title: { es: "8 Microcredenciales AWS", en: "8 AWS Microcredentials" },
    provider: "AWS Skill Builder",
    details: {
      es: "Exam Lab práctico · Seguridad, redes, serverless, IA agéntica, MLOps y análisis de datos",
      en: "Hands-on Exam Lab · Security, networking, serverless, agentic AI, MLOps and data analytics",
    },
    status: "in-progress",
    category: "cloud",
    credentials: awsMicrocredentials,
  },
];

export function certificationsIn(group: CertGroup): readonly Certification[] {
  return certifications.filter((cert) => cert.category === group);
}
