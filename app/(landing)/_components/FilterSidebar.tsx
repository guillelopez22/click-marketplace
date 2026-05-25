function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--lp-line)" }}>
      <div
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 10.5,
          color: "var(--lp-ink3)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

const ORIGINS = [
  { label: "Todos", v: 60, checked: true },
  { label: "Importado USA", v: 60 },
];

const BRANDS = ["Anker", "Apple", "Stanley", "Logitech", "Dyson", "Kindle", "Crocs", "Lodge", "+12 más"];
const ETAS = ["Hoy", "1–3 días", "4–7 días", "8–14 días"];

export function FilterSidebar() {
  return (
    <aside className="lp-hide-m" style={{ width: 240, flexShrink: 0, padding: "8px 0" }}>
      <Section title="Origen">
        {ORIGINS.map((o) => (
          <label
            key={o.label}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              defaultChecked={o.checked}
              style={{ accentColor: "var(--lp-accent)" }}
            />
            <span style={{ flex: 1, fontSize: 13, color: "var(--lp-ink2)", letterSpacing: "-0.1px" }}>
              {o.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10.5,
                color: "var(--lp-ink4)",
              }}
            >
              {o.v}
            </span>
          </label>
        ))}
      </Section>

      <Section title="Precio (Lempiras)">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            placeholder="Mínimo"
            style={{
              flex: 1,
              padding: "7px 10px",
              fontSize: 12,
              border: "1px solid var(--lp-line)",
              borderRadius: 5,
              fontFamily: "var(--font-geist-mono)",
              color: "var(--lp-ink)",
              background: "var(--lp-paper)",
              outline: "none",
            }}
          />
          <span style={{ color: "var(--lp-ink3)" }}>–</span>
          <input
            placeholder="Máximo"
            style={{
              flex: 1,
              padding: "7px 10px",
              fontSize: 12,
              border: "1px solid var(--lp-line)",
              borderRadius: 5,
              fontFamily: "var(--font-geist-mono)",
              color: "var(--lp-ink)",
              background: "var(--lp-paper)",
              outline: "none",
            }}
          />
        </div>
      </Section>

      <Section title="Marca">
        {BRANDS.map((b) => (
          <label
            key={b}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer" }}
          >
            <input type="checkbox" style={{ accentColor: "var(--lp-accent)" }} />
            <span style={{ fontSize: 13, color: "var(--lp-ink2)", letterSpacing: "-0.1px" }}>{b}</span>
          </label>
        ))}
      </Section>

      <Section title="Llega en">
        {ETAS.map((e) => (
          <label
            key={e}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", cursor: "pointer" }}
          >
            <input type="checkbox" style={{ accentColor: "var(--lp-accent)" }} />
            <span style={{ fontSize: 13, color: "var(--lp-ink2)", letterSpacing: "-0.1px" }}>{e}</span>
          </label>
        ))}
      </Section>
    </aside>
  );
}
