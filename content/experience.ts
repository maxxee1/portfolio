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
    role: {
      es: "Solo Developer",
      en: "Solo Developer",
      de: "Solo Developer",
      it: "Solo Developer",
      nl: "Solo Developer",
    },
    company: "Movistar Game Club",
    logo: "gameclub.webp",
    logoZoom: 1.15,
    meta: {
      es: "Junio 2026 - Presente · Freelance · Santiago, Chile",
      en: "June 2026 - Present · Freelance · Santiago, Chile",
      de: "Juni 2026 - heute · Freelance · Santiago, Chile",
      it: "Giugno 2026 - Presente · Freelance · Santiago, Cile",
      nl: "Juni 2026 - heden · Freelance · Santiago, Chili",
    },
    current: true,
    summary: {
      es: "Único desarrollador de la plataforma de atención al cliente con IA y del CRM de Movistar Game Club, red de clubes gamer en Santiago. Proyecto construido de punta a punta a partir de requerimientos de alto nivel.",
      en: "Sole developer of the AI customer-service platform and CRM for Movistar Game Club, a network of gaming clubs in Santiago. Built end to end from high-level requirements.",
      de: "Alleiniger Entwickler der KI-Kundenserviceplattform und des CRM von Movistar Game Club, einem Netzwerk von Gaming-Clubs in Santiago. Von Anfang bis Ende aus grob umrissenen Anforderungen aufgebaut.",
      it: "Unico sviluppatore della piattaforma di assistenza clienti con IA e del CRM di Movistar Game Club, rete di club gaming a Santiago. Progetto realizzato dall'inizio alla fine a partire da requisiti di alto livello.",
      nl: "Enige ontwikkelaar van het AI-klantenserviceplatform en het CRM van Movistar Game Club, een netwerk van gamingclubs in Santiago. Van begin tot eind gebouwd op basis van globale eisen.",
    },
    highlights: [
      {
        lead: {
          es: "Arquitectura y diseño end-to-end",
          en: "End-to-end architecture & design",
          de: "Architektur und Design von A bis Z",
          it: "Architettura e design end-to-end",
          nl: "Architectuur en ontwerp van begin tot eind",
        },
        text: {
          es: "El cliente solo entregó requerimientos a alto nivel; yo tomé todas las decisiones de arquitectura, stack, modelo de datos y diseño de UI/UX, y me encargué del desarrollo, despliegue y operación.",
          en: "The client only provided high-level requirements; I made every architecture, stack, data-model and UI/UX design decision, and owned development, deployment and operations.",
          de: "Der Kunde lieferte nur grobe Anforderungen; ich traf alle Entscheidungen zu Architektur, Stack, Datenmodell und UI/UX-Design und verantwortete Entwicklung, Deployment und Betrieb.",
          it: "Il cliente ha fornito solo requisiti di alto livello; ho preso tutte le decisioni su architettura, stack, modello dati e design UI/UX, occupandomi di sviluppo, deployment e gestione.",
          nl: "De klant leverde alleen globale eisen; ik nam alle beslissingen over architectuur, stack, datamodel en UI/UX-ontwerp en verzorgde de ontwikkeling, uitrol en het beheer.",
        },
      },
      {
        lead: {
          es: "Chatbot IA multicanal",
          en: "Multichannel AI chatbot",
          de: "Multikanal-KI-Chatbot",
          it: "Chatbot IA multicanale",
          nl: "Multichannel AI-chatbot",
        },
        text: {
          es: "Bot de atención en FastAPI para WhatsApp e Instagram sobre un único flujo compartido: FAQ con matching en 3 niveles (keywords → fuzzy → embeddings semánticos) y fallback a Gemini con memoria conversacional acotada y conocimiento del negocio editable desde Google Sheets.",
          en: "FastAPI customer-service bot for WhatsApp and Instagram on a single shared flow: 3-tier FAQ matching (keywords → fuzzy → semantic embeddings) with a Gemini fallback using bounded conversational memory and business knowledge editable from Google Sheets.",
          de: "FastAPI-Servicebot für WhatsApp und Instagram auf einem gemeinsamen Flow: FAQ-Matching in drei Stufen (Keywords → Fuzzy → semantische Embeddings) mit Gemini als Fallback, begrenztem Gesprächsgedächtnis und in Google Sheets pflegbarem Geschäftswissen.",
          it: "Bot di assistenza in FastAPI per WhatsApp e Instagram su un unico flusso condiviso: FAQ con matching a 3 livelli (parole chiave → fuzzy → embedding semantici) e fallback su Gemini con memoria conversazionale limitata e conoscenza del business modificabile da Google Sheets.",
          nl: "FastAPI-servicebot voor WhatsApp en Instagram op één gedeelde flow: FAQ-matching in drie niveaus (trefwoorden → fuzzy → semantische embeddings) met Gemini als terugval, begrensd gespreksgeheugen en bedrijfskennis die in Google Sheets bewerkt wordt.",
        },
      },
      {
        lead: {
          es: "Flujo conversacional y tickets",
          en: "Conversation flow & ticketing",
          de: "Gesprächsfluss & Ticketing",
          it: "Flusso conversazionale e ticket",
          nl: "Gespreksflow en tickets",
        },
        text: {
          es: "Máquina de estados con feedback, reintentos, escalamiento a tickets y encuestas de satisfacción (CSAT), más un buffer anti-fragmentación de mensajes en Redis.",
          en: "State machine with feedback, retries, escalation to tickets and satisfaction surveys (CSAT), plus an anti-fragmentation message buffer on Redis.",
          de: "Zustandsautomat mit Feedback, Wiederholungen, Eskalation zu Tickets und Zufriedenheitsumfragen (CSAT), dazu ein Anti-Fragmentierungs-Puffer für Nachrichten in Redis.",
          it: "Macchina a stati con feedback, tentativi ripetuti, escalation a ticket e sondaggi di soddisfazione (CSAT), più un buffer anti-frammentazione dei messaggi su Redis.",
          nl: "Toestandsmachine met feedback, nieuwe pogingen, escalatie naar tickets en tevredenheidsenquêtes (CSAT), plus een antifragmentatiebuffer voor berichten op Redis.",
        },
      },
      {
        lead: {
          es: "Cóndor IA: ruteo inteligente",
          en: "Cóndor AI: smart routing",
          de: "Cóndor KI: intelligentes Routing",
          it: "Cóndor IA: instradamento intelligente",
          nl: "Cóndor AI: slimme routering",
        },
        text: {
          es: "Clasificación automática de tickets con IA según la taxonomía del negocio y ruteo por nivel y sede al trabajador adecuado, con asignación ponderada por carga, desempeño y rotación.",
          en: "AI ticket classification against the business taxonomy and routing by tier and location to the right agent, with assignment weighted by workload, performance and rotation.",
          de: "KI-Klassifizierung der Tickets nach der Geschäftstaxonomie und Routing nach Stufe und Standort an die passende Person, mit Zuweisung gewichtet nach Auslastung, Leistung und Rotation.",
          it: "Classificazione automatica dei ticket con IA secondo la tassonomia aziendale e instradamento per livello e sede all'operatore giusto, con assegnazione pesata per carico, prestazioni e rotazione.",
          nl: "Automatische ticketclassificatie met AI volgens de bedrijfstaxonomie en routering per niveau en vestiging naar de juiste medewerker, met toewijzing gewogen op werkdruk, prestaties en rotatie.",
        },
      },
      {
        lead: {
          es: "Panel de soporte",
          en: "Support dashboard",
          de: "Support-Dashboard",
          it: "Pannello di supporto",
          nl: "Supportdashboard",
        },
        text: {
          es: "SPA en React + TypeScript + Tailwind: gestión de tickets, historial completo de chats, toma de la conversación por agentes humanos, borradores de respuesta con IA, roles y ajustes del bot en caliente.",
          en: "React + TypeScript + Tailwind SPA: ticket management, full chat history, human agent takeover, AI-drafted replies, roles and live bot settings.",
          de: "SPA mit React + TypeScript + Tailwind: Ticketverwaltung, vollständiger Chatverlauf, Übernahme durch menschliche Agenten, KI-Antwortentwürfe, Rollen und Bot-Einstellungen im laufenden Betrieb.",
          it: "SPA in React + TypeScript + Tailwind: gestione dei ticket, cronologia completa delle chat, presa in carico da parte di operatori umani, bozze di risposta con IA, ruoli e impostazioni del bot a caldo.",
          nl: "SPA in React + TypeScript + Tailwind: ticketbeheer, volledige chatgeschiedenis, overname door menselijke agents, AI-conceptantwoorden, rollen en botinstellingen die live aanpasbaar zijn.",
        },
      },
      {
        lead: {
          es: "Cóndor CRM",
          en: "Cóndor CRM",
          de: "Cóndor CRM",
          it: "Cóndor CRM",
          nl: "Cóndor CRM",
        },
        text: {
          es: "Segundo producto en Next.js 15 sobre Vercel: segmentación de clientes por comportamiento de compra en BigQuery y campañas por email (SendGrid) y WhatsApp redactadas con IA, con plantillas editables y controles de entregabilidad.",
          en: "Second product built with Next.js 15 on Vercel: customer segmentation by purchase behavior on BigQuery and AI-drafted email (SendGrid) and WhatsApp campaigns, with editable templates and deliverability safeguards.",
          de: "Zweites Produkt mit Next.js 15 auf Vercel: Kundensegmentierung nach Kaufverhalten in BigQuery sowie per KI verfasste E-Mail- (SendGrid) und WhatsApp-Kampagnen mit editierbaren Vorlagen und Zustellbarkeitskontrollen.",
          it: "Secondo prodotto in Next.js 15 su Vercel: segmentazione dei clienti per comportamento d'acquisto su BigQuery e campagne email (SendGrid) e WhatsApp scritte con IA, con modelli modificabili e controlli di recapitabilità.",
          nl: "Tweede product in Next.js 15 op Vercel: klantsegmentatie op koopgedrag in BigQuery en met AI geschreven e-mail- (SendGrid) en WhatsApp-campagnes, met bewerkbare sjablonen en bezorgbaarheidscontroles.",
        },
      },
      {
        lead: {
          es: "Google Cloud Platform",
          en: "Google Cloud Platform",
          de: "Google Cloud Platform",
          it: "Google Cloud Platform",
          nl: "Google Cloud Platform",
        },
        text: {
          es: "Despliegue con Docker en Cloud Run (modos de costo/rendimiento sin redeploy), BigQuery para tickets, mensajes e índice de embeddings, Secret Manager para credenciales, IAM de mínimo privilegio con service accounts, Cloud Logging con logs JSON estructurados y scripts de infraestructura idempotentes con migraciones de esquema.",
          en: "Docker deployment on Cloud Run (cost/performance modes without redeploying), BigQuery for tickets, messages and the embeddings index, Secret Manager for credentials, least-privilege IAM with service accounts, Cloud Logging with structured JSON logs, and idempotent infrastructure scripts with schema migrations.",
          de: "Docker-Deployment auf Cloud Run (Kosten-/Leistungsmodi ohne erneutes Deployment), BigQuery für Tickets, Nachrichten und den Embedding-Index, Secret Manager für Zugangsdaten, IAM nach dem Least-Privilege-Prinzip mit Service Accounts, Cloud Logging mit strukturierten JSON-Logs und idempotente Infrastruktur-Skripte mit Schemamigrationen.",
          it: "Deployment con Docker su Cloud Run (modalità costo/prestazioni senza redeploy), BigQuery per ticket, messaggi e indice degli embedding, Secret Manager per le credenziali, IAM a privilegio minimo con service account, Cloud Logging con log JSON strutturati e script di infrastruttura idempotenti con migrazioni di schema.",
          nl: "Docker-deployment op Cloud Run (kosten-/prestatiemodi zonder opnieuw uit te rollen), BigQuery voor tickets, berichten en de embeddings-index, Secret Manager voor inloggegevens, IAM met minimale rechten via service accounts, Cloud Logging met gestructureerde JSON-logs en idempotente infrastructuurscripts met schemamigraties.",
        },
      },
      {
        lead: {
          es: "Seguridad y calidad",
          en: "Security & quality",
          de: "Sicherheit & Qualität",
          it: "Sicurezza e qualità",
          nl: "Beveiliging en kwaliteit",
        },
        text: {
          es: "Validación de firmas de webhooks de Meta, sesiones JWT en cookies HttpOnly, rate limiting por IP y por cuenta, CSP estricta, consultas parametrizadas y una suite de ~500 tests con pytest.",
          en: "Meta webhook signature validation, JWT sessions in HttpOnly cookies, per-IP and per-account rate limiting, strict CSP, parameterized queries and a ~500-test pytest suite.",
          de: "Signaturprüfung der Meta-Webhooks, JWT-Sitzungen in HttpOnly-Cookies, Rate Limiting pro IP und Konto, strikte CSP, parametrisierte Abfragen und eine Suite mit rund 500 pytest-Tests.",
          it: "Validazione delle firme dei webhook di Meta, sessioni JWT in cookie HttpOnly, rate limiting per IP e per account, CSP rigorosa, query parametrizzate e una suite di circa 500 test con pytest.",
          nl: "Validatie van Meta-webhookhandtekeningen, JWT-sessies in HttpOnly-cookies, rate limiting per IP en per account, strikte CSP, geparametriseerde queries en een suite van ongeveer 500 tests met pytest.",
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
      es: "Práctica en Ingeniería de Software",
      en: "Software Engineering Internship",
      de: "Praktikum im Software Engineering",
      it: "Tirocinio in Ingegneria del Software",
      nl: "Stage software engineering",
    },
    company: "Abacus RX - Miami, FL",
    logo: "abacus.webp",
    meta: {
      es: "Diciembre 2025 - Marzo 2026",
      en: "December 2025 - March 2026",
      de: "Dezember 2025 - März 2026",
      it: "Dicembre 2025 - Marzo 2026",
      nl: "December 2025 - maart 2026",
    },
    summary: {
      es: "Construí un sistema de trazabilidad para aseguradoras de accidentes laborales de trayecto: reúne toda la información del caso (accidente, médico, diagnóstico, medicamentos, efectos secundarios, fechas, lugar, ruta y jurisdicciones) para sustentar la demanda.",
      en: "Built a traceability system for insurers of work-commute accidents: it gathers the full case record (accident, physician, diagnosis, medication, side effects, dates, location, route and jurisdictions) to back the claim.",
      de: "Ich baute ein Nachverfolgungssystem für Versicherer von Wegeunfällen: Es bündelt die gesamte Fallakte (Unfall, Arzt, Diagnose, Medikamente, Nebenwirkungen, Daten, Ort, Route und Zuständigkeiten), um die Klage zu untermauern.",
      it: "Ho costruito un sistema di tracciabilità per le assicurazioni degli infortuni in itinere: raccoglie tutte le informazioni del caso (incidente, medico, diagnosi, farmaci, effetti collaterali, date, luogo, percorso e giurisdizioni) a sostegno della causa.",
      nl: "Ik bouwde een traceerbaarheidssysteem voor verzekeraars van woon-werkongevallen: het verzamelt het volledige dossier (ongeval, arts, diagnose, medicatie, bijwerkingen, data, locatie, route en jurisdicties) om de claim te onderbouwen.",
    },
    highlights: [
      {
        text: {
          es: "Generación automática del Excel y del reporte de la demanda a partir de los datos del caso",
          en: "Automatic generation of the claim’s Excel and report from the case data",
          de: "Automatische Erzeugung der Excel-Datei und des Klageberichts aus den Falldaten",
          it: "Generazione automatica dell'Excel e del report della causa a partire dai dati del caso",
          nl: "Automatische generatie van de Excel en het rapport van de claim op basis van de dossiergegevens",
        },
      },
      {
        text: {
          es: "Optimización de la búsqueda: debounce del input (sin consultas de más al tipear, mínimo 3 letras) y tokenización de la consulta al estilo booleano",
          en: "Search optimization: input debounce (no extra queries while typing, min. 3 letters) and boolean-style query tokenization",
          de: "Optimierung der Suche: Debounce der Eingabe (keine überflüssigen Abfragen beim Tippen, mindestens 3 Buchstaben) und Tokenisierung der Abfrage im booleschen Stil",
          it: "Ottimizzazione della ricerca: debounce dell'input (nessuna query superflua durante la digitazione, minimo 3 lettere) e tokenizzazione della query in stile booleano",
          nl: "Zoekoptimalisatie: debounce op de invoer (geen overbodige queries tijdens het typen, minimaal 3 letters) en tokenisatie van de query in booleaanse stijl",
        },
      },
      {
        text: {
          es: "Segunda aplicación en Kotlin Multiplatform para generar reportes de inspecciones",
          en: "Second app in Kotlin Multiplatform to generate inspection reports",
          de: "Zweite Anwendung in Kotlin Multiplatform zur Erstellung von Inspektionsberichten",
          it: "Seconda applicazione in Kotlin Multiplatform per generare report di ispezione",
          nl: "Tweede applicatie in Kotlin Multiplatform om inspectierapporten te genereren",
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
      de: "Tutor - Datenbanken",
      it: "Assistente didattico - Basi di dati",
      nl: "Studentassistent - Databases",
    },
    company: "Universidad Diego Portales",
    logo: "udp.webp",
    logoCover: true,
    meta: {
      es: "Marzo 2025 - Diciembre 2025",
      en: "March 2025 - December 2025",
      de: "März 2025 - Dezember 2025",
      it: "Marzo 2025 - Dicembre 2025",
      nl: "Maart 2025 - december 2025",
    },
    highlights: [
      {
        text: {
          es: "Impartí clases sobre SQL, triggers y procedimientos almacenados",
          en: "Taught classes on SQL, triggers, and stored procedures",
          de: "Ich hielt Unterricht zu SQL, Triggern und Stored Procedures",
          it: "Ho tenuto lezioni su SQL, trigger e stored procedure",
          nl: "Ik gaf les over SQL, triggers en stored procedures",
        },
      },
      {
        text: {
          es: "Guié laboratorios prácticos y sesiones de consulta para estudiantes",
          en: "Guided practical labs and consultation sessions for students",
          de: "Ich leitete Praxislabore und Sprechstunden für Studierende",
          it: "Ho guidato laboratori pratici e sessioni di ricevimento per gli studenti",
          nl: "Ik begeleidde practica en vragenuren voor studenten",
        },
      },
      {
        text: {
          es: "Corregí evaluaciones y elaboré material práctico adicional",
          en: "Graded assessments and developed additional practical material",
          de: "Ich korrigierte Prüfungen und erstellte zusätzliches Übungsmaterial",
          it: "Ho corretto le valutazioni e preparato materiale pratico aggiuntivo",
          nl: "Ik corrigeerde toetsen en maakte extra oefenmateriaal",
        },
      },
      {
        text: {
          es: "Asistí a estudiantes en proyectos de diseño y optimización de bases de datos",
          en: "Assisted students in database design and optimization projects",
          de: "Ich unterstützte Studierende bei Projekten zu Datenbankdesign und -optimierung",
          it: "Ho assistito gli studenti in progetti di progettazione e ottimizzazione di basi di dati",
          nl: "Ik hielp studenten bij projecten rond databaseontwerp en -optimalisatie",
        },
      },
    ],
    tags: ["PostgreSQL", "SQL", "Triggers", "Stored Procedures", "Query Optimization"],
  },
];
