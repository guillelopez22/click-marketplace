import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProductsByCategory } from "@/server/queries/product";
import { serializeProducts } from "@/lib/serialize";
import { ProductGrid } from "@/components/product/ProductGrid";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return { title: decodeURIComponent(category) };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const label = decodeURIComponent(category);
  const products = await getProductsByCategory(label, 40);

  if (products.length === 0) notFound();

  const serialized = serializeProducts(products);
  const amazonCount = products.filter((p) => p.sourceType === "AMAZON").length;
  const localCount = products.filter((p) => p.sourceType === "LOCAL").length;

  return (
    <section className="flex flex-col gap-4 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <ChevronLeft size={16} style={{ color: "var(--cl-text-secondary)" }} />
        </Link>
        <div className="flex-1">
          <h1
            className="text-lg font-bold leading-tight"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.025em" }}
          >
            {label}
          </h1>
          <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
            {products.length} producto{products.length !== 1 ? "s" : ""}
            {amazonCount > 0 && localCount > 0
              ? ` · ${amazonCount} Amazon · ${localCount} local`
              : null}
          </p>
        </div>
      </div>

      <ProductGrid products={serialized} />
    </section>
  );
}
