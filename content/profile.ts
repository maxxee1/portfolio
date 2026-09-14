import type { Localized } from "@/lib/i18n";

export type Fact = {
  id: "year" | "focus" | "location" | "languages";
  label: Localized;
  value: Localized;
};

export const profile = {
  name: "Maximiliano Solorza",
  role: { es: "Ciberseguridad & IA", en: "Cybersecurity & AI" },
  tagline: {
    es: "Estudiante de Ingeniería Civil en Informática y Telecomunicaciones enfocado en ciberseguridad potenciada con inteligencia artificial.",
    en: "Computer and Telecommunications Engineering student focused on cybersecurity powered by artificial intelligence.",
  },
  photo: {
    src: "/images/profile.webp",
    alt: "Maximiliano Solorza",
  },
  email: "maximilianoo.adonis@gmail.com",
  location: { es: "Santiago, Chile", en: "Santiago, Chile" },
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
  } satisfies Localized<string[]>,
} as const;

export const facts: readonly Fact[] = [
  {
    id: "year",
    label: { es: "Formación", en: "Education" },
    value: {
      es: "4º año de Ingeniería Civil en Informática y Telecomunicaciones",
      en: "4th year of Computer & Telecommunications Engineering",
    },
  },
  {
    id: "focus",
    label: { es: "Foco", en: "Focus" },
    value: {
      es: "Ciberseguridad & Inteligencia Artificial",
      en: "Cybersecurity & Artificial Intelligence",
    },
  },
  {
    id: "location",
    label: { es: "Ubicación", en: "Location" },
    value: { es: "Santiago de Chile", en: "Santiago, Chile" },
  },
  {
    id: "languages",
    label: { es: "Idiomas", en: "Languages" },
    value: {
      es: "Español (nativo) · Inglés B2 · Alemán (aprendiendo)",
      en: "Spanish (native) · English B2 · German (learning)",
    },
  },
];
