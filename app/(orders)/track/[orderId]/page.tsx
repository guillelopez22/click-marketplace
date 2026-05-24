import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getCityCoords } from "@/lib/geo";
import { isLocalFlow } from "@/lib/order-status";
import { TrackingClient } from "@/components/tracking/TrackingClient";
import { es } from "@/lib/i18n/es";
import type { OrderStatus } from "@prisma/client";

export const metadata: Metadata = { title: "Seguimiento del pedido" };

interface Props {
  params: Promise<{ orderId: string }>;
}

export default async function TrackPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { orderId } = await params;

  const order = await db.order.findFirst({
    where: { id: orderId, userId: session.user.id },
    include: {
      statusEvents: { orderBy: { at: "asc" } },
      riderTracking: true,
    },
  });
  if (!order) notFound();

  const status = order.status as OrderStatus;
  const isLocalOrder = order.riderTracking !== null || isLocalFlow(status);
  const { lat: cityLat, lng: cityLng } = getCityCoords(order.city);

  const initialEvents = order.statusEvents.map((e) => ({
    status: e.status,
    message: e.message,
    at: e.at.toISOString(),
  }));

  const initialLat = order.riderTracking?.lat
    ? Number(order.riderTracking.lat)
    : null;
  const initialLng = order.riderTracking?.lng
    ? Number(order.riderTracking.lng)
    : null;

  const shortId = orderId.slice(-8).toUpperCase();

  return (
    <div className="mx-auto max-w-lg px-4">
      {/* Back nav */}
      <div className="sticky top-0 z-10 flex items-center gap-3 py-4" style={{ background: "var(--cl-canvas)" }}>
        <Link
          href="/orders"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
          style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
          aria-label="Volver a pedidos"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div>
          <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
            {es.tracking.title}
          </p>
          <p className="text-sm font-semibold" style={{ color: "var(--cl-text-primary)" }}>
            #{shortId}
          </p>
        </div>
      </div>

      <TrackingClient
        orderId={orderId}
        isLocalOrder={isLocalOrder}
        initialLat={initialLat}
        initialLng={initialLng}
        cityLat={cityLat}
        cityLng={cityLng}
        initialEvents={initialEvents}
        initialStatus={order.status}
      />
    </div>
  );
}
