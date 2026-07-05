"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WebGL hover-warp portrait. Ports the CodePen shader (radial bulge +
 * RGB-split, curtains.js/GSAP original) to a dependency-free component:
 * hover eases uProgress 0 -> 1 with expo.inOut, leave eases it back.
 * Falls back to a plain image without WebGL or with reduced motion.
 */

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// fragment shader from the reference pen, unused uniforms dropped
const FRAGMENT = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float uProgress;
uniform sampler2D texture0;
varying vec2 vUv;

// http://www.flong.com/texts/code/shapers_exp/
float exponentialEasing(float x, float a) {
  float epsilon = 0.00001;
  float min_param_a = 0.0 + epsilon;
  float max_param_a = 1.0 - epsilon;
  a = max(min_param_a, min(max_param_a, a));
  if (a < 0.5) {
    a = 2.0 * a;
    float y = pow(x, a);
    return y;
  } else {
    a = 2.0 * (a - 0.5);
    float y = pow(x, 1.0 / (1.0 - a));
    return y;
  }
}

void main() {
  vec2 uv = vUv;
  float progress = uProgress;

  float d = exponentialEasing(length(uv - 0.5) + 0.0001, progress) - 1.0 + progress * 0.75;
  vec2 centerInterp = (uv - 0.5) * d;

  vec2 r = centerInterp * (progress * 0.6 + 0.4) + uv;
  vec2 g = centerInterp * (progress * 0.9 + 0.1) + uv;
  vec2 b = centerInterp * (progress * 0.9 + 0.1) + uv;

  gl_FragColor = vec4(
    texture2D(texture0, r).r,
    texture2D(texture0, g).g,
    texture2D(texture0, b).b,
    1.0
  );
}`;

const expoInOut = (x: number) =>
  x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;

export default function WarpPortrait({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);
  const api = useRef<{ tweenTo: (v: number) => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFallback(true);
      return;
    }
    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      setFallback(true);
      return;
    }

    const compile = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFallback(true);
      return;
    }
    gl.useProgram(program);

    // fullscreen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uProgress = gl.getUniformLocation(program, "uProgress");

    let progress = 0;
    let raf = 0;
    let destroyed = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const draw = () => {
      resize();
      gl.uniform1f(uProgress, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    // load the portrait as texture0
    const tex = gl.createTexture();
    const img = new Image();
    img.onload = () => {
      if (destroyed) return;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      draw();
    };
    img.onerror = () => setFallback(true);
    img.src = src;

    // expo.inOut tween of uProgress, rendering only while animating
    let start = 0;
    let from = 0;
    let target = 0;
    const DURATION = 1000; // matches the pen's 1s
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      progress = from + (target - from) * expoInOut(t);
      draw();
      if (t < 1 && !destroyed) raf = requestAnimationFrame(tick);
    };
    api.current = {
      tweenTo(v: number) {
        cancelAnimationFrame(raf);
        from = progress;
        target = v;
        start = performance.now();
        raf = requestAnimationFrame(tick);
      },
    };

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src]);

  if (fallback) {
    return (
      <div className="frame relative aspect-[4/5] overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className="frame relative aspect-[4/5] overflow-hidden rounded-xl"
      onPointerEnter={() => api.current?.tweenTo(1)}
      onPointerLeave={() => api.current?.tweenTo(0)}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
