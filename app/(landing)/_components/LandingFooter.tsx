const FOOTER_COLS = [
  {
    h: "Comprar",
    items: [
      "Amazon USA",
      "Tecnología",
      "Hogar",
      "Belleza",
      "Deportes",
      "Ofertas del día",
    ],
  },
  {
    h: "Operaciones",
    items: [
      "Cómo funciona",
      "Bodega Miami",
      "Vuelos de carga",
      "Aduana e impuestos",
      "Cobertura",
      "Para empresas",
    ],
  },
  {
    h: "Soporte",
    items: [
      "Centro de ayuda",
      "WhatsApp",
      "Reembolsos",
      "Estado del pedido",
      "Política de envíos",
    ],
  },
  {
    h: "Compañía",
    items: ["Sobre CLICK", "Empleo", "Inversionistas", "Prensa", "Términos", "Privacidad"],
  },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "Amex", "BAC"];

export function LandingFooter() {
  return (
    <footer
      style={{
        background: "var(--lp-ink)",
        color: "#FFF",
        padding: "64px 0 32px",
        borderTop: "1px solid var(--lp-line)",
      }}
    >
      <div className="lp-inner-pad" style={{ maxWidth: 1360, margin: "0 auto" }}>
        <div
          className="lp-footer-cols"
          style={{
            paddingBottom: 48,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Brand column */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "-0.6px",
                color: "#FFF",
                display: "inline-flex",
                alignItems: "baseline",
              }}
            >
              CLICK
              <span style={{ color: "var(--lp-accent)", marginLeft: 1 }}>.</span>
            </span>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.6,
                marginTop: 16,
                maxWidth: 360,
              }}
            >
              La forma más fácil de comprar en Amazon USA y recibir en Honduras. Aduana incluida.
              Sin sorpresas. En 7–14 días.
            </p>
            <div style={{ marginTop: 24 }}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Newsletter semanal
              </div>
              <div style={{ display: "flex", maxWidth: 320 }}>
                <input
                  placeholder="tu@correo.hn"
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    background: "rgba(255,255,255,0.05)",
                    color: "#FFF",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRight: 0,
                    borderRadius: "6px 0 0 6px",
                    fontSize: 13,
                    outline: "none",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                />
                <button
                  style={{
                    padding: "0 16px",
                    background: "var(--lp-accent)",
                    color: "#FFF",
                    border: 0,
                    borderRadius: "0 6px 6px 0",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.2px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "var(--font-geist-mono)",
                  }}
                >
                  Suscribir
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.h}>
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                {col.h}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {col.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", textDecoration: "none" }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.3px",
            }}
          >
            <span>Hecho con orgullo en Tegucigalpa</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <span>© 2026 CLICK Honduras S.A.</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
            <span>RTN 08019999-001</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10.5,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.3px",
            }}
          >
            <span>Aceptamos</span>
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m}
                style={{
                  padding: "3px 8px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 4,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
