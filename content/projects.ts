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
    },
    description: {
      es: "Chatbot multicanal (WhatsApp + Instagram) con FAQ semántica y Gemini, panel de tickets con ruteo por IA y CRM de campañas. Desplegado en Google Cloud Run + BigQuery.",
      en: "Multichannel chatbot (WhatsApp + Instagram) with semantic FAQ and Gemini, a ticket dashboard with AI routing and a campaign CRM. Deployed on Google Cloud Run + BigQuery.",
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
    },
    description: {
      es: "Modelo predictivo de machine learning para predecir atardeceres rosas utilizando datos meteorológicos como tipo de nubes, polución y ángulo cenital.",
      en: "Machine learning predictive model to forecast pink sunsets using meteorological data such as cloud types, pollution, and zenith angle.",
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
    },
    description: {
      es: "Sistema de asistencia para personas con discapacidad visual usando sensores IoT, MicroPython y React Native. Arquitectura serverless en Vercel.",
      en: "Assistance system for visually impaired people using IoT sensors, MicroPython, and React Native. Serverless architecture on Vercel.",
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
    },
    description: {
      es: "Red neuronal multicapa para predecir calificaciones estudiantiles basándose en patrones de rendimiento académico.",
      en: "Multi-layer perceptron neural network to predict student grades based on academic performance patterns.",
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
    },
    description: {
      es: "Simulador educativo de gestión de memoria virtual con diferentes algoritmos de reemplazo de páginas (FIFO, LRU, Optimal).",
      en: "Educational virtual memory management simulator with different page replacement algorithms (FIFO, LRU, Optimal).",
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
    },
    description: {
      es: "Implementación de multihilo con Pthreads para simular concurrencia. Sincronización con mutex sobre memoria compartida.",
      en: "Multi-threading implementation with Pthreads to simulate concurrency. Synchronization with mutex on shared memory.",
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
    },
    description: {
      es: "Sistema de chat implementado usando IPC con FIFOs (Named Pipes) para comunicación entre procesos en Linux.",
      en: "Chat system implemented using IPC with FIFOs (Named Pipes) for inter-process communication on Linux.",
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
    },
    description: {
      es: "Análisis de grafos con Neo4j para detectar patrones sospechosos de lavado de dinero mediante relaciones de transacciones.",
      en: "Graph analysis with Neo4j to detect suspicious money laundering patterns through transaction relationships.",
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
