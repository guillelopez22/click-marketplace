"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin/orders", label: "Pedidos" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/riders", label: "Repartidores" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div
      className="sticky top-14 z-30 flex items-center gap-1 px-1 py-2 border-b"
      style={{ background: "var(--cl-canvas)", borderColor: "var(--cl-border)" }}
    >
      <span
        className="shrink-0 rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-white"
        style={{ background: "var(--cl-accent)" }}
      >
        Admin
      </span>
      {TABS.map((tab) => {
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
            style={{
              background: isActive ? "var(--cl-accent-subtle)" : "transparent",
              color: isActive ? "var(--cl-accent)" : "var(--cl-text-muted)",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
