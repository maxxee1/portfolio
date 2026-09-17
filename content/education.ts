import type { Localized, Text } from "@/lib/i18n";

export type Education = {
  id: string;
  degree: Localized;
  school: Localized;
  /** Logo en /public/images/education (llena el cuadrado). */
  logo?: string;
  /** Escala del logo dentro del chip (1 = sin zoom). */
  logoZoom?: number;
  period: Localized;
  description?: Localized;
  courses?: readonly Localized[];
};

export type Ranking = {
  scope: "team" | "individual" | "world";
  /** Puesto obtenido. Puede faltar cuando solo se conoce el puntaje. */
  rank?: number;
  /** Cuántos compitieron (equipos o participantes). */
  total: number;
  /** Puntaje propio/del equipo. Con topScore dibuja la barra de brecha al líder. */
  score?: number;
  /** Puntaje del 1er lugar (tope de la escala). */
  topScore?: number;
};

export type Competition = {
  id: string;
  name: string;
  achievement: Localized;
  detail: Localized;
  date: Localized;
  /** Logo en /public/images/competitions. */
  logo?: string;
  /** Llena el círculo (logo con fondo propio) en vez de object-contain. */
  logoCover?: boolean;
  /** Categorías de desafíos del evento (según el informe de los organizadores). */
  categories?: readonly Text[];
  /** Logro puntual verificable, en una línea. */
  highlight?: Localized;
  /** Noticia u origen (opcional). */
  link?: string;
  rankings?: readonly Ranking[];
};

export const education: readonly Education[] = [
  {
    id: "udp",
    degree: {
      es: "Ingeniería Civil en Informática y Telecomunicaciones",
      en: "Computer and Telecommunications Engineering",
      de: "Informatik- und Telekommunikationstechnik",
      it: "Ingegneria Informatica e delle Telecomunicazioni",
      nl: "Informatica- en Telecommunicatietechniek",
    },
    school: {
      es: "Universidad Diego Portales",
      en: "Diego Portales University",
      de: "Universität Diego Portales",
      it: "Università Diego Portales",
      nl: "Universiteit Diego Portales",
    },
    logo: "university.webp",
    period: {
      es: "Marzo 2023 - Junio 2028",
      en: "March 2023 - June 2028",
      de: "März 2023 - Juni 2028",
      it: "Marzo 2023 - Giugno 2028",
      nl: "Maart 2023 - juni 2028",
    },
    description: {
      es: "Enfoque en ciberseguridad, redes, bases de datos y desarrollo de software.",
      en: "Focus on cybersecurity, networking, databases, and software development.",
      de: "Schwerpunkt auf Cybersicherheit, Netzwerken, Datenbanken und Softwareentwicklung.",
      it: "Focus su cybersicurezza, reti, database e sviluppo software.",
      nl: "Focus op cybersecurity, netwerken, databases en softwareontwikkeling.",
    },
    courses: [
      {
        es: "Criptografía y Ciberseguridad",
        en: "Cryptography & Cybersecurity",
        de: "Kryptografie & Cybersicherheit",
        it: "Crittografia e Cybersicurezza",
        nl: "Cryptografie en cybersecurity",
      },
      {
        es: "Reconocimiento de Patrones en Imágenes",
        en: "Image Pattern Recognition",
        de: "Mustererkennung in Bildern",
        it: "Riconoscimento di pattern nelle immagini",
        nl: "Patroonherkenning in beelden",
      },
    ],
  },
  {
    id: "liceo",
    degree: {
      es: "Plan Avanzado en Física y Matemáticas",
      en: "Advanced Physics and Mathematics Track",
      de: "Vertiefungszweig Physik und Mathematik",
      it: "Indirizzo avanzato in Fisica e Matematica",
      nl: "Verdiepingsrichting natuurkunde en wiskunde",
    },
    school: {
      es: "Liceo Arturo Alessandri Palma",
      en: "Arturo Alessandri Palma High School",
      de: "Gymnasium Arturo Alessandri Palma",
      it: "Liceo Arturo Alessandri Palma",
      nl: "Middelbare school Arturo Alessandri Palma",
    },
    logo: "school.webp",
    logoZoom: 1.25,
    period: {
      es: "Marzo 2019 - Diciembre 2022",
      en: "March 2019 - December 2022",
      de: "März 2019 - Dezember 2022",
      it: "Marzo 2019 - Dicembre 2022",
      nl: "Maart 2019 - december 2022",
    },
    description: {
      es: "Tutor de Límites, Derivadas e Integrales: hice clases en paralelo a la profesora para apoyar a mis compañeros.",
      en: "Tutor in limits, derivatives and integrals: taught alongside the teacher to support my classmates.",
      de: "Tutor für Grenzwerte, Ableitungen und Integrale: Ich unterrichtete parallel zur Lehrerin, um meine Mitschüler zu unterstützen.",
      it: "Tutor di limiti, derivate e integrali: ho tenuto lezioni in parallelo alla professoressa per aiutare i miei compagni.",
      nl: "Tutor in limieten, afgeleiden en integralen: ik gaf les naast de docent om mijn klasgenoten te helpen.",
    },
  },
];

