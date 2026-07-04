import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/content";
import StudyBlocks from "@/components/study/StudyBlocks";
import StudyNav from "@/components/study/StudyNav";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";
import { MaskReveal, Reveal } from "@/components/motion";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} ${study.accent}`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  const sections = study.sections.filter(
    (b): b is Extract<typeof b, { type: "heading" }> => b.type === "heading"
  );

  return (
    <article>
      {/* ─────────────── Study hero ─────────────── */}
      <header className="mx-auto max-w-6xl px-6 pb-16 pt-36">
        <MaskReveal>
          <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
            {study.kicker}
          </p>
        </MaskReveal>

        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] tracking-tight sm:text-7xl">
          <MaskReveal delay={0.12}>{study.title}</MaskReveal>
          <MaskReveal delay={0.24}>
            <span className="accent-serif text-iridescent">{study.accent}</span>
          </MaskReveal>
        </h1>

        <Reveal delay={0.4}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-dim">
            {study.summary}
          </p>
        </Reveal>

        {/* Meta grid */}
        <Reveal delay={0.5}>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-8 lg:grid-cols-4">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[12px] tracking-caps uppercase text-ink-faint">
                  {m.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Impact stats */}
        <Reveal delay={0.6}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {study.heroStats.map((s, i) => (
              <div key={i} className="bg-raised p-7">
                <div className="text-4xl font-medium tracking-tight text-ink">
                  {s.value}
                </div>
                <div className="mt-2 text-sm leading-snug text-ink-faint">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </header>

      {/* ─────────────── Cover visual ─────────────── */}
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <ImagePlaceholder
            alt={`${study.title} ${study.accent} — cover`}
            aspect="wide"
            note="Full-bleed cover visual — your strongest single image for this project."
          />
        </Reveal>
      </div>

      {/* ─────────────── TL;DR ─────────────── */}
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <Reveal>
          <section
            aria-label="TL;DR"
            className="frame rounded-2xl p-8 sm:p-10"
          >
            <p className="font-mono text-[12px] tracking-caps uppercase text-iridescent">
              TL;DR — for the 3-minute read
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-3">
              {(
                [
                  ["The problem", study.tldr.problem],
                  ["My role", study.tldr.role],
                  ["The outcome", study.tldr.outcome],
                ] as const
              ).map(([label, text]) => (
                <div key={label}>
                  <h2 className="text-lg font-medium tracking-tight">{label}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </div>

      {/* ─────────────── Body ─────────────── */}
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-28 pt-16 lg:grid-cols-[200px_1fr]">
        <StudyNav sections={sections.map((s) => ({ id: s.id, text: s.text }))} />
        <div className="min-w-0">
          <StudyBlocks blocks={study.sections} />
        </div>
      </div>

      {/* ─────────────── Next study ─────────────── */}
      <div className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group block"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              Next case study
            </p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h2 className="text-3xl tracking-tight transition-colors sm:text-5xl">
                {next.title}{" "}
                <span className="accent-serif text-ink-dim transition-colors duration-300 group-hover:text-iridescent">
                  {next.accent}
                </span>
              </h2>
              <span
                aria-hidden
                className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong text-xl transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-canvas"
              >
                →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
