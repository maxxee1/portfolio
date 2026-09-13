import { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Linkedin, ExternalLink, Code, Globe, Menu, X, Lock, Users, Languages, ChevronDown, ArrowUp, Network, ShieldCheck, HardDrive, FileSearch } from 'lucide-react';

const Portfolio = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [projectFilter, setProjectFilter] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);
  // Acordeones de Skills y Certificaciones: solo colapsan en teléfono (ver index.css).
  // En computador el contenido se ve siempre, sin importar este estado.
  const [openPanels, setOpenPanels] = useState({});
  // Botón "volver arriba": aparece al pasar la portada
  const [showBackToTop, setShowBackToTop] = useState(false);
  const togglePanel = (id) => setOpenPanels(prev => ({ ...prev, [id]: !prev[id] }));

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback para navegadores sin Clipboard API (o sin contexto seguro)
      const input = document.createElement('textarea');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(current => (current === code ? null : current)), 2000);
  };

  const translations = {
    es: {
      brand: 'Mi Portafolio',
      backToTop: 'Volver arriba',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      nav: {
        home: 'Inicio',
        about: 'Sobre mí',
        experience: 'Experiencia',
        projects: 'Proyectos',
        skills: 'Skills',
        education: 'Educación',
        certifications: 'Certificaciones',
        contact: 'Contacto'
      },
      hero: {
        title: 'Maximiliano Solorza',
        subtitle: 'Ingeniero de Software & Ciberseguridad',
        description: 'Estudiante de Ingeniería Civil en Informática y Telecomunicaciones apasionado por la ciberseguridad, machine learning y desarrollo de aplicaciones seguras.',
        viewProjects: 'Ver Proyectos',
        contactMe: 'Contáctame'
      },
      about: {
        title: 'Sobre mí',
        p1: 'Soy un estudiante motivado y enfocado en ciberseguridad, gestión de datos y optimización de sistemas. Tengo experiencia en el desarrollo de aplicaciones web seguras, modelos predictivos de machine learning y soluciones de accesibilidad tecnológica.',
        p2: 'Competente en programación, despliegue en la nube y gestión de bases de datos. Adaptable, colaborativo y con aprendizaje rápido, siempre dispuesto a enfrentar nuevos desafíos tecnológicos.',
      },
      experience: {
        title: 'Experiencia',
        seeMore: 'Ver más sobre el puesto',
        seeLess: 'Ver menos',
        soloDev: 'Solo Developer',
        intern: 'Pasante en Ingeniería de Software',
        ta: 'Profesor Auxiliar - Bases de Datos',
        present: 'Presente'
      },
      projects: {
        title: 'Proyectos Destacados',
        viewProject: 'Ver Proyecto',
        viewCode: 'View Code',
        demo: 'Demo',
        website: 'Website',
        privateProject: 'Proyecto privado de cliente',
        roles: {
          collaborator: 'Colaborador'
        },
        filters: {
          all: 'Todos',
          ai: 'IA & Machine Learning',
          development: 'Desarrollo',
          systems: 'Sistemas',
          data: 'Datos',
          collab: 'Colaboraciones'
        }
      },
      skills: {
        title: 'Habilidades'
      },
      certifications: {
        title: 'Certificaciones',
        completed: 'Completado',
        inProgress: 'En Progreso',
        viewCredential: 'Ver Credencial',
        verify: 'Verificar',
        code: 'Código',
        copyCode: 'Clic para copiar',
        copied: '¡Copiado!',
        groups: {
          security: 'Ciberseguridad',
          networking: 'Redes',
          languages: 'Idiomas'
        }
      },
      education: {
        title: 'Educación & Competencias',
        competitions: 'Competencias'
      },
      contact: {
        title: 'Contacto',
        description: '¿Interesado en colaborar o tienes alguna pregunta? ¡No dudes en contactarme!',
      },
      footer: '© 2026 Maximiliano Solorza. Todos los derechos reservados.'
    },
    en: {
      brand: 'My Portfolio',
      backToTop: 'Back to top',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
        skills: 'Skills',
        education: 'Education',
        certifications: 'Certifications',
        contact: 'Contact'
      },
      hero: {
        title: 'Maximiliano Solorza',
        subtitle: 'Software Engineer & Cybersecurity',
        description: 'Computer and Telecommunications Engineering student passionate about cybersecurity, machine learning, and secure application development.',
        viewProjects: 'View Projects',
        contactMe: 'Contact Me'
      },
      about: {
        title: 'About Me',
        p1: 'I am a motivated student focused on cybersecurity, data management, and systems optimization. I have experience developing secure web applications, machine learning predictive models, and technology accessibility solutions.',
        p2: 'Proficient in programming, cloud deployment, and database management. Adaptable, collaborative, and a fast learner, always ready to face new technological challenges.',
      },
      experience: {
        title: 'Experience',
        seeMore: 'See more about this role',
        seeLess: 'See less',
        soloDev: 'Solo Developer',
        intern: 'Software Engineering Intern',
        ta: 'Teaching Assistant - Databases',
        present: 'Present'
      },
      projects: {
        title: 'Featured Projects',
        viewProject: 'View Project',
        viewCode: 'View Code',
        demo: 'Demo',
        website: 'Website',
        privateProject: 'Private client project',
        roles: {
          collaborator: 'Collaborator'
        },
        filters: {
          all: 'All',
          ai: 'AI & Machine Learning',
          development: 'Development',
          systems: 'Systems',
          data: 'Data',
          collab: 'Collaborations'
        }
      },
      skills: {
        title: 'Skills'
      },
      certifications: {
        title: 'Certifications',
        completed: 'Completed',
        inProgress: 'In Progress',
        viewCredential: 'View Credential',
        verify: 'Verify',
        code: 'Code',
        copyCode: 'Click to copy',
        copied: 'Copied!',
        groups: {
          security: 'Cybersecurity',
          networking: 'Networking',
          languages: 'Languages'
        }
      },
      education: {
        title: 'Education & Competitions',
        competitions: 'Competitions'
      },
      contact: {
        title: 'Contact',
        description: 'Interested in collaborating or have any questions? Feel free to reach out!',
      },
      footer: '© 2026 Maximiliano Solorza. All rights reserved.'
    }
  };

  const t = translations[currentLang];

  // Experiencia en teléfono: cargo, empresa y fecha; el resto se abre con "Ver más".
  // En computador el botón no se muestra y el detalle está siempre visible (index.css).
  const expClass = (id) => `exp-item${openPanels[id] ? ' is-open' : ''}`;
  const expToggle = (id) => (
    <button type="button" className="exp-more" onClick={() => togglePanel(id)} aria-expanded={!!openPanels[id]}>
      {openPanels[id] ? t.experience.seeLess : t.experience.seeMore}
      <ChevronDown size={16} aria-hidden="true" />
    </button>
  );

  // Botones ES/EN: se usan en el selector flotante (computador) y dentro del menú (teléfono)
  const langButtons = ["es", "en"].map(lang => (
    <button
      key={lang}
      type="button"
      style={{
        ...styles.langBtn,
        ...(currentLang === lang ? styles.langBtnActive : {})
      }}
      onClick={() => setCurrentLang(lang)}
      aria-pressed={currentLang === lang}
    >
      {lang.toUpperCase()}
    </button>
  ));

  // Íconos como SVG sueltos y diferidos (loading="lazy"). Antes se usaba la fuente de
  // devicon: 130 KB de CSS que bloqueaba el render + 1,5 MB de fuente para ~30 íconos.
  const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@2.17.0/icons';
  const devIcon = (name, variant = 'original') => (
    <img src={`${DEVICON}/${name}/${name}-${variant}.svg`} alt="" loading="lazy" decoding="async" width="40" height="40" style={styles.skillImg} />
  );

  // Íconos de marca que no están en devicon, o monocromos (Simple Icons, color en hex sin #)
  const brandIcon = (slug, color) => (
    <img src={`https://cdn.simpleicons.org/${slug}/${color}`} alt="" loading="lazy" decoding="async" width="40" height="40" style={styles.skillImg} />
  );

  const skillsData = {
    backend: {
      title: { es: 'Backend & Datos', en: 'Backend & Data' },
      skills: [
        { name: 'C++', icon: devIcon('cplusplus') },
        { name: 'Java', icon: devIcon('java') },
        { name: 'Python', icon: devIcon('python') },
        { name: 'Node.js', icon: devIcon('nodejs') },
        { name: 'Express', icon: brandIcon('express', 'ffffff') },
        { name: 'FastAPI', icon: devIcon('fastapi') },
        { name: 'PostgreSQL', icon: devIcon('postgresql') },
        { name: 'MongoDB', icon: devIcon('mongodb') },
        { name: 'Redis', icon: devIcon('redis') },
        { name: 'SupaBase', icon: devIcon('supabase') },
        { name: 'Vercel', icon: brandIcon('vercel', 'ffffff') },
        { name: 'Arduino', icon: devIcon('arduino') },
      ]
    },
    cloud: {
      title: { es: 'Cloud & Infraestructura', en: 'Cloud & Infrastructure' },
      skills: [
        { name: 'Bash', icon: brandIcon('gnubash', 'ffffff') },
        { name: 'Docker', icon: devIcon('docker') },
        { name: 'Kubernetes', icon: devIcon('kubernetes') },
        { name: 'Google Cloud', icon: devIcon('googlecloud') },
        { name: 'AWS', icon: devIcon('amazonwebservices', 'plain-wordmark') },
        { name: 'Cloudflare', icon: devIcon('cloudflare') },
        { name: 'Nginx', icon: devIcon('nginx') },
        { name: 'Sentry', icon: brandIcon('sentry', 'a78bfa') },
      ]
    },
    frontend: {
      title: { es: 'Frontend & Web Moderno', en: 'Frontend & Modern Web' },
      skills: [
        { name: 'React', icon: devIcon('react') },
        { name: 'Next.js', icon: brandIcon('nextdotjs', 'ffffff') },
        { name: 'Tailwind', icon: devIcon('tailwindcss') },
        { name: 'TypeScript', icon: devIcon('typescript') },
        { name: 'JavaScript', icon: devIcon('javascript') },
        { name: 'HTML', icon: devIcon('html5') },
        { name: 'CSS', icon: devIcon('css3') },
        { name: 'Git', icon: devIcon('git') },
        { name: 'LaTeX', icon: brandIcon('latex', 'ffffff') },
      ]
    },
    security: {
      title: { es: 'Ciberseguridad & Herramientas', en: 'Cybersecurity & Tools' },
      skills: [
        { name: 'Wireshark', icon: brandIcon('wireshark', '1679A7') },
        { name: 'Burp Suite', icon: brandIcon('burpsuite', 'FF6633') },
        { name: 'OWASP ZAP', icon: brandIcon('zap', '4A9EFF') },
        { name: 'Scapy', icon: <Network size={40} color="#5eb3f6" /> },
        { name: 'Wazuh', icon: <ShieldCheck size={40} color="#3595F9" /> },
        { name: 'Autopsy', icon: <HardDrive size={40} color="#22c55e" /> },
        { name: 'FOCA', icon: <FileSearch size={40} color="#f59e0b" /> },
      ]
    }
  };

  const gameClubExperience = {
    summary: {
      es: 'Único desarrollador de la plataforma de atención al cliente con IA y del CRM de Movistar Game Club, red de clubes gamer en Santiago. Proyecto construido de punta a punta a partir de requerimientos de alto nivel.',
      en: 'Sole developer of the AI customer-service platform and CRM for Movistar Game Club, a network of gaming clubs in Santiago. Built end to end from high-level requirements.'
    },
    highlights: [
      {
        lead: { es: 'Arquitectura y diseño end-to-end', en: 'End-to-end architecture & design' },
        text: {
          es: 'El cliente solo entregó requerimientos a alto nivel; yo tomé todas las decisiones de arquitectura, stack, modelo de datos y diseño de UI/UX, y me encargué del desarrollo, despliegue y operación.',
          en: 'The client only provided high-level requirements; I made every architecture, stack, data-model and UI/UX design decision, and owned development, deployment and operations.'
        }
      },
      {
        lead: { es: 'Chatbot IA multicanal', en: 'Multichannel AI chatbot' },
        text: {
          es: 'Bot de atención en FastAPI para WhatsApp e Instagram sobre un único flujo compartido: FAQ con matching en 3 niveles (keywords → fuzzy → embeddings semánticos) y fallback a Gemini con memoria conversacional acotada y conocimiento del negocio editable desde Google Sheets.',
          en: 'FastAPI customer-service bot for WhatsApp and Instagram on a single shared flow: 3-tier FAQ matching (keywords → fuzzy → semantic embeddings) with a Gemini fallback using bounded conversational memory and business knowledge editable from Google Sheets.'
        }
      },
      {
        lead: { es: 'Flujo conversacional y tickets', en: 'Conversation flow & ticketing' },
        text: {
          es: 'Máquina de estados con feedback, reintentos, escalamiento a tickets y encuestas de satisfacción (CSAT), más un buffer anti-fragmentación de mensajes en Redis.',
          en: 'State machine with feedback, retries, escalation to tickets and satisfaction surveys (CSAT), plus an anti-fragmentation message buffer on Redis.'
        }
      },
      {
        lead: { es: 'Cóndor IA: ruteo inteligente', en: 'Cóndor AI: smart routing' },
        text: {
          es: 'Clasificación automática de tickets con IA según la taxonomía del negocio y ruteo por nivel y sede al trabajador adecuado, con asignación ponderada por carga, desempeño y rotación.',
          en: 'AI ticket classification against the business taxonomy and routing by tier and location to the right agent, with assignment weighted by workload, performance and rotation.'
        }
      },
      {
        lead: { es: 'Panel de soporte', en: 'Support dashboard' },
        text: {
          es: 'SPA en React + TypeScript + Tailwind: gestión de tickets, historial completo de chats, toma de la conversación por agentes humanos, borradores de respuesta con IA, roles y ajustes del bot en caliente.',
          en: 'React + TypeScript + Tailwind SPA: ticket management, full chat history, human agent takeover, AI-drafted replies, roles and live bot settings.'
        }
      },
      {
        lead: { es: 'Cóndor CRM', en: 'Cóndor CRM' },
        text: {
          es: 'Segundo producto en Next.js 15 sobre Vercel: segmentación de clientes por comportamiento de compra en BigQuery y campañas por email (SendGrid) y WhatsApp redactadas con IA, con plantillas editables y controles de entregabilidad.',
          en: 'Second product built with Next.js 15 on Vercel: customer segmentation by purchase behavior on BigQuery and AI-drafted email (SendGrid) and WhatsApp campaigns, with editable templates and deliverability safeguards.'
        }
      },
      {
        lead: { es: 'Google Cloud Platform', en: 'Google Cloud Platform' },
        text: {
          es: 'Despliegue con Docker en Cloud Run (modos de costo/rendimiento sin redeploy), BigQuery para tickets, mensajes e índice de embeddings, Secret Manager para credenciales, IAM de mínimo privilegio con service accounts, Cloud Logging con logs JSON estructurados y scripts de infraestructura idempotentes con migraciones de esquema.',
          en: 'Docker deployment on Cloud Run (cost/performance modes without redeploying), BigQuery for tickets, messages and the embeddings index, Secret Manager for credentials, least-privilege IAM with service accounts, Cloud Logging with structured JSON logs, and idempotent infrastructure scripts with schema migrations.'
        }
      },
      {
        lead: { es: 'Seguridad y calidad', en: 'Security & quality' },
        text: {
          es: 'Validación de firmas de webhooks de Meta, sesiones JWT en cookies HttpOnly, rate limiting por IP y por cuenta, CSP estricta, consultas parametrizadas y una suite de ~500 tests con pytest.',
          en: 'Meta webhook signature validation, JWT sessions in HttpOnly cookies, per-IP and per-account rate limiting, strict CSP, parameterized queries and a ~500-test pytest suite.'
        }
      }
    ],
    tags: ['Python', 'FastAPI', 'Gemini', 'React', 'TypeScript', 'Next.js', 'Cloud Run', 'BigQuery', 'Secret Manager', 'Redis', 'Docker']
  };

  // "Desarrollo" antes que "IA": en teléfono el chip largo de IA queda cortado en el
  // borde y así se nota que la fila de filtros se desliza.
  const projectCategories = ['all', 'development', 'ai', 'systems', 'data', 'collab'];

  const projects = [
    {
      id: 8,
      icon: '🎮',
      categories: ['ai', 'development'],
      title: {
        es: 'Game Club: Soporte con IA & CRM',
        en: 'Game Club: AI Support Platform & CRM'
      },
      description: {
        es: 'Chatbot multicanal (WhatsApp + Instagram) con FAQ semántica y Gemini, panel de tickets con ruteo por IA y CRM de campañas. Desplegado en Google Cloud Run + BigQuery.',
        en: 'Multichannel chatbot (WhatsApp + Instagram) with semantic FAQ and Gemini, a ticket dashboard with AI routing and a campaign CRM. Deployed on Google Cloud Run + BigQuery.'
      },
      tags: ['FastAPI', 'Gemini', 'React', 'Next.js', 'GCP'],
      private: true,
      links: {}
    },
    {
      id: 9,
      icon: '💳',
      role: 'collaborator',
      categories: ['ai', 'development', 'collab'],
      title: 'OptiWallet',
      // TODO: descripción final (la pasa Maxi)
      description: {
        es: 'Fintech que te dice con qué tarjeta pagar para obtener el mejor precio, con todos los comercios en un mapa. Scrapers en Node.js ejecutados en el servidor y panel de administración donde la IA analiza las ofertas y las clasifica por comercio, categoría y subcategoría.',
        en: 'Fintech app that tells you which card to pay with to get the best price, with every merchant on a map. Server-side Node.js scrapers and an admin panel where AI analyzes offers and classifies them by merchant, category and subcategory.'
      },
      // TODO: stack real
      tags: ['Node.js', 'Web Scraping', 'AI', 'Maps'],
      // TODO: links (github / demo / website)
      links: {}
    },
    {
      id: 10,
      icon: '🗺️',
      role: 'collaborator',
      categories: ['development', 'collab'],
      title: 'UDP Map',
      // TODO: descripción final (la pasa Maxi)
      description: {
        es: 'App para la comunidad de la Universidad Diego Portales: mapas del campus, salas y caminos, todos los eventos de la U y un foro para la comunidad.',
        en: 'App for the Universidad Diego Portales community: campus maps, classrooms and routes, every university event, and a community forum.'
      },
      // TODO: stack real
      tags: ['Maps', 'Events', 'Community Forum'],
      // TODO: links (github / demo / website)
      links: {}
    },
    {
      id: 1,
      image: "images/projects/gcf.webp",
      categories: ['ai'],
      title: {
        es: 'Predicción Atardecer Rosa (gcForest)',
        en: 'Pink Sunset Prediction (gcForest)'
      },
      description: {
        es: 'Modelo predictivo de machine learning para predecir atardeceres rosas utilizando datos meteorológicos como tipo de nubes, polución y ángulo cenital.',
        en: 'Machine learning predictive model to forecast pink sunsets using meteorological data such as cloud types, pollution, and zenith angle.'
      },
      tags: ['Python', 'ML', 'gcForest'],
      links: {
        github: 'https://github.com/gc--tkinlight-prediction',
        demo: 'https://pink-sky-app.vercel.app'
      }
    },
    {
      id: 2,
      image: "images/projects/proxivision.webp",
      categories: ['development'],
      title: {
        es: 'ProxiVision - Proyecto TIC',
        en: 'ProxiVision - TIC Project'
      },
      description: {
        es: 'Sistema de asistencia para personas con discapacidad visual usando sensores IoT, MicroPython y React Native. Arquitectura serverless en Vercel.',
        en: 'Assistance system for visually impaired people using IoT sensors, MicroPython, and React Native. Serverless architecture on Vercel.'
      },
      tags: ['React Native', 'MicroPython', 'IoT', 'Vercel'],
      links: {
        github: 'https://github.com/maxxee1/proxivision',
        website: true
      }
    },
    {
      id: 3,
      image: "images/projects/mlp.webp",
      categories: ['ai'],
      title: {
        es: 'Predicción de Calificaciones (MLP)',
        en: 'Grade Prediction (MLP)'
      },
      description: {
        es: 'Red neuronal multicapa para predecir calificaciones estudiantiles basándose en patrones de rendimiento académico.',
        en: 'Multi-layer perceptron neural network to predict student grades based on academic performance patterns.'
      },
      tags: ['Python', 'Neural Networks', 'Scikit-learn'],
      links: {
        github: 'https://github.com/maxxee1/mlp-grade-prediction',
        viewCode: true
      }
    },
    {
      id: 4,
      image: "images/projects/ms.webp",
      categories: ['systems'],
      title: {
        es: 'Simulador de Memoria',
        en: 'Memory Simulator'
      },
      description: {
        es: 'Simulador educativo de gestión de memoria virtual con diferentes algoritmos de reemplazo de páginas (FIFO, LRU, Optimal).',
        en: 'Educational virtual memory management simulator with different page replacement algorithms (FIFO, LRU, Optimal).'
      },
      tags: ['C++', 'OS', 'Algorithms'],
      links: {
        github: 'https://github.com/maxxee1/memory-simulator',
        demo: 'https://paging-simulator-one.vercel.app',
        viewCode: 'https://github.com/maxxee1/memory-simulator/blob/main/paging_simulator.cpp'
      }
    },
    {
      id: 5,
      icon: '🔀',
      categories: ['systems'],
      title: {
        es: 'Simulador de Hilos DOOM',
        en: 'DOOM Thread Simulator'
      },
      description: {
        es: 'Implementación de multihilo con Pthreads para simular concurrencia. Sincronización con mutex sobre memoria compartida.',
        en: 'Multi-threading implementation with Pthreads to simulate concurrency. Synchronization with mutex on shared memory.'
      },
      tags: ['C++', 'Pthreads', 'Concurrency'],
      links: {
        github: 'https://github.com/maxxee1/doom-thread-simulator',
        viewCode: 'https://github.com/maxxee1/doom-thread-simulator/tree/main/src'
      }
    },
    {
      id: 6,
      image: "images/projects/npc.webp",
      categories: ['systems'],
      title: {
        es: 'Chat con Named Pipes',
        en: 'Named Pipes Chat'
      },
      description: {
        es: 'Sistema de chat implementado usando IPC con FIFOs (Named Pipes) para comunicación entre procesos en Linux.',
        en: 'Chat system implemented using IPC with FIFOs (Named Pipes) for inter-process communication on Linux.'
      },
      tags: ['C++', 'IPC', 'Linux'],
      links: {
        github: 'https://github.com/maxxee1/named-pipes',
        viewCode: true
      }
    },
    {
      id: 7,
      image: "images/projects/neo4j.webp",
      categories: ['data'],
      title: {
        es: 'Anti-Lavado de Dinero (AML)',
        en: 'Anti-Money Laundering (AML)'
      },
      description: {
        es: 'Análisis de grafos con Neo4j para detectar patrones sospechosos de lavado de dinero mediante relaciones de transacciones.',
        en: 'Graph analysis with Neo4j to detect suspicious money laundering patterns through transaction relationships.'
      },
      tags: ['Neo4j', 'Cypher', 'Graph DB'],
      links: {
        github: 'https://github.com/maxxee1/aml-graph-neo4j',
        viewCode: true,
        demo: true
      }
    }
  ];

  const certifications = [
    {
      id: 1,
      title: 'Introduction to Cybersecurity',
      provider: 'Cisco Networking Academy',
      status: 'completed',
      url: 'https://www.credly.com/badges/ef56a8d5-1ba8-4dde-90b2-295ad5da6b3c/public_url',
      image: 'itc.webp',
      category: 'security'
    },
    {
      id: 2,
      title: 'Cybersecurity Essentials',
      provider: 'Cisco Networking Academy',
      status: 'completed',
      url: 'https://www.credly.com/badges/0e8d7cb2-4e8d-4aa0-bfaa-24977276b72e/public_url',
      image: 'ce.webp',
      category: 'security'
    },
    {
      id: 3,
      title: 'Networking Essentials',
      provider: 'Cisco Networking Academy',
      status: 'completed',
      url: 'https://www.credly.com/badges/98ddfe39-d619-4956-91f4-7d4080b0960f/public_url',
      image: 'ne.webp',
      category: 'networking'
    },
    {
      id: 4,
      title: 'Ethical Hacking',
      provider: 'Cisco Networking Academy',
      status: 'in-progress',
      image: 'eh.webp',
      category: 'security'
    },
    {
      id: 5,
      title: { es: 'OSINT Avanzado', en: 'Advanced OSINT' },
      provider: { es: 'Inteligencia de Fuentes Abiertas', en: 'Open Source Intelligence' },
      status: 'in-progress',
      image: 'oa.webp',
      category: 'security'
    },
    {
      id: 6,
      title: 'Ethical Hacking: Metasploit & Python',
      provider: { es: 'Herramientas y Scripting', en: 'Tools & Scripting' },
      status: 'in-progress',
      image: 'oau.webp',
      category: 'security'
    },
    {
      id: 8,
      title: { es: 'Inglés CEFR B2 (Upper Intermediate)', en: 'English CEFR B2 (Upper Intermediate)' },
      provider: 'Universidad Diego Portales × EnglishScore',
      details: {
        es: 'Core skills B2 · Speaking B1 · Writing B1 · Junio 2026',
        en: 'Core skills B2 · Speaking B1 · Writing B1 · June 2026'
      },
      // Es la misma URL a la que redirige el formulario de englishscore.com/verify:
      // devuelve el certificado en PDF servido por EnglishScore.
      verify: { url: 'https://api2.englishscore.com/verify/2a2a20290143', code: '2a2a20290143' },
      status: 'completed',
      category: 'languages'
    },
    {
      id: 7,
      title: 'English for Developers',
      provider: 'FreeCodeCamp',
      status: 'in-progress',
      image: 'efd.webp',
      category: 'languages'
    }
  ];

  const certGroups = ['security', 'networking', 'languages'];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home',
                        'about',
                        'experience',
                        'projects',
                        'skills',
                        'education',
                        'certifications',
                        'contact'];
      
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Como mucho un cálculo por frame (leer offsetTop fuerza layout) y listener pasivo
    // para no frenar el scroll en el teléfono.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        handleScroll();
        setShowBackToTop(window.scrollY > 600);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // por si la página carga ya scrolleada (recarga a mitad de página)
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Language Switcher: flotante abajo a la derecha en computador; en teléfono/tablet
          se oculta y vive dentro del menú hamburguesa (ver index.css) */}
      <button
        type="button"
        className={`back-to-top${showBackToTop ? ' is-visible' : ''}`}
        onClick={() => {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        }}
        aria-label={t.backToTop}
        title={t.backToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp size={22} aria-hidden="true" />
      </button>

      <div style={styles.langSwitcher} className="lang-switcher-floating">
        {langButtons}
      </div>

      {/* Navigation */}
      <nav style={styles.nav} className="site-nav">
        <div style={styles.navContainer} className="nav-container">
          <div style={styles.logo} className="nav-logo" onClick={() => scrollToSection('home')}>
            {t.brand}
          </div>
          <button
            type="button"
            style={styles.mobileMenuBtn}
            className="nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="nav-links"
            aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <ul id="nav-links" style={styles.navLinks} className={`nav-links${mobileMenuOpen ? ' is-open' : ''}`}>
            {Object.entries(t.nav).map(([key, value]) => (
              <li key={key}>
                <a
                  onClick={() => scrollToSection(key)}
                  style={{
                    ...styles.navLink,
                    ...(activeSection === key ? styles.navLinkActive : {})
                  }}
                >
                  {value}
                </a>
              </li>
            ))}
            <li className="nav-lang">
              <div style={styles.langSwitcherInline}>{langButtons}</div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.hero} className="hero">
        <div style={styles.heroBackground} />
        <div style={styles.heroContent} className="hero-content">
          <div style={styles.heroText} className="hero-text">
            <h1 style={styles.heroTitle}>{t.hero.title}</h1>
            <h2 style={styles.heroSubtitle}>{t.hero.subtitle}</h2>
            <p style={styles.heroDescription}>{t.hero.description}</p>

            <div style={styles.socialLinks} className="hero-social">
              <a href="https://github.com/maxxee1" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Github size={30} />
              </a>
              <a href="https://linkedin.com/in/maximilianosolorza" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Linkedin size={30} />
              </a>
              <a href="mailto:maximilianoo.adonis@gmail.com" style={styles.socialLink}>
                <Mail size={30} />
              </a>
              {/* "Contáctame" se quitó: ya están el botón de mail y la sección Contacto al final */}
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                style={{ ...styles.btnPrimary, ...styles.heroCta }}
                className="hero-cta"
              >
                {t.hero.viewProjects}
              </button>
            </div>
          </div>

          <div style={styles.heroImage} className="hero-image">
            <img
              className="hero-photo"
              src="/images/profile.webp"
              srcSet="/images/profile-440.webp 440w, /images/profile.webp 880w"
              sizes="(max-width: 767px) 100vw, 440px"
              alt="Maximiliano Solorza"
              width="440"
              height="440"
              fetchPriority="high"
              decoding="async"
              style={{
                width: 'min(440px, 80vw)',
                height: 'min(440px, 80vw)',
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.about.title}</h2>
        <div style={styles.aboutContent}>
          <p style={styles.aboutText}>{t.about.p1}</p>
          <p style={styles.aboutText}>{t.about.p2}</p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.experience.title}</h2>
        <div style={styles.experienceTimeline} className="exp-timeline">
          <div style={styles.timelineLine} />

          <div style={styles.experienceItem} className={expClass('exp-gameclub')}>
            <div style={styles.timelineDot} className="timeline-dot" />
            <h3 style={styles.experienceRole}>{t.experience.soloDev}</h3>
            <div style={styles.experienceCompany}>
              Movistar Game Club · {currentLang === 'es' ? 'Cliente' : 'Client'}
            </div>
            <div style={styles.experienceDate} className="exp-date">
              {currentLang === 'es'
                ? 'Junio 2026 - Presente · Freelance · Santiago, Chile'
                : 'June 2026 - Present · Freelance · Santiago, Chile'}
            </div>
            <div className="exp-reveal">
            <div className="exp-reveal-inner">
            <p style={styles.experienceSummary}>{gameClubExperience.summary[currentLang]}</p>
            <ul style={styles.experienceList}>
              {gameClubExperience.highlights.map(item => (
                <li key={item.lead.en} style={styles.experienceListItem}>
                  <strong style={styles.experienceLead}>{item.lead[currentLang]}:</strong> {item.text[currentLang]}
                </li>
              ))}
            </ul>
            <div style={{ ...styles.projectTags, marginTop: '1rem', marginBottom: 0 }}>
              {gameClubExperience.tags.map(tag => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>
            </div>
            </div>
            {expToggle('exp-gameclub')}
          </div>

          <div style={styles.experienceItem} className={expClass('exp-abacus')}>
            <div style={styles.timelineDot} className="timeline-dot" />
            <h3 style={styles.experienceRole}>{t.experience.intern}</h3>
            <div style={styles.experienceCompany}>Abacus RX - Miami, FL</div>
            <div style={styles.experienceDate} className="exp-date">
              {currentLang === 'es' ? 'Diciembre 2025 - Marzo 2026' : 'December 2025 - March 2026'}
            </div>
            <div className="exp-reveal">
            <div className="exp-reveal-inner">
            <ul style={styles.experienceList}>
              <li style={styles.experienceListItem}>
                {currentLang === 'es' 
                  ? 'Desarrollo y mantenimiento de aplicaciones web utilizando tecnologías modernas'
                  : 'Development and maintenance of web applications using modern technologies'}
              </li>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Colaboración en la implementación de sistemas de gestión de datos para el sector farmacéutico'
                  : 'Collaboration in implementing data management systems for the pharmaceutical sector'}
              </li>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Optimización de procesos backend y análisis de rendimiento de aplicaciones'
                  : 'Backend process optimization and application performance analysis'}
              </li>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Participación en revisiones de código y mejores prácticas de desarrollo seguro'
                  : 'Participation in code reviews and secure development best practices'}
              </li>
            </ul>
            </div>
            </div>
            {expToggle('exp-abacus')}
          </div>

          <div style={styles.experienceItem} className={expClass('exp-udp')}>
            <div style={styles.timelineDot} className="timeline-dot" />
            <h3 style={styles.experienceRole}>{t.experience.ta}</h3>
            <div style={styles.experienceCompany}>Universidad Diego Portales</div>
            <div style={styles.experienceDate} className="exp-date">
              {currentLang === 'es' ? 'Marzo 2025 - Presente' : 'March 2025 - Present'}
            </div>
            <div className="exp-reveal">
            <div className="exp-reveal-inner">
            <ul style={styles.experienceList}>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Impartí clases sobre SQL, triggers y procedimientos almacenados'
                  : 'Taught classes on SQL, triggers, and stored procedures'}
              </li>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Guié laboratorios prácticos y sesiones de consulta para estudiantes'
                  : 'Guided practical labs and consultation sessions for students'}
              </li>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Corregí evaluaciones y elaboré material práctico adicional'
                  : 'Graded assessments and developed additional practical material'}
              </li>
              <li style={styles.experienceListItem}>
                {currentLang === 'es'
                  ? 'Asistí a estudiantes en proyectos de diseño y optimización de bases de datos'
                  : 'Assisted students in database design and optimization projects'}
              </li>
            </ul>
            </div>
            </div>
            {expToggle('exp-udp')}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.projects.title}</h2>
        <div style={styles.filterBar} className="filter-bar">
          {projectCategories.map(category => {
            const count = category === 'all'
              ? projects.length
              : projects.filter(p => p.categories.includes(category)).length;
            return (
              <button
                key={category}
                onClick={(event) => {
                  setProjectFilter(category);
                  // En teléfono la barra scrollea en horizontal: centrar el filtro elegido
                  event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }}
                style={{
                  ...styles.filterBtn,
                  ...(projectFilter === category ? styles.filterBtnActive : {})
                }}
              >
                {t.projects.filters[category]}
                <span style={styles.filterCount}>{count}</span>
              </button>
            );
          })}
        </div>
        <div style={styles.projectsGrid} className="projects-grid">
          {projects
            .filter(project => projectFilter === 'all' || project.categories.includes(projectFilter))
            .map(project => (
            <div
              key={project.id}
              style={styles.projectCard}
              className={`collapsible project-card${openPanels[`project-${project.id}`] ? ' is-open' : ''}`}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={typeof project.title === 'object'
                    ? project.title[currentLang]
                    : project.title}
                  loading="lazy"
                  decoding="async"
                  width="960"
                  height="640"
                  style={styles.projectImage}
                  className="project-image"
                />
              ) : (
                <div style={styles.projectImage} className="project-image">
                  <span style={styles.projectIcon}>{project.icon}</span>
                </div>
              )}
              <div style={styles.projectContent} className="project-content">
                {/* En teléfono, lo que está dentro de .project-reveal se despliega al tocar el
                    título (arriba el rol, abajo el detalle). En computador son display: contents. */}
                {project.role && (
                  <div className="project-reveal">
                    <div className="project-reveal-inner">
                      <span style={styles.roleBadge}>
                        <Users size={14} /> {t.projects.roles[project.role]}
                      </span>
                    </div>
                  </div>
                )}
                <h3 style={styles.projectTitle} className="collapsible-title">
                  <button
                    type="button"
                    className="collapsible-toggle"
                    style={styles.collapsibleToggle}
                    onClick={() => togglePanel(`project-${project.id}`)}
                    aria-expanded={!!openPanels[`project-${project.id}`]}
                  >
                    {typeof project.title === 'object' ? project.title[currentLang] : project.title}
                    <ChevronDown size={22} className="collapsible-chevron" aria-hidden="true" />
                  </button>
                </h3>
                <div className="project-reveal">
                <div className="project-reveal-inner">
                <p style={styles.projectDescription}>
                  {typeof project.description === 'object' ? project.description[currentLang] : project.description}
                </p>
                <div style={styles.projectTags}>
                  {project.tags.map(tag => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div style={styles.projectLinks}>
                  {project.links.github && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                      <Github size={16} /> {t.projects.viewProject}
                    </a>
                  )}
                  {project.private && (
                    <span style={{ ...styles.projectLink, color: '#b4b4b4', cursor: 'default' }}>
                      <Lock size={16} /> {t.projects.privateProject}
                    </span>
                  )}
                  {project.links.viewCode && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                      <Code size={16} /> {t.projects.viewCode}
                    </a>
                  )}
                  {project.links.demo && typeof project.links.demo === 'string' && (
                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                      <ExternalLink size={16} /> {t.projects.demo}
                    </a>
                  )}
                  {project.links.website && (
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                      <Globe size={16} /> {t.projects.website}
                    </a>
                  )}
                </div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      
      {/* Skills Section */}
      <section id="skills" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.skills.title}</h2>
        <div style={styles.skillsMatrix} className="skills-matrix">
          {Object.entries(skillsData).map(([key, group]) => (
            <div
              key={key}
              style={styles.skillPanel}
              className={`collapsible skill-panel${openPanels[`skill-${key}`] ? ' is-open' : ''}`}
            >
              <h3 style={styles.skillSectionTitle} className="collapsible-title">
                <button
                  type="button"
                  className="collapsible-toggle"
                  style={styles.collapsibleToggle}
                  onClick={() => togglePanel(`skill-${key}`)}
                  aria-expanded={!!openPanels[`skill-${key}`]}
                >
                  {group.title[currentLang]}
                  <ChevronDown size={22} className="collapsible-chevron" aria-hidden="true" />
                </button>
              </h3>
              <div style={styles.skillCardsGrid} className="collapsible-body">
                {group.skills.map(skill => (
                  <div
                    key={skill.name}
                    style={{
                      ...styles.skillCard,
                      ...(hoveredSkill === skill.name ? styles.skillCardHover : {})
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div style={styles.skillIcon}>{skill.icon}</div>
                    <div style={styles.skillName}>{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Competitions */}
      <section id="education" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.education.title}</h2>
        
        <div style={styles.educationGrid}>
          <div style={styles.educationItem}>
            <h3 style={styles.educationTitle}>
              {currentLang === 'es' 
                ? 'Ingeniería Civil en Informática y Telecomunicaciones'
                : 'Computer and Telecommunications Engineering'}
            </h3>
            <div style={styles.educationSchool}>Universidad Diego Portales</div>
            <div style={styles.educationDate}>
              {currentLang === 'es' ? 'Marzo 2023 - Junio 2028' : 'March 2023 - June 2028'}
            </div>
            <p style={styles.educationDescription}>
              {currentLang === 'es'
                ? 'Enfoque en ciberseguridad, redes, bases de datos y desarrollo de software.'
                : 'Focus on cybersecurity, networking, databases, and software development.'}
            </p>
          </div>

          <div style={styles.educationItem}>
            <h3 style={styles.educationTitle}>
              {currentLang === 'es'
                ? 'Plan Avanzado en Física y Matemáticas'
                : 'Advanced Physics and Mathematics Track'}
            </h3>
            <div style={styles.educationSchool}>Liceo Arturo Alessandri Palma</div>
            <div style={styles.educationDate}>
              {currentLang === 'es' ? 'Marzo 2019 - Diciembre 2022' : 'March 2019 - December 2022'}
            </div>
          </div>
        </div>

        <h3 style={{...styles.sectionTitle, marginTop: '2.5rem', fontSize: '2rem'}}>
          {t.education.competitions}
        </h3>
        <div style={styles.compGrid}>
          <div style={styles.compCard}>
            <h3 style={styles.compTitle}>CTF Hackathon - SEK</h3>
            <div style={styles.compAchievement}>
              {currentLang === 'es' ? '4º Lugar por Equipos' : '4th Place Team'}
            </div>
            <p style={styles.compDescription}>
              {currentLang === 'es'
                ? '3.660 puntos en equipo · 2.180 de aporte individual'
                : '3,660 team points · 2,180 individual contribution'}
            </p>
            <p style={styles.compDate}>
              {currentLang === 'es' ? 'Fecha: Junio 2026' : 'Date: June 2026'}
            </p>
          </div>

          <div style={styles.compCard}>
            <h3 style={styles.compTitle}>IEEE Xtreme 19.0</h3>
            <div style={styles.compAchievement}>
              {currentLang === 'es' ? '6º Lugar Chile' : '6th Place Chile'}
            </div>
            <p style={styles.compDescription}>
              {currentLang === 'es' ? '924º lugar mundial sobre 8169 equipos' : '924th place worldwide out of 8169 teams'}
            </p>
            <p style={styles.compDate}>
              {currentLang === 'es' ? 'Fecha: Octubre 2025' : 'Date: October 2025'}
            </p>
          </div>

          <div style={styles.compCard}>
            <h3 style={styles.compTitle}>CTF Hackathon - Dreamlab</h3>
            <div style={styles.compAchievement}>
              {currentLang === 'es' ? '6º Lugar por Equipos' : '6th Place Team'}
            </div>
            <p style={styles.compDescription}>
              {currentLang === 'es'
                ? '770 puntos en equipo · 350 de aporte individual'
                : '770 team points · 350 individual contribution'}
            </p>
            <p style={styles.compDate}>
              {currentLang === 'es' ? 'Fecha: Junio 2025' : 'Date: June 2025'}
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.certifications.title}</h2>
        {certGroups.map(group => (
          <div
            key={group}
            style={styles.certGroup}
            className={`collapsible cert-group${openPanels[`cert-${group}`] ? ' is-open' : ''}`}
          >
            <h3 style={styles.skillSectionTitle} className="collapsible-title">
              <button
                type="button"
                className="collapsible-toggle"
                style={styles.collapsibleToggle}
                onClick={() => togglePanel(`cert-${group}`)}
                aria-expanded={!!openPanels[`cert-${group}`]}
              >
                {t.certifications.groups[group]}
                <ChevronDown size={22} className="collapsible-chevron" aria-hidden="true" />
              </button>
            </h3>
            <div style={styles.certGrid} className="collapsible-body">
              {certifications.filter(cert => cert.category === group).map(cert => (
                <div key={cert.id} style={styles.certCard}>
                  <div style={styles.certBadge} className="cert-badge">
                    {cert.image ? (
                      <img
                        src={`/images/credentials/${cert.image}`}
                        alt={typeof cert.title === 'object' ? cert.title[currentLang] : cert.title}
                        loading="lazy"
                        decoding="async"
                        width="240"
                        height="240"
                        style={{ width: '140%', height: '140%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Languages size={38} color="#a855f7" />
                    )}
                  </div>
                  <div style={styles.certBody}>
                    <h4 style={styles.certTitle}>
                      {typeof cert.title === 'object' ? cert.title[currentLang] : cert.title}
                    </h4>
                    <p style={styles.certProvider}>
                      {typeof cert.provider === 'object' ? cert.provider[currentLang] : cert.provider}
                    </p>
                    {cert.details && <p style={styles.certDetails}>{cert.details[currentLang]}</p>}
                    <div style={styles.certFooter}>
                      <span style={{
                        ...styles.certStatus,
                        ...(cert.status === 'completed' ? styles.certStatusCompleted : styles.certStatusInProgress)
                      }}>
                        {cert.status === 'completed' ? t.certifications.completed : t.certifications.inProgress}
                      </span>
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                          {t.certifications.viewCredential}
                        </a>
                      )}
                      {cert.verify && (
                        <>
                          <a href={cert.verify.url} target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                            {t.certifications.verify}
                          </a>
                          <span style={styles.certCode}>
                            {t.certifications.code}:{' '}
                            <button
                              type="button"
                              onClick={() => copyCode(cert.verify.code)}
                              title={t.certifications.copyCode}
                              style={styles.certCodeValue}
                            >
                              {copiedCode === cert.verify.code ? t.certifications.copied : cert.verify.code}
                            </button>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.contact.title}</h2>
        <div style={styles.contactContent}>
          <p style={styles.contactDescription}>{t.contact.description}</p>
          
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <Mail size={24} style={styles.contactIcon} />
              <a href="mailto:maximilianoo.adonis@gmail.com" style={styles.contactLink}>
                maximilianoo.adonis@gmail.com
              </a>
            </div>
            <div style={styles.contactItem}>
              <MapPin size={24} style={styles.contactIcon} />
              <span style={styles.contactText}>Santiago, Chile</span>
            </div>
          </div>

          <div style={{...styles.ctaButtons, marginTop: '2rem', justifyContent: 'center'}}>
            <a href="https://linkedin.com/in/maximilianosolorza" target="_blank" rel="noopener noreferrer" style={styles.btnPrimary}>
              <Linkedin size={20} style={{marginRight: '8px'}} /> LinkedIn
            </a>
            <a href="https://github.com/maxxee1" target="_blank" rel="noopener noreferrer" style={styles.btnSecondary}>
              <Github size={20} style={{marginRight: '8px'}} /> GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>{t.footer}</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    lineHeight: '1.6',
    overflowX: 'hidden',
  },
  langSwitcher: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    display: 'flex',
    gap: '10px',
    background: '#151515',
    padding: '8px 15px',
    borderRadius: '25px',
    border: '1px solid #390977',
  },
  langBtn: {
    background: 'transparent',
    border: 'none',
    color: '#b4b4b4',
    cursor: 'pointer',
    padding: '5px 12px',
    borderRadius: '15px',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '14px',
  },
  langBtnActive: {
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    color: '#ffffff',
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: 'rgba(10, 10, 10, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0',
    zIndex: 999,
    borderBottom: '1px solid rgba(57, 9, 119, 0.3)',
  },
  navContainer: {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  langSwitcherInline: {
    display: 'inline-flex',
    gap: '10px',
    background: '#151515',
    padding: '6px 12px',
    borderRadius: '25px',
    border: '1px solid #390977',
  },
  logo: {
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  mobileMenuBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: '#b4b4b4',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontWeight: '500',
    cursor: 'pointer',
  },
  navLinkActive: {
    color: '#a855f7',
  },
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem',
    paddingTop: '100px',
  },
  heroBackground: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    borderRadius: '50%',
    filter: 'blur(150px)',
    opacity: 0.2,
  },
  heroContent: {
    maxWidth: '1600px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    zIndex: 1,
  },
  heroText: {
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)',
    lineHeight: '1.15',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
    color: '#b4b4b4',
    marginBottom: '1.5rem',
  },
  heroDescription: {
    color: '#b4b4b4',
    marginBottom: '2rem',
    fontSize: '1.25rem',
  },
  socialLinks: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  // "Ver Proyectos" en la fila de los botones sociales, con su misma altura
  heroCta: {
    height: '64px',
    padding: '0 32px',
    fontSize: '17px',
    justifyContent: 'center',
  },
  socialLink: {
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#151515',
    border: '1px solid #390977',
    borderRadius: '50%',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    padding: '12px 30px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    color: '#ffffff',
    border: '2px solid transparent',
    cursor: 'pointer',
    fontSize: '16px',
  },
  btnSecondary: {
    padding: '12px 30px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    background: 'transparent',
    color: '#ffffff',
    border: '2px solid #390977',
    cursor: 'pointer',
    fontSize: '16px',
  },
  heroImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePlaceholder: {
    width: '400px',
    height: '400px',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  profileIcon: {
    fontSize: '200px',
    opacity: 0.3,
  },
  section: {
    padding: '3.5rem 2rem',
    maxWidth: '1600px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: '20px',
  },
  aboutContent: {
    background: '#151515',
    padding: '3rem',
    borderRadius: '20px',
    border: '1px solid #390977',
  },
  aboutText: {
    color: '#b4b4b4',
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
  },
  skillsMatrix: {
    display: 'grid',
    // Máximo 2 columnas: cada columna mide al menos la mitad del contenedor.
    // Bajo ~900px (tablet/teléfono) pasa a 1 columna.
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, max(420px, calc((100% - 3rem) / 2))), 1fr))',
    gap: '2rem',
  },
  skillPanel: {
    background: '#151515',
    border: '1px solid #390977',
    borderRadius: '15px',
    padding: '2rem',
  },
  collapsibleToggle: {
    all: 'unset',
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  skillSectionTitle: {
    color: '#5eb3f6',
    fontSize: '1.3rem',
    marginTop: 0,
    marginBottom: '1.5rem',
    textAlign: 'left',
    letterSpacing: '0.5px',
  },
  skillCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '1rem',
  },
  skillImg: {
    width: '2.5rem',
    height: '2.5rem',
    display: 'block',
  },
  skillCard: {
    background: '#1a1a1a',
    border: '1px solid #2a2a3a',
    borderRadius: '12px',
    padding: '1.2rem 0.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    minHeight: '100px',
  },
  skillCardHover: {
    transform: 'translateY(-5px)',
    border: '1px solid #5a0fb3',
    background: 'linear-gradient(135deg, rgba(57, 9, 119, 0.3) 0%, rgba(90, 15, 179, 0.3) 100%)',
    boxShadow: '0 8px 20px rgba(90, 15, 179, 0.3)',
  },
  skillIcon: {
    fontSize: '2.5rem',
    lineHeight: '1',
  },
  skillName: {
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  experienceTimeline: {
    position: 'relative',
    paddingLeft: '2rem',
  },
  timelineLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '2px',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
  },
  experienceItem: {
    background: '#151515',
    padding: '2rem',
    borderRadius: '15px',
    marginBottom: '2rem',
    border: '1px solid #390977',
    position: 'relative',
    marginLeft: '2rem',
  },
  timelineDot: {
    position: 'absolute',
    left: '-2.5rem',
    top: '2rem',
    width: '15px',
    height: '15px',
    background: '#a855f7',
    borderRadius: '50%',
    border: '3px solid #0a0a0a',
  },
  experienceRole: {
    color: '#a855f7',
    marginBottom: '0.5rem',
  },
  experienceCompany: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  experienceDate: {
    color: '#b4b4b4',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  experienceSummary: {
    color: '#d4d4d4',
    marginBottom: '0.5rem',
  },
  experienceLead: {
    color: '#ffffff',
    fontWeight: '600',
  },
  filterBar: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.75rem',
    marginTop: '-1.5rem',
    marginBottom: '2.5rem',
  },
  filterBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#151515',
    border: '1px solid #390977',
    color: '#b4b4b4',
    padding: '8px 18px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  filterBtnActive: {
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    border: '1px solid transparent',
    color: '#ffffff',
  },
  filterCount: {
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '1px 8px',
    borderRadius: '10px',
  },
  experienceList: {
    listStyle: 'none',
    marginTop: '1rem',
    padding: 0,
  },
  experienceListItem: {
    color: '#b4b4b4',
    padding: '0.3rem 0',
    paddingLeft: '1.5rem',
    position: 'relative',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  projectCard: {
    background: '#151515',
    borderRadius: '15px',
    overflow: 'hidden',
    border: '1px solid #390977',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  projectImage: {
    width: '100%',
    height: '150px',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  projectIcon: {
    fontSize: '60px',
    opacity: 0.8,
  },
  projectContent: {
    padding: '1.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  roleBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    alignSelf: 'flex-start',
    background: 'rgba(94, 179, 246, 0.15)',
    color: '#5eb3f6',
    padding: '3px 10px',
    borderRadius: '15px',
    fontSize: '0.75rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
  },
  projectTitle: {
    color: '#ffffff',
    marginBottom: '0.75rem',
    fontSize: '1.1rem',
  },
  projectDescription: {
    color: '#b4b4b4',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    flex: 1,
    lineHeight: '1.5',
  },
  projectTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  tag: {
    background: 'rgba(57, 9, 119, 0.3)',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '0.75rem',
    color: '#a855f7',
  },
  projectLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  projectLink: {
    padding: '8px',
    textAlign: 'center',
    background: 'transparent',
    border: '1px solid #390977',
    borderRadius: '8px',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '0.85rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  certGroup: {
    marginBottom: '2.5rem',
  },
  certGrid: {
    display: 'grid',
    // Máximo 3 columnas; baja a 2 y a 1 en pantallas chicas.
    // auto-fill (no auto-fit): un grupo con 1 o 2 tarjetas no las estira a todo el ancho.
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, max(300px, calc((100% - 3.5rem) / 3))), 1fr))',
    gap: '1.5rem',
  },
  certCard: {
    background: '#151515',
    padding: '1.25rem 1.5rem',
    borderRadius: '15px',
    border: '1px solid #390977',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  certBadge: {
    width: '80px',
    height: '80px',
    minWidth: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(57, 9, 119, 0.3)',
  },
  certBody: {
    flex: 1,
    minWidth: 0,
  },
  certDetails: {
    color: '#b4b4b4',
    fontSize: '0.8rem',
    marginTop: '-0.5rem',
    marginBottom: '0.75rem',
  },
  certCode: {
    color: '#b4b4b4',
    fontSize: '0.75rem',
  },
  certCodeValue: {
    color: '#ffffff',
    fontFamily: "'Consolas', 'Courier New', monospace",
    fontSize: '0.75rem',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px dashed #5a0fb3',
    borderRadius: '6px',
    padding: '2px 8px',
    minWidth: '9.5em',
    cursor: 'copy',
  },
  certFooter: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '0.75rem',
  },
  certIcon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 1.5rem',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certTitle: {
    color: '#ffffff',
    marginBottom: '0.5rem',
  },
  certProvider: {
    color: '#b4b4b4',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  certStatus: {
    display: 'inline-block',
    padding: '5px 15px',
    borderRadius: '15px',
    fontSize: '0.8rem',
  },
  certStatusCompleted: {
    background: 'rgba(34, 197, 94, 0.2)',
    color: '#22c55e',
  },
  certStatusInProgress: {
    background: 'rgba(234, 179, 8, 0.2)',
    color: '#eab308',
  },
  certLink: {
    display: 'inline-block',
    padding: '4px 14px',
    fontSize: '0.8rem',
    background: 'transparent',
    border: '1px solid #390977',
    borderRadius: '20px',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  educationGrid: {
    display: 'grid',
    gap: '2rem',
  },
  educationItem: {
    background: '#151515',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid #390977',
  },
  educationTitle: {
    color: '#a855f7',
    marginBottom: '0.5rem',
  },
  educationSchool: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  educationDate: {
    color: '#b4b4b4',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  educationDescription: {
    color: '#b4b4b4',
  },
  compGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  compCard: {
    background: '#151515',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid #390977',
    position: 'relative',
    overflow: 'hidden',
  },
  compTitle: {
    color: '#a855f7',
    marginBottom: '1rem',
  },
  compAchievement: {
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  compDescription: {
    color: '#b4b4b4',
  },
  compDate: {
    color: '#b4b4b4',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
  contactContent: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  contactDescription: {
    color: '#b4b4b4',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  },
  contactInfo: {
    display: 'grid',
    gap: '1rem',
    marginTop: '2rem',
  },
  contactItem: {
    background: '#151515',
    padding: '1.5rem',
    borderRadius: '15px',
    border: '1px solid #390977',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s ease',
  },
  contactIcon: {
    color: '#a855f7',
  },
  contactLink: {
    color: '#b4b4b4',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  contactText: {
    color: '#b4b4b4',
  },
  footer: {
    background: '#151515',
    padding: '2rem',
    textAlign: 'center',
    borderTop: '1px solid #390977',
  },
  footerText: {
    color: '#b4b4b4',
  },
};

export default Portfolio;
