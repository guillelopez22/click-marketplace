"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ArrowRight, Download } from "lucide-react";
import { PageCrumb } from "../../_components/PageCrumb";
import { ShopPageHeader } from "../../_components/ShopPageHeader";
import { LandingFooter } from "../../_components/LandingFooter";

const ORDERS = [
  { id: "CLK-94821", date: "19 may 2026", items: 2, eta: "28 may", total: 4283, stage: 2 },
  { id: "CLK-93107", date: "12 may 2026", items: 1, eta: "—",      total: 1820, stage: 5 },
  { id: "CLK-89822", date: "27 abr 2026", items: 1, eta: "—",      total: 2100, stage: 5 },
  { id: "CLK-85540", date: "10 abr 2026", items: 1, eta: "20 abr", total: 2890, stage: 1 },
  { id: "CLK-83200", date: "02 abr 2026", items: 4, eta: "—",      total: 9100, stage: 5 },
];

const STAGE_LABELS = ["Pedido recibido", "En bodega Miami", "En tránsito", "En aduana", "En camino", "Entregado"];

function fmtHNL(n: number): string {
  return `L ${Math.round(n).toLocaleString("en-US")}`;
}

export default function OrdersPage() {
  const [tab, setTab] = useState<"all" | "active" | "done">("all");

  const filtered =
    tab === "active"
      ? ORDERS.filter((o) => o.stage < 5)
      : tab === "done"
      ? ORDERS.filter((o) => o.stage === 5)
      : ORDERS;

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Mi cuenta", href: "/shop/account" },
          { label: "Mis pedidos" },
        ]}
      />
      <ShopPageHeader
        kicker={`${ORDERS.length} pedidos desde marzo 2026`}
        title="Tus pedidos"
        sub={`${ORDERS.filter((o) => o.stage < 5).length} en camino · ${ORDERS.filter((o) => o.stage === 5).length} entregados`}
        actions={
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
            <Download size={13} strokeWidth={2} /> Exportar PDF
          </button>
        }
      />

      {/* Tabs + search */}
      <div
        className="lp-inner-pad"
        style={{
          paddingTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderBottom: "1px solid var(--lp-line)",
          flexWrap: "wrap",
        }}
      >
        {[
          { id: "all",    label: "Todos",      n: ORDERS.length },
          { id: "active", label: "En curso",   n: ORDERS.filter((o) => o.stage < 5).length },
          { id: "done",   label: "Entregados", n: ORDERS.filter((o) => o.stage === 5).length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "all" | "active" | "done")}
            style={{
              padding: "11px 14px",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottom: tab === t.id ? "2px solid var(--lp-ink)" : "2px solid transparent",
              color: tab === t.id ? "var(--lp-ink)" : "var(--lp-ink3)",
              fontSize: 13,
              fontWeight: tab === t.id ? 600 : 400,
              letterSpacing: "-0.1px",
              marginBottom: -1,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            {t.label}
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: tab === t.id ? "var(--lp-ink)" : "var(--lp-ink4)",
                background: tab === t.id ? "var(--lp-paper2)" : "transparent",
                padding: "1px 6px",
                borderRadius: 3,
                fontWeight: 500,
              }}
            >
              {t.n}
            </span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 12px",
            background: "var(--lp-paper2)",
            border: "1px solid var(--lp-line)",
            borderRadius: 6,
            minWidth: 280,
          }}
        >
          <Search size={13} strokeWidth={1.7} style={{ color: "var(--lp-ink3)" }} />
          <input
            placeholder="Buscar por #pedido o producto…"
            style={{
              flex: 1,
              border: 0,
              outline: 0,
              fontSize: 12.5,
              background: "transparent",
              minWidth: 0,
              color: "var(--lp-ink)",
            }}
          />
        </div>
      </div>

      {/* Order cards */}
      <div className="lp-inner-pad" style={{ paddingTop: 24, paddingBottom: 48, display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((o) => {
          const stageLabel = STAGE_LABELS[o.stage] ?? "—";
          const stageColor =
            o.stage === 5
              ? "var(--lp-jade)"
              : o.stage >= 3
              ? "#D97706"
              : o.stage >= 1
              ? "var(--lp-accent)"
              : "var(--lp-ink3)";

          return (
            <div
              key={o.id}
              style={{
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line)",
                borderRadius: 10,
                padding: "18px 22px",
              }}
            >
              <div
                className="lp-orders-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr 1fr 1fr auto",
                  gap: 24,
                  alignItems: "center",
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
                    }}
                  >
                    Pedido
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--lp-ink)",
                      marginTop: 3,
                    }}
                  >
                    {o.id}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 11,
                      color: "var(--lp-ink3)",
                      marginTop: 4,
                    }}
                  >
                    {o.date} · {o.items} producto{o.items === 1 ? "" : "s"} · USA
                  </div>
                </div>

                <div>
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
                    Estado
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 5,
                    }}
                  >
                    <span
                      style={{ width: 6, height: 6, borderRadius: 999, background: stageColor }}
                    />
                    <span
                      style={{ fontSize: 14, fontWeight: 600, color: stageColor, letterSpacing: "-0.1px" }}
                    >
                      {stageLabel}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      height: 3,
                      background: "var(--lp-line)",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${((o.stage + 1) / 6) * 100}%`,
                        height: "100%",
                        background: stageColor,
                        borderRadius: 999,
                      }}
                    />
                  </div>
                </div>

                <div className="lp-hide-m">
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
                    ETA
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--lp-ink)",
                      marginTop: 3,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {o.eta}
                  </div>
                </div>

                <div className="lp-hide-m">
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
                    Total
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--lp-ink)",
                      marginTop: 3,
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {fmtHNL(o.total)}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <Link
                    href={`/shop/orders/${o.id}`}
                    style={{
                      padding: "10px 14px",
                      border: "1px solid var(--lp-line2)",
                      borderRadius: 6,
                      background: "var(--lp-surface)",
                      color: "var(--lp-ink2)",
                      fontSize: 13,
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    Ver detalle
                  </Link>
                  {o.stage < 5 && (
                    <Link
                      href={`/shop/track/${o.id}`}
                      style={{
                        padding: "10px 14px",
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
                      Seguir <ArrowRight size={13} strokeWidth={2.2} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LandingFooter />
    </>
  );
}
