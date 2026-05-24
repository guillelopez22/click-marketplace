import type { Metadata } from "next";
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
  Baby,
  Droplets,
  FlaskConical,
  Leaf,
  Coffee,
  Beef,
  Apple,
  Wheat,
  ChevronRight,
} from "lucide-react";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Categorías — CLICK" };

const CATEGORY_META: Record<string, { Icon: React.ElementType; color: string }> = {
  Electrónica:        { Icon: Smartphone,      color: "var(--cl-accent)" },
  Hogar:              { Icon: Home,             color: "#8B5CF6" },
  Cocina:             { Icon: UtensilsCrossed,  color: "#F97316" },
  Deportes:           { Icon: Dumbbell,         color: "#EF4444" },
  Supermercado:       { Icon: ShoppingBasket,   color: "var(--cl-success)" },
  Despensa:           { Icon: ShoppingBasket,   color: "var(--cl-success)" },
  Ropa:               { Icon: Shirt,            color: "#EC4899" },
  Libros:             { Icon: BookOpen,         color: "#14B8A6" },
  Belleza:            { Icon: Sparkles,         color: "#F59E0B" },
  Bebé:               { Icon: Baby,             color: "#93C5FD" },
  Lácteos:            { Icon: Droplets,         color: "#A3E635" },
  "Cuidado Personal": { Icon: FlaskConical,     color: "#C084FC" },
  Limpieza:           { Icon: Leaf,             color: "var(--cl-success)" },
  Bebidas:            { Icon: Coffee,           color: "#78716C" },
  Panadería:          { Icon: Wheat,            color: "#D97706" },
  Carnes:             { Icon: Beef,             color: "#DC2626" },
  Frutas:             { Icon: Apple,            color: "#84CC16" },
  Verduras:           { Icon: Leaf,             color: "#22C55E" },
  Granos:             { Icon: Wheat,            color: "#92400E" },
  Deli:               { Icon: UtensilsCrossed,  color: "#FB923C" },
};

export default async function CategoriesPage() {
  const grouped = await db.product.groupBy({
    by: ["category"],
    where: { active: true },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
  });

  return (
    <div className="flex flex-col gap-5 pt-4">
      <div>
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
        >
          Categorías
        </h1>
        <p className="mt-0.5 text-xs" style={{ color: "var(--cl-text-muted)" }}>
          {grouped.reduce((s, g) => s + g._count.id, 0)} productos disponibles
        </p>
      </div>

      <div className="flex flex-col divide-y" style={{ borderColor: "var(--cl-border-subtle)" }}>
        {grouped.map(({ category, _count }, i) => {
          const meta = CATEGORY_META[category] ?? { Icon: ShoppingBasket, color: "var(--cl-text-muted)" };
          const { Icon, color } = meta;
          const href = `/c/${encodeURIComponent(category)}`;

          return (
            <Link
              key={category}
              href={href}
              className="flex items-center gap-4 py-3.5 transition-all active:opacity-70"
              style={{
                animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${Math.min(i, 10) * 30}ms both`,
              }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${color}18` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--cl-text-primary)" }}>
                  {category}
                </p>
                <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                  {_count.id} {_count.id === 1 ? "producto" : "productos"}
                </p>
              </div>
              <ChevronRight size={16} style={{ color: "var(--cl-text-muted)", flexShrink: 0 }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
