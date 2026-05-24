import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { SignOutButton } from "./SignOutButton";
import { Package, MapPin, Shield, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Cuenta — CLICK" };

function fmtDate(d: Date): string {
  return d.toLocaleDateString("es-HN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [orderCount, user] = await Promise.all([
    db.order.count({ where: { userId: session.user.id } }),
    db.user.findUnique({
      where: { id: session.user.id },
      select: { createdAt: true, role: true },
    }),
  ]);

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex flex-col gap-5 pt-4">
      {/* Profile card */}
      <div
        className="flex items-center gap-4 rounded-2xl p-4"
        style={{
          background: "var(--cl-surface)",
          border: "1px solid var(--cl-border)",
          animation: "grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) 0ms both",
        }}
      >
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold"
          style={{ background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" }}
        >
          {(session.user.name ?? session.user.email ?? "?")[0].toUpperCase()}
        </div>
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <p
            className="truncate text-sm font-semibold"
            style={{ color: "var(--cl-text-primary)" }}
          >
            {session.user.name ?? "Usuario"}
          </p>
          <p className="truncate text-xs" style={{ color: "var(--cl-text-muted)" }}>
            {session.user.email}
          </p>
          {user && (
            <p className="text-[10px]" style={{ color: "var(--cl-text-muted)" }}>
              Miembro desde {fmtDate(user.createdAt)}
            </p>
          )}
        </div>
        {isAdmin && (
          <span
            className="rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shrink-0"
            style={{ background: "var(--cl-accent-subtle)", color: "var(--cl-accent)" }}
          >
            Admin
          </span>
        )}
      </div>

      {/* Quick links */}
      <div
        className="flex flex-col divide-y rounded-2xl overflow-hidden"
        style={{
          background: "var(--cl-surface)",
          border: "1px solid var(--cl-border)",
          animation: "grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) 60ms both",
        }}
      >
        <Link
          href="/orders"
          className="flex items-center gap-4 px-4 py-4 transition-all active:opacity-70"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "var(--cl-surface-raised)" }}
          >
            <Package size={16} style={{ color: "var(--cl-accent)" }} />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-sm font-medium" style={{ color: "var(--cl-text-primary)" }}>
              Mis pedidos
            </p>
            <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
              {orderCount} {orderCount === 1 ? "pedido" : "pedidos"} realizados
            </p>
          </div>
          <ChevronRight size={15} style={{ color: "var(--cl-text-muted)" }} />
        </Link>

        <div
          className="flex items-center gap-4 px-4 py-4"
          style={{ borderColor: "var(--cl-border-subtle)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "var(--cl-surface-raised)" }}
          >
            <MapPin size={16} style={{ color: "var(--cl-success)" }} />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-sm font-medium" style={{ color: "var(--cl-text-primary)" }}>
              Cobertura
            </p>
            <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
              Tegucigalpa · San Pedro Sula
            </p>
          </div>
        </div>

        {isAdmin && (
          <Link
            href="/admin"
            className="flex items-center gap-4 px-4 py-4 transition-all active:opacity-70"
            style={{ borderColor: "var(--cl-border-subtle)" }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ background: "var(--cl-surface-raised)" }}
            >
              <Shield size={16} style={{ color: "var(--cl-accent)" }} />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-sm font-medium" style={{ color: "var(--cl-text-primary)" }}>
                Panel de administración
              </p>
              <p className="text-xs" style={{ color: "var(--cl-text-muted)" }}>
                Pedidos, productos y repartidores
              </p>
            </div>
            <ChevronRight size={15} style={{ color: "var(--cl-text-muted)" }} />
          </Link>
        )}
      </div>

      {/* Sign out */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "var(--cl-surface)",
          border: "1px solid var(--cl-border)",
          animation: "grid-reveal 0.25s cubic-bezier(0.23,1,0.32,1) 120ms both",
        }}
      >
        <SignOutButton />
      </div>
    </div>
  );
}
