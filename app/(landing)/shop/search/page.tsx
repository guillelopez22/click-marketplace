import { ChevronDown } from "lucide-react";
import { searchProducts } from "@/server/queries/product";
import { serializeProducts } from "@/lib/serialize";
import { PageCrumb } from "../../_components/PageCrumb";
import { ShopPageHeader } from "../../_components/ShopPageHeader";
import { FilterSidebar } from "../../_components/FilterSidebar";
import { MarketplaceCard } from "../../_components/MarketplaceCard";
import { LandingFooter } from "../../_components/LandingFooter";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const raw = query ? await searchProducts(query) : [];
  const products = serializeProducts(raw);
  const amazon = products.filter((p) => p.sourceType === "AMAZON");

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Buscar" },
        ]}
      />
      <ShopPageHeader
        kicker={`${products.length} resultado${products.length !== 1 ? "s" : ""}`}
        title={
          query ? (
            <>
              Resultados para &ldquo;
              <span style={{ color: "var(--lp-accent)" }}>{query}</span>
              &rdquo;
            </>
          ) : (
            "Buscar productos"
          )
        }
        sub={
          query && products.length > 0
            ? `${amazon.length} resultado${amazon.length !== 1 ? "s" : ""} de Amazon USA`
            : query
            ? "No encontramos productos con ese nombre"
            : "Escribe algo en la barra de búsqueda para comenzar"
        }
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
            Ordenar · Relevancia <ChevronDown size={12} strokeWidth={2} />
          </button>
        }
      />

      <div className="lp-page-wrap lp-sidebar">
        <FilterSidebar />
        <div>
          {products.length > 0 ? (
            <div className="lp-4col">
              {products.slice(0, 16).map((p) => (
                <MarketplaceCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "var(--lp-ink3)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 48,
                  marginBottom: 16,
                  opacity: 0.3,
                }}
              >
                ○
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "var(--lp-ink2)" }}>
                {query ? "Sin resultados para esa búsqueda" : "Escribe para buscar"}
              </div>
              <div style={{ fontSize: 13, marginTop: 8 }}>
                {query ? "Prueba con otro término o explora las categorías" : ""}
              </div>
            </div>
          )}
        </div>
      </div>

      <LandingFooter />
    </>
  );
}
