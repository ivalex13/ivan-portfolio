"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Desktop-only sticky section rail with a reading-progress bar at the top of
 * the viewport. Highlights the section currently in view.
 */
export default function StudyNav({
  sections,
}: {
  sections: { id: string; text: string }[];
}) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });
  const [active, setActive] = useState<string>(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-glow-1 via-glow-2 to-glow-3"
      />

      {/* Section rail */}
      <nav
        aria-label="Sections"
        className="sticky top-28 hidden self-start lg:block"
      >
        <ul className="space-y-1 border-l border-line">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`-ml-px block border-l py-1.5 pl-5 text-sm transition-colors ${
                  active === s.id
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-faint hover:text-ink-dim"
                }`}
              >
                {s.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
