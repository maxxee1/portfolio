import type { Localized } from "@/lib/i18n";

export type Fact = {
  id: "year" | "focus" | "location" | "languages";
  label: Localized;
  value: Localized;
};

export const profile = {
  name: "Maximiliano Solorza",
  role: {
    es: "Ciberseguridad & IA",
    en: "Cybersecurity & AI",
    de: "Cybersicherheit & KI",
    it: "Cybersicurezza & IA",
    nl: "Cybersecurity & AI",
  },
  tagline: {
    es: "Estudiante de Ingeniería Civil en Informática y Telecomunicaciones enfocado en ciberseguridad potenciada con inteligencia artificial.",
    en: "Computer and Telecommunications Engineering student focused on cybersecurity powered by artificial intelligence.",
    de: "Student der Informatik- und Telekommunikationstechnik mit Schwerpunkt auf Cybersicherheit, die durch künstliche Intelligenz gestärkt wird.",
    it: "Studente di Ingegneria Informatica e delle Telecomunicazioni specializzato in cybersicurezza potenziata dall'intelligenza artificiale.",
    nl: "Student Informatica- en Telecommunicatietechniek met een focus op cybersecurity versterkt door kunstmatige intelligentie.",
  },
  photo: {
    src: "/images/profile.webp",
    alt: "Maximiliano Solorza",
  },
  email: "maximilianoo.adonis@gmail.com",
  location: {
    es: "Santiago, Chile",
    en: "Santiago, Chile",
    de: "Santiago, Chile",
    it: "Santiago, Cile",
    nl: "Santiago, Chili",
  },
  social: {
    github: "https://github.com/maxxee1",
    linkedin: "https://linkedin.com/in/maximilianosolorza",
  },
  about: {
    es: [
      "Soy un estudiante motivado que quiere dedicarse a la ciberseguridad potenciada con inteligencia artificial. Tengo experiencia en el desarrollo de aplicaciones web seguras, modelos predictivos de machine learning y análisis y manipulación de tráfico de red.",
      "Competente en programación, despliegue en la nube y gestión de bases de datos. Adaptable, colaborativo y con aprendizaje rápido, siempre dispuesto a enfrentar nuevos desafíos tecnológicos.",
    ],
    en: [
      "I am a motivated student aiming to work in cybersecurity powered by artificial intelligence. I have experience developing secure web applications, machine learning predictive models, and network traffic analysis and manipulation.",
      "Proficient in programming, cloud deployment, and database management. Adaptable, collaborative, and a fast learner, always ready to face new technological challenges.",
    ],
    de: [
      "Ich bin ein motivierter Student, der in der Cybersicherheit mit künstlicher Intelligenz arbeiten möchte. Ich habe Erfahrung in der Entwicklung sicherer Webanwendungen, in prädiktiven Machine-Learning-Modellen sowie in der Analyse und Manipulation von Netzwerkverkehr.",
      "Sicher in Programmierung, Cloud-Deployment und Datenbankverwaltung. Anpassungsfähig, teamorientiert und schnell im Lernen, immer bereit für neue technologische Herausforderungen.",
    ],
    it: [
      "Sono uno studente motivato che vuole lavorare nella cybersicurezza potenziata dall'intelligenza artificiale. Ho esperienza nello sviluppo di applicazioni web sicure, in modelli predittivi di machine learning e nell'analisi e manipolazione del traffico di rete.",
      "Competente in programmazione, deployment in cloud e gestione di database. Adattabile, collaborativo e con apprendimento rapido, sempre pronto ad affrontare nuove sfide tecnologiche.",
    ],
    nl: [
      "Ik ben een gemotiveerde student die wil werken in cybersecurity versterkt door kunstmatige intelligentie. Ik heb ervaring met het ontwikkelen van veilige webapplicaties, voorspellende machine learning-modellen en het analyseren en manipuleren van netwerkverkeer.",
      "Vaardig in programmeren, cloud-deployment en databasebeheer. Flexibel, samenwerkend en een snelle leerling, altijd klaar voor nieuwe technologische uitdagingen.",
    ],
  } satisfies Localized<string[]>,
} as const;

export type Resume = {
  id: "es" | "en" | "de";
  /** Palabra "CV" en el idioma del documento; NO se traduce con la interfaz. */
  title: string;
  /** Nombre del idioma en su propia lengua; tampoco se traduce. */
  native: string;
  /** Archivo en /public/cv. Reemplaza el PDF manteniendo el nombre. */
  file: string;
  /** Nombre con el que se descarga. */
  filename: string;
};

export const resumes: readonly Resume[] = [
  {
    id: "es",
    title: "Curriculum",
    native: "Español",
    file: "/cv/maximiliano-solorza-cv-es.pdf",
    filename: "Maximiliano-Solorza-CV-ES.pdf",
  },
  {
    id: "en",
    title: "Resume",
    native: "English",
    file: "/cv/maximiliano-solorza-cv-en.pdf",
    filename: "Maximiliano-Solorza-Resume-EN.pdf",
  },
  {
    id: "de",
    title: "Lebenslauf",
    native: "Deutsch",
    file: "/cv/maximiliano-solorza-cv-de.pdf",
    filename: "Maximiliano-Solorza-Lebenslauf-DE.pdf",
  },
];

export const facts: readonly Fact[] = [
  {
    id: "year",
    label: {
      es: "Formación",
      en: "Education",
      de: "Ausbildung",
      it: "Formazione",
      nl: "Opleiding",
    },
    value: {
      es: "4º año de Ingeniería Civil en Informática y Telecomunicaciones",
      en: "4th year of Computer & Telecommunications Engineering",
      de: "4. Jahr Informatik- und Telekommunikationstechnik",
      it: "4º anno di Ingegneria Informatica e delle Telecomunicazioni",
      nl: "4e jaar Informatica- en Telecommunicatietechniek",
    },
  },
  {
    id: "focus",
    label: { es: "Foco", en: "Focus", de: "Schwerpunkt", it: "Focus", nl: "Focus" },
    value: {
      es: "Ciberseguridad & Inteligencia Artificial",
      en: "Cybersecurity & Artificial Intelligence",
      de: "Cybersicherheit & Künstliche Intelligenz",
      it: "Cybersicurezza & Intelligenza Artificiale",
      nl: "Cybersecurity & Kunstmatige Intelligentie",
    },
  },
  {
    id: "location",
    label: {
      es: "Ubicación",
      en: "Location",
      de: "Standort",
      it: "Posizione",
      nl: "Locatie",
    },
    value: {
      es: "Santiago de Chile",
      en: "Santiago, Chile",
      de: "Santiago de Chile",
      it: "Santiago del Cile",
      nl: "Santiago de Chile",
    },
  },
  {
    id: "languages",
    label: { es: "Idiomas", en: "Languages", de: "Sprachen", it: "Lingue", nl: "Talen" },
    value: {
      es: "Español (nativo) · Inglés B2 · Alemán (aprendiendo)",
      en: "Spanish (native) · English B2 · German (learning)",
      de: "Spanisch (Muttersprache) · Englisch B2 · Deutsch (im Lernen)",
      it: "Spagnolo (madrelingua) · Inglese B2 · Tedesco (in apprendimento)",
      nl: "Spaans (moedertaal) · Engels B2 · Duits (aan het leren)",
    },
  },
];
