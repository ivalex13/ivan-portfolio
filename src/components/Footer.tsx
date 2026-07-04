import Link from "next/link";
import { profile } from "@/lib/content";
import { Reveal } from "@/components/motion";
import Magnetic from "@/components/Magnetic";
import LocalTime from "@/components/LocalTime";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-line">
      {/* Contact CTA */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-28 sm:py-36">
        <Reveal>
          <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
            {profile.availability}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-3xl text-5xl leading-[1.04] tracking-tight sm:text-7xl">
            Let&rsquo;s build the products{" "}
            <span className="text-iridescent">AI makes possible.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-canvas"
              >
                {profile.email}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line-strong px-6 py-3.5 text-base text-ink transition-colors hover:border-ink"
            >
              LinkedIn
            </a>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-line-strong px-6 py-3.5 text-base text-ink transition-colors hover:border-ink"
            >
              Resume ↗
            </a>
          </div>
        </Reveal>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-[12px] tracking-caps uppercase text-ink-faint">
          <span>© {new Date().getFullYear()} Ivan Aleksić</span>
          <span className="tabular-nums"><LocalTime /></span>
          <div className="flex gap-5">
            <Link href="/#work" className="transition-colors hover:text-ink">Work</Link>
            <Link href="/about" className="transition-colors hover:text-ink">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
