"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#products", label: "AI Products" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 24);
  });

  // close the menu on route change; lock scroll + close on Escape while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={`fixed inset-x-0 top-0 transition-colors duration-300 ${
          open ? "z-[80]" : "z-50"
        } ${
          scrolled && !open
            ? "border-b border-line bg-canvas/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            className="relative z-[75] font-mono text-[13px] tracking-caps uppercase text-ink transition-colors hover:text-glow-1"
            onClick={() => setOpen(false)}
          >
            Ivan Aleksić
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-2 sm:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-ink ${
                  pathname === l.href ? "text-ink" : "text-ink-dim"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="ml-2 rounded-full border border-line-strong px-4 py-1.5 text-sm text-ink transition-all hover:border-ink hover:bg-ink hover:text-canvas"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[75] flex h-10 w-10 items-center justify-center sm:hidden"
          >
            <span className="relative block h-3 w-6">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute left-0 top-0 block h-[1.5px] w-6 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute bottom-0 left-0 block h-[1.5px] w-6 bg-ink"
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[70] flex flex-col justify-between bg-canvas px-6 pb-10 pt-28 sm:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-2">
                {[...links, { href: `mailto:${profile.email}`, label: "Contact" }].map(
                  (l, i) => (
                    <motion.li
                      key={l.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.5, delay: 0.06 * i + 0.1, ease: EASE }}
                    >
                      {l.href.startsWith("mailto:") ? (
                        <a
                          href={l.href}
                          className="block py-2 text-5xl tracking-tight text-ink"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="block py-2 text-5xl tracking-tight text-ink"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      )}
                    </motion.li>
                  )
                )}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              <p className="font-mono text-[12px] tracking-caps uppercase text-iridescent">
                {profile.availability}
              </p>
              <p className="font-mono text-[12px] tracking-caps uppercase text-ink-faint">
                {profile.role}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
