import type { Localized } from "@/lib/i18n";

export type ExperienceHighlight = {
  /** Título en negrita del punto. Si falta, la viñeta es solo texto. */
  lead?: Localized;
  text: Localized;
};

export type Experience = {
  id: string;
  role: Localized;
  company: string;
  /** Logo en /public/images/experience. */
  logo?: string;
  /** Llena el círculo (object-cover, sin borde) en vez de object-contain. */
  logoCover?: boolean;
  /** Escala del logo dentro del chip (1 = sin zoom). */
  logoZoom?: number;
  meta: Localized;
  /** Puesto vigente: lleva la insignia de "Presente". */
  current?: boolean;
  summary?: Localized;
  highlights: readonly ExperienceHighlight[];
  tags: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    id: "gameclub",
    role: { es: "Solo Developer", en: "Solo Developer" },
    company: "Movistar Game Club",
    logo: "gameclub.webp",
    logoZoom: 1.15,
    meta: {
      es: "Junio 2026 - Presente · Freelance · Santiago, Chile",
      en: "June 2026 - Present · Freelance · Santiago, Chile",
    },
    current: true,
    summary: {
      es: "Único desarrollador de la plataforma de atención al cliente con IA y del CRM de Movistar Game Club, red de clubes gamer en Santiago. Proyecto construido de punta a punta a partir de requerimientos de alto nivel.",
      en: "Sole developer of the AI customer-service platform and CRM for Movistar Game Club, a network of gaming clubs in Santiago. Built end to end from high-level requirements.",
    },
    highlights: [
      {
        lead: {
          es: "Arquitectura y diseño end-to-end",
          en: "End-to-end architecture & design",
        },
        text: {
          es: "El cliente solo entregó requerimientos a alto nivel; yo tomé todas las decisiones de arquitectura, stack, modelo de datos y diseño de UI/UX, y me encargué del desarrollo, despliegue y operación.",
          en: "The client only provided high-level requirements; I made every architecture, stack, data-model and UI/UX design decision, and owned development, deployment and operations.",
        },
      },
      {
        lead: { es: "Chatbot IA multicanal", en: "Multichannel AI chatbot" },
        text: {
          es: "Bot de atención en FastAPI para WhatsApp e Instagram sobre un único flujo compartido: FAQ con matching en 3 niveles (keywords → fuzzy → embeddings semánticos) y fallback a Gemini con memoria conversacional acotada y conocimiento del negocio editable desde Google Sheets.",
          en: "FastAPI customer-service bot for WhatsApp and Instagram on a single shared flow: 3-tier FAQ matching (keywords → fuzzy → semantic embeddings) with a Gemini fallback using bounded conversational memory and business knowledge editable from Google Sheets.",
        },
      },
      {
        lead: {
          es: "Flujo conversacional y tickets",
          en: "Conversation flow & ticketing",
        },
        text: {
          es: "Máquina de estados con feedback, reintentos, escalamiento a tickets y encuestas de satisfacción (CSAT), más un buffer anti-fragmentación de mensajes en Redis.",
          en: "State machine with feedback, retries, escalation to tickets and satisfaction surveys (CSAT), plus an anti-fragmentation message buffer on Redis.",
        },
      },
      {
        lead: { es: "Cóndor IA: ruteo inteligente", en: "Cóndor AI: smart routing" },
        text: {
          es: "Clasificación automática de tickets con IA según la taxonomía del negocio y ruteo por nivel y sede al trabajador adecuado, con asignación ponderada por carga, desempeño y rotación.",
          en: "AI ticket classification against the business taxonomy and routing by tier and location to the right agent, with assignment weighted by workload, performance and rotation.",
        },
      },
      {
        lead: { es: "Panel de soporte", en: "Support dashboard" },
        text: {
          es: "SPA en React + TypeScript + Tailwind: gestión de tickets, historial completo de chats, toma de la conversación por agentes humanos, borradores de respuesta con IA, roles y ajustes del bot en caliente.",
          en: "React + TypeScript + Tailwind SPA: ticket management, full chat history, human agent takeover, AI-drafted replies, roles and live bot settings.",
        },
      },
      {
        lead: { es: "Cóndor CRM", en: "Cóndor CRM" },
        text: {
          es: "Segundo producto en Next.js 15 sobre Vercel: segmentación de clientes por comportamiento de compra en BigQuery y campañas por email (SendGrid) y WhatsApp redactadas con IA, con plantillas editables y controles de entregabilidad.",
          en: "Second product built with Next.js 15 on Vercel: customer segmentation by purchase behavior on BigQuery and AI-drafted email (SendGrid) and WhatsApp campaigns, with editable templates and deliverability safeguards.",
        },
      },
      {
        lead: { es: "Google Cloud Platform", en: "Google Cloud Platform" },
        text: {
          es: "Despliegue con Docker en Cloud Run (modos de costo/rendimiento sin redeploy), BigQuery para tickets, mensajes e índice de embeddings, Secret Manager para credenciales, IAM de mínimo privilegio con service accounts, Cloud Logging con logs JSON estructurados y scripts de infraestructura idempotentes con migraciones de esquema.",
          en: "Docker deployment on Cloud Run (cost/performance modes without redeploying), BigQuery for tickets, messages and the embeddings index, Secret Manager for credentials, least-privilege IAM with service accounts, Cloud Logging with structured JSON logs, and idempotent infrastructure scripts with schema migrations.",
        },
      },
      {
        lead: { es: "Seguridad y calidad", en: "Security & quality" },
        text: {
          es: "Validación de firmas de webhooks de Meta, sesiones JWT en cookies HttpOnly, rate limiting por IP y por cuenta, CSP estricta, consultas parametrizadas y una suite de ~500 tests con pytest.",
          en: "Meta webhook signature validation, JWT sessions in HttpOnly cookies, per-IP and per-account rate limiting, strict CSP, parameterized queries and a ~500-test pytest suite.",
        },
      },
    ],
    tags: [
      "Python",
      "FastAPI",
      "Gemini",
      "WhatsApp Cloud API",
      "Instagram API",
      "React",
      "TypeScript",
      "Next.js",
      "Cloud Run",
      "BigQuery",
      "Secret Manager",
      "Redis",
      "Docker",
    ],
  },
  {
    id: "abacus",
    role: {
      es: "Pasante en Ingeniería de Software",
      en: "Software Engineering Intern",
    },
    company: "Abacus RX - Miami, FL",
    logo: "abacus.webp",
    meta: {
      es: "Diciembre 2025 - Marzo 2026",
      en: "December 2025 - March 2026",
    },
    summary: {
      es: "Construí un sistema de trazabilidad para aseguradoras de accidentes laborales de trayecto: reúne toda la información del caso (accidente, médico, diagnóstico, medicamentos, efectos secundarios, fechas, lugar, ruta y jurisdicciones) para sustentar la demanda.",
      en: "Built a traceability system for insurers of work-commute accidents: it gathers the full case record (accident, physician, diagnosis, medication, side effects, dates, location, route and jurisdictions) to back the claim.",
    },
    highlights: [
      {
        text: {
          es: "Generación automática del Excel y del reporte de la demanda a partir de los datos del caso",
          en: "Automatic generation of the claim’s Excel and report from the case data",
        },
      },
      {
        text: {
          es: "Optimización de la búsqueda: debounce del input (sin consultas de más al tipear, mínimo 3 letras) y tokenización de la consulta al estilo booleano",
          en: "Search optimization: input debounce (no extra queries while typing, min. 3 letters) and boolean-style query tokenization",
        },
      },
      {
        text: {
          es: "Segunda aplicación en Kotlin Multiplatform para generar reportes de inspecciones",
          en: "Second app in Kotlin Multiplatform to generate inspection reports",
        },
      },
    ],
    tags: ["Visual Basic", "Kotlin Multiplatform", "SQL Server"],
  },
  {
    id: "udp",
    role: {
      es: "Profesor Auxiliar - Bases de Datos",
      en: "Teaching Assistant - Databases",
    },
    company: "Universidad Diego Portales",
    logo: "udp.webp",
    logoCover: true,
    meta: {
      es: "Marzo 2025 - Diciembre 2025",
      en: "March 2025 - December 2025",
    },
    highlights: [
      {
        text: {
          es: "Impartí clases sobre SQL, triggers y procedimientos almacenados",
          en: "Taught classes on SQL, triggers, and stored procedures",
        },
      },
      {
        text: {
          es: "Guié laboratorios prácticos y sesiones de consulta para estudiantes",
          en: "Guided practical labs and consultation sessions for students",
        },
      },
      {
        text: {
          es: "Corregí evaluaciones y elaboré material práctico adicional",
          en: "Graded assessments and developed additional practical material",
        },
      },
      {
        text: {
          es: "Asistí a estudiantes en proyectos de diseño y optimización de bases de datos",
          en: "Assisted students in database design and optimization projects",
        },
      },
    ],
    tags: ["PostgreSQL", "SQL", "Triggers", "Stored Procedures", "Query Optimization"],
  },
];
