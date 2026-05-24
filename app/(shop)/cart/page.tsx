"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { useLocationStore } from "@/stores/location";
import type { CartItem } from "@/lib/schemas/cart";
import { es } from "@/lib/i18n/es";

function fmtHnl(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

// Display-only totals using Number arithmetic.
// The server action re-computes with Decimal as the authoritative source.
function computeDisplayTotals(items: CartItem[]) {
  const hasAmazon = items.some((i) => i.sourceType === "AMAZON");
  const hasLocal = items.some((i) => i.sourceType === "LOCAL");

  const amazonSubtotal = items
    .filter((i) => i.sourceType === "AMAZON")
    .reduce((s, i) => s + Number(i.priceHNL) * i.qty, 0);
  const localSubtotal = items
    .filter((i) => i.sourceType === "LOCAL")
    .reduce((s, i) => s + Number(i.priceHNL) * i.qty, 0);

  const subtotal = amazonSubtotal + localSubtotal;
  const deliveryFee = (hasAmazon ? 200 : 0) + (hasLocal ? 50 : 0);
  const importFee = parseFloat((amazonSubtotal * 0.15).toFixed(2));
  const taxes = parseFloat(((subtotal + deliveryFee + importFee) * 0.15).toFixed(2));
  const total = parseFloat((subtotal + deliveryFee + importFee + taxes).toFixed(2));

  return { subtotal, deliveryFee, importFee, taxes, total, hasAmazon };
}

export default function CartPage() {
  const router = useRouter();

  const items = useSyncExternalStore(
    useCartStore.subscribe,
    () => useCartStore.getState().items,
    () => [] as CartItem[]
  );
  const city = useSyncExternalStore(
    useLocationStore.subscribe,
    () => useLocationStore.getState().city,
    () => null
  );
  const { removeItem, updateQty } = useCartStore();

  void city; // used in checkout, not in display totals

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--cl-surface-raised)" }}>
          <ShoppingBag size={28} style={{ color: "var(--cl-text-muted)" }} />
        </div>
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.025em" }}
          >
            {es.cart.empty}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--cl-text-muted)" }}>
            Agrega productos para continuar
          </p>
        </div>
        <Link
          href="/"
          className="rounded-2xl px-6 py-3 text-sm font-semibold text-white"
          style={{ background: "var(--cl-accent)" }}
        >
          {es.cart.emptyAction}
        </Link>
      </div>
    );
  }

  const totals = computeDisplayTotals(items);

  return (
    <section className="flex flex-col gap-4 pt-4 pb-6">
      <h1
        className="text-xl font-bold"
        style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.025em" }}
      >
        {es.cart.title}
      </h1>

      {/* Line items */}
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-3 rounded-2xl p-3"
            style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
          >
            <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="72px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1 min-w-0">
              <p
                className="line-clamp-2 text-[13px] font-medium leading-snug"
                style={{ color: "var(--cl-text-primary)" }}
              >
                {item.title}
              </p>
              <p className="text-[11px]" style={{ color: "var(--cl-text-secondary)" }}>
                {fmtHnl(Number(item.priceHNL))}
              </p>

              {/* Qty controls */}
              <div className="mt-auto flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.productId, item.qty - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all active:scale-90"
                  style={{ background: "var(--cl-surface-raised)" }}
                  aria-label="Reducir cantidad"
                >
                  <Minus size={12} style={{ color: "var(--cl-text-secondary)" }} />
                </button>
                <span
                  className="w-5 text-center text-sm font-semibold"
                  style={{ color: "var(--cl-text-primary)" }}
                >
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.productId, item.qty + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all active:scale-90"
                  style={{ background: "var(--cl-surface-raised)" }}
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={12} style={{ color: "var(--cl-text-secondary)" }} />
                </button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.productId)}
              className="flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-xl transition-all active:scale-90"
              style={{ color: "var(--cl-text-muted)" }}
              aria-label={es.cart.remove}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div
        className="flex flex-col gap-2.5 rounded-2xl p-4"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
      >
        <TotalsRow label={es.cart.subtotal} value={fmtHnl(totals.subtotal)} />
        <TotalsRow label={es.cart.deliveryFee} value={fmtHnl(totals.deliveryFee)} />
        {totals.importFee > 0 && (
          <TotalsRow
            label={es.cart.importFee}
            value={fmtHnl(totals.importFee)}
            note={es.cart.importFeeNote}
          />
        )}
        <TotalsRow label={es.cart.taxes} value={fmtHnl(totals.taxes)} />
        <div className="my-0.5 border-t" style={{ borderColor: "var(--cl-border)" }} />
        <TotalsRow label={es.cart.total} value={fmtHnl(totals.total)} bold />
      </div>

      {/* Checkout CTA */}
      <button
        onClick={() => router.push("/checkout")}
        className="flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold text-white transition-all active:scale-[0.98]"
        style={{ background: "var(--cl-accent)" }}
      >
        {es.cart.checkout}
      </button>
    </section>
  );
}

function TotalsRow({
  label,
  value,
  note,
  bold,
}: {
  label: string;
  value: string;
  note?: string;
  bold?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex flex-col">
        <span
          className={bold ? "text-sm font-semibold" : "text-sm"}
          style={{ color: bold ? "var(--cl-text-primary)" : "var(--cl-text-secondary)" }}
        >
          {label}
        </span>
        {note && (
          <span className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
            {note}
          </span>
        )}
      </div>
      <span
        className={bold ? "text-base font-bold" : "text-sm tabular-nums"}
        style={{ color: bold ? "var(--cl-text-primary)" : "var(--cl-text-secondary)" }}
      >
        {value}
      </span>
    </div>
  );
}
