"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { advanceRider, advanceAmazonOrder } from "@/server/services/rider-simulator";

const LOCAL_STATUSES = new Set(["ORDERED", "RIDER_ASSIGNED", "PICKING_UP", "ON_THE_WAY"]);

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") throw new Error("Unauthorized");
}

export async function advanceOrderAction(
  orderId: string
): Promise<{ ok: boolean; error?: string }> {
  await requireAdmin();

  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { status: true, riderTracking: { select: { id: true } } },
  });
  if (!order) return { ok: false, error: "Pedido no encontrado." };

  const isLocal = order.riderTracking !== null || LOCAL_STATUSES.has(order.status);
  const result = isLocal ? await advanceRider(orderId) : await advanceAmazonOrder(orderId);

  if (result.ok) {
    revalidatePath("/admin/orders");
    revalidatePath("/admin/riders");
  }
  return result;
}
