import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Plane,
  Truck,
  Banknote,
  Package,
  Check,
  ArrowRight,
  Star,
  ShoppingCart,
} from "lucide-react";
import { db } from "@/lib/db";
import { serializeProducts, type SerializedProduct } from "@/lib/serialize";
import { DealCountdown } from "./DealCountdown";
import { LandingFooter } from "./_components/LandingFooter";

// ─── Helpers ───────────────────────────────────────────────────────────────

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

function imgSrc(p: SerializedProduct): string {
  return p.images[0] ?? `https://picsum.photos/seed/${p.id}/400/400`;
}


// ─── Mobile category grid data ─────────────────────────────────────────────

const MOBILE_CATS = [
  { label: "Electrónica", emoji: "💻", slug: "Electrónica" },
  { label: "Hogar",       emoji: "🏠", slug: "Hogar" },
  { label: "Ropa",        emoji: "👗", slug: "Ropa" },
  { label: "Deportes",    emoji: "⚽", slug: "Deportes" },
  { label: "Belleza",     emoji: "✨", slug: "Belleza" },
  { label: "Libros",      emoji: "📚", slug: "Libros" },
];

// ─── ProductSlot — image cell used inside ShowcasePanel ────────────────────

function ProductSlot({
  product,
  height = 108,
}: {
  product: SerializedProduct;
  height?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height,
        borderRadius: 6,
        overflow: "hidden",
        background: "var(--lp-paper)",
      }}
    >
      <Image
        src={imgSrc(product)}
        alt={product.title}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 1360px) 15vw, 200px"
        unoptimized
      />
    </div>
  );
}

// ─── ShowcasePanel ─────────────────────────────────────────────────────────

type Tone = "default" | "deals" | "accent";

function ShowcasePanel({
  title,
  products,
  action,
  actionHref = "#",
  kicker,
  kickerLabel,
  tone = "default",
}: {
  title: string;
  products: SerializedProduct[];
  action: string;
  actionHref?: string;
  kicker?: React.ReactNode;
  kickerLabel?: string;
  tone?: Tone;
}) {
  const accentColor =
    tone === "deals"
      ? "var(--lp-jade)"
      : tone === "accent"
        ? "var(--lp-accent)"
        : "var(--lp-ink)";

  return (
    <div
      style={{
        background: "var(--lp-surface)",
        border: "1px solid var(--lp-line)",
        borderRadius: 10,
        padding: "18px 18px 16px",
        display: "flex",
        flexDirection: "column",
        height: 440,
        overflow: "hidden",
      }}
    >
      <h3
        style={{
          fontSize: 17,
          fontWeight: 600,
          color: "var(--lp-ink)",
          letterSpacing: "-0.4px",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>

      {(kicker ?? kickerLabel) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: tone === "deals" ? accentColor : "var(--lp-ink3)",
            fontWeight: tone === "deals" ? 600 : 400,
            letterSpacing: "0.3px",
            minHeight: 16,
          }}
        >
          {kickerLabel && <span>{kickerLabel}</span>}
          {kicker && <span>{kicker}</span>}
        </div>
      )}

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 12,
          marginTop: 14,
          minHeight: 0,
        }}
      >
        {products.slice(0, 4).map((p) => (
          <a
            key={p.id}
            href={`/p/${p.id}`}
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              minHeight: 0,
              textDecoration: "none",
            }}
          >
            <ProductSlot product={p} height={108} />
            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                color: "var(--lp-ink2)",
                lineHeight: 1.25,
                letterSpacing: "-0.05px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {p.merchant ?? "CLICK"}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.2px",
              }}
            >
              {fmtHNL(p.priceHNL)}
            </div>
          </a>
        ))}
      </div>

      <a
        href={actionHref}
        style={{
          marginTop: 12,
          fontFamily: "var(--font-geist-mono)",
          fontSize: 12,
          color: accentColor,
          fontWeight: 600,
          letterSpacing: "0.2px",
          flexShrink: 0,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {action} <ArrowRight size={11} strokeWidth={2.4} />
      </a>
    </div>
  );
}

// ─── BrowsePanel ───────────────────────────────────────────────────────────

