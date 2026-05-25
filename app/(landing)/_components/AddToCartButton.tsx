"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import type { SerializedProduct } from "@/lib/serialize";

interface Props {
  product: SerializedProduct;
}

export function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem({
      productId: product.id,
      title: product.title,
      priceHNL: product.priceHNL,
      priceUSD: product.priceUSD,
      qty: 1,
      sourceType: product.sourceType,
      image: product.images[0] ?? `https://picsum.photos/seed/${product.id}/400/400`,
    });
  }

  return (
    <button
      onClick={handleAdd}
      style={{
        flex: 1,
        padding: "14px 22px",
        borderRadius: 6,
        background: "var(--lp-accent)",
        color: "#FFF",
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: "-0.1px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        border: "none",
        cursor: "pointer",
        transition: "background 120ms cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <ShoppingCart size={16} strokeWidth={2} /> Agregar al carrito
    </button>
  );
}
