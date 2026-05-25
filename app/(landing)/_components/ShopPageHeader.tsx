import type { ReactNode } from "react";

interface ShopPageHeaderProps {
  kicker?: string;
  title: ReactNode;
  sub?: string;
  actions?: ReactNode;
}

export function ShopPageHeader({ kicker, title, sub, actions }: ShopPageHeaderProps) {
  return (
    <div
      className="lp-inner-pad"
      style={{
        paddingTop: 8,
        paddingBottom: 28,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: "1px solid var(--lp-line)",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div>
        {kicker && (
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10.5,
              color: "var(--lp-ink3)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {kicker}
          </div>
        )}
        <h1
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "var(--lp-ink)",
            letterSpacing: "-1.2px",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {sub && (
          <div style={{ fontSize: 14, color: "var(--lp-ink3)", marginTop: 8 }}>{sub}</div>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