function BrowsePanelPaste() {
  return (
    <Link
      href="/search"
      style={{
        background: "var(--lp-ink)",
        color: "#FFF",
        borderRadius: 10,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: 200,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 300px 200px at 100% 0%, rgba(15,157,190,0.2), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: "rgba(255,255,255,0.08)",
            color: "var(--lp-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          }}
        >
          <Plane size={20} strokeWidth={1.8} />
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#FFF",
            letterSpacing: "-0.4px",
            lineHeight: 1.2,
          }}
        >
          Pega un link de Amazon
        </div>
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.6)",
            marginTop: 4,
            letterSpacing: "0.2px",
          }}
        >
          Cotizamos en 2 min
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          https://amazon.com/…
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "6px 10px",
            background: "var(--lp-accent)",
            color: "#FFF",
            borderRadius: 5,
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.3px",
          }}
        >
          Cotizar <ArrowRight size={11} strokeWidth={2.4} />
        </span>
      </div>
    </Link>
  );
}

function BrowsePanelProduct({
  title,
  sub,
  product,
  href = "#",
}: {
  title: string;
  sub: string;
  product: SerializedProduct | undefined;
  href?: string;
}) {
  return (
    <a
      href={href}
      style={{
        background: "var(--lp-surface)",
        border: "1px solid var(--lp-line)",
        borderRadius: 10,
        padding: "18px 18px 18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 200,
        textDecoration: "none",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10.5,
            color: "var(--lp-ink3)",
            letterSpacing: "0.4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {sub}
        </div>
        <div
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "var(--lp-ink)",
            letterSpacing: "-0.3px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <span
          style={{
            marginTop: "auto",
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "var(--lp-ink2)",
            fontWeight: 600,
            letterSpacing: "0.2px",
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          Explorar <ArrowRight size={11} strokeWidth={2} />
        </span>
      </div>
      {product && (
        <div
          style={{
            width: 92,
            height: 92,
            flexShrink: 0,
            borderRadius: 6,
            overflow: "hidden",
            position: "relative",
            background: "var(--lp-paper)",
          }}
        >
          <Image
            src={imgSrc(product)}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="92px"
            unoptimized
          />
        </div>
      )}
    </a>
  );
}

// ─── WebHero ───────────────────────────────────────────────────────────────

function WebHero({ products }: { products: SerializedProduct[] }) {
  const amazon = products.filter((p) => p.sourceType === "AMAZON");

  return (
    <section style={{ background: "var(--lp-paper)", padding: "20px 0 0" }}>
      <div className="lp-inner-pad" style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Mobile-only: category icon grid */}
        <div className="lp-cat-grid-m">
          {MOBILE_CATS.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/c/${encodeURIComponent(c.slug)}`}
              style={{
                padding: "10px 4px 8px",
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line)",
                borderRadius: 12,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--lp-accent-tint)",
                  fontSize: 14,
                }}
              >
                {c.emoji}
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--lp-ink)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.1px",
                }}
              >
                {c.label.split(" ")[0]}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop-only: 3 showcase panels */}
        <div
          className="lp-hide-m"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginBottom: 14,
          }}
        >
          <ShowcasePanel
            title="Recién importados de USA"
            products={amazon.slice(0, 4)}
            action="Ver todo Amazon USA"
            actionHref="/c/Electrónica"
            tone="default"
          />
          <ShowcasePanel
            title="Hasta −28% hoy"
            kickerLabel="Termina en"
            kicker={<DealCountdown />}
            products={amazon.slice(4, 8)}
            action="Ver todas las ofertas"
            actionHref="/c/Electrónica"
            tone="deals"
          />
          <ShowcasePanel
            title="Importados destacados"
            kickerLabel="Esta semana"
            products={amazon.slice(8, 12)}
            action="Ver catálogo"
            actionHref="/c/Electrónica"
            tone="accent"
          />
        </div>

        {/* Desktop-only: 4 browse panels */}
        <div
          className="lp-hide-m"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <BrowsePanelPaste />
          <BrowsePanelProduct
            title="Electrónica & Apple"
            sub="AirPods, iPad, Watch"
            product={amazon[0]}
            href="/c/Electrónica"
          />
          <BrowsePanelProduct
            title="Hogar & deco"
            sub="Amazon USA · entrega 7–14 días"
            product={amazon[12]}
            href="/c/Hogar"
          />
          <BrowsePanelProduct
            title="Audio & teclados"
            sub="Sony, JBL, Logitech"
            product={amazon[3]}
            href="/c/Electrónica"
          />
        </div>

        {/* Mobile-only: dark Miami card + light Amazon CTA */}
        <div className="lp-show-m" style={{ flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <BrowsePanelPaste />
          <Link
            href="/shop/search"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "var(--lp-accent-tint)",
                color: "var(--lp-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Plane size={20} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 9.5,
                  color: "var(--lp-ink3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: 2,
                }}
              >
                Importar de USA
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--lp-ink)",
                  letterSpacing: "-0.2px",
                }}
              >
                Pega cualquier link de Amazon
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10,
                  color: "var(--lp-ink3)",
                  marginTop: 2,
                }}
              >
                Te cotizamos en minutos · sin compromiso
              </div>
            </div>
            <ArrowRight size={16} strokeWidth={2} style={{ color: "var(--lp-ink3)", flexShrink: 0 }} />
          </Link>
        </div>

      </div>
    </section>
  );
}

// ─── SectionHead ───────────────────────────────────────────────────────────

function SectionHead({
  kicker,
  title,
  action = "Ver todo",
  actionHref = "#",
  accentKicker = false,
}: {
  kicker?: string;
  title: string;
  action?: string;
  actionHref?: string;
  accentKicker?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: "1px solid var(--lp-line)",
      }}
    >
      <div>
        {kicker && (
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10.5,
              color: accentKicker ? "var(--lp-accent)" : "var(--lp-ink3)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {kicker}
          </div>
        )}
        <h2
          className="lp-section-title"
          style={{
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            margin: 0,
            color: "var(--lp-ink)",
          }}
        >
          {title}
        </h2>
      </div>
      <a
        href={actionHref}
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 12,
          color: "var(--lp-ink2)",
          fontWeight: 500,
          letterSpacing: "0.2px",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {action} →
      </a>
    </div>
  );
}

// ─── MarketplaceCard ───────────────────────────────────────────────────────

function MarketplaceCard({
  product,
  rank,
  region,
}: {
  product: SerializedProduct;
  rank?: number;
  region?: string;
}) {
  const usd = fmtUSD(product.priceUSD);
  const eta = etaLabel(product.etaDays);

  return (
    <div style={{ position: "relative" }}>
      <a
        href={`/p/${product.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          textDecoration: "none",
          background: "var(--lp-surface)",
          border: "1px solid var(--lp-line)",
          borderRadius: 8,
          padding: 12,
          gap: 10,
          height: "100%",
          transition: "border-color 150ms",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 160,
            borderRadius: 6,
            overflow: "hidden",
            background: "var(--lp-paper)",
          }}
        >
          <Image
            src={imgSrc(product)}
            alt={product.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 1360px) 16vw, 220px"
            unoptimized
          />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 9.5,
              color: "var(--lp-ink3)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontWeight: 500,
              marginBottom: 3,
            }}
          >
            {product.merchant ?? "CLICK"}
          </div>
          <div
            style={{
              fontSize: 12.5,
              color: "var(--lp-ink)",
              lineHeight: 1.3,
              marginBottom: 6,
              letterSpacing: "-0.1px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 6 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={10}
                strokeWidth={0}
                fill={n <= 4 ? "var(--lp-accent)" : "var(--lp-line2)"}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              marginTop: "auto",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 17,
                fontWeight: 700,
                color: "var(--lp-ink)",
                letterSpacing: "-0.5px",
              }}
            >
              {fmtHNL(product.priceHNL)}
            </span>
            {usd && (
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--lp-ink4)",
                }}
              >
                {usd}
              </span>
            )}
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--lp-ink3)",
              letterSpacing: "0.2px",
            }}
          >
            Llega{" "}
            <span style={{ color: "var(--lp-jade)", fontWeight: 600 }}>{eta}</span>
          </div>
        </div>
      </a>

      {rank !== undefined && (
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            zIndex: 2,
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10.5,
            fontWeight: 700,
            color: "#FFF",
            background: "var(--lp-ink)",
            padding: "3px 8px",
            borderRadius: 4,
            letterSpacing: "0.4px",
          }}
        >
          #{rank}
        </div>
      )}

      {region && (
        <div
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 2,
            padding: "3px 7px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
            borderRadius: 4,
            fontFamily: "var(--font-geist-mono)",
            fontSize: 9.5,
            fontWeight: 600,
            color: "var(--lp-accent)",
            letterSpacing: "0.3px",
            textTransform: "uppercase",
            border: "1px solid var(--lp-line)",
          }}
        >
          {region}
        </div>
      )}
    </div>
  );
}

