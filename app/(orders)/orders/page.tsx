import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStatusLabel } from "@/lib/order-status";
import { es } from "@/lib/i18n/es";
import type { OrderStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Mis pedidos" };

function fmtHNL(val: { toFixed: (n: number) => string }): string {
  const [int, dec] = val.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("es-HN", { day: "numeric", month: "short", year: "numeric" });
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

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const orders = await db.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      status: true,
      totalHNL: true,
      createdAt: true,
      city: true,
      _count: { select: { items: true } },
    },
  });

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <h1
        className="mb-6 text-2xl font-bold"
        style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
      >
        {es.orders.title}
      </h1>

      {orders.length === 0 ? (
        <div
          className="flex flex-col items-center gap-4 rounded-2xl py-16 text-center"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--cl-surface-raised)" }}>
            <Package size={28} style={{ color: "var(--cl-text-muted)" }} />
          </div>
          <p className="text-base font-medium" style={{ color: "var(--cl-text-primary)" }}>
            {es.orders.empty}
          </p>
          <Link
            href="/"
            className="flex h-11 items-center rounded-2xl px-6 text-sm font-semibold text-white"
            style={{ background: "var(--cl-accent)" }}
          >
            {es.orders.emptyAction}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order, i) => {
            const status = order.status as OrderStatus;
            const chipStyle = statusChipStyle(status);
            const shortId = order.id.slice(-8).toUpperCase();
            const isActive = status !== "DELIVERED";

            return (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-2xl p-4"
                style={{
                  background: "var(--cl-surface)",
                  border: "1px solid var(--cl-border)",
                  animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${i * 50}ms both`,
                }}
              >
                {/* Top row: ID + status chip */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="font-mono text-sm font-semibold"
                    style={{ color: "var(--cl-text-primary)" }}
                  >
                    #{shortId}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={chipStyle}
                  >
                    {getStatusLabel(status)}
                  </span>
                </div>

                {/* Meta row */}
                <div className="flex items-center justify-between">
                  <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                    {fmtDate(order.createdAt)} · {order._count.items}{" "}
                    {order._count.items === 1 ? "artículo" : "artículos"}
                  </p>
                  <p
                    className="text-sm font-bold tabular-nums"
                    style={{ color: "var(--cl-text-primary)" }}
                  >
                    {fmtHNL(order.totalHNL)}
                  </p>
                </div>

                {/* Actions */}
                <div
                  className="flex gap-2 border-t pt-3"
                  style={{ borderColor: "var(--cl-border)" }}
                >
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex flex-1 items-center justify-center rounded-xl py-2 text-xs font-semibold"
                    style={{
                      background: "var(--cl-surface-raised)",
                      color: "var(--cl-text-secondary)",
                    }}
                  >
                    {es.orders.viewDetail}
                  </Link>
                  {isActive && (
                    <Link
                      href={`/track/${order.id}`}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white"
                      style={{ background: "var(--cl-accent)" }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-white"
                        style={{ animation: "pulse 1.5s infinite" }}
                      />
                      {es.orders.trackOrder}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
