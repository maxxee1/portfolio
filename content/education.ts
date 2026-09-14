import type { Localized } from "@/lib/i18n";

export type Education = {
  id: string;
  degree: Localized;
  school: string;
  period: Localized;
  description?: Localized;
  courses?: readonly Localized[];
};

export type Competition = {
  id: string;
  name: string;
  achievement: Localized;
  detail: Localized;
  date: Localized;
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
      es: "3.660 puntos en equipo · 2.180 de aporte individual",
      en: "3,660 team points · 2,180 individual contribution",
    },
    date: { es: "Junio 2026", en: "June 2026" },
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
  },
  {
    id: "ctf-dreamlab",
    name: "CTF Hackathon - Dreamlab",
    achievement: { es: "6º Lugar por Equipos", en: "6th Place Team" },
    detail: {
      es: "770 puntos en equipo · 350 de aporte individual",
      en: "770 team points · 350 individual contribution",
    },
    date: { es: "Junio 2025", en: "June 2025" },
  },
];
