import type { Localized } from "@/lib/i18n";

export type Education = {
  id: string;
  degree: Localized;
  school: string;
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
    },
    school: "Universidad Diego Portales",
    period: { es: "Marzo 2023 - Junio 2028", en: "March 2023 - June 2028" },
    description: {
      es: "Enfoque en ciberseguridad, redes, bases de datos y desarrollo de software.",
      en: "Focus on cybersecurity, networking, databases, and software development.",
    },
    courses: [
      { es: "Criptografía y Ciberseguridad", en: "Cryptography & Cybersecurity" },
      { es: "Reconocimiento de Patrones en Imágenes", en: "Image Pattern Recognition" },
    ],
  },
  {
    id: "liceo",
    degree: {
      es: "Plan Avanzado en Física y Matemáticas",
      en: "Advanced Physics and Mathematics Track",
    },
    school: "Liceo Arturo Alessandri Palma",
    period: { es: "Marzo 2019 - Diciembre 2022", en: "March 2019 - December 2022" },
  },
];

export const competitions: readonly Competition[] = [
  {
    id: "ctf-sek",
    name: "CTF Hackathon - SEK",
    achievement: { es: "4º Lugar por Equipos", en: "4th Place Team" },
    detail: {
      es: "Capture The Flag · Equipos de 4",
      en: "Capture The Flag · Teams of 4",
    },
    date: { es: "10 de junio de 2026", en: "June 10, 2026" },
    logo: "sek.webp",
    link: "https://eit.udp.cl/capture-the-flag-se-consolida-como-una-competencia-con-alta-participacion-estudiantil/",
    rankings: [
      { scope: "team", rank: 4, total: 24, score: 3660, topScore: 4320 },
      { scope: "individual", rank: 10, total: 75, score: 2180, topScore: 3030 },
    ],
  },
  {
    id: "ctf-dreamlab-3",
    name: "CTF Hackathon - Dreamlab",
    achievement: { es: "9º Lugar por Equipos", en: "9th Place Team" },
    detail: {
      es: "Capture The Flag · Equipos de 4",
      en: "Capture The Flag · Teams of 4",
    },
    date: { es: "12 de noviembre de 2025", en: "November 12, 2025" },
    logo: "dreamlab.webp",
    link: "https://eit.udp.cl/exitosa-tercera-version-de-evento-capture-the-flag-udp-dreamlab/",
    rankings: [
      { scope: "team", rank: 9, total: 18, score: 1060, topScore: 2920 },
      { scope: "individual", total: 65, score: 300, topScore: 1280 },
    ],
  },
  {
    id: "ieee-xtreme",
    name: "IEEE Xtreme 19.0",
    achievement: { es: "6º Lugar Chile", en: "6th Place Chile" },
    detail: {
      es: "924º lugar mundial sobre 8169 equipos",
      en: "924th place worldwide out of 8169 teams",
    },
    date: { es: "Octubre 2025", en: "October 2025" },
    logo: "ieee.webp",
    rankings: [{ scope: "world", rank: 924, total: 8169 }],
  },
  {
    id: "ctf-dreamlab-2",
    name: "CTF Hackathon - Dreamlab",
    achievement: { es: "6º Lugar por Equipos", en: "6th Place Team" },
    detail: {
      es: "Capture The Flag · Equipos de 4 · Mi primer CTF",
      en: "Capture The Flag · Teams of 4 · My first CTF",
    },
    date: { es: "11 de junio de 2025", en: "June 11, 2025" },
    logo: "dreamlab.webp",
    link: "https://eit.udp.cl/exitosa-segunda-version-de-evento-capture-the-flag-udp-dreamlab/",
    rankings: [
      { scope: "team", rank: 6, total: 13, score: 770, topScore: 1280 },
      { scope: "individual", rank: 11, total: 43, score: 350, topScore: 570 },
    ],
  },
];
