export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee gap-0 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-mono text-[13px] tracking-caps uppercase text-ink-faint"
          >
            {item}
            <span aria-hidden className="text-glow-2">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent" />
    </div>
  );
}
