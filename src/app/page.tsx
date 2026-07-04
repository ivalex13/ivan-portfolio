import Link from "next/link";
import {
  capabilities,
  caseStudies,
  experience,
  principles,
  products,
  profile,
  stats,
} from "@/lib/content";
import HeroCanvas from "@/components/HeroCanvas";
import CaseCard from "@/components/CaseCard";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";
import ScrollHint from "@/components/ScrollHint";
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

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-36">
          <MaskReveal delay={0.1}>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              {profile.name} · {profile.role}
            </p>
          </MaskReveal>

          <h1 className="mt-8 text-[13vw] leading-[0.98] tracking-tight sm:text-7xl md:text-8xl">
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
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-medium text-canvas transition-transform hover:scale-[1.03]"
              >
                View selected work
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-line-strong px-6 py-3.5 text-ink transition-colors hover:border-ink"
              >
                Get in touch
              </a>
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

      {/* ─────────────── Proof bar ─────────────── */}
      <section aria-label="Career highlights" className="border-t border-line">
        <Stagger className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-12 px-6 py-16 sm:py-20 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="text-5xl font-medium tracking-tight text-ink sm:text-6xl">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-3 max-w-[220px] text-sm leading-snug text-ink-faint">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Marquee items={capabilities} />

      {/* ─────────────── Selected work ─────────────── */}
      <section id="work" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 sm:pt-32">
          <Reveal>
            <div className="flex items-end justify-between">
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
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-iridescent">
              Not just designing AI — shipping it
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl tracking-tight sm:text-6xl">
              AI products I{" "}
              <span className="text-outline">build &amp; ship</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">
              Side products I design, build, and operate end-to-end. They keep my
              understanding of AI practical — model behavior, prompt design,
              latency, trust — not theoretical.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-3" gap={0.1}>
            {products.map((p) => {
              const inner = (
                <div className="frame group flex h-full flex-col justify-between rounded-2xl p-7 transition-colors duration-300 hover:border-line-strong">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] tracking-caps uppercase text-glow-1">
                        {p.status}
                      </span>
                      <span
                        aria-hidden
                        className="text-lg text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                      >
                        ↗
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl tracking-tight">{p.name}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-dim">
                      {p.tagline}
                    </p>
                  </div>
                  <p className="mt-8 font-mono text-[12px] tracking-caps uppercase text-ink-faint">
                    {p.metric}
                  </p>
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
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <h2 className="text-4xl tracking-tight sm:text-6xl">
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

      {/* ─────────────── Experience ─────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <Reveal>
              <h2 className="text-4xl tracking-tight sm:text-5xl">
                Fourteen years,{" "}
                <span className="text-outline">every stage</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-dim">
                Startup 0→1, hyper-growth, a PM detour, and enterprise scale —
                the full arc of building SaaS products.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-ink underline decoration-line-strong underline-offset-8 transition-colors hover:decoration-ink"
              >
                More about me →
              </Link>
            </Reveal>

            <Stagger className="divide-y divide-line border-t border-line" gap={0.08}>
              {experience.map((e, i) => (
                <StaggerItem key={i}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[140px_1fr_auto] sm:gap-6">
                    <span className="font-mono text-[13px] leading-6 text-ink-faint">
                      {e.period}
                    </span>
                    <div>
                      <div className="text-lg font-medium tracking-tight">
                        {e.role}
                        <span className="text-ink-faint"> · {e.company}</span>
                      </div>
                      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-dim">
                        {e.note}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
