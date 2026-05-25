import Image from "next/image";
import Link from "next/link";
import { Plane } from "lucide-react";
import type { SerializedProduct } from "@/lib/serialize";

function fmtHNL(hnl: string): string {
  return `L ${Math.round(parseFloat(hnl)).toLocaleString("en-US")}`;
}

function fmtUSD(usd: string | null): string | null {
  if (!usd) return null;
  return `$${parseFloat(usd).toFixed(0)}`;
}

function etaLabel(etaDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + etaDays);
  return d.toLocaleDateString("es-HN", { day: "numeric", month: "short" });
}

export function MarketplaceCard({ product }: { product: SerializedProduct }) {
  const isImport = product.sourceType === "AMAZON";
  const imageSrc = product.images[0] ?? `https://picsum.photos/seed/${product.id}/400/400`;
  const hnl = fmtHNL(product.priceHNL);
  const usd = fmtUSD(product.priceUSD);
  const eta = etaLabel(product.etaDays);

  return (
    <Link
      href={`/shop/p/${product.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          background: "var(--lp-surface)",
          border: "1px solid var(--lp-line)",
          borderRadius: 10,
          overflow: "hidden",
          transition: "box-shadow 180ms cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            height: 200,
            background: "var(--lp-paper)",
          }}
        >
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1360px) 25vw, 320px"
            unoptimized
          />
          {isImport && (
            <span
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                padding: "3px 8px",
                background: "var(--lp-accent)",
                color: "#FFF",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: "0.6px",
                borderRadius: 4,
                textTransform: "uppercase",
              }}
            >
              USA
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px 16px" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--lp-ink3)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 5,
            }}
          >
            {product.merchant ?? "Amazon USA"}
          </div>
          <h3
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              color: "var(--lp-ink)",
              letterSpacing: "-0.1px",
              margin: "0 0 12px",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </h3>

          {/* Price row */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--lp-ink)",
                letterSpacing: "-0.5px",
              }}
            >
              {hnl}
            </span>
            {usd && (
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--lp-ink3)",
                }}
              >
                {usd}
              </span>
            )}
          </div>

          {/* ETA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11.5,
              color: "var(--lp-ink3)",
            }}
          >
            <Plane size={12} strokeWidth={1.8} style={{ color: "var(--lp-accent)" }} />
            Llega{" "}
            <span style={{ color: "var(--lp-jade)", fontWeight: 600 }}>{eta}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
