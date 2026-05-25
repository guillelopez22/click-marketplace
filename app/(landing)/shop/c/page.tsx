import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageCrumb } from "../../_components/PageCrumb";
import { ShopPageHeader } from "../../_components/ShopPageHeader";
import { LandingFooter } from "../../_components/LandingFooter";

const CATEGORIES = [
  { slug: "Electrónica",  label: "Importados USA",    sub: "Todo Amazon · llega 7-14 días", bg: "#14171E", count: "+60,000" },
  { slug: "Electrónica",  label: "Tecnología",        sub: "iPhone, audio, gaming",          bg: "#1F2329", count: "4,820" },
  { slug: "Hogar",        label: "Hogar & Deco",      sub: "Muebles, cocina, baño",          bg: "#3A352C", count: "8,140" },
  { slug: "Belleza",      label: "Belleza",           sub: "Maquillaje, skincare",           bg: "#7A1F4F", count: "3,200" },
  { slug: "Bebés",        label: "Bebés & niños",     sub: "Pañales, ropa, juguetes",        bg: "#0F5E52", count: "2,180" },
  { slug: "Ofertas",      label: "Ofertas del día",   sub: "Hasta −28% hoy",                bg: "#E63946", count: "128" },
  { slug: "Oficina",      label: "Oficina",           sub: "Útiles, mobiliario",             bg: "#5C6470", count: "1,100" },
  { slug: "Salud",        label: "Salud",             sub: "Vitaminas, suplementos",         bg: "#0F7A5E", count: "660" },
  { slug: "Ropa",         label: "Ropa & Accesorios", sub: "Moda, calzado, bolsos",          bg: "#4A2060", count: "2,800" },
];

export default function CategoriesPage() {
  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías" },
        ]}
      />
      <ShopPageHeader
        kicker={`${CATEGORIES.length} categorías · 60,000+ productos`}
        title="Todo lo que puedes pedir"
        sub="Importado de Amazon USA — todo a tu puerta en Tegucigalpa o San Pedro Sula."
      />

      <div
        style={{
          padding: "32px 36px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
        }}
      >
        {CATEGORIES.map((cat) => (
          <Link
            key={`${cat.slug}-${cat.label}`}
            href={`/shop/c/${encodeURIComponent(cat.slug)}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                background: cat.bg,
                borderRadius: 10,
                padding: "24px 22px",
                height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 150ms cubic-bezier(0.23,1,0.32,1), box-shadow 150ms",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 10.5,
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {cat.count} productos
              </div>
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#FFF",
                    letterSpacing: "-0.6px",
                    marginBottom: 4,
                  }}
                >
                  {cat.label}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.4,
                  }}
                >
                  {cat.sub}
                </div>
                <div
                  style={{
                    marginTop: 14,
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 11,
                    color: "#FFF",
                    fontWeight: 600,
                    letterSpacing: "0.4px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  Explorar <ArrowRight size={11} strokeWidth={2.2} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <LandingFooter />
    </>
  );
}
