"use client";

import { useEffect, useRef, useState } from "react";
import { MaskReveal } from "@/components/motion";

/**
 * Liquid hover headline. The two text lines are drawn into a canvas texture
 * (same font, size, and gradient as the DOM text) and a WebGL shader smears
 * and ripples them around the pointer as it moves, easing back to rest.
 * Desktop + fine pointer only; the real h2 underneath stays for screen
 * readers, SEO, mobile, and any WebGL failure.
 */

const VS = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FS = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uMouse;
uniform vec2 uVel;
uniform float uTime;
uniform float uAspect;
uniform float uEnergy;

void main() {
  vec2 uv = vUv;
  vec2 m = uv - uMouse;
  m.x *= uAspect;
  float d = length(m);
  float fall = exp(-d * d * 6.0) * uEnergy;
  vec2 dir = d > 0.0001 ? m / d : vec2(0.0);

  // directional smear from pointer velocity + slow, broad liquid swell
  vec2 disp = uVel * fall * 0.4;
  disp += dir * sin(d * 12.0 - uTime * 2.2) * 0.006 * fall;

  gl_FragColor = texture2D(uTex, uv - disp);
}`;

// read the ink + gradient colors from the design-token variables
const readThemeColors = () => {
  const root = getComputedStyle(document.documentElement);
  const v = (name: string) => root.getPropertyValue(name).trim();
  return {
    ink: v("--ink"),
    stops: [v("--glow-1"), v("--glow-2"), v("--glow-3")],
  };
};

export default function LiquidHeadline({
  line1,
  line2,
  className,
  textClassName = "text-5xl leading-[1.04] tracking-tight sm:text-7xl",
  as: Tag = "h2",
  maskDelays,
}: {
  line1: string;
  line2: string;
  className?: string;
  textClassName?: string;
  as?: "h1" | "h2";
  /** entrance MaskReveal delays per line; canvas activates after they finish */
  maskDelays?: [number, number];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const glCanvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const h2 = h2Ref.current;
    const canvas = glCanvasRef.current;
    if (!wrap || !h2 || !canvas) return;

    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduce.matches) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {
      mouse: gl.getUniformLocation(prog, "uMouse"),
      vel: gl.getUniformLocation(prog, "uVel"),
      time: gl.getUniformLocation(prog, "uTime"),
      aspect: gl.getUniformLocation(prog, "uAspect"),
      energy: gl.getUniformLocation(prog, "uEnergy"),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // draw the two lines into a texture, replicating the h2's typography
    const paint = () => {
      const rect = h2.getBoundingClientRect();
      W = Math.round(rect.width);
      H = Math.round(rect.height);
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);

      const cs = getComputedStyle(h2);
      const fs = parseFloat(cs.fontSize);
      const lh = parseFloat(cs.lineHeight);
      const text = document.createElement("canvas");
      text.width = W * dpr;
      text.height = H * dpr;
      const ctx = text.getContext("2d")!;
      ctx.scale(dpr, dpr);
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      if ("letterSpacing" in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          cs.letterSpacing;
      }
      ctx.textBaseline = "alphabetic";

      const theme = readThemeColors();
      const baseline = (i: number) => i * lh + (lh - fs) / 2 + fs * 0.75;
      ctx.fillStyle = theme.ink;
      ctx.fillText(line1, 0, baseline(0));
      const w2 = ctx.measureText(line2).width;
      const grad = ctx.createLinearGradient(0, 0, w2, 0);
      grad.addColorStop(0, theme.stops[0]);
      grad.addColorStop(0.45, theme.stops[1]);
      grad.addColorStop(1, theme.stops[2]);
      ctx.fillStyle = grad;
      ctx.fillText(line2, 0, baseline(1));

      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, text);
    };

    // pointer state in texture UV space
    const mouse = { x: 0.5, y: 0.5 };
    const cur = { x: 0.5, y: 0.5 };
    const vel = { x: 0, y: 0 };
    let energy = 0;
    let hovered = false;
    let raf = 0;
    let running = false;
    let t = 0;
    let destroyed = false;

    const frame = () => {
      t += 1 / 60;
      // lazy, viscous follow: the distortion drags behind the pointer
      cur.x += (mouse.x - cur.x) * 0.07;
      cur.y += (mouse.y - cur.y) * 0.07;
      vel.x += ((mouse.x - cur.x) * 3.5 - vel.x) * 0.05;
      vel.y += ((mouse.y - cur.y) * 3.5 - vel.y) * 0.05;
      energy += ((hovered ? 1 : 0) - energy) * 0.06;

      gl.uniform2f(U.mouse, cur.x, cur.y);
      gl.uniform2f(U.vel, vel.x, vel.y);
      gl.uniform1f(U.time, t);
      gl.uniform1f(U.aspect, W / Math.max(1, H));
      gl.uniform1f(U.energy, energy);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if ((hovered || energy > 0.004) && !destroyed) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    };
    const start = () => {
      if (!running && !destroyed) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = h2.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width;
      mouse.y = (e.clientY - rect.top) / rect.height;
      start();
    };
    const onEnter = () => {
      hovered = true;
      start();
    };
    const onLeave = () => {
      hovered = false;
    };

    const ready = () => {
      if (destroyed) return;
      paint();
      // draw one settled frame before revealing the canvas
      gl.uniform2f(U.mouse, 0.5, 0.5);
      gl.uniform2f(U.vel, 0, 0);
      gl.uniform1f(U.time, 0);
      gl.uniform1f(U.aspect, W / Math.max(1, H));
      gl.uniform1f(U.energy, 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      setActive(true);
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    };
    // wait out any entrance animation before swapping to canvas
    const entranceMs = maskDelays ? maskDelays[1] * 1000 + 1400 : 0;
    let readyTimer = 0;
    document.fonts.ready.then(() => {
      readyTimer = window.setTimeout(ready, entranceMs);
    });

    const ro = new ResizeObserver(() => {
      if (destroyed) return;
      paint();
      start();
    });
    ro.observe(h2);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      clearTimeout(readyTimer);
      ro.disconnect();
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [line1, line2, maskDelays]);

  const span1 = (
    <span className={`lg:block lg:whitespace-nowrap ${active ? "lg:opacity-0" : ""}`}>
      {line1}
    </span>
  );
  const span2 = (
    <span
      className={`text-iridescent lg:block lg:whitespace-nowrap ${active ? "lg:opacity-0" : ""}`}
    >
      {line2}
    </span>
  );

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <Tag ref={h2Ref} className={textClassName}>
        {maskDelays ? (
          <>
            <MaskReveal delay={maskDelays[0]}>{span1}</MaskReveal>
            <MaskReveal delay={maskDelays[1]}>{span2}</MaskReveal>
          </>
        ) : (
          <>
            {span1} {span2}
          </>
        )}
      </Tag>
      <canvas
        ref={glCanvasRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 hidden h-full w-full lg:block ${active ? "" : "lg:hidden"}`}
      />
    </div>
  );
}
