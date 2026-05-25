import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CrumbItem {
  label: string;
  href?: string;
}

export function PageCrumb({ items }: { items: CrumbItem[] }) {
  return (
    <div
      className="lp-inner-pad"
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        fontFamily: "var(--font-geist-mono)",
        fontSize: 11.5,
        color: "var(--lp-ink3)",
        letterSpacing: "0.3px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        overflowX: "auto",
      }}
    >
      {items.map((it, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <ChevronRight size={10} strokeWidth={2} style={{ color: "var(--lp-line2)" }} />}
          {it.href ? (
            <Link
              href={it.href}
              style={{
                color: i === items.length - 1 ? "var(--lp-ink)" : "var(--lp-ink3)",
                fontWeight: i === items.length - 1 ? 600 : 400,
                textDecoration: "none",
              }}
            >
              {it.label}
            </Link>
          ) : (
            <span
              style={{
                color: i === items.length - 1 ? "var(--lp-ink)" : "var(--lp-ink3)",
                fontWeight: i === items.length - 1 ? 600 : 400,
              }}
            >
              {it.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
