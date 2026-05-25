"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { advanceAmazonOrder } from "@/server/services/rider-simulator";

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
    select: { status: true },
  });
  if (!order) return { ok: false, error: "Pedido no encontrado." };

  const result = await advanceAmazonOrder(orderId);

  if (result.ok) {
    revalidatePath("/admin/orders");
  }
  return result;
}
