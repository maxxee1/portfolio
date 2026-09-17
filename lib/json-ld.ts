import { certifications } from "@/content/certifications";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile, resumes } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { pick } from "@/lib/i18n";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

const es = (text: Parameters<typeof pick>[0]) => pick(text, "es");

/** Datos estructurados (schema.org) de la persona y su portafolio. */
export function buildJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    url: SITE_URL,
    image: `${SITE_URL}${profile.photo.src}`,
    email: `mailto:${profile.email}`,
    jobTitle: es(profile.role),
    description: es(profile.tagline),
    address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
    sameAs: [profile.social.github, profile.social.linkedin],
    subjectOf: resumes.map((resume) => ({
      "@type": "DigitalDocument",
      name: `${resume.title} — ${profile.name} (${resume.native})`,
      url: `${SITE_URL}${resume.file}`,
      encodingFormat: "application/pdf",
      inLanguage: resume.id,
    })),
    alumniOf: education.map((item) => ({ "@type": "EducationalOrganization", name: es(item.school) })),
    worksFor: experience
      .filter((job) => job.current)
      .map((job) => ({ "@type": "Organization", name: job.company })),
    knowsLanguage: ["es", "en", "de"],
    knowsAbout: skillGroups.flatMap((group) => group.skills.map((skill) => es(skill.name))),
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: es(cert.title),
      recognizedBy: { "@type": "Organization", name: es(cert.provider) },
      ...(cert.url ? { url: cert.url } : {}),
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        inLanguage: "es",
        author: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "es",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      person,
    ],
  };
}
