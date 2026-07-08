import { profile } from "@/lib/content";
import { Reveal } from "@/components/motion";
import Magnetic from "@/components/Magnetic";

export default function Footer() {
  return (
    <footer id="contact" className="section-dark relative border-t border-line">
      {/* Contact CTA */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-28 sm:py-36">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 font-mono text-[13px] tracking-caps uppercase text-ink-faint">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-ok" />
            </span>
            {profile.availability}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
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
              href={`tel:${profile.phone}`}
              className="rounded-full border border-line-strong px-6 py-3.5 text-base text-ink transition-colors hover:border-ink"
            >
              {profile.phone}
            </a>
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
    </footer>
  );
}
