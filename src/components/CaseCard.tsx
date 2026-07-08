"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { CaseStudy } from "@/lib/content";
import CompanyLogo, { hasCompanyMark } from "@/components/CompanyLogo";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";

export default function CaseCard({ study }: { study: CaseStudy }) {
  // Embedded studies are presented in place (e.g. a Figma deck), so the card
  // doesn't link out to a dedicated study page.
  const cardClass =
    "group block rounded-2xl frame p-6 transition-colors duration-300 hover:border-line-strong sm:p-8";
  const inner = (
    <div className="grid gap-8">
      {/* Text */}
      <div>
        <div className="flex items-center gap-2.5">
          {hasCompanyMark(study.company) ? (
            <CompanyLogo
              company={study.company}
              className="size-5 shrink-0 text-ink"
            />
          ) : (
            <span
              aria-hidden
              className="grid size-6 place-items-center rounded-md text-[12px] font-medium"
              style={{
                backgroundColor: `color-mix(in srgb, ${study.tint} 16%, transparent)`,
                color: study.tint,
              }}
            >
              {study.company.charAt(0)}
            </span>
          )}
          <span className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
            {study.company}
          </span>
        </div>

        <h3 className="mt-5 text-3xl leading-[1.08] tracking-tight sm:text-4xl">
          {study.title}{" "}
          <span className="text-ink-faint">{study.accent}</span>
        </h3>

        <p className="mt-4 text-base leading-relaxed text-ink-dim">
          {study.hook}
        </p>
      </div>

      {/* Visual */}
      <div className="overflow-hidden rounded-xl">
        {study.embed ? (
          <iframe
            src={study.embed}
            title={`${study.title} ${study.accent}`}
            className="aspect-video w-full rounded-xl border border-black/10"
            allowFullScreen
          />
        ) : (
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.025]">
            <ImagePlaceholder
              alt={`${study.title} ${study.accent}`}
              aspect="video"
              note="Cover visual: hero shot of this case study"
              compact
              tint={study.tint}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {study.embed ? (
        <div className={cardClass}>{inner}</div>
      ) : (
        <Link href={`/work/${study.slug}`} className={cardClass}>
          {inner}
        </Link>
      )}
    </motion.div>
  );
}
