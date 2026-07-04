"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/content";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";
import Spotlight from "@/components/Spotlight";

/** "139,157,255" from "#8b9dff" — Spotlight wants an rgb triplet */
function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export default function CaseCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${study.slug}`}
        className="group relative block rounded-2xl frame p-6 transition-colors duration-300 hover:border-line-strong sm:p-8"
      >
        <Spotlight color={hexToRgb(study.tint)} />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Text */}
          <div>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[13px] text-ink-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
                {study.kicker}
              </span>
            </div>

            <h3 className="mt-5 text-3xl leading-[1.08] tracking-tight sm:text-4xl">
              {study.title}{" "}
              <span className="text-ink-faint transition-colors duration-300 group-hover:text-iridescent">
                {study.accent}
              </span>
            </h3>

            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-dim">
              {study.summary}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {study.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] tracking-wide text-ink-faint"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div>
                <div className="text-2xl font-medium tracking-tight text-ink">
                  {study.metric.value}
                </div>
                <div className="mt-0.5 max-w-[240px] text-[13px] leading-snug text-ink-faint">
                  {study.metric.label}
                </div>
              </div>
              <span aria-hidden className="flex items-center gap-3">
                <span className="translate-x-2 font-mono text-[11px] tracking-caps uppercase text-ink-faint opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  Read case study
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-lg transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-canvas">
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="overflow-hidden rounded-xl">
            <div className="transition-transform duration-700 ease-out group-hover:scale-[1.025]">
              <ImagePlaceholder
                alt={`${study.title} ${study.accent}`}
                aspect="video"
                note="Cover visual — hero shot of this case study"
                compact
                tint={study.tint}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
