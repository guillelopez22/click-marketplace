import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import type { SerializedProduct } from "@/lib/serialize";

interface ProductGridProps {
  products: SerializedProduct[];
  skeletonCount?: number;
}

export function ProductGrid({ products, skeletonCount = 6 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((p, i) => (
        <div
          key={p.id}
          style={{
            animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${Math.min(i, 7) * 45}ms both`,
          }}
        >
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
