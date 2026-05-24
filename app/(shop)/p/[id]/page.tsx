import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProductById } from "@/server/queries/product";
import { serializeProduct } from "@/lib/serialize";
import { es } from "@/lib/i18n/es";
import { AddToCartButton } from "@/components/product/AddToCartButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return { title: "Producto no encontrado" };
  return { title: product.title };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const raw = await getProductById(id);
  if (!raw) notFound();

  const p = serializeProduct(raw);
  const isAmazon = p.sourceType === "AMAZON";
  const priceHNL = Number(p.priceHNL);
  const priceUSD = p.priceUSD ? Number(p.priceUSD) : null;
  const imgSrc = p.images[0] ?? `https://picsum.photos/seed/${p.id}/600/600`;

  const [intHNL, decHNL] = priceHNL.toFixed(2).split(".");
  const hnlFormatted = `L. ${intHNL.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${decHNL}`;

  const etaLabel = isAmazon ? es.product.etaAmazon(p.etaDays) : es.product.etaLocal;

  return (
    <section className="flex flex-col gap-5 pb-8 pt-4">
      {/* Back nav */}
      <Link
        href="/"
        className="flex h-9 w-9 items-center justify-center rounded-xl self-start"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
      >
        <ChevronLeft size={16} style={{ color: "var(--cl-text-secondary)" }} />
      </Link>

      {/* Product image */}
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
        <Image
          src={imgSrc}
          alt={p.title}
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          className="object-cover"
          priority
        />
        <span
          className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{
            background: isAmazon ? "var(--cl-accent-subtle)" : "var(--cl-success-subtle)",
            color: isAmazon ? "var(--cl-accent)" : "var(--cl-success)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${isAmazon ? "rgba(29,111,242,0.25)" : "rgba(22,163,74,0.25)"}`,
          }}
        >
          {isAmazon ? es.badge.AMAZON : es.badge.LOCAL}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Title + merchant */}
        <div>
          <h1
            className="text-xl font-bold leading-tight"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.025em" }}
          >
            {p.title}
          </h1>
          {p.merchant && (
            <p className="mt-1 text-sm" style={{ color: "var(--cl-text-secondary)" }}>
              Vendido por {p.merchant}
            </p>
          )}
        </div>

        {/* Prices */}
        <div className="flex items-baseline gap-3">
          <span
            className="text-2xl font-bold"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
          >
            {hnlFormatted}
          </span>
          {priceUSD !== null && (
            <span className="text-base" style={{ color: "var(--cl-text-secondary)" }}>
              ${priceUSD.toFixed(2)}
            </span>
          )}
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2">
          <MetaChip label={etaLabel} />
          {p.weightLb !== null && (
            <MetaChip label={`${p.weightLb} lb`} />
          )}
          <MetaChip
            label={p.stock > 0 ? es.product.inStock : es.product.outOfStock}
            highlight={p.stock > 0}
          />
        </div>

        {/* Description */}
        <div
          className="rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: "var(--cl-surface)",
            border: "1px solid var(--cl-border)",
            color: "var(--cl-text-secondary)",
          }}
        >
          {p.description}
        </div>

        {/* Add to cart */}
        <AddToCartButton product={p} />
      </div>
    </section>
  );
}

function MetaChip({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className="rounded-full px-3 py-1.5 text-xs font-medium"
      style={{
        background: highlight ? "var(--cl-success-subtle)" : "var(--cl-surface)",
        border: `1px solid ${highlight ? "rgba(22,163,74,0.25)" : "var(--cl-border)"}`,
        color: highlight ? "var(--cl-success)" : "var(--cl-text-secondary)",
      }}
    >
      {label}
    </span>
  );
}
