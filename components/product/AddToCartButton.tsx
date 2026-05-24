"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import type { SerializedProduct } from "@/lib/serialize";
import { es } from "@/lib/i18n/es";

export function AddToCartButton({ product }: { product: SerializedProduct }) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.stock <= 0;
  const imgSrc = product.images[0] ?? `https://picsum.photos/seed/${product.id}/600/600`;

  function handleAdd() {
    if (outOfStock) return;
    addItem({
      productId: product.id,
      title: product.title,
      priceHNL: product.priceHNL,
      priceUSD: product.priceUSD,
      qty: 1,
      sourceType: product.sourceType,
      image: imgSrc,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={outOfStock}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-40"
      style={{
        background: added ? "var(--cl-success)" : outOfStock ? "var(--cl-surface-raised)" : "var(--cl-accent)",
        color: outOfStock ? "var(--cl-text-muted)" : "#fff",
        border: outOfStock ? "1px solid var(--cl-border)" : "none",
      }}
    >
      {added ? (
        <>
          <Check size={18} />
          {es.product.addedToCart}
        </>
      ) : outOfStock ? (
        es.product.outOfStock
      ) : (
        es.product.addToCart
      )}
    </button>
  );
}
