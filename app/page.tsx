import Link from "next/link";
import {
  Smartphone,
  Home,
  UtensilsCrossed,
  Dumbbell,
  ShoppingBasket,
  Shirt,
  BookOpen,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getFeaturedBySource, getProductsByCategory } from "@/server/queries/product";
import { serializeProducts } from "@/lib/serialize";
import { CategoryRow } from "@/components/product/CategoryRow";
import { ProductGrid } from "@/components/product/ProductGrid";

const CATEGORIES: { label: string; Icon: LucideIcon; href: string }[] = [
  { label: "Electrónica", Icon: Smartphone, href: "/c/Electrónica" },
  { label: "Hogar", Icon: Home, href: "/c/Hogar" },
  { label: "Cocina", Icon: UtensilsCrossed, href: "/c/Cocina" },
  { label: "Deportes", Icon: Dumbbell, href: "/c/Deportes" },
  { label: "Supermercado", Icon: ShoppingBasket, href: "/c/Supermercado" },
  { label: "Ropa", Icon: Shirt, href: "/c/Ropa" },
  { label: "Libros", Icon: BookOpen, href: "/c/Libros" },
  { label: "Belleza", Icon: Sparkles, href: "/c/Belleza" },
];

export default async function HomePage() {
  const [amazonFeatured, localFeatured, electronics] = await Promise.all([
    getFeaturedBySource("AMAZON", 10),
    getFeaturedBySource("LOCAL", 10),
    getProductsByCategory("Electrónica", 6),
  ]);

  return (
    <section className="flex flex-col gap-6 pt-3">
      {/* Editorial hero — no gradients, no decorations */}
      <div className="pb-2 fade-up">
        <p
          className="mb-3 text-[9px] font-bold uppercase"
          style={{ color: "var(--cl-text-muted)", letterSpacing: "0.18em" }}
        >
          Honduras · Beta
        </p>
        <h1
          className="font-extrabold leading-[1.05]"
          style={{
            fontSize: "clamp(2rem, 9vw, 2.75rem)",
            letterSpacing: "-0.045em",
          }}
        >
          <span style={{ color: "var(--cl-text-primary)" }}>Amazon USA</span>
          <br />
          <span style={{ color: "var(--cl-accent)" }}>+ locales.</span>
          <br />
          <span style={{ color: "var(--cl-text-secondary)" }}>Un carrito.</span>
        </h1>
        <p
          className="mt-3 text-xs"
          style={{ color: "var(--cl-text-muted)", letterSpacing: "0.02em" }}
        >
          Tegucigalpa · San Pedro Sula · Entrega hoy
        </p>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map(({ label, Icon, href }, i) => (
          <Link
            key={href}
            href={href}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-all active:scale-95"
            style={{
              background: "var(--cl-surface)",
              border: "1px solid var(--cl-border)",
              color: "var(--cl-text-secondary)",
              animation: `fade-up 0.25s cubic-bezier(0.23,1,0.32,1) ${Math.min(i, 7) * 40}ms both`,
            }}
          >
            <Icon size={13} style={{ color: "var(--cl-text-muted)" }} />
            {label}
          </Link>
        ))}
      </div>

      {/* Amazon imports */}
      <CategoryRow
        source="amazon"
        title="Importaciones"
        products={serializeProducts(amazonFeatured)}
        href="/c/Electrónica"
      />

      {/* Local stores */}
      <CategoryRow
        source="local"
        title="Entrega hoy"
        products={serializeProducts(localFeatured)}
        href="/c/Supermercado"
      />

      {/* Electronics grid */}
      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <p
              className="text-[9px] font-bold uppercase"
              style={{ color: "var(--cl-accent)", letterSpacing: "0.15em" }}
            >
              Amazon
            </p>
            <h2
              className="text-[15px] font-semibold"
              style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}
            >
              Electrónica
            </h2>
          </div>
          <Link
            href="/c/Electrónica"
            className="mb-0.5 flex items-center gap-0.5 text-xs font-medium"
            style={{ color: "var(--cl-accent)" }}
          >
            Ver todo
          </Link>
        </div>
        <ProductGrid products={serializeProducts(electronics)} />
      </section>
    </section>
  );
}
