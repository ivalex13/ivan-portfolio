"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ScrollHint() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href="#work"
      aria-label="Scroll to selected work"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-8 left-6 z-10 hidden items-center gap-3 sm:flex"
    >
      <span className="relative block h-12 w-px overflow-hidden bg-line-strong">
        {!reduce && (
          <motion.span
            animate={{ y: [-16, 48] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 block h-4 w-px bg-ink"
          />
        )}
      </span>
      <span className="font-mono text-[11px] tracking-caps uppercase text-ink-faint">
        Scroll
      </span>
    </motion.a>
  );
}
