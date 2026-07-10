import type { MetadataRoute } from "next";
import { caseStudyPages } from "@/lib/content";

const BASE = "https://ivanportfolio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Evaluated at build time; each deploy stamps a fresh, truthful date.
  const lastModified = new Date();
  return [
    { url: BASE, lastModified, changeFrequency: "monthly", priority: 1 },
    ...caseStudyPages.map((s) => ({
      url: `${BASE}/work/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
