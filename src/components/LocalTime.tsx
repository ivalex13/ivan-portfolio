"use client";

import { useEffect, useState } from "react";

/** Live local time (CET) — a small pulse of "real person" in the footer. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Belgrade",
      timeZoneName: "short",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // avoid hydration mismatch: render nothing until mounted
  if (!time) return null;

  return <span suppressHydrationWarning>Local time {time}</span>;
}
