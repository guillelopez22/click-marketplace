import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  Plane,
  Truck,
  Shield,
  Phone,
  ShoppingCart,
  Minus,
  Plus,
  Archive,
} from "lucide-react";
import { getProductById, getProductsByCategory } from "@/server/queries/product";
import { serializeProduct, serializeProducts, type SerializedProduct } from "@/lib/serialize";
import { PageCrumb } from "../../../_components/PageCrumb";
import { MarketplaceCard } from "../../../_components/MarketplaceCard";
import { AddToCartButton } from "../../../_components/AddToCartButton";
import { LandingFooter } from "../../../_components/LandingFooter";

function fmtHNL(hnl: string): string {
  return `L ${Math.round(parseFloat(hnl)).toLocaleString("en-US")}`;
}

function fmtUSD(usd: string | null): string | null {
  if (!usd) return null;
  return `$${parseFloat(usd).toFixed(0)}`;
}

function deliveryDate(etaDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + etaDays);
  return d.toLocaleDateString("es-HN", { weekday: "short", day: "numeric", month: "short" });
}

const JOURNEY_STEPS = [
  { icon: "cart", label: "Pedido", dayOffset: 0 },
  { icon: "box",  label: "Miami",  dayOffset: 2 },
  { icon: "plane", label: "Vuelo", dayOffset: 5 },
  { icon: "shield", label: "Aduana", dayOffset: 8 },
  { icon: "truck", label: "Entrega", dayOffset: 14 },
];

