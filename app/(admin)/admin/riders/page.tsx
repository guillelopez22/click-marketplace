import type { Metadata } from "next";
import { Bike } from "lucide-react";
import { db } from "@/lib/db";
import { getStatusLabel } from "@/lib/order-status";
import { AdvanceButton } from "@/components/admin/AdvanceButton";
import type { OrderStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Repartidores — Admin" };

function fmtDate(d: Date): string {
  return d.toLocaleDateString("es-HN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminRidersPage() {
  const orders = await db.order.findMany({
    where: {
      status: { not: "DELIVERED" },
      OR: [
        { riderTracking: { isNot: null } },
        { status: { in: ["ORDERED", "RIDER_ASSIGNED", "PICKING_UP", "ON_THE_WAY"] } },
      ],
    },
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      riderTracking: true,
    },
  });

  const delivered = await db.order.count({
    where: { status: "DELIVERED", riderTracking: { isNot: null } },
  });

  return (
    <div className="flex flex-col gap-5 pt-5">
      <div>
        <h1 className="text-lg font-bold" style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.02em" }}>
          Repartidores en ruta
        </h1>
        <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
          {orders.length} activos · {delivered} entregados hoy
        </p>
      </div>

      {orders.length === 0 ? (
        <div
          className="flex flex-col items-center gap-3 rounded-2xl py-14"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--cl-surface-raised)" }}>
            <Bike size={24} style={{ color: "var(--cl-text-muted)" }} />
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--cl-text-primary)" }}>
            No hay pedidos locales activos
          </p>
          <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
            Los pedidos locales aparecerán aquí
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order, i) => {
            const status = order.status as OrderStatus;
            const shortId = order.id.slice(-8).toUpperCase();
            const hasGps = order.riderTracking !== null;

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
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-semibold" style={{ color: "var(--cl-text-primary)" }}>
                        #{shortId}
                      </p>
                      {hasGps && (
                        <span
                          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
                          style={{ background: "var(--cl-success-subtle)", color: "var(--cl-success)" }}
                        >
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cl-success)", animation: "pulse 1.5s infinite" }} />
                          GPS activo
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                      {order.user.name ?? order.user.email}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
                      {fmtDate(order.updatedAt)}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{ background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" }}
                  >
                    {getStatusLabel(status)}
                  </span>
                </div>

                {hasGps && order.riderTracking && (
                  <div
                    className="rounded-xl px-3 py-2 text-[11px] font-mono"
                    style={{ background: "var(--cl-surface-raised)", color: "var(--cl-text-secondary)" }}
                  >
                    {order.riderTracking.lat.toFixed(5)}, {order.riderTracking.lng.toFixed(5)}
                  </div>
                )}

                <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--cl-border)" }}>
                  <a
                    href={`/track/${order.id}`}
                    className="text-xs font-medium"
                    style={{ color: "var(--cl-accent)" }}
                  >
                    Ver en mapa →
                  </a>
                  <AdvanceButton orderId={order.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
