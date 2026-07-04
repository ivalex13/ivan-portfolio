import type { Metadata } from "next";
import { education, experience, profile } from "@/lib/content";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";
import { MaskReveal, Reveal, Stagger, StaggerItem } from "@/components/motion";
import Spotlight from "@/components/Spotlight";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Product Designer with 14 years building and scaling SaaS — Instapage, Zendesk, and shipped AI products of my own.",
};

const aiStack = [
  { name: "Claude / GPT-4", note: "prompt architecture & product integration" },
  { name: "Figma + plugins I built", note: "UX Copilot, AI Design Review" },
  { name: "Cursor / AI-assisted code", note: "shipping my own products" },
  { name: "v0 / prototyping tools", note: "testing ideas at concept speed" },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 md:px-10 pb-24 pt-36">
        <MaskReveal>
          <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
            About
          </p>
        </MaskReveal>

        <h1 className="mt-6 max-w-4xl text-5xl leading-[1.04] tracking-tight sm:text-7xl">
          <MaskReveal delay={0.12}>Designer since 2011.</MaskReveal>
          <MaskReveal delay={0.24}>
            <span className="text-iridescent">
              Builder the whole time.
            </span>
          </MaskReveal>
        </h1>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal delay={0.35}>
            <div className="space-y-6 text-lg leading-[1.75] text-ink-dim">
              <p>
                I&rsquo;m Ivan — an AI product designer with fourteen years of
                building and scaling SaaS products. I was the first design hire
                at Instapage, where I owned the product from 0 → 1 and stayed
                through the growth to $16M ARR, a 10+ person product team, and
                tens of thousands of customers. Along the way I spent a year
                and a half as a product manager, which permanently rewired how
                I design.
              </p>
              <p>
                At Zendesk I led design for the scheduling area of Workforce
                Management — enterprise tools used across ~700 accounts with up
                to 1,000 agents each — defining an AI-assisted vision for
                scheduling and shipping the first steps toward it.
              </p>
              <p>
                What makes me different from most designers &ldquo;doing
                AI&rdquo;: I ship it myself. Sonas, UX Copilot, and AI Design
                Review are products I designed, built, and operate. That
                hands-on loop — model behavior, prompts, latency, cost, trust —
                is the fastest design education I&rsquo;ve ever had, and it
                shows up in every product decision I make.
              </p>
              <p>
                [Add a personal closing paragraph — where you&rsquo;re based,
                what you&rsquo;re like to work with, what you do off-screen.]
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <ImagePlaceholder
              alt="Portrait of Ivan Aleksić"
              aspect="tall"
              note="Portrait — a real photo, well lit. It matters more than designers admit."
            />
          </Reveal>
        </div>
      </section>

      {/* AI toolkit */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24">
          <Reveal>
            <h2 className="text-4xl tracking-tight sm:text-5xl">
              How I <span className="text-outline">work with AI</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">
              AI is part of my daily practice, not a slide in my deck — from
              research synthesis to shipped product code.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" gap={0.08}>
            {aiStack.map((t) => (
              <StaggerItem key={t.name}>
                <div className="group relative h-full bg-raised p-7">
                  <Spotlight />
                  <div className="text-lg font-medium tracking-tight">{t.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                    {t.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Experience + education */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:px-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-3xl tracking-tight sm:text-4xl">Experience</h2>
            </Reveal>
            <Stagger className="mt-8 divide-y divide-line border-t border-line" gap={0.06}>
              {experience.map((e, i) => (
                <StaggerItem key={i}>
                  <div className="py-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-lg font-medium tracking-tight">
                        {e.role}
                        <span className="text-ink-faint"> · {e.company}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[13px] text-ink-faint">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-dim">
                      {e.note}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl tracking-tight sm:text-4xl">Education</h2>
            </Reveal>
            <Stagger className="mt-8 divide-y divide-line border-t border-line" gap={0.06}>
              {education.map((e, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-baseline justify-between gap-4 py-5">
                    <span className="text-base">{e.name}</span>
                    <span className="shrink-0 font-mono text-[13px] text-ink-faint">
                      {e.year}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <a
                href={profile.links.resume}
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-ink transition-colors hover:border-ink"
              >
                Download resume ↓
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
