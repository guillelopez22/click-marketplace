import type { Metadata } from "next";
import { Inbox } from "lucide-react";
import { db } from "@/lib/db";
import { getStatusLabel } from "@/lib/order-status";
import { AdvanceButton } from "@/components/admin/AdvanceButton";
import type { OrderStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Pedidos — Admin" };

function fmtHNL(val: { toFixed: (n: number) => string }): string {
  const [int, dec] = val.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

function fmtDate(d: Date): string {
  return d.toLocaleDateString("es-HN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

function statusColor(status: OrderStatus): { background: string; color: string } {
  if (status === "DELIVERED") return { background: "var(--cl-success-subtle)", color: "var(--cl-success)" };
  if (["OUT_FOR_DELIVERY", "ON_THE_WAY", "PICKING_UP", "RIDER_ASSIGNED"].includes(status))
    return { background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" };
  if (["CUSTOMS", "IN_TRANSIT_HN", "MIAMI_WAREHOUSE"].includes(status))
    return { background: "var(--cl-warning-subtle)", color: "var(--cl-warning)" };
  return { background: "var(--cl-surface-raised)", color: "var(--cl-text-secondary)" };
}

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      riderTracking: { select: { id: true } },
      _count: { select: { items: true } },
    },
  });

  return (
    <div className="flex flex-col gap-4 pt-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold" style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}>
          Pedidos <span className="text-sm font-normal" style={{ color: "var(--cl-text-muted)" }}>({orders.length})</span>
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl py-12" style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--cl-surface-raised)" }}>
            <Inbox size={24} style={{ color: "var(--cl-text-muted)" }} />
          </div>
          <p className="text-sm" style={{ color: "var(--cl-text-muted)" }}>Sin pedidos aún</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order, i) => {
            const status = order.status as OrderStatus;
            const chip = statusColor(status);
            const isLocal = order.riderTracking !== null;
            const shortId = order.id.slice(-8).toUpperCase();

            return (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-2xl p-4"
                style={{
                  background: "var(--cl-surface)",
                  border: "1px solid var(--cl-border)",
                  animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${i * 30}ms both`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-mono text-sm font-semibold" style={{ color: "var(--cl-text-primary)" }}>
                      #{shortId}
                    </p>
                    <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                      {order.user.name ?? order.user.email} · {order._count.items} art.
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
                      {fmtDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={chip}>
                      {getStatusLabel(status)}
                    </span>
                    <span
                      className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                      style={{
                        background: isLocal ? "var(--cl-success-subtle)" : "var(--cl-accent-subtle)",
                        color: isLocal ? "var(--cl-success)" : "var(--cl-accent)",
                      }}
                    >
                      {isLocal ? "Local" : "Amazon"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--cl-border)" }}>
                  <p className="text-sm font-bold tabular-nums" style={{ color: "var(--cl-text-primary)" }}>
                    {fmtHNL(order.totalHNL)}
                  </p>
                  {status !== "DELIVERED" && <AdvanceButton orderId={order.id} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
