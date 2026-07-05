/**
 * Fetches a page server-side and extracts its Open Graph image, so product
 * cards can show a link's real social preview instead of a placeholder.
 * Any failure (network, bot-blocking, missing tag) resolves to undefined,
 * which lets the styled ImagePlaceholder render as before.
 */

const META_TAG =
  /<meta[^>]+(?:property|name)=["'](?:og:image(?::secure_url)?|twitter:image(?::src)?)["'][^>]*>/gi;
const CONTENT = /content=["']([^"']+)["']/i;

// Meta content arrives HTML-entity-encoded; Figma even encodes slashes (&#47;)
function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n: string) =>
      String.fromCharCode(parseInt(n, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');
}

export async function getOgImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        // Some sites only serve full meta tags to browser-like agents
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return undefined;
    const html = await res.text();
    for (const tag of html.match(META_TAG) ?? []) {
      const content = tag.match(CONTENT)?.[1];
      if (content) {
        return new URL(decodeEntities(content), url).toString();
      }
    }
    return undefined;
  } catch {
    return undefined;
  }
}
