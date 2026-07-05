/* eslint-disable @next/next/no-img-element */

const ASPECTS: Record<string, string> = {
  wide: "aspect-[21/10]",
  video: "aspect-video",
  square: "aspect-square",
  tall: "aspect-[4/5]",
};

/**
 * Styled frame for case-study visuals. When `src` is provided it renders the
 * image; otherwise it renders an elegant placeholder with drop-in guidance,
 * so the site looks intentional even before real visuals exist.
 */
export function ImagePlaceholder({
  src,
  alt,
  caption,
  aspect = "wide",
  note,
  compact = false,
  tint,
}: {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "video" | "square" | "tall";
  note?: string;
  compact?: boolean;
  /** Accent color for the placeholder bloom; defaults to the site gradient */
  tint?: string;
}) {
  return (
    <figure>
      <div
        className={`frame relative overflow-hidden rounded-xl ${ASPECTS[aspect]}`}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <>
            {/* dot grid backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(color-mix(in oklab, var(--color-ink) 14%, transparent) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            {/* iridescent bloom */}
            <div
              aria-hidden
              className="absolute -inset-x-1/4 -top-1/2 h-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-45"
              style={{
                background: tint
                  ? `linear-gradient(100deg, ${tint}, transparent 85%)`
                  : "linear-gradient(100deg, var(--color-glow-1), var(--color-glow-2), var(--color-glow-3))",
              }}
            />
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="text-center">
                <span
                  aria-hidden
                  className={`mx-auto grid place-items-center rounded-full border border-line-strong font-mono text-ink-faint ${
                    compact ? "size-9 text-sm" : "size-12 text-lg"
                  }`}
                >
                  +
                </span>
                {!compact && note && (
                  <p className="mx-auto mt-4 max-w-xs font-mono text-[12px] leading-relaxed text-ink-faint">
                    {note}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[12px] leading-relaxed text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
