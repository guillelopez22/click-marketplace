import { db } from "@/lib/db";
import type { OrderStatus } from "@prisma/client";

const AMAZON_SEQUENCE: OrderStatus[] = [
  "ORDERED",
  "MIAMI_WAREHOUSE",
  "IN_TRANSIT_HN",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const AMAZON_MESSAGES: Partial<Record<OrderStatus, string>> = {
  MIAMI_WAREHOUSE:   "Tu pedido llegó a nuestra bodega en Miami",
  IN_TRANSIT_HN:     "Tu pedido está en vuelo hacia Honduras",
  CUSTOMS:           "Tu pedido está siendo procesado en aduana",
  OUT_FOR_DELIVERY:  "Tu pedido está en camino a tu dirección",
  DELIVERED:         "¡Tu pedido fue entregado!",
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
