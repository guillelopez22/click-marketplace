import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchProducts } from "@/server/queries/product";
import { serializeProducts } from "@/lib/serialize";
import { ProductGrid } from "@/components/product/ProductGrid";
import { es } from "@/lib/i18n/es";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `"${q}" — Búsqueda` : "Buscar" };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const products = query.length >= 2 ? await searchProducts(query) : [];
  const amazon = products.filter((p) => p.sourceType === "AMAZON");
  const local = products.filter((p) => p.sourceType === "LOCAL");

  return (
    <section className="flex flex-col gap-5 pt-4">
      {/* Query header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--cl-text-muted)" }}>
          {es.common.search}
        </p>
        {query ? (
          <>
            <h1
              className="mt-0.5 text-xl font-bold"
              style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
            >
              &ldquo;{query}&rdquo;
            </h1>
            {products.length > 0 && (
              <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                {products.length} resultado{products.length !== 1 ? "s" : ""}
              </p>
            )}
          </>
        ) : (
          <h1 className="mt-0.5 text-xl font-bold" style={{ color: "var(--cl-text-muted)" }}>
            Escribe para buscar
          </h1>
        )}
      </div>

      {/* No results */}
      {query.length >= 2 && products.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "var(--cl-surface-raised)" }}
          >
            <Search size={22} style={{ color: "var(--cl-text-muted)" }} />
          </div>
          <div>
            <p className="font-medium" style={{ color: "var(--cl-text-primary)" }}>
              Sin resultados para &ldquo;{query}&rdquo;
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--cl-text-muted)" }}>
              Prueba con otro término
            </p>
          </div>
          <Link href="/" className="text-sm font-medium" style={{ color: "var(--cl-accent)" }}>
            Explorar productos
          </Link>
        </div>
      )}

      {/* Amazon results */}
      {amazon.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <p
              className="text-[9px] font-bold uppercase"
              style={{ color: "var(--cl-accent)", letterSpacing: "0.15em" }}
            >
              Amazon
            </p>
            <p className="text-sm font-semibold" style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}>
              {amazon.length} resultado{amazon.length !== 1 ? "s" : ""}
            </p>
          </div>
          <ProductGrid products={serializeProducts(amazon)} />
        </div>
      )}

      {/* Local results */}
      {local.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <p
              className="text-[9px] font-bold uppercase"
              style={{ color: "var(--cl-success)", letterSpacing: "0.15em" }}
            >
              Local
            </p>
            <p className="text-sm font-semibold" style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}>
              {local.length} resultado{local.length !== 1 ? "s" : ""}
            </p>
          </div>
          <ProductGrid products={serializeProducts(local)} />
        </div>
      )}
    </section>
  );
}
