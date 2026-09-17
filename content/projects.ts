import type { Localized, Text } from "@/lib/i18n";

export const PROJECT_CATEGORIES = [
  "development",
  "ai",
  "security",
  "systems",
  "data",
  "collab",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

/** "all" primero; "Desarrollo" antes que "IA" para que el chip largo quede cortado
 *  en el borde del teléfono y se note que la fila se desliza. */
export const PROJECT_FILTERS = ["all", ...PROJECT_CATEGORIES] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];

export type Project = {
  id: string;
  title: Text;
  description: Localized;
  categories: readonly ProjectCategory[];
  tags: readonly string[];
  /** Imagen de portada; si falta se usa el emoji sobre un degradado. */
  image?: string;
  emoji?: string;
  /** Mes y anio del proyecto, ya localizado (helper `monthDate`). */
  date?: Localized;
  role?: "collaborator";
  private?: boolean;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
    /** Enlace directo al código; `true` reutiliza el repo de GitHub. */
    code?: string | true;
  };
};

const MONTHS = {
  mar: { es: "Marzo", en: "March", de: "März", it: "Marzo", nl: "Maart" },
  abr: { es: "Abril", en: "April", de: "April", it: "Aprile", nl: "April" },
  may: { es: "Mayo", en: "May", de: "Mai", it: "Maggio", nl: "Mei" },
  sep: { es: "Septiembre", en: "September", de: "September", it: "Settembre", nl: "September" },
  oct: { es: "Octubre", en: "October", de: "Oktober", it: "Ottobre", nl: "Oktober" },
  dic: { es: "Diciembre", en: "December", de: "Dezember", it: "Dicembre", nl: "December" },
} as const;

/** Construye la fecha localizada "Mes ANIO" a partir del mes y el anio. */
const monthDate = (month: keyof typeof MONTHS, year: number): Localized => {
  const m = MONTHS[month];
  return { es: `${m.es} ${year}`, en: `${m.en} ${year}`, de: `${m.de} ${year}`, it: `${m.it} ${year}`, nl: `${m.nl} ${year}` };
};

