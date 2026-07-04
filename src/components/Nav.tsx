"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#products", label: "AI Products" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
    setScrolled(y > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-caps uppercase text-ink transition-colors hover:text-glow-1"
        >
          Ivan Aleksić
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-ink ${
                pathname === l.href ? "text-ink" : "text-ink-dim"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="ml-2 hidden rounded-full border border-line-strong px-4 py-1.5 text-sm text-ink transition-all hover:border-ink hover:bg-ink hover:text-canvas sm:block"
          >
            Contact
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
