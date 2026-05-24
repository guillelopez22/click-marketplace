import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStatusLabel } from "@/lib/order-status";
import { StatusTimeline } from "@/components/tracking/StatusTimeline";
import { es } from "@/lib/i18n/es";
import type { OrderStatus } from "@prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Detalle del pedido" };

function fmtHNL(val: { toFixed: (n: number) => string }): string {
  const [int, dec] = val.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusChipStyle(status: OrderStatus): { background: string; color: string } {
  if (status === "DELIVERED") {
    return { background: "var(--cl-success-subtle)", color: "var(--cl-success)" };
  }
  if (["OUT_FOR_DELIVERY", "ON_THE_WAY", "PICKING_UP", "RIDER_ASSIGNED"].includes(status)) {
    return { background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" };
  }
  return { background: "var(--cl-surface-raised)", color: "var(--cl-text-secondary)" };
}

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;

  const order = await db.order.findFirst({
    where: { id, userId: session.user.id },
    include: {
      items: {
        include: {
          product: { select: { title: true, images: true, sourceType: true } },
        },
      },
      statusEvents: { orderBy: { at: "asc" } },
    },
  });
  if (!order) notFound();

  const status = order.status as OrderStatus;
  const chipStyle = statusChipStyle(status);
  const shortId = id.slice(-8).toUpperCase();
  const isActive = status !== "DELIVERED";

  const serializedEvents = order.statusEvents.map((e) => ({
    status: e.status,
    message: e.message,
    at: e.at.toISOString(),
  }));

  const hasImportFee = Number(order.importFee) > 0;

  return (
    <div className="mx-auto max-w-lg px-4 pb-10">
      {/* Back nav */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 py-4"
        style={{ background: "var(--cl-canvas)" }}
      >
        <Link
          href="/orders"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
          aria-label="Volver a pedidos"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 3L5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div>
          <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
            Pedido #{shortId}
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--cl-text-primary)" }}>
            {fmtDate(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-1">
        {/* Status chip */}
        <div
          className="flex items-center justify-between rounded-2xl p-4"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--cl-text-secondary)" }}>
            Estado actual
          </p>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={chipStyle}
          >
            {getStatusLabel(status)}
          </span>
        </div>

        {/* Track CTA */}
        {isActive && (
          <Link
            href={`/track/${id}`}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-semibold text-white"
            style={{ background: "var(--cl-accent)" }}
          >
            <span
              className="h-2 w-2 rounded-full bg-white opacity-90"
              style={{ animation: "pulse 1.5s infinite" }}
            />
            {es.orders.trackOrder} en tiempo real
          </Link>
        )}

        {/* Items */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <h2
            className="mb-4 text-sm font-semibold"
            style={{ color: "var(--cl-text-primary)" }}
          >
            Artículos ({order.items.length})
          </h2>
          <div className="flex flex-col gap-3">
            {order.items.map((item) => {
              const img = item.product.images[0];
              const lineTotal = Number(item.priceSnapshotHNL) * item.qty;

              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                    style={{ background: "var(--cl-surface-raised)" }}
                  >
                    {img && (
                      <Image
                        src={img}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <p
                      className="truncate text-sm font-medium"
                      style={{ color: "var(--cl-text-primary)" }}
                    >
                      {item.product.title}
                    </p>
                    <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                      {item.qty} × {fmtHNL(item.priceSnapshotHNL)}
                    </p>
                  </div>
                  <p
                    className="shrink-0 text-sm font-semibold tabular-nums"
                    style={{ color: "var(--cl-text-primary)" }}
                  >
                    {`L. ${lineTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Totals */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <h2
            className="mb-3 text-sm font-semibold"
            style={{ color: "var(--cl-text-primary)" }}
          >
            Resumen del pago
          </h2>
          <div className="flex flex-col gap-2">
            {(
              [
                ["Subtotal", order.subtotalHNL],
                ["Envío", order.deliveryFee],
                ...(hasImportFee ? [["Cargo de importación (15%)", order.importFee] as const] : []),
                ["Impuestos (15%)", order.taxes],
              ] as const
            ).map(([label, val]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "var(--cl-text-secondary)" }}>
                  {label}
                </span>
                <span
                  className="text-sm tabular-nums"
                  style={{ color: "var(--cl-text-secondary)" }}
                >
                  {fmtHNL(val)}
                </span>
              </div>
            ))}
            <div
              className="flex items-center justify-between border-t pt-2"
              style={{ borderColor: "var(--cl-border)" }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--cl-text-primary)" }}>
                Total
              </span>
              <span
                className="text-base font-bold tabular-nums"
                style={{ color: "var(--cl-text-primary)" }}
              >
                {fmtHNL(order.totalHNL)}
              </span>
            </div>
          </div>
        </div>

        {/* Status timeline */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <h2
            className="mb-4 text-sm font-semibold"
            style={{ color: "var(--cl-text-primary)" }}
          >
            Historial del pedido
          </h2>
          <StatusTimeline events={serializedEvents} />
        </div>
      </div>
    </div>
  );
}
