"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { CheckoutSchema } from "@/lib/schemas/order";
import { CartItemSchema } from "@/lib/schemas/cart";
import { computeCartTotals } from "@/lib/cart-math";
import { Decimal } from "@prisma/client/runtime/library";
import { STORE_COORDS } from "@/lib/geo";

const CheckoutPayloadSchema = z.object({
  input: CheckoutSchema,
  items: z.array(CartItemSchema).min(1, "El carrito está vacío."),
});

export async function checkoutAction(
  payload: unknown
): Promise<{ orderId: string } | { error: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Debes iniciar sesión para completar tu pedido." };
  }

  const parsed = CheckoutPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Datos de entrega inválidos." };
  }

  const { input, items } = parsed.data;

  // Re-compute totals server-side — client totals are for display only
  const mathItems = items.map((i) => ({
    priceHNL: new Decimal(i.priceHNL),
    qty: i.qty,
    sourceType: i.sourceType,
  }));
  const totals = computeCartTotals(mathItems, input.city);

  const order = await db.order.create({
    data: {
      userId: session.user.id,
      subtotalHNL: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      importFee: totals.importFee,
      taxes: totals.taxes,
      totalHNL: totals.total,
      address: input.address,
      city: input.city,
      status: "ORDERED",
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          qty: i.qty,
          priceSnapshotHNL: new Decimal(i.priceHNL),
        })),
      },
      statusEvents: {
        create: [{ status: "ORDERED", message: "Pedido recibido" }],
      },
    },
  });

  // Seed RiderTracking for local orders (rider starts at the store)
  const hasLocal = items.some((i) => i.sourceType === "LOCAL");
  if (hasLocal) {
    const coords = STORE_COORDS[input.city];
    await db.riderTracking.create({
      data: { orderId: order.id, lat: coords.lat, lng: coords.lng, heading: 0 },
    });
  }

  return { orderId: order.id };
}
