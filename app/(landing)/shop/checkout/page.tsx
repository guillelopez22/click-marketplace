"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Lock, MapPin, CreditCard } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { PageCrumb } from "../../_components/PageCrumb";
import { LandingFooter } from "../../_components/LandingFooter";

function fmtHNL(n: number): string {
  return `L ${Math.round(n).toLocaleString("en-US")}`;
}

type PayMethod = "card";

export default function CheckoutPage() {
  const [pay, setPay] = useState<PayMethod>("card");
  const { items } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + parseFloat(i.priceHNL) * i.qty, 0);
  const importFee = subtotal * 0.15;
  const deliveryFee = items.length > 0 ? 200 : 0;
  const total = subtotal + importFee + deliveryFee;

  const PAYMENT_OPTIONS: { id: PayMethod; icon: React.ReactNode; label: string; sub: string }[] = [
    { id: "card", icon: <CreditCard size={18} strokeWidth={1.7} />, label: "Tarjeta de crédito/débito", sub: "Visa, Mastercard, American Express" },
  ];

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Carrito", href: "/shop/cart" },
          { label: "Pago" },
        ]}
      />

      {/* Step indicator */}
      <div
        style={{
          padding: "24px 36px 8px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderBottom: "1px solid var(--lp-line)",
        }}
      >
        {[
          { n: 1, label: "Carrito", done: true },
          { n: 2, label: "Pago", active: true },
          { n: 3, label: "Confirmación" },
        ].map((step, i) => (
          <span key={step.n} style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
            {i > 0 && <div style={{ width: 32, height: 1, background: "var(--lp-line)" }} />}
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  background: step.done
                    ? "var(--lp-jade)"
                    : step.active
                    ? "var(--lp-ink)"
                    : "var(--lp-paper2)",
                  color: step.done || step.active ? "#FFF" : "var(--lp-ink3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {step.done ? <Check size={12} strokeWidth={2.6} /> : step.n}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: step.active ? "var(--lp-ink)" : "var(--lp-ink3)",
                  fontWeight: step.active ? 600 : 400,
                  letterSpacing: "-0.1px",
                }}
              >
                {step.label}
              </span>
            </span>
          </span>
        ))}
        <div style={{ flex: 1 }} />
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "var(--lp-jade)",
            fontWeight: 600,
          }}
        >
          <Lock size={12} strokeWidth={1.8} /> Conexión segura · SSL
        </span>
      </div>

      <div className="lp-page-wrap lp-2col">
        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Address */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: 22,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10.5,
                    color: "var(--lp-ink3)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  01 · Dirección de entrega
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "var(--lp-ink)",
                    letterSpacing: "-0.4px",
                    margin: 0,
                  }}
                >
                  ¿A dónde te lo entregamos?
                </h3>
              </div>
              <button
                style={{
                  fontSize: 12.5,
                  color: "var(--lp-accent)",
                  fontWeight: 600,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cambiar
              </button>
            </div>
            <div
              style={{
                padding: "14px 16px",
                background: "var(--lp-paper2)",
                borderRadius: 8,
                border: "1px solid var(--lp-line)",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--lp-surface)",
                  color: "var(--lp-ink)",
                  border: "1px solid var(--lp-line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MapPin size={16} strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--lp-ink)", letterSpacing: "-0.2px" }}>
                  Casa
                </div>
                <div style={{ fontSize: 12.5, color: "var(--lp-ink2)", marginTop: 2 }}>
                  Col. Lomas del Guijarro · Casa #1284 · Tegucigalpa
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10.5,
                    color: "var(--lp-ink3)",
                    marginTop: 4,
                    letterSpacing: "0.2px",
                  }}
                >
                  Portón rojo, dejar con el guardia
                </div>
              </div>
              <span
                style={{
                  padding: "3px 8px",
                  borderRadius: 3,
                  background: "var(--lp-ink)",
                  color: "#FFF",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  textTransform: "uppercase",
                }}
              >
                Principal
              </span>
            </div>
          </div>

          {/* Payment */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: 22,
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
                marginBottom: 4,
              }}
            >
              02 · Método de pago
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.4px",
                margin: "0 0 16px",
              }}
            >
              ¿Cómo pagas?
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PAYMENT_OPTIONS.map((m) => {
                const sel = pay === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPay(m.id)}
                    style={{
                      padding: 16,
                      borderRadius: 8,
                      textAlign: "left",
                      background: sel ? "var(--lp-paper2)" : "transparent",
                      border: `1px solid ${sel ? "var(--lp-ink)" : "var(--lp-line)"}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "var(--lp-surface)",
                        color: "var(--lp-ink)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--lp-line)",
                        flexShrink: 0,
                      }}
                    >
                      {m.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "var(--lp-ink)",
                          letterSpacing: "-0.1px",
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-geist-mono)",
                          fontSize: 11,
                          color: "var(--lp-ink3)",
                          marginTop: 2,
                        }}
                      >
                        {m.sub}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        border: `1.5px solid ${sel ? "var(--lp-ink)" : "var(--lp-line2)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {sel && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: "var(--lp-ink)",
                          }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {pay === "card" && (
              <div
                style={{
                  marginTop: 18,
                  padding: 16,
                  background: "var(--lp-paper)",
                  borderRadius: 8,
                  border: "1px solid var(--lp-line)",
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
                  Datos de tarjeta
                </div>
                {/* Card fields — display only, never submitted to server */}
                <input
                  placeholder="0000 0000 0000 0000"
                  autoComplete="cc-number"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    border: "1px solid var(--lp-line)",
                    borderRadius: 6,
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 13,
                    marginBottom: 10,
                    outline: "none",
                    background: "var(--lp-surface)",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input
                    placeholder="MM / AA"
                    autoComplete="cc-exp"
                    style={{
                      padding: "11px 14px",
                      border: "1px solid var(--lp-line)",
                      borderRadius: 6,
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 13,
                      outline: "none",
                      background: "var(--lp-surface)",
                    }}
                  />
                  <input
                    placeholder="CVV"
                    type="password"
                    autoComplete="cc-csc"
                    style={{
                      padding: "11px 14px",
                      border: "1px solid var(--lp-line)",
                      borderRadius: 6,
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 13,
                      outline: "none",
                      background: "var(--lp-surface)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div
            style={{
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line)",
              borderRadius: 10,
              padding: 22,
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
                marginBottom: 4,
              }}
            >
              03 · Notas (opcional)
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.4px",
                margin: "0 0 14px",
              }}
            >
              ¿Algo más para el repartidor?
            </h3>
            <textarea
              placeholder="Llamar al portón · si no hay nadie dejar con el vecino…"
              style={{
                width: "100%",
                minHeight: 80,
                padding: "12px 14px",
                border: "1px solid var(--lp-line)",
                borderRadius: 6,
                fontFamily: "var(--font-geist-sans)",
                fontSize: 13,
                outline: "none",
                resize: "vertical",
                background: "var(--lp-surface)",
                boxSizing: "border-box",
                color: "var(--lp-ink)",
              }}
            />
          </div>
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
              Resumen
            </div>

            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--lp-line)",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "var(--lp-ink)",
                        lineHeight: 1.3,
                        fontWeight: 500,
                        letterSpacing: "-0.1px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 11,
                        color: "var(--lp-ink3)",
                        marginTop: 3,
                      }}
                    >
                      ×{item.qty} · {fmtHNL(parseFloat(item.priceHNL) * item.qty)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ fontSize: 13, color: "var(--lp-ink3)", marginBottom: 14 }}>
                Carrito vacío
              </div>
            )}

            <div style={{ paddingTop: 12 }}>
              {[
                { l: "Subtotal", v: fmtHNL(subtotal) },
                { l: "Aduana e impuestos", v: fmtHNL(importFee), tone: "jade" },
                { l: "Flete USA → HN", v: items.length > 0 ? "Incluido" : "—", tone: "jade" },
              ].map((row) => (
                <div
                  key={row.l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 0",
                    fontSize: 12.5,
                    color: "var(--lp-ink2)",
                  }}
                >
                  <span>{row.l}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color: row.tone === "jade" ? "var(--lp-jade)" : "var(--lp-ink)",
                      fontWeight: 500,
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
                  borderTop: "1px solid var(--lp-line)",
                  marginTop: 10,
                }}
              >
                <span style={{ fontSize: 15, color: "var(--lp-ink)", fontWeight: 600 }}>
                  Total a pagar
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 22,
                    color: "var(--lp-ink)",
                    fontWeight: 700,
                    letterSpacing: "-0.7px",
                  }}
                >
                  {fmtHNL(total)}
                </span>
              </div>
            </div>

            <Link
              href="/shop/checkout/success/CLK-94821"
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
              <Lock size={14} strokeWidth={2} /> Confirmar y pagar {fmtHNL(total)}
            </Link>

            <div
              style={{
                marginTop: 12,
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink3)",
                letterSpacing: "0.2px",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Al confirmar aceptas los Términos de CLICK
            </div>
          </div>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
