import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Productos — Admin" };

function fmtHNL(val: { toFixed: (n: number) => string }): string {
  const [int, dec] = val.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: [{ sourceType: "asc" }, { category: "asc" }],
    select: {
      id: true,
      title: true,
      category: true,
      sourceType: true,
      priceHNL: true,
      stock: true,
      active: true,
      images: true,
    },
  });

  const amazon = products.filter((p) => p.sourceType === "AMAZON");
  const local = products.filter((p) => p.sourceType === "LOCAL");

  return (
    <div className="flex flex-col gap-5 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold" style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}>
          Productos{" "}
          <span className="text-sm font-normal" style={{ color: "var(--cl-text-muted)" }}>
            ({products.length})
          </span>
        </h1>
        <div className="flex gap-2">
          <span className="rounded-md px-2 py-1 text-[10px] font-semibold" style={{ background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" }}>
            {amazon.length} Amazon
          </span>
          <span className="rounded-md px-2 py-1 text-[10px] font-semibold" style={{ background: "var(--cl-success-subtle)", color: "var(--cl-success)" }}>
            {local.length} Local
          </span>
        </div>
      </div>

      {[
        { label: "Amazon USA", items: amazon, isAmazon: true },
        { label: "Tiendas Locales", items: local, isAmazon: false },
      ].map(({ label, items, isAmazon }) => (
        <div key={label} className="flex flex-col gap-3">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: isAmazon ? "var(--cl-accent)" : "var(--cl-success)" }}
          >
            {label}
          </h2>
          <div className="flex flex-col gap-2">
            {items.map((p, i) => {
              const img = p.images[0] ?? `https://picsum.photos/seed/${p.id}/80/80`;
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-xl p-3"
                  style={{
                    background: "var(--cl-surface)",
                    border: "1px solid var(--cl-border)",
                    animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${i * 20}ms both`,
                    opacity: p.active ? 1 : 0.45,
                  }}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg" style={{ background: "var(--cl-surface-raised)" }}>
                    <Image src={img} alt={p.title} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <p className="truncate text-xs font-medium" style={{ color: "var(--cl-text-primary)" }}>
                      {p.title}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
                      {p.category}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <p className="text-xs font-bold tabular-nums" style={{ color: "var(--cl-text-primary)" }}>
                      {fmtHNL(p.priceHNL)}
                    </p>
                    <p className="text-[10px]" style={{ color: p.stock > 0 ? "var(--cl-text-muted)" : "var(--cl-warning)" }}>
                      {p.stock > 0 ? `${p.stock} en stock` : "Sin stock"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
