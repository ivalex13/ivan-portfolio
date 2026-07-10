import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { products, profile } from "@/lib/content";

export const viewport: Viewport = {
  themeColor: "#0a0912",
};

const BASE = "https://ivanaleksic.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  alternates: { canonical: "/" },
  title: {
    default: "Ivan Aleksić · AI Product Designer",
    template: "%s · Ivan Aleksić",
  },
  description:
    "AI Product Designer with 14 years building and scaling SaaS. Founding designer at Instapage ($0 → $16M ARR), AI-assisted enterprise tools at Zendesk, and shipped AI products of my own: Sonas & UX Copilot.",
  openGraph: {
    title: "Ivan Aleksić · AI Product Designer",
    description:
      "I design AI products people actually adopt. 14 years scaling SaaS: Instapage, Zendesk, and my own shipped AI products.",
    url: BASE,
    siteName: "Ivan Aleksić",
    locale: "en_US",
    type: "website",
  },
};

// Entity graph: a disambiguated Person, the site, the profile page, and the
// shipped products, all cross-referenced by @id so crawlers and LLMs can
// attach the work to the right Ivan Aleksić.
const PERSON_ID = `${BASE}/#person`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Ivan Aleksić",
      alternateName: "Ivan Aleksic",
      jobTitle: "AI Product Designer",
      description:
        "AI product designer with 14 years designing and scaling SaaS. Founding designer at Instapage, senior product designer at Zendesk, and builder of Sonas, UX Copilot, and AI Design Review.",
      disambiguatingDescription:
        "Belgrade-based SaaS and AI product designer — distinct from other public figures named Ivan Aleksić.",
      image: `${BASE}/portrait.jpg`,
      url: BASE,
      email: `mailto:${profile.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belgrade",
        addressCountry: "RS",
      },
      sameAs: [
        profile.links.linkedin,
        "https://dribbble.com/ivalex13",
        "https://github.com/ivalex13",
        "https://startit.rs/kreatori-i-alati-ivan-aleksic-dizajner-proizvoda/",
      ],
      knowsAbout: [
        "AI product design",
        "Enterprise UX",
        "Design systems",
        "0-to-1 product design",
        "Prompt and interaction design",
        "Workforce management software",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Zendesk",
        url: "https://www.zendesk.com",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Ivan Aleksić · AI Product Designer",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${BASE}/#profilepage`,
      url: BASE,
      mainEntity: { "@id": PERSON_ID },
      isPartOf: { "@id": `${BASE}/#website` },
    },
    ...products.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.tagline,
      url: p.href,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      author: { "@id": PERSON_ID },
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
