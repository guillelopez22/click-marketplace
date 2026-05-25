import Link from "next/link";
import {
  Check,
  ShoppingCart,
  Archive,
  Plane,
  Shield,
  Truck,
  Phone,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { PageCrumb } from "../../../_components/PageCrumb";
import { ShopPageHeader } from "../../../_components/ShopPageHeader";
import { LandingFooter } from "../../../_components/LandingFooter";

const JOURNEY = [
  { id: "order",   label: "Pedido recibido",   sub: "Tu pedido fue procesado",              icon: "cart" },
  { id: "miami",   label: "En bodega Miami",   sub: "Recibido en almacén de Miami",          icon: "box" },
  { id: "transit", label: "En tránsito",       sub: "Vuelo de carga MIA → SAP",             icon: "plane" },
  { id: "customs", label: "En aduana",         sub: "Tramitando liquidación aduanal",        icon: "shield" },
  { id: "way",     label: "En camino",         sub: "Repartidor asignado",                  icon: "truck" },
  { id: "done",    label: "Entregado",         sub: "Pedido completado",                    icon: "check" },
];

function JourneyIcon({ name, size = 14 }: { name: string; size?: number }) {
  const sw = 1.8;
  switch (name) {
    case "cart":   return <ShoppingCart size={size} strokeWidth={sw} />;
    case "box":    return <Archive size={size} strokeWidth={sw} />;
    case "plane":  return <Plane size={size} strokeWidth={sw} />;
    case "shield": return <Shield size={size} strokeWidth={sw} />;
    case "truck":  return <Truck size={size} strokeWidth={sw} />;
    case "check":  return <Check size={size} strokeWidth={2.4} />;
    default:       return null;
  }
}

const TIMESTAMPS = ["19 may 09:42", "20 may 14:18", "Hoy 03:11", "—", "—", "—"];

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const stage = 2; // In transit

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi cuenta", href: "/shop/account" },
          { label: "Mis pedidos", href: "/shop/orders" },
          { label: id },
        ]}
      />
      <ShopPageHeader
        kicker={`Pedido · 2 productos · 19 may 2026`}
        title={
          <>
            {id}{" "}
            <span
              style={{
                color: "var(--lp-accent)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              · En tránsito
            </span>
          </>
        }
        sub="Vuelo 4M-7821 · ETA próxima semana"
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              style={{
                padding: "8px 14px",
                border: "1px solid var(--lp-line2)",
                borderRadius: 6,
                background: "var(--lp-surface)",
                color: "var(--lp-ink2)",
                fontSize: 13,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
              }}
            >
              <Phone size={13} strokeWidth={1.7} /> Soporte
            </button>
            <Link
              href={`/shop/track/${id}`}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                background: "var(--lp-ink)",
                color: "#FFF",
                fontSize: 13,
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              Ver tracking <ArrowRight size={13} strokeWidth={2.2} />
            </Link>
          </div>
        }
      />

      <div className="lp-page-wrap lp-2col">
        {/* Left: timeline + items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Timeline */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink3)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Línea de tiempo
            </div>
            {JOURNEY.map((step, i) => {
              const done = i < stage;
              const active = i === stage;
              return (
                <div
                  key={step.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "30px 1fr auto",
                    gap: 14,
                    padding: "12px 0",
                    position: "relative",
                  }}
                >
                  {i < JOURNEY.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 13.5,
                        top: 38,
                        bottom: -12,
                        width: 1.5,
                        background: done ? "var(--lp-accent)" : "var(--lp-line2)",
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      zIndex: 1,
                      background: done
                        ? "var(--lp-accent)"
                        : active
                        ? "var(--lp-ink)"
                        : "var(--lp-paper2)",
                      color: done ? "#FFF" : active ? "var(--lp-surface)" : "var(--lp-ink3)",
                      border: !done && !active ? "1px solid var(--lp-line2)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {done ? <Check size={14} strokeWidth={2.4} /> : <JourneyIcon name={step.icon} />}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: active || done ? 600 : 400,
                        color: i > stage ? "var(--lp-ink4)" : "var(--lp-ink)",
                        letterSpacing: "-0.2px",
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 11,
                        color: "var(--lp-ink3)",
                        marginTop: 3,
                        letterSpacing: "0.2px",
                      }}
                    >
                      {step.sub}
                    </div>
                    {active && step.id === "transit" && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: "8px 12px",
                          background: "var(--lp-paper2)",
                          borderRadius: 6,
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 11,
                          color: "var(--lp-ink2)",
                          letterSpacing: "0.2px",
                          display: "inline-block",
                        }}
                      >
                        Vuelo 4M-7821 · MIA → SAP · Peso 1.5 kg
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 11,
                      color: "var(--lp-ink3)",
                      letterSpacing: "0.2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {TIMESTAMPS[i]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid var(--lp-line)",
                background: "var(--lp-paper2)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "var(--lp-ink2)",
                fontWeight: 600,
                letterSpacing: "0.4px",
                textTransform: "uppercase",
              }}
            >
              2 productos · L 4,283
            </div>
            {[
              { title: "AirPods Pro 2 · Apple",            merchant: "Apple",  qty: 1, price: "L 2,870" },
              { title: "Cable USB-C a Lightning 2m · Anker", merchant: "Anker",  qty: 2, price: "L 1,413" },
            ].map((item, i) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: 16,
                  alignItems: "center",
                  borderBottom: i === 0 ? "1px solid var(--lp-line)" : 0,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 6,
                    background: "var(--lp-paper2)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
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
                    {item.merchant}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--lp-ink)",
                      fontWeight: 500,
                      marginTop: 2,
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 11.5,
                      color: "var(--lp-ink3)",
                      marginTop: 4,
                    }}
                  >
                    ×{item.qty}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--lp-ink)",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: shipping + payment */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: "18px 22px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink3)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Entrega
            </div>
            <div style={{ fontSize: 13.5, color: "var(--lp-ink)", fontWeight: 500 }}>
              Daniela Murillo
            </div>
            <div style={{ fontSize: 12.5, color: "var(--lp-ink2)", lineHeight: 1.5, marginTop: 4 }}>
              Col. Lomas del Guijarro
              <br />
              Casa #1284, Tegucigalpa
              <br />
              <span style={{ color: "var(--lp-ink3)" }}>Portón rojo, dejar con el guardia</span>
            </div>
          </div>

          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: "18px 22px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink3)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              Pago
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CreditCard size={18} strokeWidth={1.7} style={{ color: "var(--lp-ink2)" }} />
              <div>
                <div style={{ fontSize: 13.5, color: "var(--lp-ink)", fontWeight: 500 }}>
                  Visa 4821
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 11,
                    color: "var(--lp-ink3)",
                    marginTop: 2,
                  }}
                >
                  BAC Credomatic
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 16,
                paddingTop: 14,
                borderTop: "1px solid var(--lp-line)",
              }}
            >
              {[
                ["Subtotal", "L 2,715"],
                ["Aduana e imp.", "L 1,568", "jade"],
                ["Flete Miami → HN", "Incluido", "jade"],
              ].map(([k, v, tone]) => (
                <div
                  key={k}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                    fontSize: 12.5,
                    color: "var(--lp-ink2)",
                  }}
                >
                  <span>{k}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color: tone === "jade" ? "var(--lp-jade)" : "var(--lp-ink)",
                      fontWeight: 500,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0 0",
                  marginTop: 4,
                  borderTop: "1px solid var(--lp-line)",
                }}
              >
                <span style={{ fontSize: 14, color: "var(--lp-ink)", fontWeight: 600 }}>Total</span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 17,
                    color: "var(--lp-ink)",
                    fontWeight: 700,
                    letterSpacing: "-0.4px",
                  }}
                >
                  L 4,283
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: 6,
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line2)",
                color: "var(--lp-ink2)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Factura
            </button>
            <button
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: 6,
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line2)",
                color: "var(--lp-ink2)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Volver a pedir
            </button>
          </div>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
