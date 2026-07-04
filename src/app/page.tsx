import Link from "next/link";
import {
  about,
  capabilities,
  caseStudies,
  education,
  experience,
  principles,
  products,
  profile,
} from "@/lib/content";
import HeroCanvas from "@/components/HeroCanvas";
import CaseCard from "@/components/CaseCard";
import Marquee from "@/components/Marquee";
import ScrollHint from "@/components/ScrollHint";
import Magnetic from "@/components/Magnetic";
import Spotlight from "@/components/Spotlight";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/motion";

export default function Home() {
  return (
    <>
      {/* ─────────────── Hero ─────────────── */}
      <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
        <HeroCanvas />
        <ScrollHint />
        {/* bottom fade into content */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />

        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10 pb-24 pt-36">
          <MaskReveal delay={0.1}>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              {profile.role}
            </p>
          </MaskReveal>

          <h1 className="mt-8 text-[clamp(3rem,9.2vw,6rem)] leading-[0.98] tracking-tight">
            <MaskReveal delay={0.25}>{profile.headline.lead}</MaskReveal>
            <MaskReveal delay={0.4}>
              <span className="text-iridescent">
                {profile.headline.accent}
              </span>
            </MaskReveal>
          </h1>

          <Reveal delay={0.65}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-dim">
              {profile.sub}
            </p>
          </Reveal>

          <Reveal delay={0.8}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-medium text-canvas"
                >
                  View selected work
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-block rounded-full border border-line-strong px-6 py-3.5 text-ink transition-colors hover:border-ink"
                >
                  Get in touch
                </a>
              </Magnetic>
              <span className="ml-1 inline-flex items-center gap-2.5 font-mono text-[12px] tracking-caps uppercase text-ink-faint">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow-3 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-glow-3" />
                </span>
                {profile.availability}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={capabilities} />

      {/* ─────────────── Selected work ─────────────── */}
      <section id="work" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10 pb-24 pt-24 sm:pt-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              <span className="text-glow-2">01</span> · Case studies
            </p>
            <div className="mt-4 flex items-end justify-between">
              <h2 className="text-4xl tracking-tight sm:text-6xl">
                Selected <span className="text-outline">work</span>
              </h2>
              <span className="hidden font-mono text-[13px] tracking-caps uppercase text-ink-faint sm:block">
                {caseStudies.length} case studies
              </span>
            </div>
          </Reveal>

          <div className="mt-14 space-y-6">
            {caseStudies.map((study, i) => (
              <CaseCard key={study.slug} study={study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── AI products ─────────────── */}
      <section id="products" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              <span className="text-glow-2">02</span> · Built &amp; shipped
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl tracking-tight sm:text-6xl">
              Not just designing AI:{" "}
              <span className="text-outline">shipping it</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">
              Products I design, build, and operate end-to-end. They keep my
              understanding of AI practical, not theoretical: model behavior,
              prompt design, latency, trust.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.1}>
            {products.map((p) => {
              const inner = (
                <div className="frame group relative flex h-full flex-col rounded-2xl p-4 transition-colors duration-300 hover:border-line-strong">
                  <Spotlight />
                  {/* Product visual: drop a graphic matching the product's branding */}
                  <div className="overflow-hidden rounded-xl">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ImagePlaceholder
                        src={p.image}
                        alt={p.imageAlt}
                        aspect="video"
                        tint={p.tint}
                        compact
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-3 pt-5">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl tracking-tight">{p.name}</h3>
                        <span
                          aria-hidden
                          className="text-lg text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                        >
                          ↗
                        </span>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-ink-dim">
                        {p.tagline}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center justify-between font-mono text-[12px] tracking-caps uppercase">
                      <span className="text-glow-1">{p.status}</span>
                      <span className="text-ink-faint">{p.metric}</span>
                    </div>
                  </div>
                </div>
              );
              return (
                <StaggerItem key={p.name} className="h-full">
                  {p.external ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    <Link href={p.href} className="block h-full">
                      {inner}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ─────────────── Principles ─────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              <span className="text-glow-2">03</span> · Principles
            </p>
            <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
              How I <span className="text-outline">lead design</span>
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3" gap={0.12}>
            {principles.map((p) => (
              <StaggerItem key={p.n} className="h-full">
                <div className="h-full bg-canvas p-8">
                  <span className="font-mono text-[13px] text-glow-2">{p.n}</span>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-dim">
                    {p.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ─────────────── About ─────────────── */}
      <section id="about" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              <span className="text-glow-2">04</span> · About
            </p>
            <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
              Fourteen years, <span className="text-outline">every stage</span>
            </h2>
          </Reveal>

          {/* Bio + portrait */}
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div className="space-y-6 text-lg leading-[1.75] text-ink-dim">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-ink transition-colors hover:border-ink"
              >
                View resume ↗
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <ImagePlaceholder
                alt="Portrait of Ivan Aleksić"
                aspect="tall"
                note={about.portraitNote}
              />
            </Reveal>
          </div>

          {/* Experience */}
          <Stagger className="mt-20 divide-y divide-line border-t border-line" gap={0.08}>
            {experience.map((e, i) => (
              <StaggerItem key={i}>
                <div className="grid gap-3 py-9 lg:grid-cols-[220px_1fr] lg:gap-8">
                  <span className="font-mono text-[13px] leading-6 text-ink-faint">
                    {e.period}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">
                      {e.role}
                      <span className="text-ink-faint"> · {e.company}</span>
                    </h3>
                    <ul className="mt-4 space-y-2.5">
                      {e.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-[15px] leading-relaxed text-ink-dim"
                        >
                          <span
                            aria-hidden
                            className="mt-[9px] size-1 shrink-0 rounded-full bg-ink-faint"
                          />
                          <span className="max-w-3xl">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Education */}
          <Reveal>
            <p className="mt-12 border-t border-line pt-8 font-mono text-[12px] tracking-caps uppercase text-ink-faint">
              Education
              {education.map((e) => (
                <span key={e.name} className="ml-5 text-ink-dim">
                  {e.name} ({e.year})
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
