"use client";

import { useEffect, useState } from "react";

export function DealCountdown() {
  const [secs, setSecs] = useState(5 * 3600 + 23 * 60 + 17);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <span
      style={{
        fontFamily: "var(--font-geist-mono)",
        fontSize: 12,
        fontWeight: 600,
        color: "var(--lp-jade)",
        letterSpacing: "-0.2px",
      }}
    >
      Termina en {h}:{m}:{s}
    </span>
  );
}
