"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Shield, ArrowRight, Plane } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { PageCrumb } from "../../_components/PageCrumb";
import { LandingFooter } from "../../_components/LandingFooter";

function fmtHNL(n: number): string {
  return `L ${Math.round(n).toLocaleString("en-US")}`;
}

export default function CartPage() {
  const { items, removeItem, updateQty } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + parseFloat(i.priceHNL) * i.qty, 0);
  const importFee = subtotal * 0.15;
  const deliveryFee = items.length > 0 ? 200 : 0;
  const total = subtotal + importFee + deliveryFee;

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Carrito" },
        ]}
      />

      <div
        style={{
          padding: "8px 36px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
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
              marginBottom: 8,
            }}
          >
            {items.length} producto{items.length !== 1 ? "s" : ""} en el carrito
          </div>
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
            Tu carrito
          </h1>
        </div>
      </div>

      <div className="lp-page-wrap lp-2col">
        {/* Line items */}
        <div>
          {items.length === 0 ? (
            <div
              style={{
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line)",
                borderRadius: 10,
                padding: "64px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 500, color: "var(--lp-ink2)", marginBottom: 8 }}>
                Tu carrito está vacío
              </div>
              <div style={{ fontSize: 13, color: "var(--lp-ink3)", marginBottom: 24 }}>
                Agrega productos para comenzar a comprar
              </div>
              <Link
                href="/shop/c"
                style={{
                  padding: "12px 24px",
                  background: "var(--lp-ink)",
                  color: "#FFF",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Ver categorías
              </Link>
            </div>
          ) : (
            <div
              style={{
                background: "var(--lp-surface)",
                border: "1px solid var(--lp-line)",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {items.map((item, i) => {
                const lineTotal = parseFloat(item.priceHNL) * item.qty;
                return (
                  <div
                    key={item.productId}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "88px 1fr auto auto auto",
                      gap: 18,
                      alignItems: "center",
                      padding: 18,
                      borderBottom: i < items.length - 1 ? "1px solid var(--lp-line)" : 0,
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: 6,
                        overflow: "hidden",
                        position: "relative",
                        background: "var(--lp-paper)",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 10,
                          color: "var(--lp-ink3)",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        Amazon{" "}
                        <span style={{ color: "var(--lp-accent)" }}>· USA</span>
                      </div>
                      <div
                        style={{
                          fontSize: 14.5,
                          color: "var(--lp-ink)",
                          fontWeight: 500,
                          letterSpacing: "-0.2px",
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 11.5,
                          color: "var(--lp-ink3)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Plane size={10} strokeWidth={1.8} style={{ color: "var(--lp-accent)" }} />
                        7–14 días · vía Miami
                      </div>
                    </div>

                    {/* Qty */}
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
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        style={{
                          padding: "8px 10px",
                          color: "var(--lp-ink2)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Minus size={12} strokeWidth={2} />
                      </button>
                      <div
                        style={{
                          minWidth: 30,
                          textAlign: "center",
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 13,
                          color: "var(--lp-ink)",
                          fontWeight: 500,
                        }}
                      >
                        {item.qty}
                      </div>
                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        style={{
                          padding: "8px 10px",
                          color: "var(--lp-ink2)",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Plus size={12} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Line total */}
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--lp-ink)",
                        letterSpacing: "-0.4px",
                        textAlign: "right",
                        minWidth: 90,
                      }}
                    >
                      {fmtHNL(lineTotal)}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      style={{
                        padding: 6,
                        color: "var(--lp-ink3)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <X size={16} strokeWidth={1.7} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: 22,
              position: "sticky",
              top: 200,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.3px",
                margin: "0 0 16px",
              }}
            >
              Resumen del pedido
            </h3>

            {[
              { l: "Subtotal", v: fmtHNL(subtotal) },
              {
                l: "Aduana e impuestos",
                v: importFee > 0 ? fmtHNL(importFee) : "—",
                tone: "jade",
                hint: importFee > 0 ? "incluido" : undefined,
              },
              {
                l: "Envío",
                v: deliveryFee > 0 ? fmtHNL(deliveryFee) : "Gratis",
                tone: deliveryFee > 0 ? "ink" : "jade",
              },
              {
                l: "Flete USA → Honduras",
                v: items.length > 0 ? "Incluido" : "—",
                tone: "jade",
              },
            ].map((row) => (
              <div
                key={row.l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "8px 0",
                  borderBottom: "1px dashed var(--lp-line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 13, color: "var(--lp-ink2)" }}>{row.l}</span>
                  {row.hint && (
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 9.5,
                        color: "var(--lp-ink4)",
                        letterSpacing: "0.4px",
                      }}
                    >
                      {row.hint}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 13,
                    color: row.tone === "jade" ? "var(--lp-jade)" : "var(--lp-ink)",
                    fontWeight: 600,
                  }}
                >
                  {row.v}
                </span>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "14px 0 8px",
              }}
            >
              <span style={{ fontSize: 16, color: "var(--lp-ink)", fontWeight: 600 }}>Total</span>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 24,
                  color: "var(--lp-ink)",
                  fontWeight: 700,
                  letterSpacing: "-0.7px",
                }}
              >
                {fmtHNL(total)}
              </span>
            </div>

            <Link
              href="/shop/checkout"
              style={{
                marginTop: 14,
                display: "flex",
                width: "100%",
                padding: "14px 18px",
                borderRadius: 6,
                background: "var(--lp-ink)",
                color: "#FFF",
                fontSize: 14.5,
                fontWeight: 600,
                letterSpacing: "-0.1px",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              Proceder al pago <ArrowRight size={15} strokeWidth={2.2} />
            </Link>

            <div
              style={{
                marginTop: 14,
                padding: "12px 14px",
                background: "var(--lp-jade-tint)",
                color: "var(--lp-jade2)",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Shield size={16} strokeWidth={1.8} style={{ color: "var(--lp-jade)" }} />
              <span style={{ fontSize: 12, lineHeight: 1.45 }}>
                Sin sorpresas. Lo que ves es lo que pagas — aduana e impuestos incluidos.
              </span>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
