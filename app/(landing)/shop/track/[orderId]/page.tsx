import { Check, ShoppingCart, Archive, Plane, Shield, Truck, Phone, ArrowRight } from "lucide-react";
import { PageCrumb } from "../../../_components/PageCrumb";
import { ShopPageHeader } from "../../../_components/ShopPageHeader";
import { LandingFooter } from "../../../_components/LandingFooter";

const JOURNEY = [
  { id: "order",   label: "Pedido",   icon: "cart",   date: "19 may" },
  { id: "miami",   label: "Miami",    icon: "box",    date: "20 may" },
  { id: "transit", label: "Tránsito", icon: "plane",  date: "Hoy" },
  { id: "customs", label: "Aduana",   icon: "shield", date: "26 may" },
  { id: "way",     label: "En camino", icon: "truck",  date: "27 may" },
  { id: "done",    label: "Entregado", icon: "check",  date: "28 may" },
];

function StepIcon({ name, size = 13 }: { name: string; size?: number }) {
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

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function TrackPage({ params }: Props) {
  const { orderId } = await params;
  const stage = 2;

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mis pedidos", href: "/shop/orders" },
          { label: orderId, href: `/shop/orders/${orderId}` },
          { label: "Seguimiento" },
        ]}
      />
      <ShopPageHeader
        kicker={`En vivo · ${orderId}`}
        title="En tránsito a Honduras"
        sub="Vuelo 4M-7821 · MIA → SAP · ETA próxima semana"
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                background: "var(--lp-jade-tint)",
                color: "var(--lp-jade)",
                borderRadius: 6,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.4px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--lp-jade)",
                  animation: "lp-pulse-dot 1.6s ease infinite",
                  display: "inline-block",
                }}
              />
              Actualizado · hace 38 s
            </span>
            <button
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
                border: "none",
                cursor: "pointer",
              }}
            >
              <Phone size={13} strokeWidth={1.7} /> Notificar por WhatsApp
            </button>
          </div>
        }
      />

      <div
        style={{
          padding: "28px 36px 48px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 28,
          alignItems: "flex-start",
        }}
      >
        {/* Left: map + timeline */}
        <div>
          {/* Map */}
          <div
            style={{
              background: "var(--lp-ink)",
              color: "#FFF",
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              height: 360,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(ellipse 600px 400px at 30% 20%, rgba(15,157,190,0.13), transparent 60%), radial-gradient(ellipse 500px 300px at 80% 80%, rgba(14,107,69,0.13), transparent 60%)`,
              }}
            />
            <svg
              viewBox="0 0 800 360"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <defs>
                <pattern id="trackDots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.10)" />
                </pattern>
              </defs>
              <rect width="800" height="360" fill="url(#trackDots)" />

              {/* Miami */}
              <g transform="translate(150 110)">
                <circle r="6" fill="#0F9DBE" />
                <circle r="14" fill="none" stroke="#0F9DBE" strokeOpacity="0.4" />
              </g>
              <text x="120" y="145" style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600 }} fill="rgba(255,255,255,0.85)">MIAMI · MIA</text>
              <text x="120" y="160" style={{ fontFamily: "monospace", fontSize: 9 }} fill="rgba(255,255,255,0.5)">Bodega CLICK · 25.79°N</text>

              {/* Tegucigalpa */}
              <g transform="translate(620 260)">
                <circle r="6" fill="#FFF" />
                <circle r="14" fill="none" stroke="#FFF" strokeOpacity="0.4" />
              </g>
              <text x="540" y="295" style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600 }} fill="rgba(255,255,255,0.85)">TEGUCIGALPA · TGU</text>
              <text x="540" y="310" style={{ fontFamily: "monospace", fontSize: 9 }} fill="rgba(255,255,255,0.5)">Tu casa · 14.07°N</text>

              {/* Route dashed */}
              <path d="M 150 110 Q 380 30 620 260" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
              {/* Route progress */}
              <path d="M 150 110 Q 380 30 620 260" stroke="#0F9DBE" strokeWidth="2" fill="none" strokeDasharray="220 9999" />

              {/* Plane at midpoint */}
              <g transform="translate(370 70)">
                <circle r="18" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="0" y="5" textAnchor="middle" style={{ fontFamily: "monospace", fontSize: 14 }} fill="#FFF">✈</text>
              </g>
              <rect x="338" y="100" width="64" height="22" rx="11" fill="rgba(7,26,42,0.8)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <text x="370" y="114" textAnchor="middle" style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 600 }} fill="#0F9DBE">4M-7821</text>
            </svg>

            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "#0F9DBE",
                  animation: "lp-pulse-dot 1.6s ease infinite",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.85)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                En vivo
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                padding: "6px 10px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
              }}
            >
              55% del recorrido
            </div>
          </div>

          {/* Horizontal timeline */}
          <div
            style={{
              marginTop: 18,
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
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
                }}
              >
                Línea de tiempo · paso {stage + 1} de {JOURNEY.length}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--lp-ink3)",
                }}
              >
                Próxima actualización en ~14 min
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
              {JOURNEY.map((step, i) => {
                const done = i < stage;
                const active = i === stage;
                return (
                  <div key={step.id} style={{ position: "relative" }}>
                    {i < JOURNEY.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 15,
                          left: "50%",
                          right: "-50%",
                          height: 1.5,
                          background: done ? "var(--lp-accent)" : "var(--lp-line)",
                        }}
                      />
                    )}
                    <div
                      style={{
                        position: "relative",
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        margin: "0 auto 10px",
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
                      {done ? (
                        <Check size={14} strokeWidth={2.4} />
                      ) : (
                        <StepIcon name={step.icon} />
                      )}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: 11.5,
                        fontWeight: active || done ? 600 : 400,
                        color: i > stage ? "var(--lp-ink4)" : "var(--lp-ink)",
                        letterSpacing: "-0.1px",
                      }}
                    >
                      {step.label}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 9.5,
                        color: "var(--lp-ink3)",
                        marginTop: 3,
                        letterSpacing: "0.2px",
                      }}
                    >
                      {step.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: status + items + help */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Status hero */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "var(--lp-accent)",
                fontWeight: 600,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--lp-accent)",
                  animation: "lp-pulse-dot 1.6s ease infinite",
                  display: "inline-block",
                }}
              />
              Paso {stage + 1} de {JOURNEY.length}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.6px",
                lineHeight: 1.2,
              }}
            >
              En tránsito a Honduras.
            </div>
            <div style={{ fontSize: 13, color: "var(--lp-ink3)", marginTop: 6, lineHeight: 1.5 }}>
              Vuelo de carga MIA → SAP. Aterriza hoy en la noche. Mañana sigue con liquidación aduanal.
            </div>

            <div
              style={{
                marginTop: 18,
                padding: "14px 16px",
                background: "var(--lp-paper2)",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <div>
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
                  Llega aprox.
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--lp-ink)",
                    marginTop: 4,
                    letterSpacing: "-0.3px",
                  }}
                >
                  28 may · 11:00
                </div>
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  background: "var(--lp-jade-tint)",
                  color: "var(--lp-jade2)",
                  borderRadius: 4,
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                }}
              >
                A tiempo
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                height: 5,
                background: "var(--lp-line)",
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "55%",
                  height: "100%",
                  background: "var(--lp-accent)",
                  borderRadius: 999,
                  transition: "width 600ms cubic-bezier(0.2,0.7,0.2,1)",
                }}
              />
            </div>
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
                padding: "12px 18px",
                borderBottom: "1px solid var(--lp-line)",
                background: "var(--lp-paper2)",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink2)",
                letterSpacing: "0.4px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              2 productos · 1.5 kg total
            </div>
            {[
              { title: "AirPods Pro 2 · Apple",              merchant: "Apple",  qty: 1 },
              { title: "Cable USB-C a Lightning 2m · Anker",  merchant: "Anker",  qty: 2 },
            ].map((item, i) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 14,
                  borderBottom: i === 0 ? "1px solid var(--lp-line)" : 0,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 5,
                    background: "var(--lp-paper2)",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 9.5,
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
                      fontSize: 12.5,
                      color: "var(--lp-ink)",
                      fontWeight: 500,
                      marginTop: 1,
                      letterSpacing: "-0.1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 11,
                    color: "var(--lp-ink3)",
                  }}
                >
                  ×{item.qty}
                </span>
              </div>
            ))}
          </div>

          {/* Help */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--lp-jade-tint)",
                color: "var(--lp-jade)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Phone size={18} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--lp-ink)", letterSpacing: "-0.1px" }}>
                ¿Algo no va bien?
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--lp-ink3)",
                  marginTop: 2,
                }}
              >
                Soporte por WhatsApp · responde en minutos
              </div>
            </div>
            <ArrowRight size={16} strokeWidth={2} style={{ color: "var(--lp-ink3)" }} />
          </div>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
