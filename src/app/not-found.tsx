import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-start justify-center px-6 pt-24 md:px-10">
      <p className="font-mono text-[13px] tracking-caps uppercase text-ink-faint">
        404
      </p>
      <h1 className="mt-5 text-5xl tracking-tight sm:text-7xl">
        This page <span className="text-iridescent">hallucinated.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg text-ink-dim">
        Unlike my AI products, this link wasn&rsquo;t grounded in anything real.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-ink px-7 py-3.5 font-medium text-canvas transition-transform hover:scale-[1.03]"
      >
        Back to the portfolio
      </Link>
    </div>
  );
}