// ─── RailSection — generic 6-col product grid ──────────────────────────────

function RailSection({
  kicker,
  title,
  products,
  actionHref = "#",
  numbered = false,
  regions,
  accentKicker = false,
}: {
  kicker?: string;
  title: string;
  products: SerializedProduct[];
  actionHref?: string;
  numbered?: boolean;
  regions?: string[];
  accentKicker?: boolean;
}) {
  return (
    <section style={{ background: "var(--lp-paper)", padding: "36px 0" }}>
      <div className="lp-inner-pad" style={{ maxWidth: 1360, margin: "0 auto" }}>
        <SectionHead
          kicker={kicker}
          title={title}
          actionHref={actionHref}
          accentKicker={accentKicker}
        />
        <div
          className="lp-rail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 14,
          }}
        >
          {products.slice(0, 6).map((p, i) => (
            <MarketplaceCard
              key={p.id}
              product={p}
              rank={numbered ? i + 1 : undefined}
              region={regions?.[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WebTrustStrip ─────────────────────────────────────────────────────────

function WebTrustStrip() {
  const items = [
    { Icon: ShieldCheck, title: "Aduana incluida", sub: "Sin sorpresas al recibir" },
    { Icon: Plane, title: "Bodega en Miami", sub: "Recibimos y consolidamos" },
    { Icon: Truck, title: "Repartidor propio", sub: "Foto y nombre en la app" },
    { Icon: Banknote, title: "Paga con tu tarjeta", sub: "Visa · Mastercard · Amex" },
  ] as const;

  return (
    <section
      style={{
        background: "var(--lp-paper2)",
        padding: "32px 0",
        borderTop: "1px solid var(--lp-line)",
        borderBottom: "1px solid var(--lp-line)",
      }}
    >
      <div
        className="lp-inner-pad lp-trust-strip-grid"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
      >
        {items.map(({ Icon, title, sub }, i) => (
          <div
            key={title}
            className="lp-trust-strip-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              paddingLeft: i === 0 ? 0 : 20,
              borderRight: i < items.length - 1 ? "1px solid var(--lp-line)" : 0,
              paddingRight: i < items.length - 1 ? 20 : 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--lp-ink)",
                flexShrink: 0,
              }}
            >
              <Icon size={17} strokeWidth={1.7} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--lp-ink)",
                  letterSpacing: "-0.1px",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "var(--lp-ink3)",
                  marginTop: 2,
                  letterSpacing: "0.2px",
                }}
              >
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── WebRailSocialProof ────────────────────────────────────────────────────

const DELIVERY_DATA = [
  { city: "Lomas del Guijarro", time: "hace 2 h", name: "María A." },
  { city: "Col. Palmira", time: "hace 4 h", name: "Roberto F." },
  { city: "Col. Tepeyac", time: "ayer", name: "Daniela M." },
  { city: "El Hatillo", time: "ayer", name: "Luis P." },
  { city: "SAP · Centro", time: "ayer", name: "Ana V." },
  { city: "Col. Kennedy", time: "2 días", name: "Sergio H." },
];

function WebRailSocialProof({ products }: { products: SerializedProduct[] }) {
  return (
    <section
      style={{
        background: "var(--lp-paper2)",
        padding: "48px 0",
        borderTop: "1px solid var(--lp-line)",
        borderBottom: "1px solid var(--lp-line)",
      }}
    >
      <div className="lp-inner-pad" style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 24,
            paddingBottom: 14,
            borderBottom: "1px solid var(--lp-line)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-jade)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 6,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Check size={11} strokeWidth={2.6} /> 128 entregas esta semana
            </div>
            <h2
              className="lp-section-title"
              style={{
                fontSize: 24,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
                margin: 0,
                color: "var(--lp-ink)",
              }}
            >
              Recién llegado a colonias hondureñas
            </h2>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 12,
              color: "var(--lp-ink2)",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Ver mapa →
          </a>
        </div>
        <div
          className="lp-proof-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 14,
          }}
        >
          {products.slice(0, 6).map((p, i) => {
            const d = DELIVERY_DATA[i] ?? DELIVERY_DATA[0];
            return (
              <div
                key={p.id}
                style={{
                  background: "var(--lp-surface)",
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid var(--lp-line)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 120,
                    borderRadius: 6,
                    overflow: "hidden",
                    background: "var(--lp-paper)",
                  }}
                >
                  <Image
                    src={imgSrc(p)}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 1360px) 16vw, 200px"
                    unoptimized
                  />
                </div>
                <div style={{ marginTop: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "var(--lp-jade)",
                        color: "#FFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 10,
                        color: "var(--lp-jade)",
                        fontWeight: 700,
                        letterSpacing: "0.4px",
                        textTransform: "uppercase",
                      }}
                    >
                      Entregado
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--lp-ink)",
                      lineHeight: 1.3,
                      marginBottom: 6,
                      minHeight: 30,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 10,
                      color: "var(--lp-ink3)",
                      letterSpacing: "0.2px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{d.name}</span>
                    <span>{d.time}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 9.5,
                      color: "var(--lp-ink4)",
                      marginTop: 2,
                    }}
                  >
                    ↳ {d.city}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── WebHowItWorksStrip ────────────────────────────────────────────────────

function WebHowItWorksStrip() {
  const steps = [
    { n: "01", Icon: ShoppingCart, title: "Pide", sub: "Catálogo o link" },
    { n: "02", Icon: Package, title: "Llega a Miami", sub: "Día 1–2" },
    { n: "03", Icon: Plane, title: "Vuelo a HN", sub: "Día 3–5" },
    { n: "04", Icon: ShieldCheck, title: "Aduana", sub: "Día 6–8" },
    { n: "05", Icon: Truck, title: "En tu puerta", sub: "Día 9–14" },
  ] as const;

  return (
    <section
      id="como-funciona"
      style={{
        background: "var(--lp-paper)",
        padding: "48px 0",
        borderTop: "1px solid var(--lp-line)",
      }}
    >
      <div className="lp-inner-pad" style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 24,
            paddingBottom: 14,
            borderBottom: "1px solid var(--lp-line)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink3)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Cómo funciona
            </div>
            <h2
              className="lp-section-title"
              style={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.4px",
                margin: 0,
                color: "var(--lp-ink)",
              }}
            >
              De Amazon a tu casa, en 5 pasos
            </h2>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 12,
              color: "var(--lp-ink2)",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Conoce el proceso →
          </a>
        </div>
        <div
          className="lp-how-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 14,
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px",
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: i === 0 ? "var(--lp-accent)" : "var(--lp-paper2)",
                  color: i === 0 ? "#FFF" : "var(--lp-ink2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <s.Icon size={20} strokeWidth={1.8} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10,
                    color: "var(--lp-ink3)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {s.n} · {s.sub}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--lp-ink)",
                    letterSpacing: "-0.2px",
                    marginTop: 2,
                  }}
                >
                  {s.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function LandingPage() {
  const raw = await db.product.findMany({
    where: { active: true },
    orderBy: [{ featured: "desc" }, { stock: "desc" }],
    take: 100,
  });

  const all = serializeProducts(raw);
  const amazon = all.filter((p) => p.sourceType === "AMAZON");

  return (
    <>
      <WebHero products={all} />
      <RailSection
        kicker="Más vendidos · esta semana"
        title="Lo que más compran los catrachos"
        products={amazon.slice(0, 6)}
        actionHref="/c/Electrónica"
        numbered
      />
      <WebTrustStrip />
      <RailSection
        kicker="Desde USA · llegan en 7-14 días"
        title="Importados destacados"
        products={amazon.slice(6, 12)}
        actionHref="/c/Electrónica"
      />
      <WebRailSocialProof products={all.slice(0, 6)} />
      <WebHowItWorksStrip />
      <LandingFooter />
    </>
  );
}
