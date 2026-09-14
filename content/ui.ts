import type { Localized } from "@/lib/i18n";

/** Textos de interfaz. El contenido (proyectos, experiencia…) vive en los otros módulos. */
export const ui = {
  brand: { es: "Mi Portafolio", en: "My Portfolio" },
  backToTop: { es: "Volver arriba", en: "Back to top" },
  openMenu: { es: "Abrir menú", en: "Open menu" },
  closeMenu: { es: "Cerrar menú", en: "Close menu" },
  switchLanguage: { es: "Cambiar idioma", en: "Switch language" },

  nav: {
    home: { es: "Inicio", en: "Home" },
    about: { es: "Sobre mí", en: "About" },
    experience: { es: "Experiencia", en: "Experience" },
    projects: { es: "Proyectos", en: "Projects" },
    skills: { es: "Habilidades", en: "Skills" },
    education: { es: "Educación", en: "Education" },
    certifications: { es: "Certificaciones", en: "Certifications" },
    contact: { es: "Contacto", en: "Contact" },
  },

  hero: {
    viewProjects: { es: "Ver Proyectos", en: "View Projects" },
    scrollHint: { es: "Desliza para explorar", en: "Scroll to explore" },
  },

  about: {
    title: { es: "Sobre mí", en: "About Me" },
  },

  experience: {
    title: { es: "Experiencia", en: "Experience" },
    seeMore: { es: "Ver más sobre el puesto", en: "See more about this role" },
    seeLess: { es: "Ver menos", en: "See less" },
    present: { es: "Presente", en: "Present" },
  },

  projects: {
    title: { es: "Proyectos Destacados", en: "Featured Projects" },
    viewProject: { es: "Ver Proyecto", en: "View Project" },
    viewCode: { es: "Ver Código", en: "View Code" },
    demo: { es: "Demo", en: "Demo" },
    website: { es: "Sitio Web", en: "Website" },
    privateProject: {
      es: "Proyecto privado de cliente",
      en: "Private client project",
    },
    collaborator: { es: "Colaborador", en: "Collaborator" },
    empty: {
      es: "No hay proyectos en esta categoría.",
      en: "No projects in this category.",
    },
    filters: {
      all: { es: "Todos", en: "All" },
      development: { es: "Desarrollo", en: "Development" },
      ai: { es: "IA & Machine Learning", en: "AI & Machine Learning" },
      security: { es: "Ciberseguridad", en: "Cybersecurity" },
      systems: { es: "Sistemas", en: "Systems" },
      data: { es: "Datos", en: "Data" },
      collab: { es: "Colaboraciones", en: "Collaborations" },
    },
  },

  skills: {
    title: { es: "Habilidades", en: "Skills" },
  },

  education: {
    title: { es: "Educación & Competencias", en: "Education & Competitions" },
    competitions: { es: "Competencias", en: "Competitions" },
    currentCourses: {
      es: "Ramos destacados este semestre",
      en: "Highlighted courses this semester",
    },
  },

  certifications: {
    title: { es: "Certificaciones", en: "Certifications" },
    completed: { es: "Completado", en: "Completed" },
    inProgress: { es: "En Progreso", en: "In Progress" },
    viewCredential: { es: "Ver Credencial", en: "View Credential" },
    verify: { es: "Verificar", en: "Verify" },
    code: { es: "Código", en: "Code" },
    copyCode: { es: "Clic para copiar", en: "Click to copy" },
    copied: { es: "¡Copiado!", en: "Copied!" },
    groups: {
      security: { es: "Ciberseguridad", en: "Cybersecurity" },
      networking: { es: "Redes", en: "Networking" },
      languages: { es: "Idiomas", en: "Languages" },
    },
  },

  contact: {
    title: { es: "Contacto", en: "Contact" },
    description: {
      es: "¿Interesado en colaborar o tienes alguna pregunta? ¡No dudes en contactarme!",
      en: "Interested in collaborating or have any questions? Feel free to reach out!",
    },
    emailMe: { es: "Escríbeme", en: "Email me" },
  },

  footer: {
    rights: {
      es: "© 2026 Maximiliano Solorza. Todos los derechos reservados.",
      en: "© 2026 Maximiliano Solorza. All rights reserved.",
    },
    builtWith: {
      es: "Hecho con Next.js, Tailwind CSS y Motion.",
      en: "Built with Next.js, Tailwind CSS and Motion.",
    },
  },
} satisfies Record<string, unknown>;

/** Orden de las secciones en la barra y en la página. */
export const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "certifications",
  "contact",
] as const satisfies readonly (keyof typeof ui.nav)[];

export type SectionId = (typeof SECTION_IDS)[number];

export type UiText = Localized;
