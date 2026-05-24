import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import type { SerializedProduct } from "@/lib/serialize";

interface CategoryRowProps {
  products: SerializedProduct[];
  title: string;
  source?: "amazon" | "local";
  href?: string;
}

export function CategoryRow({ products, title, source, href }: CategoryRowProps) {
  if (products.length === 0) return null;

  const accentColor =
    source === "amazon"
      ? "var(--cl-accent)"
      : source === "local"
        ? "var(--cl-success)"
        : "var(--cl-accent)";

  const sourceLabel =
    source === "amazon" ? "Amazon" : source === "local" ? "Local" : null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          {sourceLabel && (
            <p
              className="text-[9px] font-bold uppercase"
              style={{ color: accentColor, letterSpacing: "0.15em" }}
            >
              {sourceLabel}
            </p>
          )}
          <h2
            className="text-[15px] font-semibold"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>
        </div>
        {href && (
          <Link
            href={href}
            className="mb-0.5 flex items-center gap-0.5 text-xs font-medium"
            style={{ color: accentColor }}
          >
            Ver todo
            <ChevronRight size={13} />
          </Link>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {products.map((p) => (
          <div key={p.id} className="w-[164px] shrink-0 sm:w-[184px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
