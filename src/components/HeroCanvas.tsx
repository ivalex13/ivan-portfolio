"use client";

import { useEffect, useRef } from "react";

/**
 * Generative hero background: a drifting particle field flowing through a
 * noise field, gently attracted to the cursor. Iridescent, low-opacity,
 * GPU-cheap (2D canvas, ~180 particles). Disabled for reduced motion.
 */
export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    const COLORS = ["139,157,255", "224,143,255", "255,179,128"];

    type P = { x: number; y: number; vx: number; vy: number; c: string; r: number; life: number };
    let particles: P[] = [];

    const spawn = (randomLife = true): P => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      r: 0.6 + Math.random() * 1.4,
      life: randomLife ? Math.random() * 400 : 400,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(200, Math.floor((w * h) / 9000));
      particles = Array.from({ length: count }, () => spawn());
    };

    // cheap pseudo-noise flow field
    const angleAt = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0016 + t * 0.00022) * 2.2 +
      Math.cos(y * 0.0021 - t * 0.00017) * 2.2;

    let t = 0;
    const tick = () => {
      t += 16;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        const a = angleAt(p.x, p.y, t);
        p.vx += Math.cos(a) * 0.012;
        p.vy += Math.sin(a) * 0.012;

        // gentle pull toward cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 250 * 250 && d2 > 1) {
          const f = 0.05 / Math.sqrt(d2);
          p.vx += dx * f * 0.12;
          p.vy += dy * f * 0.12;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          Object.assign(p, spawn(), { life: 300 + Math.random() * 200 });
        }

        const fade = Math.min(1, p.life / 60);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${0.35 * fade})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
