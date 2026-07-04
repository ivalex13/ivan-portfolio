"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-tracking radial glow for cards. Drop inside any element with
 * `relative` and `group` classes; it attaches to the parent and lights up
 * on hover.
 */
export default function Spotlight({ color = "91,140,255" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("pointermove", onMove);
    return () => parent.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(${color}, 0.09), transparent 70%)`,
      }}
    />
  );
}
