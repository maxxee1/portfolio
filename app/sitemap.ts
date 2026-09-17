import type { MetadataRoute } from "next";

import { resumes } from "@/content/profile";
import { LAST_UPDATED, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/llms.txt`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/llms-en.txt`, lastModified: LAST_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    ...resumes.map((resume) => ({
      url: `${SITE_URL}${resume.file}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