export const competitions: readonly Competition[] = [
  {
    id: "ctf-sek",
    name: "CTF Hackathon - SEK",
    achievement: {
      es: "4º Lugar por Equipos",
      en: "4th Place Team",
      de: "4. Platz im Team",
      it: "4º posto a squadre",
      nl: "4e plaats in teamverband",
    },
    detail: {
      es: "Capture The Flag · Equipo Inside",
      en: "Capture The Flag · Team Inside",
      de: "Capture The Flag · Team Inside",
      it: "Capture The Flag · Squadra Inside",
      nl: "Capture The Flag · Team Inside",
    },
    date: {
      es: "10 de junio de 2026",
      en: "June 10, 2026",
      de: "10. Juni 2026",
      it: "10 giugno 2026",
      nl: "10 juni 2026",
    },
    // Informe SEK Hacker Academy: 3 primeras sangres (m.adonnis), #3 del evento.
    highlight: {
      es: "#3 en primeras sangres del evento (3 first bloods)",
      en: "#3 in first bloods of the event (3 first bloods)",
      de: "#3 bei den First Bloods des Events (3 First Bloods)",
      it: "#3 per first blood dell'evento (3 first blood)",
      nl: "#3 in first bloods van het evenement (3 first bloods)",
    },
    categories: ["Web", "Reversing", "Forensics", "Privilege Escalation", "Stegano", "Infra", "Pwn"],
    logo: "sek.webp",
    link: "https://eit.udp.cl/capture-the-flag-se-consolida-como-una-competencia-con-alta-participacion-estudiantil/",
    rankings: [
      { scope: "team", rank: 4, total: 24, score: 3660, topScore: 4320 },
      // Empate a 2180 pts con los puestos 9 y 10 del informe.
      { scope: "individual", rank: 10, total: 75, score: 2180, topScore: 3030 },
    ],
  },
  {
    id: "ctf-dreamlab-3",
    name: "CTF Hackathon - Dreamlab",
    achievement: {
      es: "9º Lugar por Equipos",
      en: "9th Place Team",
      de: "9. Platz im Team",
      it: "9º posto a squadre",
      nl: "9e plaats in teamverband",
    },
    detail: {
      es: "Capture The Flag · Equipo INSAID",
      en: "Capture The Flag · Team INSAID",
      de: "Capture The Flag · Team INSAID",
      it: "Capture The Flag · Squadra INSAID",
      nl: "Capture The Flag · Team INSAID",
    },
    date: {
      es: "12 de noviembre de 2025",
      en: "November 12, 2025",
      de: "12. November 2025",
      it: "12 novembre 2025",
      nl: "12 november 2025",
    },
    categories: ["Web", "Reversing", "Misc"],
    logo: "dreamlab.webp",
    logoCover: true,
    link: "https://eit.udp.cl/exitosa-tercera-version-de-evento-capture-the-flag-udp-dreamlab/",
    rankings: [
      { scope: "team", rank: 9, total: 18, score: 1060, topScore: 2920 },
      { scope: "individual", rank: 21, total: 65, score: 300, topScore: 1280 },
    ],
  },
  {
    id: "ieee-xtreme",
    name: "IEEE Xtreme 19.0",
    achievement: {
      es: "6º Lugar Chile",
      en: "6th Place Chile",
      de: "6. Platz in Chile",
      it: "6º posto in Cile",
      nl: "6e plaats in Chili",
    },
    detail: {
      es: "924º lugar mundial sobre 8169 equipos",
      en: "924th place worldwide out of 8169 teams",
      de: "924. Platz weltweit von 8169 Teams",
      it: "924º posto al mondo su 8169 squadre",
      nl: "924e plaats wereldwijd van 8169 teams",
    },
    date: {
      es: "Octubre 2025",
      en: "October 2025",
      de: "Oktober 2025",
      it: "Ottobre 2025",
      nl: "Oktober 2025",
    },
    categories: [
      {
        es: "Programación competitiva",
        en: "Competitive programming",
        de: "Wettbewerbsprogrammierung",
        it: "Programmazione competitiva",
        nl: "Competitief programmeren",
      },
    ],
    logo: "ieee.webp",
    rankings: [{ scope: "world", rank: 924, total: 8169 }],
  },
  {
    id: "ctf-dreamlab-2",
    name: "CTF Hackathon - Dreamlab",
    achievement: {
      es: "6º Lugar por Equipos",
      en: "6th Place Team",
      de: "6. Platz im Team",
      it: "6º posto a squadre",
      nl: "6e plaats in teamverband",
    },
    detail: {
      es: "Capture The Flag · Equipo INSAID · Mi primer CTF",
      en: "Capture The Flag · Team INSAID · My first CTF",
      de: "Capture The Flag · Team INSAID · Mein erstes CTF",
      it: "Capture The Flag · Squadra INSAID · Il mio primo CTF",
      nl: "Capture The Flag · Team INSAID · Mijn eerste CTF",
    },
    date: {
      es: "11 de junio de 2025",
      en: "June 11, 2025",
      de: "11. Juni 2025",
      it: "11 giugno 2025",
      nl: "11 juni 2025",
    },
    categories: ["Web", "Reversing", "Privilege Escalation"],
    logo: "dreamlab.webp",
    logoCover: true,
    link: "https://eit.udp.cl/exitosa-segunda-version-de-evento-capture-the-flag-udp-dreamlab/",
    rankings: [
      { scope: "team", rank: 6, total: 13, score: 770, topScore: 1280 },
      // Empate a 350 pts con los puestos 9 y 10 del informe: cuenta como #10.
      { scope: "individual", rank: 10, total: 43, score: 350, topScore: 570 },
    ],
  },
];
