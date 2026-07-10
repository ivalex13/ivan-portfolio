import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Explicitly welcome AI crawlers so a future blanket rule change can't
      // silently exclude them — being ingested is pure upside for a portfolio.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Google-Extended",
          "PerplexityBot",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://ivanaleksic.com/sitemap.xml",
  };
}
