import type { Localized } from "@/lib/i18n";

/** Textos de interfaz. El contenido (proyectos, experiencia…) vive en los otros módulos. */
export const ui = {
  brand: { es: "Mi Portafolio", en: "My Portfolio" },
  backToTop: { es: "Volver arriba", en: "Back to top" },
  openMenu: { es: "Abrir menú", en: "Open menu" },
  closeMenu: { es: "Cerrar menú", en: "Close menu" },
  switchLanguage: { es: "Cambiar idioma", en: "Switch language" },
  cv: {
    open: { es: "Ver CV", en: "View resume" },
    title: { es: "Curriculum Vitae", en: "Resume" },
    choose: { es: "Elige un idioma", en: "Choose a language" },
    back: { es: "Volver a los idiomas", en: "Back to languages" },
    download: { es: "Descargar PDF", en: "Download PDF" },
    openTab: { es: "Abrir en pestaña nueva", en: "Open in new tab" },
    close: { es: "Cerrar", en: "Close" },
  },
  theme: {
    group: { es: "Tema", en: "Theme" },
    light: { es: "Claro", en: "Light" },
    system: { es: "Sistema", en: "System" },
    dark: { es: "Oscuro", en: "Dark" },
  },

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
    stats: {
      projects: { es: "Proyectos", en: "Projects" },
      technologies: { es: "Tecnologías", en: "Technologies" },
      certifications: { es: "Certificaciones", en: "Certifications" },
      competitions: { es: "Competencias", en: "Competitions" },
    },
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
    viewInSkills: { es: "Ver en Habilidades", en: "See in Skills" },
  },

  education: {
    title: { es: "Educación & Competencias", en: "Education & Competitions" },
    competitions: { es: "Competencias", en: "Competitions" },
    currentCourses: {
      es: "Ramos destacados este semestre",
      en: "Highlighted courses this semester",
    },
    rankings: {
      team: { es: "Ranking por equipos", en: "Team ranking" },
      individual: { es: "Ranking individual", en: "Individual ranking" },
      world: { es: "Ranking mundial", en: "Worldwide ranking" },
    },
    of: { es: "de", en: "of" },
  },

  certifications: {
    title: { es: "Certificaciones", en: "Certifications" },
    completed: { es: "Completado", en: "Completed" },
    inProgress: { es: "En Progreso", en: "In Progress" },
    completedCount: { es: "completadas", en: "completed" },
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
    email: { es: "Correo", en: "Email" },
    location: { es: "Ubicación", en: "Location" },
    copyEmail: { es: "Copiar correo", en: "Copy email" },
    copied: { es: "¡Copiado!", en: "Copied!" },
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
