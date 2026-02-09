import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Globe, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // -------------------- CONST FOTOS -------------------
const BUCKET = "img";
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

  const translations = {
    es: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mí',
        experience: 'Experiencia',
        projects: 'Proyectos',
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
        languages: 'Lenguajes',
        dbCloud: 'Base de Datos & Cloud',
        specialization: 'Especialización'
      },
      experience: {
        title: 'Experiencia',
        intern: 'Pasante en Ingeniería de Software',
        ta: 'Profesor Auxiliar - Bases de Datos',
        present: 'Presente'
      },
      projects: {
        title: 'Proyectos Destacados',
        viewProject: 'Ver Proyecto',
        viewCode: 'View Code',
        demo: 'Demo',
        website: 'Website'
      },
      certifications: {
        title: 'Certificaciones',
        completed: 'Completado',
        inProgress: 'En Progreso',
        viewCredential: 'Ver Credencial'
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
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        projects: 'Projects',
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
        languages: 'Languages',
        dbCloud: 'Database & Cloud',
        specialization: 'Specialization'
      },
      experience: {
        title: 'Experience',
        intern: 'Software Engineering Intern',
        ta: 'Teaching Assistant - Databases',
        present: 'Present'
      },
      projects: {
        title: 'Featured Projects',
        viewProject: 'View Project',
        viewCode: 'View Code',
        demo: 'Demo',
        website: 'Website'
      },
      certifications: {
        title: 'Certifications',
        completed: 'Completed',
        inProgress: 'In Progress',
        viewCredential: 'View Credential'
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

  const projects = [
    {
      id: 1,
      icon: '☁️',
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
      icon: '👁️',
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
      icon: '🧠',
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
        demo: 'https://paging-simulator-one.vercel.app',
        viewCode: true
      }
    },
    {
      id: 4,
      icon: '💾',
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
        viewCode: true
      }
    },
    {
      id: 5,
      icon: '🔀',
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
        viewCode: true
      }
    },
    {
      id: 6,
      icon: '💬',
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
      icon: '🔍',
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
      icon: '🛡️'
    },
    {
      id: 2,
      title: 'Cybersecurity Essentials',
      provider: 'Cisco Networking Academy',
      status: 'completed',
      url: 'https://www.credly.com/badges/0e8d7cb2-4e8d-4aa0-bfaa-24977276b72e/public_url',
      icon: '🔒'
    },
    {
      id: 3,
      title: 'Networking Essentials',
      provider: 'Cisco Networking Academy',
      status: 'completed',
      url: 'https://www.credly.com/badges/98ddfe39-d619-4956-91f4-7d4080b0960f/public_url',
      icon: '🌐'
    },
    {
      id: 4,
      title: 'Ethical Hacking',
      provider: 'Cisco Networking Academy',
      status: 'in-progress',
      icon: '🕵️'
    },
    {
      id: 5,
      title: { es: 'OSINT Avanzado', en: 'Advanced OSINT' },
      provider: { es: 'Inteligencia de Fuentes Abiertas', en: 'Open Source Intelligence' },
      status: 'in-progress',
      icon: '🔎'
    },
    {
      id: 6,
      title: 'Ethical Hacking: Metasploit & Python',
      provider: { es: 'Herramientas y Scripting', en: 'Tools & Scripting' },
      status: 'in-progress',
      icon: '💻'
    },
    {
      id: 7,
      title: 'English for Developers',
      provider: 'FreeCodeCamp',
      status: 'in-progress',
      icon: '📚'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'certifications', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      {/* Language Switcher */}
      <div style={styles.langSwitcher}>
        <button
          style={{
            ...styles.langBtn,
            ...(currentLang === 'es' ? styles.langBtnActive : {})
          }}
          onClick={() => setCurrentLang('es')}
        >
          ES
        </button>
        <button
          style={{
            ...styles.langBtn,
            ...(currentLang === 'en' ? styles.langBtnActive : {})
          }}
          onClick={() => setCurrentLang('en')}
        >
          EN
        </button>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>MS</div>
          <button
            style={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul style={{
            ...styles.navLinks,
            ...(mobileMenuOpen ? styles.navLinksActive : {})
          }}>
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
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroBackground} />
        <div style={styles.heroContent}>
          <div style={styles.heroText}>
            <h1 style={styles.heroTitle}>{t.hero.title}</h1>
            <h2 style={styles.heroSubtitle}>{t.hero.subtitle}</h2>
            <p style={styles.heroDescription}>{t.hero.description}</p>

            <div style={styles.socialLinks}>
              <a href="https://github.com/maxxee1" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/maximilianosolorza" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                <Linkedin size={24} />
              </a>
              <a href="mailto:maximilianoo.adonis@gmail.com" style={styles.socialLink}>
                <Mail size={24} />
              </a>
              <a href="tel:+56979613993" style={styles.socialLink}>
                <Phone size={24} />
              </a>
            </div>

            <div style={styles.ctaButtons}>
              <button onClick={() => scrollToSection('projects')} style={styles.btnPrimary}>
                {t.hero.viewProjects}
              </button>
              <button onClick={() => scrollToSection('contact')} style={styles.btnSecondary}>
                {t.hero.contactMe}
              </button>
            </div>
          </div>

          <div style={styles.heroImage}>
            <div style={styles.profilePlaceholder}>
              <span style={styles.profileIcon}>👤</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.about.title}</h2>
        <div style={styles.aboutContent}>
          <p style={styles.aboutText}>{t.about.p1}</p>
          <p style={styles.aboutText}>{t.about.p2}</p>

          <div style={styles.skillsGrid}>
            <div style={styles.skillCategory}>
              <h3 style={styles.skillCategoryTitle}>{t.about.languages}</h3>
              <ul style={styles.skillList}>
                {['C++', 'JavaScript', 'Python', 'Java', 'SQL', 'Cypher'].map(skill => (
                  <li key={skill} style={styles.skillItem}>▹ {skill}</li>
                ))}
              </ul>
            </div>
            <div style={styles.skillCategory}>
              <h3 style={styles.skillCategoryTitle}>Frameworks & Tools</h3>
              <ul style={styles.skillList}>
                {['Node.js / Express.js', 'React', 'Bootstrap', 'Docker', 'Git', 'Nginx'].map(skill => (
                  <li key={skill} style={styles.skillItem}>▹ {skill}</li>
                ))}
              </ul>
            </div>
            <div style={styles.skillCategory}>
              <h3 style={styles.skillCategoryTitle}>{t.about.dbCloud}</h3>
              <ul style={styles.skillList}>
                {['PostgreSQL', 'Neo4j', 'AWS EC2', 'Vercel', 'Power BI'].map(skill => (
                  <li key={skill} style={styles.skillItem}>▹ {skill}</li>
                ))}
              </ul>
            </div>
            <div style={styles.skillCategory}>
              <h3 style={styles.skillCategoryTitle}>{t.about.specialization}</h3>
              <ul style={styles.skillList}>
                {['Cybersecurity', 'Machine Learning', 'Network Analysis', 'Wireshark', 'Linux (Kali, Ubuntu)'].map(skill => (
                  <li key={skill} style={styles.skillItem}>▹ {skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.experience.title}</h2>
        <div style={styles.experienceTimeline}>
          <div style={styles.timelineLine} />
          
          <div style={styles.experienceItem}>
            <div style={styles.timelineDot} />
            <h3 style={styles.experienceRole}>{t.experience.intern}</h3>
            <div style={styles.experienceCompany}>Abacus RX - Miami, FL</div>
            <div style={styles.experienceDate}>
              {currentLang === 'es' ? 'Diciembre 2025 - Marzo 2026' : 'December 2025 - March 2026'}
            </div>
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

          <div style={styles.experienceItem}>
            <div style={styles.timelineDot} />
            <h3 style={styles.experienceRole}>{t.experience.ta}</h3>
            <div style={styles.experienceCompany}>Universidad Diego Portales</div>
            <div style={styles.experienceDate}>
              {currentLang === 'es' ? 'Marzo 2025 - Presente' : 'March 2025 - Present'}
            </div>
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
      </section>

      {/* Projects Section */}
      <section id="projects" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.projects.title}</h2>
        <div style={styles.projectsGrid}>
          {projects.map(project => (
            <div key={project.id} style={styles.projectCard}>
              <div style={styles.projectImage}>
                <span style={styles.projectIcon}>{project.icon}</span>
              </div>
              <div style={styles.projectContent}>
                <h3 style={styles.projectTitle}>
                  {typeof project.title === 'object' ? project.title[currentLang] : project.title}
                </h3>
                <p style={styles.projectDescription}>
                  {typeof project.description === 'object' ? project.description[currentLang] : project.description}
                </p>
                <div style={styles.projectTags}>
                  {project.tags.map(tag => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
                <div style={styles.projectLinks}>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                    <Github size={16} /> {t.projects.viewProject}
                  </a>
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
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" style={styles.section}>
        <h2 style={styles.sectionTitle}>{t.certifications.title}</h2>
        <div style={styles.certGrid}>
          {certifications.map(cert => (
            <div key={cert.id} style={styles.certCard}>
              <div style={styles.certIcon}>
                <span style={{ fontSize: '40px' }}>{cert.icon}</span>
              </div>
              <h3 style={styles.certTitle}>
                {typeof cert.title === 'object' ? cert.title[currentLang] : cert.title}
              </h3>
              <p style={styles.certProvider}>
                {typeof cert.provider === 'object' ? cert.provider[currentLang] : cert.provider}
              </p>
              <span style={{
                ...styles.certStatus,
                ...(cert.status === 'completed' ? styles.certStatusCompleted : styles.certStatusInProgress)
              }}>
                {cert.status === 'completed' ? t.certifications.completed : t.certifications.inProgress}
              </span>
              {cert.url && (
                <div style={{ marginTop: '1rem' }}>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" style={styles.certLink}>
                    {t.certifications.viewCredential}
                  </a>
                </div>
              )}
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

        <h3 style={{...styles.sectionTitle, marginTop: '4rem', fontSize: '2rem'}}>
          {t.education.competitions}
        </h3>
        <div style={styles.compGrid}>
          <div style={styles.compCard}>
            <h3 style={styles.compTitle}>CTF UDP 2025 - Dreamlab</h3>
            <div style={styles.compAchievement}>
              {currentLang === 'es' ? '6º Lugar por Equipos' : '6th Place Team'}
            </div>
            <p style={styles.compDescription}>
              {currentLang === 'es' ? '770 puntos entre 13 participantes' : '770 points among 13 participants'}
            </p>
            <p style={styles.compDate}>
              {currentLang === 'es' ? 'Fecha: Junio 2025' : 'Date: June 2025'}
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
        </div>
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
              <Phone size={24} style={styles.contactIcon} />
              <a href="tel:+56979613993" style={styles.contactLink}>
                +56 9 7961 3993
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
    top: '20px',
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  mobileMenuBtn: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    '@media (max-width: 968px)': {
      display: 'block',
    },
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    margin: 0,
    padding: 0,
  },
  navLinksActive: {
    display: 'flex',
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
    animation: 'float 8s ease-in-out infinite',
  },
  heroContent: {
    maxWidth: '1200px',
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
    fontSize: '3.5rem',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #390977 0%, #5a0fb3 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    color: '#b4b4b4',
    marginBottom: '1.5rem',
  },
  heroDescription: {
    color: '#b4b4b4',
    marginBottom: '2rem',
    fontSize: '1.1rem',
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  },
  socialLink: {
    width: '50px',
    height: '50px',
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
    padding: '6rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
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
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  skillCategory: {},
  skillCategoryTitle: {
    color: '#a855f7',
    marginBottom: '1rem',
  },
  skillList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  skillItem: {
    color: '#b4b4b4',
    padding: '0.5rem 0',
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
  certGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  certCard: {
    background: '#151515',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid #390977',
    transition: 'all 0.3s ease',
    textAlign: 'center',
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
    fontSize: '0.85rem',
    marginBottom: '1rem',
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
    padding: '10px 25px',
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
