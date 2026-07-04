import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ivanaleksic.com"),
  title: {
    default: "Ivan Aleksić — AI Product Designer",
    template: "%s — Ivan Aleksić",
  },
  description:
    "AI Product Designer with 14 years building and scaling SaaS. Founding designer at Instapage ($0 → $16M ARR), AI-assisted enterprise tools at Zendesk, and shipped AI products of my own: Sonas & UX Copilot.",
  openGraph: {
    title: "Ivan Aleksić — AI Product Designer",
    description:
      "I design AI products people actually adopt. 14 years scaling SaaS — Instapage, Zendesk, and my own shipped AI products.",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ivan Aleksić",
  jobTitle: "AI Product Designer",
  url: "https://ivanaleksic.com",
  email: "mailto:ivanaleksic@gmail.com",
  sameAs: ["https://www.linkedin.com/in/ivanaleksic/"],
  knowsAbout: [
    "AI product design",
    "Enterprise UX",
    "Design systems",
    "0-to-1 product design",
  ],
  worksFor: { "@type": "Organization", name: "Zendesk" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
      </body>
    </html>
  );
}
