import Link from "next/link";
import {
  Home,
  Package,
  MapPin,
  CreditCard,
  Heart,
  Bell,
  Shield,
  Settings,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { PageCrumb } from "../../_components/PageCrumb";
import { ShopPageHeader } from "../../_components/ShopPageHeader";
import { LandingFooter } from "../../_components/LandingFooter";

const MOCK_ORDERS = [
  { id: "CLK-94821", date: "19 may 2026", items: 2, status: "En tránsito",  total: "L 4,283", stage: 2 },
  { id: "CLK-93107", date: "12 may 2026", items: 1, status: "Entregado",    total: "L 1,820", stage: 5 },
  { id: "CLK-91440", date: "04 may 2026", items: 3, status: "Entregado",    total: "L 6,540", stage: 5 },
  { id: "CLK-89822", date: "27 abr 2026", items: 1, status: "Entregado",    total: "L 2,100", stage: 5 },
  { id: "CLK-88011", date: "18 abr 2026", items: 2, status: "Entregado",    total: "L 3,670", stage: 5 },
];

const NAV_ITEMS = [
  { icon: Home,       label: "Resumen",         active: true },
  { icon: Package,    label: "Mis pedidos",     count: 12,  href: "/shop/orders" },
  { icon: MapPin,     label: "Direcciones",     count: 2 },
  { icon: CreditCard, label: "Métodos de pago", count: 3 },
  { icon: Heart,      label: "Favoritos",       count: 14 },
  { icon: Bell,       label: "Notificaciones" },
  { icon: Shield,     label: "Privacidad" },
  { icon: Settings,   label: "Preferencias" },
  { icon: LogOut,     label: "Cerrar sesión",   danger: true },
];

export default function AccountPage() {
  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi cuenta" },
        ]}
      />
      <ShopPageHeader
        kicker="Hola, Daniela"
        title="Tu cuenta CLICK"
        sub="Pedidos, direcciones, pagos y preferencias."
      />

      <div className="lp-page-wrap lp-acct">
        {/* Side nav */}
        <aside>
          <div
            style={{
              padding: 18,
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: "var(--lp-accent)",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-geist-mono)",
                fontSize: 14,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              DM
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--lp-ink)",
                  letterSpacing: "-0.1px",
                }}
              >
                Daniela Murillo
              </div>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "var(--lp-ink3)",
                  marginTop: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                daniela@correo.hn
              </div>
            </div>
          </div>

          {NAV_ITEMS.map((it) => {
            const Icon = it.icon;
            const content = (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  width: "100%",
                  background: it.active ? "var(--lp-paper2)" : "transparent",
                  borderRadius: 6,
                  color: it.danger ? "#E63946" : it.active ? "var(--lp-ink)" : "var(--lp-ink2)",
                  fontSize: 13.5,
                  fontWeight: it.active ? 600 : 400,
                  letterSpacing: "-0.1px",
                  marginBottom: 2,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <Icon size={15} strokeWidth={it.active ? 2 : 1.7} />
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.count !== undefined && (
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 10.5,
                      color: "var(--lp-ink3)",
                      background: "var(--lp-paper2)",
                      padding: "1px 6px",
                      borderRadius: 3,
                    }}
                  >
                    {it.count}
                  </span>
                )}
                {it.active && (
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--lp-accent)",
                    }}
                  />
                )}
              </span>
            );

            return it.href ? (
              <Link key={it.label} href={it.href} style={{ display: "block", textDecoration: "none" }}>
                {content}
              </Link>
            ) : (
              <div key={it.label} style={{ display: "block" }}>
                {content}
              </div>
            );
          })}
        </aside>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {[
              { l: "Pedidos totales",  v: "12",       s: "Desde marzo" },
              { l: "Gastado en CLICK", v: "L 32,840", s: "Últimos 12 meses" },
              { l: "En camino",        v: "2",        s: "TGU + Miami", accent: true },
            ].map((stat) => (
              <div
                key={stat.l}
                style={{
                  padding: "18px 20px",
                  background: "var(--lp-surface)",
                  border: "1px solid var(--lp-line)",
                  borderRadius: 10,
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
                  {stat.l}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 28,
                    fontWeight: 600,
                    color: stat.accent ? "var(--lp-accent)" : "var(--lp-ink)",
                    letterSpacing: "-1px",
                    marginTop: 6,
                    lineHeight: 1,
                  }}
                >
                  {stat.v}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 11,
                    color: "var(--lp-ink3)",
                    marginTop: 6,
                  }}
                >
                  {stat.s}
                </div>
              </div>
            ))}
          </div>

          {/* Active order */}
          <div
            style={{
              padding: 20,
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
                backgroundImage:
                  "radial-gradient(ellipse 400px 200px at 100% 0%, rgba(15,157,190,0.2), transparent 60%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 24,
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10.5,
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Pedido en curso · CLK-94821
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: "#FFF", letterSpacing: "-0.5px" }}>
                  En tránsito a Honduras
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
                  Vuelo 4M-7821 · ETA próxima semana
                </div>
                <div
                  style={{
                    marginTop: 14,
                    height: 4,
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 999,
                    overflow: "hidden",
                    maxWidth: 360,
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      background: "var(--lp-accent)",
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
              <Link
                href="/shop/track/CLK-94821"
                style={{
                  padding: "12px 22px",
                  borderRadius: 6,
                  background: "#FFF",
                  color: "var(--lp-ink)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Ver tracking <ArrowRight size={14} strokeWidth={2.2} />
              </Link>
            </div>
          </div>

          {/* Recent orders */}
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: "1px solid var(--lp-line)",
                background: "var(--lp-paper2)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--lp-ink2)",
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                }}
              >
                Pedidos recientes
              </span>
              <Link
                href="/shop/orders"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--lp-ink2)",
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  textDecoration: "none",
                }}
              >
                Ver todos
              </Link>
            </div>
            {MOCK_ORDERS.map((order, i) => {
              const stageColor =
                order.stage === 5
                  ? "var(--lp-jade)"
                  : order.stage >= 2
                  ? "var(--lp-accent)"
                  : "var(--lp-ink3)";
              return (
                <div
                  key={order.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 1fr auto",
                    gap: 24,
                    alignItems: "center",
                    padding: "14px 18px",
                    borderBottom: i < MOCK_ORDERS.length - 1 ? "1px solid var(--lp-line)" : 0,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--lp-ink)",
                      }}
                    >
                      {order.id}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 10.5,
                        color: "var(--lp-ink3)",
                        marginTop: 2,
                      }}
                    >
                      {order.date} · {order.items} prod.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 999,
                        background: stageColor,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: stageColor,
                        letterSpacing: "-0.1px",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--lp-ink)",
                    }}
                  >
                    {order.total}
                  </div>
                  <div />
                  <Link
                    href={`/shop/orders/${order.id}`}
                    style={{
                      padding: "7px 12px",
                      border: "1px solid var(--lp-line2)",
                      borderRadius: 5,
                      background: "var(--lp-surface)",
                      color: "var(--lp-ink2)",
                      fontSize: 12,
                      fontWeight: 500,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Ver detalle
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
