import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, TrendingUp, Clock, Bike, Store } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Admin — CLICK" };

function fmtHNL(n: number): string {
  const [int, dec] = n.toFixed(2).split(".");
  return `L. ${int.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${dec}`;
}

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/");

  const [totalOrders, revenue, active, localActive, productCount] = await Promise.all([
    db.order.count(),
    db.order.aggregate({ _sum: { totalHNL: true } }),
    db.order.count({ where: { status: { not: "DELIVERED" } } }),
    db.order.count({
      where: { status: { not: "DELIVERED" }, riderTracking: { isNot: null } },
    }),
    db.product.count({ where: { active: true } }),
  ]);

  const revenueTotal = Number(revenue._sum.totalHNL ?? 0);

  const STATS = [
    { label: "Total pedidos", value: totalOrders.toLocaleString("es-HN"), Icon: Package, href: "/admin/orders" },
    { label: "Ingresos totales", value: fmtHNL(revenueTotal), Icon: TrendingUp, href: "/admin/orders" },
    { label: "Pedidos activos", value: active.toLocaleString("es-HN"), Icon: Clock, href: "/admin/orders" },
    { label: "Riders en ruta", value: localActive.toLocaleString("es-HN"), Icon: Bike, href: "/admin/riders" },
    { label: "Productos activos", value: productCount.toLocaleString("es-HN"), Icon: Store, href: "/admin/products" },
  ];

  return (
    <div className="flex flex-col gap-6 pt-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--cl-text-muted)" }}>
          Panel de administración
        </p>
        <h1 className="text-xl font-bold" style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}>
          Resumen
        </h1>
      </div>

      <div
        className="flex flex-col divide-y rounded-2xl overflow-hidden"
        style={{ background: "var(--cl-surface)", border: "1px solid var(--cl-border)", borderColor: "var(--cl-border)" }}
      >
        {STATS.map(({ label, value, Icon, href }, i) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-4 py-3.5 transition-colors"
            style={{
              borderColor: "var(--cl-border)",
              animation: `grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) ${i * 50}ms both`,
            }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--cl-surface-raised)" }}
            >
              <Icon size={15} style={{ color: "var(--cl-text-secondary)" }} />
            </div>
            <span className="flex-1 text-sm" style={{ color: "var(--cl-text-secondary)" }}>
              {label}
            </span>
            <span className="text-sm font-bold tabular-nums" style={{ color: "var(--cl-text-primary)" }}>
              {value}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
