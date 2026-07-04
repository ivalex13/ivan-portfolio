import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain">
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
