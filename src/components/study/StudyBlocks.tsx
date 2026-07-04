import type { Block } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { ImagePlaceholder } from "@/components/study/ImagePlaceholder";

export default function StudyBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-10">
      {blocks.map((block, i) => (
        <Reveal key={i} y={20}>
          <BlockView
            block={block}
            headingIndex={
              block.type === "heading"
                ? blocks.slice(0, i + 1).filter((b) => b.type === "heading").length
                : 0
            }
          />
        </Reveal>
      ))}
    </div>
  );
}

function BlockView({
  block,
  headingIndex,
}: {
  block: Block;
  headingIndex: number;
}) {
  switch (block.type) {
    case "heading":
      return (
        <div className="flex items-baseline gap-4 pt-8">
          <span aria-hidden className="font-mono text-[13px] text-glow-2">
            {String(headingIndex).padStart(2, "0")}
          </span>
          <h2
            id={block.id}
            className="scroll-mt-28 text-3xl tracking-tight text-ink sm:text-4xl"
          >
            {block.text}
          </h2>
        </div>
      );

    case "text":
      return (
        <p className="max-w-2xl text-lg leading-[1.75] text-ink-dim">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="max-w-2xl space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-lg leading-relaxed text-ink-dim">
              <span aria-hidden className="mt-[2px] font-mono text-sm text-glow-2">
                ✦
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "stat-row":
      return (
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {block.stats.map((s, i) => (
            <div key={i} className="bg-raised p-6">
              <div className="text-3xl font-medium tracking-tight text-ink tabular-nums">
                {s.value}
              </div>
              <div className="mt-2 text-sm leading-snug text-ink-faint">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote className="relative max-w-2xl border-l-2 border-glow-2 py-1 pl-6">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-5 left-4 select-none text-7xl leading-none text-glow-2/30"
          >
            &ldquo;
          </span>
          <p className="text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
            {block.text}
          </p>
          {block.attribution && (
            <footer className="mt-4 font-mono text-[12px] tracking-caps uppercase text-ink-faint">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );

    case "callout":
      return (
        <aside className="frame max-w-2xl rounded-xl p-7">
          <div className="font-mono text-[12px] tracking-caps uppercase text-iridescent">
            {block.title}
          </div>
          <p className="mt-3 text-base leading-relaxed text-ink-dim">
            {block.text}
          </p>
        </aside>
      );

    case "image":
      return (
        <ImagePlaceholder
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          aspect={block.aspect}
          note={block.note}
        />
      );
  }
}