export const projects: readonly Project[] = [
  {
    id: "game-club",
    emoji: "🎮",
    categories: ["ai", "development"],
    title: {
      es: "Game Club: Soporte con IA & CRM",
      en: "Game Club: AI Support Platform & CRM",
      de: "Game Club: KI-Support & CRM",
      it: "Game Club: assistenza con IA & CRM",
      nl: "Game Club: AI-support & CRM",
    },
    description: {
      es: "Chatbot multicanal (WhatsApp + Instagram) con FAQ semántica y Gemini, panel de tickets con ruteo por IA y CRM de campañas. Desplegado en Google Cloud Run + BigQuery.",
      en: "Multichannel chatbot (WhatsApp + Instagram) with semantic FAQ and Gemini, a ticket dashboard with AI routing and a campaign CRM. Deployed on Google Cloud Run + BigQuery.",
      de: "Multikanal-Chatbot (WhatsApp + Instagram) mit semantischer FAQ und Gemini, Ticket-Dashboard mit KI-Routing und Kampagnen-CRM. Bereitgestellt auf Google Cloud Run + BigQuery.",
      it: "Chatbot multicanale (WhatsApp + Instagram) con FAQ semantiche e Gemini, pannello ticket con instradamento tramite IA e CRM per le campagne. Distribuito su Google Cloud Run + BigQuery.",
      nl: "Multichannel-chatbot (WhatsApp + Instagram) met semantische FAQ en Gemini, ticketdashboard met AI-routering en een campagne-CRM. Uitgerold op Google Cloud Run + BigQuery.",
    },
    tags: ["FastAPI", "Gemini", "React", "Next.js", "GCP"],
    private: true,
  },
  {
    id: "mitm",
    date: monthDate("mar", 2025),
    emoji: "🕵️",
    categories: ["security"],
    title: {
      es: "Man-in-the-Middle (MITM) sobre AMQP",
      en: "Man-in-the-Middle (MITM) over AMQP",
      de: "Man-in-the-Middle (MITM) über AMQP",
      it: "Man-in-the-Middle (MITM) su AMQP",
      nl: "Man-in-the-Middle (MITM) over AMQP",
    },
    description: {
      es: "Prueba de concepto de seguridad ofensiva sobre AMQP, el protocolo binario de mensajería de RabbitMQ. Un contenedor sniffer intercepta el tráfico del broker con Scapy, altera el payload en tránsito y reinyecta los paquetes, todo en un laboratorio multi-contenedor con Docker.",
      en: "Offensive-security proof of concept over AMQP, the binary messaging protocol behind RabbitMQ. A sniffer container intercepts the broker traffic with Scapy, alters the payload in transit and reinjects the packets, all in a multi-container Docker lab.",
      de: "Offensive-Security-Proof-of-Concept über AMQP, das binäre Messaging-Protokoll von RabbitMQ. Ein Sniffer-Container fängt den Broker-Verkehr mit Scapy ab, verändert die Payload im Transit und schleust die Pakete wieder ein – alles in einem Docker-Labor mit mehreren Containern.",
      it: "Proof of concept di sicurezza offensiva su AMQP, il protocollo binario di messaggistica di RabbitMQ. Un container sniffer intercetta il traffico del broker con Scapy, altera il payload in transito e reinietta i pacchetti, il tutto in un laboratorio multi-container con Docker.",
      nl: "Proof of concept voor offensieve security over AMQP, het binaire messagingprotocol van RabbitMQ. Een sniffer-container onderschept het brokerverkeer met Scapy, wijzigt de payload onderweg en injecteert de pakketten opnieuw, alles in een multi-container Docker-lab.",
    },
    tags: ["Python", "Scapy", "AMQP", "RabbitMQ", "Docker"],
    links: {
      github: "https://github.com/maxxee1/ampq-scapy-injection",
    },
  },
  {
    id: "optiwallet",
    date: monthDate("mar", 2026),
    emoji: "💳",
    role: "collaborator",
    categories: ["ai", "development", "collab"],
    title: "OptiWallet",
    description: {
      es: "Fintech que te dice con qué tarjeta pagar para obtener el mejor precio, con todos los comercios en un mapa. Scrapers en Node.js ejecutados en el servidor y panel de administración donde la IA analiza las ofertas y las clasifica por comercio, categoría y subcategoría.",
      en: "Fintech app that tells you which card to pay with to get the best price, with every merchant on a map. Server-side Node.js scrapers and an admin panel where AI analyzes offers and classifies them by merchant, category and subcategory.",
      de: "Fintech-App, die sagt, mit welcher Karte man am günstigsten zahlt, mit allen Händlern auf einer Karte. Node.js-Scraper auf dem Server und ein Admin-Panel, in dem die KI die Angebote analysiert und nach Händler, Kategorie und Unterkategorie einordnet.",
      it: "App fintech che ti dice con quale carta pagare per ottenere il prezzo migliore, con tutti i negozi su una mappa. Scraper in Node.js eseguiti sul server e pannello di amministrazione dove l'IA analizza le offerte e le classifica per negozio, categoria e sottocategoria.",
      nl: "Fintech-app die vertelt met welke kaart je het beste kunt betalen, met alle winkels op een kaart. Node.js-scrapers op de server en een beheerpaneel waar AI de aanbiedingen analyseert en indeelt per winkel, categorie en subcategorie.",
    },
    tags: ["Node.js", "Web Scraping", "AI", "Maps"],
  },
  {
    id: "udp-map",
    date: monthDate("may", 2026),
    emoji: "🗺️",
    role: "collaborator",
    categories: ["development", "collab"],
    title: "UDP Map",
    description: {
      es: "App para la comunidad de la Universidad Diego Portales: mapas del campus, salas y caminos, todos los eventos de la U y un foro para la comunidad.",
      en: "App for the Universidad Diego Portales community: campus maps, classrooms and routes, every university event, and a community forum.",
      de: "App für die Gemeinschaft der Universität Diego Portales: Campuspläne, Räume und Wege, alle Veranstaltungen der Uni und ein Forum für die Community.",
      it: "App per la comunità dell'Università Diego Portales: mappe del campus, aule e percorsi, tutti gli eventi dell'ateneo e un forum per la comunità.",
      nl: "App voor de gemeenschap van de Universiteit Diego Portales: campusplattegronden, lokalen en routes, alle evenementen van de universiteit en een forum voor de community.",
    },
    tags: ["Maps", "Events", "Community Forum"],
  },
  {
    id: "gcforest",
    image: "/images/projects/gcf.webp",
    categories: ["ai"],
    title: {
      es: "Predicción Atardecer Rosa (gcForest)",
      en: "Pink Sunset Prediction (gcForest)",
      de: "Vorhersage rosa Sonnenuntergänge (gcForest)",
      it: "Previsione dei tramonti rosa (gcForest)",
      nl: "Voorspelling van roze zonsondergangen (gcForest)",
    },
    description: {
      es: "Modelo predictivo de machine learning para predecir atardeceres rosas utilizando datos meteorológicos como tipo de nubes, polución y ángulo cenital.",
      en: "Machine learning predictive model to forecast pink sunsets using meteorological data such as cloud types, pollution, and zenith angle.",
      de: "Prädiktives Machine-Learning-Modell zur Vorhersage rosa Sonnenuntergänge anhand meteorologischer Daten wie Wolkentyp, Verschmutzung und Zenitwinkel.",
      it: "Modello predittivo di machine learning per prevedere i tramonti rosa usando dati meteorologici come tipo di nuvole, inquinamento e angolo zenitale.",
      nl: "Voorspellend machine learning-model voor roze zonsondergangen op basis van meteorologische data zoals wolkentype, vervuiling en zenithoek.",
    },
    tags: ["Python", "ML", "gcForest"],
    links: {
      github: "https://github.com/gc--tkinlight-prediction",
      demo: "https://pink-sky-app.vercel.app",
    },
  },
  {
    id: "proxivision",
    date: monthDate("mar", 2025),
    image: "/images/projects/proxivision.webp",
    role: "collaborator",
    categories: ["development", "collab"],
    title: "ProxiVision",
    description: {
      es: "Lentes inteligentes de asistencia para personas con discapacidad visual. Un sensor ultrasónico en cada patilla, sobre ESP32 con MicroPython, detecta obstáculos a la altura de la cabeza y avisa con vibración por conducción ósea, sin ocupar el oído. La app en React Native se conecta a los lentes por BLE, enriquece cada evento con GPS y hora, y lo envía a una API en Vercel; sin internet, encola los registros en el dispositivo y los sincroniza al reconectarse.",
      en: "Assistive smart glasses for visually impaired people. An ultrasonic sensor on each temple, running on ESP32 with MicroPython, detects head-level obstacles and warns through bone-conduction vibration, without blocking hearing. The React Native app connects to the glasses over BLE, enriches each event with GPS and time, and sends it to a Vercel API; when offline, it queues the logs on-device and syncs them on reconnect.",
      de: "Assistive Smart Glasses für sehbehinderte Menschen. Ein Ultraschallsensor an jedem Bügel, auf ESP32 mit MicroPython, erkennt Hindernisse in Kopfhöhe und warnt per Knochenschall-Vibration – ohne das Gehör zu blockieren. Die React-Native-App verbindet sich per BLE mit der Brille, reichert jedes Ereignis mit GPS und Zeit an und sendet es an eine Vercel-API; offline werden die Logs auf dem Gerät zwischengespeichert und beim Reconnect synchronisiert.",
      it: "Occhiali intelligenti assistivi per persone con disabilità visiva. Un sensore a ultrasuoni su ciascuna astina, su ESP32 con MicroPython, rileva ostacoli all'altezza della testa e avvisa con vibrazione a conduzione ossea, senza occupare l'udito. L'app in React Native si connette agli occhiali via BLE, arricchisce ogni evento con GPS e ora e lo invia a un'API su Vercel; offline, mette i log in coda sul dispositivo e li sincronizza alla riconnessione.",
      nl: "Assistieve slimme bril voor mensen met een visuele beperking. Een ultrasone sensor op elk pootje, op ESP32 met MicroPython, detecteert obstakels op hoofdhoogte en waarschuwt met beengeleidingstrilling, zonder het gehoor te blokkeren. De React Native-app verbindt via BLE met de bril, verrijkt elk event met GPS en tijd en stuurt het naar een Vercel-API; offline zet de app de logs in de wachtrij op het toestel en synchroniseert ze bij herverbinding.",
    },
    tags: ["ESP32", "MicroPython", "React Native", "BLE", "Vercel"],
    links: {
      github: "https://github.com/AlanGK7/App-Tics",
    },
  },
  {
    id: "mlp-grades",
    date: monthDate("abr", 2026),
    image: "/images/projects/mlp.webp",
    categories: ["ai"],
    title: {
      es: "Predicción de Calificaciones (MLP)",
      en: "Grade Prediction (MLP)",
      de: "Notenvorhersage (MLP)",
      it: "Previsione dei voti (MLP)",
      nl: "Cijfervoorspelling (MLP)",
    },
    description: {
      es: "Red neuronal multicapa para predecir calificaciones estudiantiles basándose en patrones de rendimiento académico.",
      en: "Multi-layer perceptron neural network to predict student grades based on academic performance patterns.",
      de: "Mehrschichtiges neuronales Netz zur Vorhersage von Studiennoten anhand von Mustern der akademischen Leistung.",
      it: "Rete neurale multistrato per prevedere i voti degli studenti in base ai modelli di rendimento accademico.",
      nl: "Meerlaags neuraal netwerk om studentcijfers te voorspellen op basis van patronen in studieprestaties.",
    },
    tags: ["Python", "Neural Networks", "Scikit-learn"],
    links: {
      github: "https://github.com/maxxee1/mlp-grade-prediction",
      code: true,
    },
  },
  {
    id: "memory-simulator",
    date: monthDate("dic", 2025),
    image: "/images/projects/ms.webp",
    categories: ["systems"],
    title: {
      es: "Simulador de Memoria",
      en: "Memory Simulator",
      de: "Speichersimulator",
      it: "Simulatore di memoria",
      nl: "Geheugensimulator",
    },
    description: {
      es: "Simulador educativo de gestión de memoria virtual con diferentes algoritmos de reemplazo de páginas (FIFO, LRU, Optimal).",
      en: "Educational virtual memory management simulator with different page replacement algorithms (FIFO, LRU, Optimal).",
      de: "Lehrsimulator für die Verwaltung virtuellen Speichers mit verschiedenen Seitenersetzungsalgorithmen (FIFO, LRU, Optimal).",
      it: "Simulatore didattico di gestione della memoria virtuale con diversi algoritmi di sostituzione delle pagine (FIFO, LRU, Optimal).",
      nl: "Educatieve simulator voor virtueel geheugenbeheer met verschillende paginavervangingsalgoritmes (FIFO, LRU, Optimal).",
    },
    tags: ["C++", "OS", "Algorithms"],
    links: {
      github: "https://github.com/maxxee1/memory-simulator",
      demo: "https://paging-simulator-one.vercel.app",
      code: "https://github.com/maxxee1/memory-simulator/blob/main/paging_simulator.cpp",
    },
  },
  {
    id: "doom-threads",
    date: monthDate("oct", 2025),
    emoji: "🔀",
    categories: ["systems"],
    title: {
      es: "Simulador de Hilos DOOM",
      en: "DOOM Thread Simulator",
      de: "DOOM-Thread-Simulator",
      it: "Simulatore di thread DOOM",
      nl: "DOOM-threadsimulator",
    },
    description: {
      es: "Implementación de multihilo con Pthreads para simular concurrencia. Sincronización con mutex sobre memoria compartida.",
      en: "Multi-threading implementation with Pthreads to simulate concurrency. Synchronization with mutex on shared memory.",
      de: "Multithreading-Implementierung mit Pthreads zur Simulation von Nebenläufigkeit. Synchronisierung per Mutex über gemeinsamen Speicher.",
      it: "Implementazione multithread con Pthreads per simulare la concorrenza. Sincronizzazione con mutex su memoria condivisa.",
      nl: "Multithreading-implementatie met Pthreads om concurrency te simuleren. Synchronisatie met mutex op gedeeld geheugen.",
    },
    tags: ["C++", "Pthreads", "Concurrency"],
    links: {
      github: "https://github.com/maxxee1/doom-thread-simulator",
      code: "https://github.com/maxxee1/doom-thread-simulator/tree/main/src",
    },
  },
  {
    id: "named-pipes",
    date: monthDate("sep", 2025),
    image: "/images/projects/npc.webp",
    categories: ["systems"],
    title: {
      es: "Chat con Named Pipes",
      en: "Named Pipes Chat",
      de: "Chat mit Named Pipes",
      it: "Chat con Named Pipe",
      nl: "Chat met named pipes",
    },
    description: {
      es: "Sistema de chat implementado usando IPC con FIFOs (Named Pipes) para comunicación entre procesos en Linux.",
      en: "Chat system implemented using IPC with FIFOs (Named Pipes) for inter-process communication on Linux.",
      de: "Chatsystem auf Basis von IPC mit FIFOs (Named Pipes) für die Kommunikation zwischen Prozessen unter Linux.",
      it: "Sistema di chat realizzato con IPC tramite FIFO (Named Pipe) per la comunicazione tra processi su Linux.",
      nl: "Chatsysteem gebouwd met IPC via FIFO's (named pipes) voor communicatie tussen processen op Linux.",
    },
    tags: ["C++", "IPC", "Linux"],
    links: {
      github: "https://github.com/maxxee1/named-pipes",
      code: true,
    },
  },
  {
    id: "aml-neo4j",
    image: "/images/projects/neo4j.webp",
    categories: ["data"],
    title: {
      es: "Anti-Lavado de Dinero (AML)",
      en: "Anti-Money Laundering (AML)",
      de: "Geldwäschebekämpfung (AML)",
      it: "Antiriciclaggio (AML)",
      nl: "Antiwitwassen (AML)",
    },
    description: {
      es: "Análisis de grafos con Neo4j para detectar patrones sospechosos de lavado de dinero mediante relaciones de transacciones.",
      en: "Graph analysis with Neo4j to detect suspicious money laundering patterns through transaction relationships.",
      de: "Graphanalyse mit Neo4j, um verdächtige Geldwäschemuster anhand von Transaktionsbeziehungen zu erkennen.",
      it: "Analisi a grafo con Neo4j per individuare schemi sospetti di riciclaggio attraverso le relazioni tra transazioni.",
      nl: "Grafenanalyse met Neo4j om verdachte witwaspatronen te herkennen via transactierelaties.",
    },
    tags: ["Neo4j", "Cypher", "Graph DB"],
    links: {
      github: "https://github.com/maxxee1/aml-graph-neo4j",
      code: true,
    },
  },
];

export function countByFilter(filter: ProjectFilter): number {
  return filter === "all"
    ? projects.length
    : projects.filter((project) => project.categories.includes(filter)).length;
}
