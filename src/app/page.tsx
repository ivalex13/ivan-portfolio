import Image from "next/image";
import Link from "next/link";
import {
  about,
  capabilities,
  caseStudies,
  experience,
  products,
  profile,
} from "@/lib/content";
import CaseCard from "@/components/CaseCard";
import CompanyLogo from "@/components/CompanyLogo";
import Marquee from "@/components/Marquee";
import ScrollHint from "@/components/ScrollHint";
import Magnetic from "@/components/Magnetic";
import Spotlight from "@/components/Spotlight";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";
import WarpPortrait from "@/components/WarpPortrait";
import LiquidHeadline from "@/components/LiquidHeadline";
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getOgImage } from "@/lib/og";

export default async function Home() {
  // Product visuals: a manually dropped image wins, otherwise the card shows
  // the OG image of the product's page (fetched server-side, cached daily).
  const productImages = await Promise.all(
    products.map((p) => p.image ?? getOgImage(p.ogSource)),
  );

  return (
    <>
      {/* ─────────────── Hero ─────────────── */}
      <div className="section-dark">
        <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
          {/* quiet ambient washes; static on purpose so the type carries the hero */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-[15%] right-[-12%] size-[70vh] rounded-full opacity-[0.09] blur-[120px]"
              style={{ background: "radial-gradient(closest-side, var(--glow-1), transparent 72%)" }}
            />
            <div
              className="absolute bottom-[-28%] left-[-14%] size-[60vh] rounded-full opacity-[0.06] blur-[120px]"
              style={{ background: "radial-gradient(closest-side, var(--glow-3), transparent 72%)" }}
            />
          </div>
          <ScrollHint />

          <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10 pb-24 pt-36">
            <MaskReveal delay={0.1}>
              <div className="flex items-center gap-3.5">
                <Image
                  src="/portrait.jpg"
                  alt="Ivan Aleksić"
                  width={80}
                  height={80}
                  priority
                  className="size-9 rounded-full object-cover"
                />
                <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
                  {profile.role}
                </p>
              </div>
            </MaskReveal>

            <LiquidHeadline
              as="h1"
              className="mt-8"
              textClassName="text-[clamp(3rem,9.2vw,6rem)] leading-[0.98] tracking-tight"
              line1={profile.headline.lead}
              line2={profile.headline.accent}
              maskDelays={[0.25, 0.4]}
            />

            <Reveal delay={0.65}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-dim">
                {profile.sub}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink-dim">
                {profile.companies.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2.5">
                    <CompanyLogo company={c} className="size-[17px] shrink-0" />
                    <span className="font-mono text-[12px] tracking-caps uppercase">
                      {c}
                    </span>
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.8}>
              <span className="mt-10 inline-flex items-center gap-2.5 font-mono text-[12px] tracking-caps uppercase text-ink-faint">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-ok" />
                </span>
                {profile.availability}
              </span>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-medium text-canvas"
                  >
                    View selected work
                    <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        <Marquee items={capabilities} />
      </div>

      {/* ─────────────── Selected work ─────────────── */}
      <section id="work" className="theme-light scroll-mt-20">
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
            {caseStudies.map((study) => (
              <CaseCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── AI products ─────────────── */}
      <section id="products" className="theme-accent scroll-mt-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              <span className="text-glow-2">02</span> · Built &amp; shipped
            </p>
            <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
              Not just designing AI:{" "}
              <span className="text-outline">shipping it</span>
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-dim">
              Products I design, build, and operate end-to-end. They keep my
              understanding of AI practical, not theoretical: model behavior,
              prompt design, latency, trust.
            </p>
          </Reveal>

          <Stagger className="mt-14 grid gap-6" gap={0.1}>
            {products.map((p, i) => {
              const inner = (
                <div className="frame group relative flex h-full flex-col gap-0 rounded-2xl p-4 transition-colors duration-300 hover:border-line-strong md:flex-row md:gap-8">
                  <Spotlight />
                  <div className="overflow-hidden rounded-xl md:order-2 md:w-1/2 md:shrink-0">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <ImagePlaceholder
                        src={productImages[i]}
                        alt={p.imageAlt}
                        aspect="video"
                        tint={p.tint}
                        compact
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-3 pt-5 md:order-1 md:pt-3">
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
                    <div className="mt-8 font-mono text-[12px] tracking-caps uppercase">
                      <span className="text-glow-1">{p.status}</span>
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

      {/* ─────────────── About ─────────────── */}
      <section id="about" className="section-dark scroll-mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24 sm:py-32">
          <Reveal>
            <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
              <span className="text-glow-2">03</span> · About
            </p>
            <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
              Fourteen years, <span className="text-outline">every stage</span>
            </h2>
          </Reveal>

          {/* Bio + portrait */}
          <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
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
              <div className="w-full max-w-xs">
                {about.portrait ? (
                  <WarpPortrait src={about.portrait} alt="Portrait of Ivan Aleksić" />
                ) : (
                  <ImagePlaceholder
                    alt="Portrait of Ivan Aleksić"
                    aspect="tall"
                    note={about.portraitNote}
                  />
                )}
              </div>
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
                    <div className="flex items-center gap-2.5 text-ink-dim">
                      <CompanyLogo company={e.company} className="size-4 shrink-0" />
                      <span className="font-mono text-[12px] tracking-caps uppercase">
                        {e.company}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-lg font-medium tracking-tight">
                      {e.role}
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
        </div>
      </section>
    </>
  );
}