function JourneyIcon({ name }: { name: string }) {
  const size = 16;
  const sw = 1.7;
  switch (name) {
    case "cart":    return <ShoppingCart size={size} strokeWidth={sw} />;
    case "box":     return <Archive size={size} strokeWidth={sw} />;
    case "plane":   return <Plane size={size} strokeWidth={sw} />;
    case "shield":  return <Shield size={size} strokeWidth={sw} />;
    case "truck":   return <Truck size={size} strokeWidth={sw} />;
    default:        return null;
  }
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const raw = await getProductById(id);
  if (!raw) notFound();

  const p = serializeProduct(raw);
  const isImport = p.sourceType === "AMAZON";
  const imageSrc = p.images[0] ?? `https://picsum.photos/seed/${p.id}/400/400`;
  const hnl = fmtHNL(p.priceHNL);
  const usd = fmtUSD(p.priceUSD);

  const relatedRaw = await getProductsByCategory(p.category, 8);
  const related: SerializedProduct[] = serializeProducts(relatedRaw).filter((r) => r.id !== p.id).slice(0, 4);

  const catLabel = "Importados USA";

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías", href: "/shop/c" },
          { label: catLabel, href: `/shop/c/${encodeURIComponent(p.category)}` },
          { label: p.title },
        ]}
      />

      {/* Hero detail */}
      <div className="lp-page-wrap lp-2col" style={{ paddingTop: 8, gap: "48px" }}>
        {/* Left: image + gallery */}
        <div>
          <div
            style={{
              position: "relative",
              height: 520,
              borderRadius: 12,
              overflow: "hidden",
              background: "var(--lp-paper)",
            }}
          >
            <Image
              src={imageSrc}
              alt={p.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 1360px) 50vw, 680px"
              priority
              unoptimized
            />
            {isImport && (
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  padding: "4px 10px",
                  background: "var(--lp-accent)",
                  color: "#FFF",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.6px",
                  borderRadius: 4,
                  textTransform: "uppercase",
                }}
              >
                Importado USA
              </span>
            )}
          </div>
          {/* Thumbnail strip */}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 6,
                  border: i === 0 ? "2px solid var(--lp-ink)" : "1px solid var(--lp-line)",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                  background: "var(--lp-paper)",
                }}
              >
                <Image
                  src={`https://picsum.photos/seed/${p.id}-${i}/200/200`}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "var(--lp-ink3)",
                letterSpacing: "0.5px",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {p.merchant ?? "Amazon USA"}
            </span>
          </div>

          <h1
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "var(--lp-ink)",
              letterSpacing: "-0.9px",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {p.title}
          </h1>

          {/* Price block */}
          <div
            style={{
              marginTop: 22,
              padding: "20px 0",
              borderTop: "1px solid var(--lp-line)",
              borderBottom: "1px solid var(--lp-line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 38,
                  fontWeight: 700,
                  color: "var(--lp-ink)",
                  letterSpacing: "-1.2px",
                }}
              >
                {hnl}
              </span>
              {usd && (
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 16,
                    color: "var(--lp-ink4)",
                  }}
                >
                  ≈ {usd}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12,
                color: "var(--lp-ink3)",
                marginTop: 6,
              }}
            >
              Impuestos y aduana incluidos
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12.5,
                color: "var(--lp-jade)",
                fontWeight: 600,
              }}
            >
              <Check size={14} strokeWidth={2.4} /> En stock · {p.stock} disponibles
            </div>
            <div
              style={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 12.5,
                color: "var(--lp-ink2)",
              }}
            >
              <Plane size={14} strokeWidth={1.8} style={{ color: "var(--lp-accent)" }} />
              Llega{" "}
              <span style={{ color: "var(--lp-ink)", fontWeight: 600 }}>
                {deliveryDate(p.etaDays)}
              </span>
              {" "}· vía bodega Miami
            </div>
          </div>

          {/* Qty + buy */}
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid var(--lp-line2)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              <button
                style={{
                  padding: "12px 14px",
                  color: "var(--lp-ink2)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Minus size={13} strokeWidth={2} />
              </button>
              <div
                style={{
                  minWidth: 40,
                  textAlign: "center",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 14,
                  color: "var(--lp-ink)",
                  fontWeight: 500,
                }}
              >
                1
              </div>
              <button
                style={{
                  padding: "12px 14px",
                  color: "var(--lp-ink2)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={13} strokeWidth={2} />
              </button>
            </div>
            <AddToCartButton product={p} />
            <Link
              href="/shop/checkout"
              style={{
                padding: "14px 22px",
                borderRadius: 6,
                background: "var(--lp-ink)",
                color: "#FFF",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.1px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Comprar ahora
            </Link>
          </div>

          {/* Miami journey */}
          {isImport && (
            <div
              style={{
                marginTop: 24,
                padding: "18px 18px 14px",
                background: "var(--lp-ink)",
                color: "#FFF",
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `radial-gradient(ellipse 400px 200px at 100% 0%, rgba(15,157,190,0.2), transparent 60%)`,
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10.5,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  Su viaje a tu puerta
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 8,
                  }}
                >
                  {JOURNEY_STEPS.map((step, i) => {
                    const isLast = i === JOURNEY_STEPS.length - 1;
                    const dayLabel = step.dayOffset === 0
                      ? "Hoy"
                      : `+${Math.max(step.dayOffset, p.etaDays - (14 - step.dayOffset))}d`;
                    return (
                      <div key={step.label} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: isLast ? "var(--lp-accent)" : "rgba(255,255,255,0.08)",
                            color: "#FFF",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 6,
                          }}
                        >
                          <JourneyIcon name={step.icon} />
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: 10,
                            color: "#FFF",
                            fontWeight: 600,
                          }}
                        >
                          {dayLabel}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: 9,
                            color: "rgba(255,255,255,0.5)",
                            letterSpacing: "0.3px",
                            textTransform: "uppercase",
                            marginTop: 2,
                          }}
                        >
                          {step.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 14,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              color: "var(--lp-ink3)",
              letterSpacing: "0.3px",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Shield size={12} strokeWidth={1.8} style={{ color: "var(--lp-jade)" }} /> Aduana incluida
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Phone size={12} strokeWidth={1.8} style={{ color: "var(--lp-jade)" }} /> Soporte WhatsApp
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Check size={12} strokeWidth={2.4} style={{ color: "var(--lp-jade)" }} /> Reembolso garantizado
            </span>
          </div>
        </div>
      </div>

      {/* Description + Specs */}
      <div className="lp-inner-pad lp-2col" style={{ paddingBottom: 48 }}>
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--lp-ink)",
              letterSpacing: "-0.4px",
              margin: "0 0 14px",
            }}
          >
            Descripción
          </h3>
          <p style={{ fontSize: 14, color: "var(--lp-ink2)", lineHeight: 1.65, margin: 0 }}>
            {p.description ??
              `${p.merchant ?? "Amazon"} · ${p.title}. Producto importado de Amazon USA. CLICK se encarga de recibir en nuestra bodega de Miami, manejar el flete aéreo y resolver la aduana — el precio que ves ya incluye los impuestos hondureños.`}
          </p>
        </div>
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "var(--lp-ink)",
              letterSpacing: "-0.4px",
              margin: "0 0 14px",
            }}
          >
            Especificaciones
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[
                ["Marca", p.merchant ?? "Amazon USA"],
                ["SKU", p.id.slice(-8).toUpperCase()],
                ...(isImport && p.weightLb
                  ? [["Peso", `${p.weightLb} lb`] as [string, string]]
                  : []),
                ["Categoría", p.category],
                ["Origen", "USA · vía bodega Miami"],
                ["Stock", `${p.stock} unidades`],
                ["ETA", `${p.etaDays} días`],
              ].map(([k, v]) => (
                <tr key={k} style={{ borderBottom: "1px solid var(--lp-line)" }}>
                  <td
                    style={{
                      padding: "10px 0",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 11,
                      color: "var(--lp-ink3)",
                      letterSpacing: "0.3px",
                      width: "40%",
                    }}
                  >
                    {k}
                  </td>
                  <td
                    style={{
                      padding: "10px 0",
                      fontSize: 13,
                      color: "var(--lp-ink)",
                      fontWeight: 500,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="lp-inner-pad" style={{ paddingTop: 36, paddingBottom: 48, borderTop: "1px solid var(--lp-line)" }}>
          <div style={{ marginBottom: 20 }}>
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
              Recomendado para ti
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.6px",
                margin: 0,
              }}
            >
              Productos similares
            </h2>
          </div>
          <div className="lp-4col">
            {related.map((r) => (
              <MarketplaceCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      )}

      <LandingFooter />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const raw = await getProductById(id);
  if (!raw) return {};
  return { title: `${raw.title} — CLICK Shop` };
}
