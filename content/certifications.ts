import type { Localized, Text } from "@/lib/i18n";

export const CERT_GROUPS = ["security", "networking", "languages", "cloud"] as const;

export type CertGroup = (typeof CERT_GROUPS)[number];

/** Una de las microcredenciales que agrupa una ficha (se listan en un modal). */
export type Microcredential = {
  id: string;
  name: Text;
  domain: Localized;
  /** Qué demuestra el Exam Lab, en una frase. */
  summary: Localized;
  /** Lo que se implementa en el lab sobre infraestructura real. */
  tasks: readonly Localized[];
  /** Credencial pública en Credly. Sin ella el detalle no enlaza a ninguna parte. */
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
    summary: {
      es: "Detectar, contener y remediar un incidente de seguridad en curso dentro de una cuenta AWS.",
      en: "Detect, contain and remediate an ongoing security incident inside an AWS account.",
      de: "Einen laufenden Sicherheitsvorfall in einem AWS-Konto erkennen, eindämmen und beheben.",
      it: "Rilevare, contenere e risolvere un incidente di sicurezza in corso in un account AWS.",
      nl: "Een lopend beveiligingsincident in een AWS-account detecteren, indammen en herstellen.",
    },
    tasks: [
      {
        es: "Investigar la actividad sospechosa con CloudTrail, GuardDuty y CloudWatch",
        en: "Investigate suspicious activity with CloudTrail, GuardDuty and CloudWatch",
        de: "Verdächtige Aktivitäten mit CloudTrail, GuardDuty und CloudWatch untersuchen",
        it: "Indagare attività sospette con CloudTrail, GuardDuty e CloudWatch",
        nl: "Verdachte activiteit onderzoeken met CloudTrail, GuardDuty en CloudWatch",
      },
      {
        es: "Aislar instancias comprometidas y revocar credenciales IAM expuestas",
        en: "Isolate compromised instances and revoke exposed IAM credentials",
        de: "Kompromittierte Instanzen isolieren und offengelegte IAM-Zugangsdaten widerrufen",
        it: "Isolare le istanze compromesse e revocare le credenziali IAM esposte",
        nl: "Gecompromitteerde instances isoleren en gelekte IAM-referenties intrekken",
      },
      {
        es: "Preservar evidencia y endurecer la configuración para evitar que se repita",
        en: "Preserve evidence and harden the configuration so it does not happen again",
        de: "Beweise sichern und die Konfiguration härten, damit es sich nicht wiederholt",
        it: "Preservare le prove e rafforzare la configurazione perché non si ripeta",
        nl: "Bewijs veiligstellen en de configuratie verharden zodat het niet opnieuw gebeurt",
      },
    ],
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
    summary: {
      es: "Diseñar y poner en marcha la red que conecta y expone una aplicación en AWS.",
      en: "Design and stand up the network that connects and exposes an application on AWS.",
      de: "Das Netzwerk entwerfen und aufbauen, das eine Anwendung auf AWS verbindet und bereitstellt.",
      it: "Progettare e mettere in funzione la rete che collega ed espone un'applicazione su AWS.",
      nl: "Het netwerk ontwerpen en opzetten dat een applicatie op AWS verbindt en ontsluit.",
    },
    tasks: [
      {
        es: "Configurar VPC, subredes públicas y privadas, tablas de rutas y gateways",
        en: "Configure VPCs, public and private subnets, route tables and gateways",
        de: "VPCs, öffentliche und private Subnetze, Routingtabellen und Gateways konfigurieren",
        it: "Configurare VPC, subnet pubbliche e private, tabelle di routing e gateway",
        nl: "VPC's, publieke en private subnets, routetabellen en gateways configureren",
      },
      {
        es: "Distribuir tráfico con Elastic Load Balancing y resolver nombres con Route 53",
        en: "Distribute traffic with Elastic Load Balancing and resolve names with Route 53",
        de: "Datenverkehr mit Elastic Load Balancing verteilen und Namen mit Route 53 auflösen",
        it: "Distribuire il traffico con Elastic Load Balancing e risolvere i nomi con Route 53",
        nl: "Verkeer verdelen met Elastic Load Balancing en namen omzetten met Route 53",
      },
      {
        es: "Restringir el acceso con security groups y network ACLs",
        en: "Restrict access with security groups and network ACLs",
        de: "Zugriff mit Security Groups und Network ACLs einschränken",
        it: "Limitare l'accesso con security group e network ACL",
        nl: "Toegang beperken met security groups en network ACL's",
      },
    ],
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
    summary: {
      es: "Construir una aplicación orientada a eventos sin administrar servidores.",
      en: "Build an event-driven application without managing servers.",
      de: "Eine ereignisgesteuerte Anwendung ohne Serververwaltung bauen.",
      it: "Costruire un'applicazione basata su eventi senza gestire server.",
      nl: "Een event-gedreven applicatie bouwen zonder servers te beheren.",
    },
    tasks: [
      {
        es: "Escribir y desplegar funciones Lambda expuestas con API Gateway",
        en: "Write and deploy Lambda functions exposed through API Gateway",
        de: "Lambda-Funktionen schreiben und über API Gateway bereitstellen",
        it: "Scrivere e distribuire funzioni Lambda esposte tramite API Gateway",
        nl: "Lambda-functies schrijven en uitrollen via API Gateway",
      },
      {
        es: "Persistir datos en DynamoDB",
        en: "Persist data in DynamoDB",
        de: "Daten in DynamoDB speichern",
        it: "Salvare i dati in DynamoDB",
        nl: "Data opslaan in DynamoDB",
      },
      {
        es: "Desacoplar servicios con SQS, SNS y EventBridge",
        en: "Decouple services with SQS, SNS and EventBridge",
        de: "Dienste mit SQS, SNS und EventBridge entkoppeln",
        it: "Disaccoppiare i servizi con SQS, SNS ed EventBridge",
        nl: "Services ontkoppelen met SQS, SNS en EventBridge",
      },
    ],
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
    summary: {
      es: "Crear un agente de IA generativa que razona, consulta datos propios y ejecuta acciones.",
      en: "Build a generative AI agent that reasons, queries its own data and takes actions.",
      de: "Einen generativen KI-Agenten bauen, der schlussfolgert, eigene Daten abfragt und Aktionen ausführt.",
      it: "Creare un agente di IA generativa che ragiona, interroga i propri dati ed esegue azioni.",
      nl: "Een generatieve AI-agent bouwen die redeneert, eigen data raadpleegt en acties uitvoert.",
    },
    tasks: [
      {
        es: "Configurar un agente en Amazon Bedrock con instrucciones y modelo base",
        en: "Configure an Amazon Bedrock agent with instructions and a foundation model",
        de: "Einen Agenten in Amazon Bedrock mit Anweisungen und Basismodell konfigurieren",
        it: "Configurare un agente in Amazon Bedrock con istruzioni e modello di base",
        nl: "Een agent in Amazon Bedrock configureren met instructies en een basismodel",
      },
      {
        es: "Conectar una knowledge base (RAG) y action groups respaldados por Lambda",
        en: "Connect a knowledge base (RAG) and Lambda-backed action groups",
        de: "Eine Knowledge Base (RAG) und Lambda-gestützte Action Groups anbinden",
        it: "Collegare una knowledge base (RAG) e action group basati su Lambda",
        nl: "Een knowledge base (RAG) en action groups met Lambda koppelen",
      },
      {
        es: "Aplicar guardrails y probar el comportamiento del agente",
        en: "Apply guardrails and test the agent's behavior",
        de: "Guardrails anwenden und das Verhalten des Agenten testen",
        it: "Applicare guardrail e testare il comportamento dell'agente",
        nl: "Guardrails toepassen en het gedrag van de agent testen",
      },
    ],
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
    summary: {
      es: "Llevar un modelo de machine learning del entrenamiento a producción de forma reproducible.",
      en: "Take a machine learning model from training to production in a reproducible way.",
      de: "Ein Machine-Learning-Modell reproduzierbar vom Training in die Produktion bringen.",
      it: "Portare un modello di machine learning dall'addestramento alla produzione in modo riproducibile.",
      nl: "Een machine learning-model reproduceerbaar van training naar productie brengen.",
    },
    tasks: [
      {
        es: "Automatizar entrenamiento y evaluación con SageMaker Pipelines",
        en: "Automate training and evaluation with SageMaker Pipelines",
        de: "Training und Evaluierung mit SageMaker Pipelines automatisieren",
        it: "Automatizzare addestramento e valutazione con SageMaker Pipelines",
        nl: "Training en evaluatie automatiseren met SageMaker Pipelines",
      },
      {
        es: "Versionar y aprobar modelos en el Model Registry",
        en: "Version and approve models in the Model Registry",
        de: "Modelle in der Model Registry versionieren und freigeben",
        it: "Versionare e approvare i modelli nel Model Registry",
        nl: "Modellen versioneren en goedkeuren in de Model Registry",
      },
      {
        es: "Desplegar el modelo en un endpoint y monitorear su comportamiento",
        en: "Deploy the model to an endpoint and monitor its behavior",
        de: "Das Modell auf einem Endpoint bereitstellen und sein Verhalten überwachen",
        it: "Distribuire il modello su un endpoint e monitorarne il comportamento",
        nl: "Het model uitrollen naar een endpoint en het gedrag monitoren",
      },
    ],
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
    summary: {
      es: "Ingerir y procesar datos en tiempo real a medida que se generan.",
      en: "Ingest and process data in real time as it is generated.",
      de: "Daten in Echtzeit aufnehmen und verarbeiten, während sie entstehen.",
      it: "Acquisire ed elaborare dati in tempo reale mentre vengono generati.",
      nl: "Data in realtime opnemen en verwerken terwijl ze ontstaan.",
    },
    tasks: [
      {
        es: "Capturar flujos de eventos con Kinesis Data Streams",
        en: "Capture event streams with Kinesis Data Streams",
        de: "Ereignisströme mit Kinesis Data Streams erfassen",
        it: "Catturare flussi di eventi con Kinesis Data Streams",
        nl: "Eventstromen vastleggen met Kinesis Data Streams",
      },
      {
        es: "Transformar los registros en vuelo con Lambda",
        en: "Transform records in flight with Lambda",
        de: "Datensätze während der Übertragung mit Lambda transformieren",
        it: "Trasformare i record in transito con Lambda",
        nl: "Records onderweg transformeren met Lambda",
      },
      {
        es: "Entregar los datos a S3 con Amazon Data Firehose",
        en: "Deliver data to S3 with Amazon Data Firehose",
        de: "Daten mit Amazon Data Firehose an S3 liefern",
        it: "Consegnare i dati a S3 con Amazon Data Firehose",
        nl: "Data afleveren in S3 met Amazon Data Firehose",
      },
    ],
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
    summary: {
      es: "Montar un lakehouse que cataloga, gobierna y consulta datos almacenados en S3.",
      en: "Build a lakehouse that catalogs, governs and queries data stored in S3.",
      de: "Ein Lakehouse aufbauen, das in S3 gespeicherte Daten katalogisiert, steuert und abfragt.",
      it: "Realizzare un lakehouse che cataloga, governa e interroga dati archiviati in S3.",
      nl: "Een lakehouse opzetten dat data in S3 catalogiseert, beheert en bevraagt.",
    },
    tasks: [
      {
        es: "Catalogar datos con crawlers y el Data Catalog de AWS Glue",
        en: "Catalog data with AWS Glue crawlers and the Data Catalog",
        de: "Daten mit AWS-Glue-Crawlern und dem Data Catalog katalogisieren",
        it: "Catalogare i dati con i crawler e il Data Catalog di AWS Glue",
        nl: "Data catalogiseren met AWS Glue-crawlers en de Data Catalog",
      },
      {
        es: "Transformar datos con trabajos ETL de Glue",
        en: "Transform data with Glue ETL jobs",
        de: "Daten mit Glue-ETL-Jobs transformieren",
        it: "Trasformare i dati con job ETL di Glue",
        nl: "Data transformeren met Glue ETL-jobs",
      },
      {
        es: "Controlar permisos con Lake Formation y consultar con Athena",
        en: "Control permissions with Lake Formation and query with Athena",
        de: "Berechtigungen mit Lake Formation steuern und mit Athena abfragen",
        it: "Gestire i permessi con Lake Formation e interrogare con Athena",
        nl: "Rechten beheren met Lake Formation en bevragen met Athena",
      },
    ],
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
    summary: {
      es: "Convertir datos en dashboards interactivos listos para compartir.",
      en: "Turn data into interactive dashboards ready to share.",
      de: "Daten in interaktive, teilbare Dashboards verwandeln.",
      it: "Trasformare i dati in dashboard interattive pronte da condividere.",
      nl: "Data omzetten in interactieve dashboards die klaar zijn om te delen.",
    },
    tasks: [
      {
        es: "Conectar fuentes y preparar datasets en Amazon QuickSight",
        en: "Connect sources and prepare datasets in Amazon QuickSight",
        de: "Quellen anbinden und Datasets in Amazon QuickSight vorbereiten",
        it: "Collegare le fonti e preparare i dataset in Amazon QuickSight",
        nl: "Bronnen koppelen en datasets voorbereiden in Amazon QuickSight",
      },
      {
        es: "Construir análisis con campos calculados, filtros y visualizaciones",
        en: "Build analyses with calculated fields, filters and visuals",
        de: "Analysen mit berechneten Feldern, Filtern und Visualisierungen erstellen",
        it: "Costruire analisi con campi calcolati, filtri e visualizzazioni",
        nl: "Analyses bouwen met berekende velden, filters en visualisaties",
      },
      {
        es: "Publicar dashboards y controlar quién ve qué datos",
        en: "Publish dashboards and control who sees which data",
        de: "Dashboards veröffentlichen und steuern, wer welche Daten sieht",
        it: "Pubblicare dashboard e controllare chi vede quali dati",
        nl: "Dashboards publiceren en bepalen wie welke data ziet",
      },
    ],
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
    provider: "Udemy",
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
    provider: "Udemy",
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
