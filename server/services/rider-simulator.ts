import { db } from "@/lib/db";
import type { OrderStatus } from "@prisma/client";
import { STORE_COORDS, DELIVERY_ZONES, lerpCoords } from "@/lib/geo";

const LOCAL_SEQUENCE: OrderStatus[] = [
  "ORDERED",
  "RIDER_ASSIGNED",
  "PICKING_UP",
  "ON_THE_WAY",
  "DELIVERED",
];

// Fraction of the store→destination route completed at each status
const STATUS_PROGRESS: Partial<Record<OrderStatus, number>> = {
  ORDERED: 0,
  RIDER_ASSIGNED: 0,
  PICKING_UP: 0.15,
  ON_THE_WAY: 0.55,
  DELIVERED: 1,
};

const STATUS_MESSAGES: Partial<Record<OrderStatus, string>> = {
  RIDER_ASSIGNED: "Tu repartidor ha sido asignado",
  PICKING_UP: "El repartidor está en camino a la tienda",
  ON_THE_WAY: "Tu pedido está en camino",
  DELIVERED: "¡Tu pedido fue entregado!",
};

export async function advanceRider(
  orderId: string
): Promise<{ ok: boolean; newStatus?: OrderStatus; error?: string }> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { riderTracking: true },
  });

  if (!order) return { ok: false, error: "Pedido no encontrado." };

  const currentIdx = LOCAL_SEQUENCE.indexOf(order.status as OrderStatus);
  if (currentIdx === -1 || currentIdx >= LOCAL_SEQUENCE.length - 1) {
    return { ok: false, error: "El pedido ya está en el estado final." };
  }

  const nextStatus = LOCAL_SEQUENCE[currentIdx + 1];
  const progress = STATUS_PROGRESS[nextStatus] ?? 0;

  // Deterministic destination so repeated advances converge on the same point
  const zones = DELIVERY_ZONES[order.city];
  const destIdx = parseInt(orderId.slice(-1), 16) % zones.length;
  const destination = zones[destIdx];
  const origin = STORE_COORDS[order.city];
  const newCoords = lerpCoords(origin, destination, progress);
  const heading = (Math.atan2(destination.lng - origin.lng, destination.lat - origin.lat) * 180) / Math.PI;

  await db.$transaction([
    db.order.update({ where: { id: orderId }, data: { status: nextStatus } }),
    db.orderStatusEvent.create({
      data: {
        orderId,
        status: nextStatus,
        message: STATUS_MESSAGES[nextStatus] ?? null,
      },
    }),
    ...(order.riderTracking
      ? [db.riderTracking.update({
          where: { orderId },
          data: { lat: newCoords.lat, lng: newCoords.lng, heading },
        })]
      : []),
  ]);

  return { ok: true, newStatus: nextStatus };
}

// Advance Amazon import orders through their status flow (no GPS)
const AMAZON_SEQUENCE: OrderStatus[] = [
  "ORDERED",
  "MIAMI_WAREHOUSE",
  "IN_TRANSIT_HN",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const AMAZON_MESSAGES: Partial<Record<OrderStatus, string>> = {
  MIAMI_WAREHOUSE: "Tu pedido llegó a nuestra bodega en Miami",
  IN_TRANSIT_HN: "Tu pedido está en vuelo hacia Honduras",
  CUSTOMS: "Tu pedido está siendo procesado en aduana",
  OUT_FOR_DELIVERY: "Tu pedido está en camino a tu dirección",
  DELIVERED: "¡Tu pedido fue entregado!",
};

export async function advanceAmazonOrder(
  orderId: string
): Promise<{ ok: boolean; newStatus?: OrderStatus; error?: string }> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!order) return { ok: false, error: "Pedido no encontrado." };

  const currentIdx = AMAZON_SEQUENCE.indexOf(order.status as OrderStatus);
  if (currentIdx === -1 || currentIdx >= AMAZON_SEQUENCE.length - 1) {
    return { ok: false, error: "El pedido ya está en el estado final." };
  }

  const nextStatus = AMAZON_SEQUENCE[currentIdx + 1];

  await db.$transaction([
    db.order.update({ where: { id: orderId }, data: { status: nextStatus } }),
    db.orderStatusEvent.create({
      data: {
        orderId,
        status: nextStatus,
        message: AMAZON_MESSAGES[nextStatus] ?? null,
      },
    }),
  ]);

  return { ok: true, newStatus: nextStatus };
}
