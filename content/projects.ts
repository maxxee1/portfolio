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
    emoji: "🕵️",
    categories: ["security"],
    title: "Man-in-the-Middle (MITM)",
    description: {
      es: "Ataque de red que intercepta, inyecta y modifica tráfico en tránsito usando Scapy y Python: envenenamiento ARP para posicionarse entre víctima y gateway, y manipulación de paquetes al vuelo.",
      en: "Network attack that intercepts, injects and modifies traffic in transit using Scapy and Python: ARP poisoning to sit between victim and gateway, and on-the-fly packet manipulation.",
      de: "Netzwerkangriff, der Datenverkehr mit Scapy und Python abfängt, einschleust und verändert: ARP-Spoofing, um sich zwischen Opfer und Gateway zu setzen, und Paketmanipulation in Echtzeit.",
      it: "Attacco di rete che intercetta, inietta e modifica il traffico in transito con Scapy e Python: ARP poisoning per posizionarsi tra vittima e gateway e manipolazione dei pacchetti al volo.",
      nl: "Netwerkaanval die verkeer onderweg onderschept, injecteert en wijzigt met Scapy en Python: ARP-poisoning om tussen slachtoffer en gateway te gaan zitten, en pakketmanipulatie in realtime.",
    },
    tags: ["Python", "Scapy", "Networking", "Security"],
  },
  {
    id: "optiwallet",
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
    image: "/images/projects/proxivision.webp",
    categories: ["development"],
    title: {
      es: "ProxiVision - Proyecto TIC",
      en: "ProxiVision - TIC Project",
      de: "ProxiVision - IKT-Projekt",
      it: "ProxiVision - Progetto TIC",
      nl: "ProxiVision - ICT-project",
    },
    description: {
      es: "Sistema de asistencia para personas con discapacidad visual usando sensores IoT, MicroPython y React Native. Arquitectura serverless en Vercel.",
      en: "Assistance system for visually impaired people using IoT sensors, MicroPython, and React Native. Serverless architecture on Vercel.",
      de: "Assistenzsystem für sehbehinderte Menschen mit IoT-Sensoren, MicroPython und React Native. Serverlose Architektur auf Vercel.",
      it: "Sistema di assistenza per persone con disabilità visiva basato su sensori IoT, MicroPython e React Native. Architettura serverless su Vercel.",
      nl: "Hulpsysteem voor mensen met een visuele beperking met IoT-sensoren, MicroPython en React Native. Serverloze architectuur op Vercel.",
    },
    tags: ["React Native", "MicroPython", "IoT", "Vercel"],
    links: {
      github: "https://github.com/maxxee1/proxivision",
      website: "https://github.com/maxxee1/proxivision",
    },
  },
  {
    id: "mlp-grades",
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
