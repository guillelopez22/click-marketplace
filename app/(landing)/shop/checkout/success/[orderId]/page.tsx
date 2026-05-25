import Link from "next/link";
import { Check, Sparkles, ArrowRight, Download } from "lucide-react";
import { LandingFooter } from "../../../../_components/LandingFooter";

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function SuccessPage({ params }: Props) {
  const { orderId } = await params;

  const deliveryDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString("es-HN", { weekday: "short", day: "numeric", month: "short" });
  })();

  return (
    <>
      <div
        style={{
          padding: "48px 36px 80px",
          maxWidth: 880,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse 600px 400px at 50% 0%, rgba(15,157,190,0.07), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 999,
            background: "var(--lp-jade-tint)",
            color: "var(--lp-jade)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Check size={44} strokeWidth={2.4} />
        </div>

        <h1
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "var(--lp-ink)",
            letterSpacing: "-1.5px",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          ¡Listo! Tu pedido
          <br />
          va en camino.
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "var(--lp-ink3)",
            lineHeight: 1.55,
            margin: "20px auto 36px",
            maxWidth: 520,
          }}
        >
          Te enviaremos cada actualización por WhatsApp. Puedes seguirlo en vivo desde tu cuenta.
        </p>

        {/* Order card */}
        <div
          style={{
            background: "var(--lp-surface)",
            border: "1px solid var(--lp-line)",
            borderRadius: 12,
            padding: "28px 32px",
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 80px",
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
              Número de pedido
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 22,
                fontWeight: 600,
                color: "var(--lp-ink)",
                letterSpacing: "-0.6px",
                marginTop: 4,
              }}
            >
              {orderId}
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
              Entrega estimada
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--lp-ink)",
                marginTop: 4,
                letterSpacing: "-0.2px",
              }}
            >
              {deliveryDate}
            </div>
            <div
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 11,
                color: "var(--lp-ink3)",
                marginTop: 2,
              }}
            >
              vía bodega Miami
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
                marginTop: 4,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                background: "var(--lp-jade-tint)",
                color: "var(--lp-jade)",
                borderRadius: 4,
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
              Confirmado
            </div>
          </div>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 8,
              background: "var(--lp-paper2)",
              color: "var(--lp-ink3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            QR
          </div>
        </div>

        {/* Track CTA */}
        <div
          style={{
            marginTop: 28,
            padding: "20px 24px",
            background: "var(--lp-ink)",
            color: "#FFF",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            gap: 14,
            textAlign: "left",
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
          <Sparkles size={22} strokeWidth={1.8} style={{ color: "var(--lp-accent)", flexShrink: 0, position: "relative" }} />
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#FFF", letterSpacing: "-0.2px" }}>
              Síguelo paso a paso.
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", lineHeight: 1.45, marginTop: 3 }}>
              Sabrás el momento exacto en que llegue a la bodega Miami, despegue, pase aduana y salga a tu casa.
            </div>
          </div>
          <Link
            href={`/shop/track/${orderId}`}
            style={{
              padding: "10px 18px",
              borderRadius: 6,
              background: "var(--lp-accent)",
              color: "#FFF",
              fontSize: 13,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              position: "relative",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Ver seguimiento <ArrowRight size={13} strokeWidth={2.2} />
          </Link>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 28, display: "flex", gap: 10, justifyContent: "center" }}>
          <Link
            href="/shop/c"
            style={{
              padding: "12px 22px",
              borderRadius: 6,
              background: "transparent",
              color: "var(--lp-ink2)",
              fontSize: 13.5,
              fontWeight: 500,
              border: "1px solid var(--lp-line2)",
              textDecoration: "none",
            }}
          >
            Seguir comprando
          </Link>
          <button
            style={{
              padding: "12px 22px",
              borderRadius: 6,
              background: "var(--lp-surface)",
              border: "1px solid var(--lp-line2)",
              color: "var(--lp-ink2)",
              fontSize: 13.5,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
            }}
          >
            <Download size={13} strokeWidth={2} /> Descargar factura
          </button>
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
