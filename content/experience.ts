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
      es: "Herramienta de reportes configurable para el producto de una empresa de software farmacéutico fundada en 1986, construida sobre su stack heredado: VBA sobre Excel y acceso directo por DAO a la base Access. El usuario elige campos, filtros y rango de fechas; la herramienta cruza varias tablas y entrega la planilla en Excel y PDF.",
      en: "Configurable reporting tool for the product of a pharmacy-software company founded in 1986, built on its legacy stack: Excel VBA and direct DAO access to the Access database. The user picks fields, filters and a date range; the tool joins several tables and delivers the sheet as Excel and PDF.",
      de: "Konfigurierbares Berichtswerkzeug für das Produkt eines 1986 gegründeten Apothekensoftware-Unternehmens, gebaut auf dessen Altbestand: VBA in Excel und direkter DAO-Zugriff auf die Access-Datenbank. Man wählt Felder, Filter und Zeitraum; das Werkzeug führt mehrere Tabellen zusammen und liefert das Blatt als Excel und PDF.",
      it: "Strumento di reportistica configurabile per il prodotto di un'azienda di software farmaceutico fondata nel 1986, costruito sul suo stack legacy: VBA su Excel e accesso diretto via DAO al database Access. L'utente sceglie campi, filtri e intervallo di date; lo strumento incrocia più tabelle e consegna il foglio in Excel e PDF.",
      nl: "Configureerbare rapportagetool voor het product van een in 1986 opgericht farmaceutisch softwarebedrijf, gebouwd op hun verouderde stack: VBA in Excel en directe DAO-toegang tot de Access-database. De gebruiker kiest velden, filters en een datumbereik; de tool combineert meerdere tabellen en levert het blad als Excel en pdf.",
    },
    highlights: [
      {
        lead: {
          es: "Sobre el stack que ya existía",
          en: "Working inside the existing stack",
          de: "Im bestehenden Stack",
          it: "Dentro lo stack esistente",
          nl: "Binnen de bestaande stack",
        },
        text: {
          es: "Recibí solo requerimientos de alto nivel y decidí no introducir dependencias nuevas: VBA sobre Excel y DAO contra la base Access del producto, igual que el resto del software de la casa.",
          en: "I was given only high-level requirements and chose to add no new dependencies: Excel VBA and DAO against the product's Access database, the same way the rest of the in-house software works.",
          de: "Ich bekam nur grobe Anforderungen und entschied mich gegen neue Abhängigkeiten: VBA in Excel und DAO gegen die Access-Datenbank des Produkts, genau wie die übrige Haussoftware.",
          it: "Ho ricevuto solo requisiti di alto livello e ho scelto di non introdurre nuove dipendenze: VBA su Excel e DAO sul database Access del prodotto, come il resto del software interno.",
          nl: "Ik kreeg alleen globale eisen en koos ervoor geen nieuwe afhankelijkheden toe te voegen: VBA in Excel en DAO op de Access-database van het product, net als de rest van de interne software.",
        },
      },
      {
        lead: {
          es: "Reporte armado a medida",
          en: "Report built to order",
          de: "Bericht nach Maß",
          it: "Report su misura",
          nl: "Rapport op maat",
        },
        text: {
          es: "El usuario marca en el formulario qué necesita —cinco campos de encabezado, once columnas opcionales, rango de fechas y totales por columna numérica— y la planilla se construye en tiempo de ejecución según esa selección, con validaciones previas para no generar un reporte vacío o inválido.",
          en: "The user ticks what they need on the form —five header fields, eleven optional columns, a date range and totals per numeric column— and the sheet is built at run time from that selection, with up-front validations so no empty or invalid report is produced.",
          de: "Im Formular wird angekreuzt, was gebraucht wird — fünf Kopffelder, elf optionale Spalten, ein Zeitraum und Summen je Zahlenspalte —, und das Blatt entsteht zur Laufzeit aus dieser Auswahl, mit vorgelagerten Prüfungen, damit kein leerer oder ungültiger Bericht erzeugt wird.",
          it: "Nel form si spunta ciò che serve —cinque campi di intestazione, undici colonne opzionali, un intervallo di date e i totali per ogni colonna numerica— e il foglio viene costruito a runtime in base a quella selezione, con validazioni preventive per non generare report vuoti o non validi.",
          nl: "In het formulier vinkt de gebruiker aan wat nodig is — vijf kopvelden, elf optionele kolommen, een datumbereik en totalen per numerieke kolom — en het blad wordt tijdens de uitvoering op basis daarvan opgebouwd, met validaties vooraf zodat er geen leeg of ongeldig rapport ontstaat.",
        },
      },
      {
        lead: {
          es: "Consultas por índice sobre ocho tablas",
          en: "Indexed lookups across eight tables",
          de: "Indexzugriffe über acht Tabellen",
          it: "Ricerche su indice in otto tabelle",
          nl: "Geïndexeerde lookups over acht tabellen",
        },
        text: {
          es: "Recordsets de tipo tabla con Seek sobre índice, en vez de recorrer la tabla entera, para cruzar las ocho tablas que alimentan el reporte, con una cascada de respaldo cuando el dato no está en la tabla principal.",
          en: "Table-type recordsets with indexed Seek, instead of scanning whole tables, to join the eight tables feeding the report, with a fallback chain for when a value is missing from the main table.",
          de: "Tabellenbasierte Recordsets mit indiziertem Seek statt vollständiger Tabellendurchläufe, um die acht Tabellen hinter dem Bericht zusammenzuführen, mit einer Fallback-Kette, wenn ein Wert in der Haupttabelle fehlt.",
          it: "Recordset di tipo tabella con Seek su indice, invece di scorrere l'intera tabella, per incrociare le otto tabelle che alimentano il report, con una catena di fallback quando il dato manca nella tabella principale.",
          nl: "Tabeltype-recordsets met Seek op index in plaats van hele tabellen te doorlopen, om de acht tabellen achter het rapport te combineren, met een terugvalketen als een waarde in de hoofdtabel ontbreekt.",
        },
      },
      {
        lead: {
          es: "Búsqueda con typeahead",
          en: "Typeahead search",
          de: "Suche mit Typeahead",
          it: "Ricerca con typeahead",
          nl: "Zoeken met typeahead",
        },
        text: {
          es: "Debounce del input (mínimo 3 letras, sin consultas de más al tipear) y tokenización de la consulta al estilo booleano para buscar por varios campos a la vez.",
          en: "Input debounce (min. 3 letters, no extra queries while typing) and boolean-style query tokenization to search several fields at once.",
          de: "Debounce der Eingabe (mindestens drei Buchstaben, keine überflüssigen Abfragen beim Tippen) und Tokenisierung der Abfrage im booleschen Stil, um mehrere Felder gleichzeitig zu durchsuchen.",
          it: "Debounce dell'input (minimo 3 lettere, nessuna query superflua durante la digitazione) e tokenizzazione booleana della query per cercare su più campi insieme.",
          nl: "Debounce op de invoer (minimaal 3 letters, geen overbodige queries tijdens het typen) en booleaanse tokenisatie van de zoekterm om meerdere velden tegelijk te doorzoeken.",
        },
      },
      {
        lead: {
          es: "Datos sucios y cierre limpio",
          en: "Dirty data and clean teardown",
          de: "Schmutzige Daten, sauberes Aufräumen",
          it: "Dati sporchi e chiusura pulita",
          nl: "Vuile data en nette afsluiting",
        },
        text: {
          es: "Helpers propios que reemplazan Nz() de Access: convierten cualquier valor a texto, número o fecha sin caerse con nulos y limpian NUL, espacios duros y saltos de línea heredados. Más un manejador de errores central que cierra todos los recordsets y la conexión por cualquier salida.",
          en: "Home-made helpers replacing Access's Nz(): they turn any value into text, number or date without breaking on nulls, and strip NUL characters, hard spaces and line breaks inherited from legacy records. Plus a central error handler that closes every recordset and the connection on any exit path.",
          de: "Eigene Helfer als Ersatz für Nz() aus Access: Sie wandeln jeden Wert in Text, Zahl oder Datum um, ohne an Nullwerten zu scheitern, und entfernen NUL-Zeichen, geschützte Leerzeichen und Zeilenumbrüche aus Altdatensätzen. Dazu ein zentraler Fehlerhandler, der auf jedem Ausstiegspfad alle Recordsets und die Verbindung schließt.",
          it: "Helper scritti da me al posto di Nz() di Access: convertono qualsiasi valore in testo, numero o data senza rompersi sui null e ripuliscono caratteri NUL, spazi unificatori e ritorni a capo ereditati dai record legacy. In più un gestore di errori centrale che chiude tutti i recordset e la connessione su ogni via d'uscita.",
          nl: "Zelfgeschreven helpers ter vervanging van Nz() uit Access: ze zetten elke waarde om naar tekst, getal of datum zonder te struikelen over null, en verwijderen NUL-tekens, harde spaties en regeleindes uit oude records. Daarbij een centrale foutafhandeling die op elk uitgangspad alle recordsets en de verbinding sluit.",
        },
      },
      {
        lead: {
          es: "Entrega en Excel y PDF",
          en: "Excel and PDF output",
          de: "Ausgabe als Excel und PDF",
          it: "Output in Excel e PDF",
          nl: "Oplevering in Excel en pdf",
        },
        text: {
          es: "Tabla formateada con encabezado corporativo, logo, formatos de moneda y fila de totales opcional; exportación a PDF en el mismo paso y la carpeta de destino recordada en el registro de Windows entre sesiones.",
          en: "Formatted table with corporate header, logo, currency formats and an optional totals row; PDF export in the same step, and the output folder remembered in the Windows registry between sessions.",
          de: "Formatierte Tabelle mit Firmenkopf, Logo, Währungsformaten und optionaler Summenzeile; PDF-Export im selben Schritt, und der Zielordner wird zwischen Sitzungen in der Windows-Registry gemerkt.",
          it: "Tabella formattata con intestazione aziendale, logo, formati valuta e riga dei totali opzionale; esportazione in PDF nello stesso passaggio e cartella di destinazione ricordata nel registro di Windows tra una sessione e l'altra.",
          nl: "Opgemaakte tabel met bedrijfskop, logo, valutaopmaak en een optionele totalenrij; pdf-export in dezelfde stap en de doelmap wordt tussen sessies onthouden in het Windows-register.",
        },
      },
      {
        lead: {
          es: "Entrega e instalación",
          en: "Delivery and rollout",
          de: "Lieferung und Einführung",
          it: "Consegna e installazione",
          nl: "Oplevering en uitrol",
        },
        text: {
          es: "La pidió un cliente puntual y se entregó antes del plazo previsto: dejé la actualización instalada y funcionando en su operación, sirviendo a toda su base de clientes.",
          en: "It was requested by one specific client and shipped ahead of the planned date: I left the update installed and running in their operation, serving their whole client base.",
          de: "Angefragt hatte es ein einzelner Kunde, geliefert wurde vor dem geplanten Termin: Ich übergab das Update installiert und im laufenden Betrieb, wo es dessen gesamte Kundschaft bedient.",
          it: "L'aveva chiesto un cliente specifico ed è stato consegnato prima della data prevista: ho lasciato l'aggiornamento installato e funzionante nella loro operatività, al servizio di tutta la loro base clienti.",
          nl: "Eén specifieke klant vroeg erom en het werd vóór de geplande datum opgeleverd: ik liet de update geïnstalleerd en draaiend achter in hun operatie, waar die hun hele klantenbestand bedient.",
        },
      },
      {
        lead: {
          es: "Segundo proyecto: app multiplataforma",
          en: "Second project: cross-platform app",
          de: "Zweites Projekt: plattformübergreifende App",
          it: "Secondo progetto: app multipiattaforma",
          nl: "Tweede project: cross-platform app",
        },
        text: {
          es: "Para el generador de reportes de inspecciones partí con wireframes, modelo de datos y flujos en Android Studio, presenté el diseño al equipo y, tras comparar alternativas, elegí Kotlin Multiplatform para cubrir Android e iOS con un solo código; seguí colaborando de forma remota desde Chile.",
          en: "For the inspection-report app I started with wireframes, data model and flows in Android Studio, presented the design to the team and, after comparing the options, picked Kotlin Multiplatform to cover Android and iOS from a single codebase; I kept contributing remotely from Chile.",
          de: "Für die App zur Erstellung von Inspektionsberichten begann ich mit Wireframes, Datenmodell und Abläufen in Android Studio, stellte das Design dem Team vor und wählte nach einem Vergleich der Optionen Kotlin Multiplatform, um Android und iOS aus einer Codebasis zu bedienen; die Mitarbeit setzte ich aus Chile remote fort.",
          it: "Per l'app dei report di ispezione sono partito da wireframe, modello dati e flussi in Android Studio, ho presentato il design al team e, dopo aver confrontato le alternative, ho scelto Kotlin Multiplatform per coprire Android e iOS con un unico codice; ho continuato a collaborare da remoto dal Cile.",
          nl: "Voor de app voor inspectierapporten begon ik met wireframes, datamodel en flows in Android Studio, presenteerde het ontwerp aan het team en koos na vergelijking van de opties Kotlin Multiplatform om Android en iOS met één codebase te bedienen; daarna werkte ik op afstand vanuit Chili verder mee.",
        },
      },
    ],
    tags: ["Visual Basic (VBA)", "Excel", "Microsoft Access", "DAO", "Kotlin Multiplatform"],
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
