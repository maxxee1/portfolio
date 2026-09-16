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

const DOMAIN_SECURITY: Localized = {
  es: "Seguridad",
  en: "Security",
  de: "Sicherheit",
  it: "Sicurezza",
  nl: "Beveiliging",
};

const DOMAIN_NETWORKING: Localized = {
  es: "Redes",
  en: "Networking",
  de: "Netzwerke",
  it: "Reti",
  nl: "Netwerken",
};

const DOMAIN_DATA: Localized = {
  es: "Análisis de datos",
  en: "Data Analytics",
  de: "Datenanalyse",
  it: "Analisi dei dati",
  nl: "Data-analyse",
};

/** Exam Labs de AWS Skill Builder. La URL se agrega cuando Credly emite la insignia. */
export const awsMicrocredentials: readonly Microcredential[] = [
  {
    id: "incident-response",
    name: {
      es: "AWS Respuesta a Incidentes Demostrada",
      en: "AWS Incident Response Demonstrated",
      de: "AWS Incident Response Demonstrated",
      it: "AWS Incident Response Demonstrated",
      nl: "AWS Incident Response Demonstrated",
    },
    domain: DOMAIN_SECURITY,
  },
  {
    id: "application-networking",
    name: {
      es: "AWS Redes de Aplicaciones Demostrado",
      en: "AWS Application Networking Demonstrated",
      de: "AWS Application Networking Demonstrated",
      it: "AWS Application Networking Demonstrated",
      nl: "AWS Application Networking Demonstrated",
    },
    domain: DOMAIN_NETWORKING,
  },
  {
    id: "serverless",
    name: {
      es: "AWS Serverless Demostrado",
      en: "AWS Serverless Demonstrated",
      de: "AWS Serverless Demonstrated",
      it: "AWS Serverless Demonstrated",
      nl: "AWS Serverless Demonstrated",
    },
    domain: {
      es: "Serverless",
      en: "Serverless",
      de: "Serverless",
      it: "Serverless",
      nl: "Serverless",
    },
  },
  {
    id: "agentic-ai",
    name: {
      es: "AWS Agentic AI Demostrado",
      en: "AWS Agentic AI Demonstrated",
      de: "AWS Agentic AI Demonstrated",
      it: "AWS Agentic AI Demonstrated",
      nl: "AWS Agentic AI Demonstrated",
    },
    domain: {
      es: "IA agéntica",
      en: "Agentic AI",
      de: "Agentische KI",
      it: "IA agentica",
      nl: "Agentische AI",
    },
  },
  {
    id: "mlops",
    name: {
      es: "AWS MLOps Demostrado",
      en: "AWS MLOps Demonstrated",
      de: "AWS MLOps Demonstrated",
      it: "AWS MLOps Demonstrated",
      nl: "AWS MLOps Demonstrated",
    },
    domain: {
      es: "Machine Learning",
      en: "Machine Learning",
      de: "Machine Learning",
      it: "Machine Learning",
      nl: "Machine learning",
    },
  },
  {
    id: "data-streaming",
    name: {
      es: "AWS Data Streaming Demostrado",
      en: "AWS Data Streaming Demonstrated",
      de: "AWS Data Streaming Demonstrated",
      it: "AWS Data Streaming Demonstrated",
      nl: "AWS Data Streaming Demonstrated",
    },
    domain: DOMAIN_DATA,
  },
  {
    id: "data-lakehouse",
    name: {
      es: "AWS Data Lakehouse Demostrado",
      en: "AWS Data Lakehouse Demonstrated",
      de: "AWS Data Lakehouse Demonstrated",
      it: "AWS Data Lakehouse Demonstrated",
      nl: "AWS Data Lakehouse Demonstrated",
    },
    domain: DOMAIN_DATA,
  },
  {
    id: "data-visualization",
    name: {
      es: "AWS Data Visualization Demostrado",
      en: "AWS Data Visualization Demonstrated",
      de: "AWS Data Visualization Demonstrated",
      it: "AWS Data Visualization Demonstrated",
      nl: "AWS Data Visualization Demonstrated",
    },
    domain: DOMAIN_DATA,
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
      de: "Bedrohungen, Angriffe und Best Practices zum Schutz von Daten und Geräten",
      it: "Minacce, attacchi e buone pratiche per proteggere dati e dispositivi",
      nl: "Dreigingen, aanvallen en best practices om data en apparaten te beschermen",
    },
    issued: {
      es: "Emitida el 5 de junio de 2025",
      en: "Issued June 5, 2025",
      de: "Ausgestellt am 5. Juni 2025",
      it: "Rilasciata il 5 giugno 2025",
      nl: "Uitgegeven op 5 juni 2025",
    },
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
      de: "Junior-Analyst-Pfad: SOC-Monitoring, Incident Response und Verkehrsanalyse",
      it: "Percorso da analista junior: monitoraggio nel SOC, risposta agli incidenti e analisi del traffico",
      nl: "Traject voor junior analist: SOC-monitoring, incidentrespons en verkeersanalyse",
    },
    issued: {
      es: "Emitida el 7 de julio de 2025",
      en: "Issued July 7, 2025",
      de: "Ausgestellt am 7. Juli 2025",
      it: "Rilasciata il 7 luglio 2025",
      nl: "Uitgegeven op 7 juli 2025",
    },
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
      de: "Pentesting von A bis Z: Aufklärung, Scanning, Exploitation und Reporting",
      it: "Pentesting dall'inizio alla fine: ricognizione, scansione, sfruttamento e report",
      nl: "Pentesten van begin tot eind: verkenning, scannen, exploitatie en rapportage",
    },
    status: "in-progress",
    category: "security",
    image: "eh.webp",
  },
  {
    id: "osint",
    title: {
      es: "OSINT Avanzado",
      en: "Advanced OSINT",
      de: "Fortgeschrittenes OSINT",
      it: "OSINT avanzato",
      nl: "Gevorderde OSINT",
    },
    provider: {
      es: "Inteligencia de Fuentes Abiertas",
      en: "Open Source Intelligence",
      de: "Open Source Intelligence",
      it: "Open Source Intelligence",
      nl: "Open Source Intelligence",
    },
    details: {
      es: "Búsqueda avanzada, huella digital, metadatos y geolocalización de fuentes públicas",
      en: "Advanced search, digital footprint, metadata and geolocation from public sources",
      de: "Erweiterte Suche, digitaler Fußabdruck, Metadaten und Geolokalisierung öffentlicher Quellen",
      it: "Ricerca avanzata, impronta digitale, metadati e geolocalizzazione da fonti pubbliche",
      nl: "Geavanceerd zoeken, digitale voetafdruk, metadata en geolocatie uit openbare bronnen",
    },
    status: "in-progress",
    category: "security",
    image: "oa.webp",
  },
  {
    id: "metasploit",
    title: "Ethical Hacking: Metasploit & Python",
    provider: {
      es: "Herramientas y Scripting",
      en: "Tools & Scripting",
      de: "Werkzeuge & Scripting",
      it: "Strumenti e scripting",
      nl: "Tools en scripting",
    },
    details: {
      es: "Explotación con Metasploit y automatización de herramientas ofensivas en Python",
      en: "Exploitation with Metasploit and offensive tooling automation in Python",
      de: "Exploitation mit Metasploit und Automatisierung offensiver Werkzeuge in Python",
      it: "Sfruttamento con Metasploit e automazione di strumenti offensivi in Python",
      nl: "Exploitatie met Metasploit en automatisering van offensieve tools in Python",
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
      de: "OSI-Modell, IP-Adressierung, Routing und Konfiguration kleiner Netzwerke",
      it: "Modello OSI, indirizzamento IP, routing e configurazione di piccole reti",
      nl: "OSI-model, IP-adressering, routering en configuratie van kleine netwerken",
    },
    issued: {
      es: "Emitida el 22 de julio de 2025",
      en: "Issued July 22, 2025",
      de: "Ausgestellt am 22. Juli 2025",
      it: "Rilasciata il 22 luglio 2025",
      nl: "Uitgegeven op 22 juli 2025",
    },
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
      de: "Englisch GER B2 (Upper Intermediate)",
      it: "Inglese QCER B2 (Upper Intermediate)",
      nl: "Engels ERK B2 (Upper Intermediate)",
    },
    provider: "Universidad Diego Portales × EnglishScore",
    details: {
      es: "Core skills B2 · Speaking B1 · Writing B1",
      en: "Core skills B2 · Speaking B1 · Writing B1",
      de: "Core Skills B2 · Speaking B1 · Writing B1",
      it: "Core skills B2 · Speaking B1 · Writing B1",
      nl: "Core skills B2 · Speaking B1 · Writing B1",
    },
    issued: {
      es: "Emitido en junio de 2026",
      en: "Issued June 2026",
      de: "Ausgestellt im Juni 2026",
      it: "Rilasciato a giugno 2026",
      nl: "Uitgegeven in juni 2026",
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
    details: {
      es: "Inglés técnico para trabajar en equipos de desarrollo: reuniones, code reviews y documentación",
      en: "Technical English for development teams: meetings, code reviews and documentation",
      de: "Technisches Englisch für Entwicklungsteams: Meetings, Code-Reviews und Dokumentation",
      it: "Inglese tecnico per i team di sviluppo: riunioni, code review e documentazione",
      nl: "Technisch Engels voor ontwikkelteams: meetings, code reviews en documentatie",
    },
    status: "in-progress",
    category: "languages",
    image: "efd.webp",
  },
  {
    id: "aws-microcredentials",
    title: {
      es: "8 Microcredenciales AWS",
      en: "8 AWS Microcredentials",
      de: "8 AWS-Microcredentials",
      it: "8 microcredenziali AWS",
      nl: "8 AWS-microcredentials",
    },
    provider: "AWS Skill Builder",
    details: {
      es: "Exam Lab práctico · Seguridad, redes, serverless, IA agéntica, MLOps y análisis de datos",
      en: "Hands-on Exam Lab · Security, networking, serverless, agentic AI, MLOps and data analytics",
      de: "Praktisches Exam Lab · Sicherheit, Netzwerke, Serverless, agentische KI, MLOps und Datenanalyse",
      it: "Exam Lab pratico · Sicurezza, reti, serverless, IA agentica, MLOps e analisi dei dati",
      nl: "Praktisch Exam Lab · Beveiliging, netwerken, serverless, agentische AI, MLOps en data-analyse",
    },
    status: "in-progress",
    category: "cloud",
    credentials: awsMicrocredentials,
  },
];

export function certificationsIn(group: CertGroup): readonly Certification[] {
  return certifications.filter((cert) => cert.category === group);
}
