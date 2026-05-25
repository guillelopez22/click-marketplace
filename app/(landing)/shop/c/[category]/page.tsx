import { ChevronDown } from "lucide-react";
import { getProductsByCategory } from "@/server/queries/product";
import { serializeProducts } from "@/lib/serialize";
import { PageCrumb } from "../../../_components/PageCrumb";
import { ShopPageHeader } from "../../../_components/ShopPageHeader";
import { FilterSidebar } from "../../../_components/FilterSidebar";
import { MarketplaceCard } from "../../../_components/MarketplaceCard";
import { LandingFooter } from "../../../_components/LandingFooter";

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const raw = await getProductsByCategory(decoded, 40);
  const products = serializeProducts(raw);
  const isImport = decoded === "Electrónica" || decoded === "amazon";

  return (
    <>
      <PageCrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Categorías", href: "/shop/c" },
          { label: decoded },
        ]}
      />
      <ShopPageHeader
        kicker={isImport ? "Importado desde USA" : "Categoría"}
        title={decoded}
        sub={`${products.length} producto${products.length !== 1 ? "s" : ""} disponibles · ${
          isImport ? "llega en 7–14 días" : "stock disponible"
        }`}
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
            Más populares <ChevronDown size={12} strokeWidth={2} />
          </button>
        }
      />

      <div className="lp-page-wrap lp-sidebar">
        <FilterSidebar />
        <div>
          {products.length > 0 ? (
            <div className="lp-4col">
              {products.map((p) => (
                <MarketplaceCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--lp-ink3)" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "var(--lp-ink2)" }}>
                No hay productos en esta categoría aún
              </div>
            </div>
          )}
        </div>
      </div>

      <LandingFooter />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  return { title: `${decodeURIComponent(category)} — CLICK Shop` };
}
