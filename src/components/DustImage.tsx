"use client";

import { useRef } from "react";

/**
 * Thanos-snap portrait: click to disintegrate the image into dust layers
 * that drift away, then reassemble. Pixels are distributed across many
 * canvas layers (weighted left to right) and each layer animates out with
 * its own rotation, drift, and delay. Skipped for reduced motion.
 */
export default function DustImage({ src, alt }: { src: string; alt: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const busy = useRef(false);

  const snap = async () => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (busy.current || !wrap || !img || !img.complete) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;

    const LAYERS = 28;
    const W = 360;
    const H = 450;

    // sample the image at a modest resolution
    const sample = document.createElement("canvas");
    sample.width = W;
    sample.height = H;
    const sctx = sample.getContext("2d");
    if (!sctx) {
      busy.current = false;
      return;
    }
    sctx.drawImage(img, 0, 0, W, H);
    const { data } = sctx.getImageData(0, 0, W, H);

    // scatter pixels across layers, weighted so dust blows left to right
    const buffers = Array.from(
      { length: LAYERS },
      () => new Uint8ClampedArray(data.length)
    );
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        for (let c = 0; c < 2; c++) {
          const l = Math.min(
            LAYERS - 1,
            Math.max(
              0,
              Math.floor((LAYERS * (Math.random() + (2 * x) / W)) / 3)
            )
          );
          const buf = buffers[l];
          buf[i] = data[i];
          buf[i + 1] = data[i + 1];
          buf[i + 2] = data[i + 2];
          buf[i + 3] = data[i + 3];
        }
      }
    }

    const layers = buffers.map((buf) => {
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d")?.putImageData(new ImageData(buf, W, H), 0, 0);
      c.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;";
      wrap.appendChild(c);
      return c;
    });

    img.style.opacity = "0";

    // drift each layer away with its own direction and delay
    const anims = layers.map((c, i) => {
      const rot = (Math.random() * 2 - 1) * 14;
      const dx = 60 + Math.random() * 70;
      const dy = -(40 + Math.random() * 90);
      return c.animate(
        [
          { transform: "rotate(0deg) translate(0, 0)", opacity: 1, filter: "blur(0px)" },
          { transform: `rotate(${rot}deg) translate(${dx}px, ${dy}px)`, opacity: 0, filter: "blur(2px)" },
        ],
        {
          duration: 900 + Math.random() * 500,
          delay: i * 55,
          easing: "cubic-bezier(0.4, 0, 0.7, 1)",
          fill: "forwards",
        }
      ).finished;
    });
    await Promise.allSettled(anims);
    await new Promise((r) => setTimeout(r, 650));

    // reassemble
    layers.forEach((c) => c.remove());
    img.style.opacity = "1";
    img.animate(
      [
        { opacity: 0, filter: "blur(8px)", transform: "scale(1.02)" },
        { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
      ],
      { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
    busy.current = false;
  };

  return (
    <div
      ref={wrapRef}
      role="button"
      tabIndex={0}
      aria-label={`${alt}. Press to snap.`}
      onClick={snap}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          snap();
        }
      }}
      className="frame relative aspect-[4/5] cursor-pointer select-none overflow-visible rounded-xl"
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        draggable={false}
        className="absolute inset-0 h-full w-full rounded-xl object-cover"
      />
    </div>
  );
}
