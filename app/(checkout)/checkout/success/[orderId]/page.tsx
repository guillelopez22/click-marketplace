import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { es } from "@/lib/i18n/es";

interface Props {
  params: Promise<{ orderId: string }>;
}

export const metadata: Metadata = { title: "¡Pago aprobado!" };

export default async function SuccessPage({ params }: Props) {
  const session = await auth();
  const { orderId } = await params;

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      ...(session?.user?.id ? { userId: session.user.id } : { userId: "" }),
    },
    select: { id: true, totalHNL: true },
  });
  if (!order) notFound();

  const [int, dec] = order.totalHNL.toFixed(2).split(".");
  const totalFormatted = `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
  const shortId = orderId.slice(-8).toUpperCase();

  return (
    <section className="flex flex-col items-center gap-6 py-10 text-center">
      {/* Animated checkmark */}
      <div
        className="relative flex h-24 w-24 items-center justify-center rounded-full"
        style={{ background: "var(--cl-success-subtle)" }}
      >
        <svg viewBox="0 0 52 52" width={46} height={46}>
          <circle
            cx="26" cy="26" r="23"
            fill="none"
            stroke="var(--cl-success)"
            strokeWidth="2"
            style={{
              strokeDasharray: 166,
              strokeDashoffset: 166,
              animation: "check-circle 0.55s ease-out forwards",
            }}
          />
          <path
            fill="none"
            stroke="var(--cl-success)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27 l8 8 16-16"
            style={{
              strokeDasharray: 32,
              strokeDashoffset: 32,
              animation: "check-draw 0.35s ease-out 0.5s forwards",
            }}
          />
        </svg>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1.5">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
        >
          {es.success.title}
        </h1>
        <p className="text-sm" style={{ color: "var(--cl-text-secondary)" }}>
          {es.success.subtitle}
        </p>
      </div>

      {/* Order summary card */}
      <div
        className="flex w-full flex-col gap-3 rounded-2xl p-5"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
            {es.success.orderId}
          </span>
          <span
            className="rounded-lg px-2.5 py-1 font-mono text-xs font-semibold"
            style={{ background: "var(--cl-surface-raised)", color: "var(--cl-text-secondary)" }}
          >
            #{shortId}
          </span>
        </div>
        <div
          className="flex items-center justify-between border-t pt-3"
          style={{ borderColor: "var(--cl-border)" }}
        >
          <span className="text-sm" style={{ color: "var(--cl-text-secondary)" }}>
            Total pagado
          </span>
          <span
            className="text-lg font-bold tabular-nums"
            style={{ color: "var(--cl-text-primary)" }}
          >
            {totalFormatted}
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex w-full flex-col gap-3">
        <Link
          href={`/orders/${orderId}`}
          className="flex h-12 items-center justify-center rounded-2xl text-sm font-semibold text-white"
          style={{ background: "var(--cl-accent)" }}
        >
          {es.success.trackOrder}
        </Link>
        <Link
          href="/"
          className="flex h-12 items-center justify-center rounded-2xl text-sm font-medium"
          style={{
            background: "transparent",
            border: "1px solid var(--cl-border)",
            color: "var(--cl-text-secondary)",
          }}
        >
          {es.success.continueShopping}
        </Link>
      </div>
    </section>
  );
}
