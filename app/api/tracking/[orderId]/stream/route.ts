export const runtime = "nodejs";

import { type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const order = await db.order.findFirst({
    where: { id: orderId, userId: session.user.id },
    select: { id: true },
  });
  if (!order) return new Response("Not Found", { status: 404 });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let done = false;
      let pollTimer: ReturnType<typeof setTimeout> | null = null;
      let heartbeatTimer: ReturnType<typeof setInterval> | null = null;

      function send(event: string, data: object) {
        if (done) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          done = true;
        }
      }

      async function poll() {
        if (done) return;
        try {
          const [tracking, latestOrder, events] = await Promise.all([
            db.riderTracking.findUnique({ where: { orderId } }),
            db.order.findUnique({
              where: { id: orderId },
              select: { status: true },
            }),
            db.orderStatusEvent.findMany({
              where: { orderId },
              orderBy: { at: "asc" },
              select: { status: true, message: true, at: true },
            }),
          ]);

          send("update", {
            lat: tracking?.lat ?? null,
            lng: tracking?.lng ?? null,
            heading: tracking?.heading ?? 0,
            status: latestOrder?.status ?? "ORDERED",
            events: events.map((e) => ({
              status: e.status,
              message: e.message,
              at: e.at.toISOString(),
            })),
          });

          if (latestOrder?.status === "DELIVERED") {
            done = true;
            try { controller.close(); } catch { /* already closed */ }
            return;
          }
        } catch {
          // DB error — retry on next tick
        }
        pollTimer = setTimeout(poll, 2000);
      }

      heartbeatTimer = setInterval(() => send("heartbeat", {}), 15000);
      await poll();

      req.signal.addEventListener("abort", () => {
        done = true;
        if (pollTimer) clearTimeout(pollTimer);
        if (heartbeatTimer) clearInterval(heartbeatTimer);
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
