import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content";

const BASE = "https://ivanaleksic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.8 },
    ...caseStudies.map((s) => ({
      url: `${BASE}/work/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
