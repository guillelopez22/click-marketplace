"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import type { SerializedProduct } from "@/lib/serialize";
import { es } from "@/lib/i18n/es";

function fmtHnl(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

function fmtUsd(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  return `$${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

interface ProductCardProps {
  product: SerializedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const isAmazon = product.sourceType === "AMAZON";
  const outOfStock = product.stock <= 0;
  const imgSrc = product.images[0] ?? `https://picsum.photos/seed/${product.id}/600/600`;
  const etaLabel = isAmazon ? `${product.etaDays}–${product.etaDays + 3} días` : "Hoy";

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (outOfStock || added) return;
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
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <Link
      href={`/p/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl transition-all active:scale-[0.97]"
      style={{
        background: "var(--cl-surface)",
        border: "1px solid var(--cl-border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.45)",
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imgSrc}
          alt={product.title}
          fill
          sizes="(max-width: 480px) 50vw, 240px"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {/* Bottom fade for price readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, rgba(9,9,11,0.55) 0%, transparent 100%)", pointerEvents: "none" }}
        />
        <span
          className="absolute bottom-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
          style={{
            background: isAmazon ? "rgba(29,111,242,0.85)" : "rgba(22,163,74,0.85)",
            color: "#fff",
            backdropFilter: "blur(6px)",
          }}
        >
          {isAmazon ? es.badge.AMAZON : es.badge.LOCAL}
        </span>
        {outOfStock && (
          <div
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{ background: "rgba(9,9,11,0.7)", color: "var(--cl-text-muted)" }}
          >
            {es.product.outOfStock}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p
          className="line-clamp-2 text-[13px] font-medium leading-snug"
          style={{ color: "var(--cl-text-primary)" }}
        >
          {product.title}
        </p>
        <p className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
          {etaLabel}
        </p>
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span
              className="text-[15px] font-bold leading-none"
              style={{ color: "var(--cl-text-primary)" }}
            >
              {fmtHnl(Number(product.priceHNL))}
            </span>
            {product.priceUSD !== null && (
              <span className="text-[11px]" style={{ color: "var(--cl-text-secondary)" }}>
                {fmtUsd(Number(product.priceUSD))}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all active:scale-90 disabled:opacity-40"
            style={{
              background: added ? "var(--cl-success)" : "var(--cl-accent)",
              color: "#fff",
            }}
            aria-label={es.product.addToCart}
          >
            {added ? (
              <Check size={14} />
            ) : (
              <span className="text-base font-bold leading-none">+</span>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl"
      style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
    >
      <div className="aspect-square skeleton" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3.5 w-full skeleton rounded" />
        <div className="h-3 w-2/3 skeleton rounded" />
        <div className="mt-2 h-5 w-1/2 skeleton rounded" />
      </div>
    </div>
  );
}
