"use client";

import { useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Package, User } from "lucide-react";
import { useCartStore, cartItemCount } from "@/stores/cart";
import { es } from "@/lib/i18n/es";

const TABS = [
  { href: "/", label: es.nav.home, Icon: Home },
  { href: "/c", label: "Categorías", Icon: LayoutGrid },
  { href: "/cart", label: es.nav.cart, Icon: ShoppingCart },
  { href: "/orders", label: es.nav.orders, Icon: Package },
  { href: "/account", label: es.nav.account, Icon: User },
] as const;

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const cartCount = useSyncExternalStore(
    useCartStore.subscribe,
    () => cartItemCount(useCartStore.getState().items),
    () => 0
  );

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-around pb-safe"
      style={{
        background: "var(--cl-surface)",
        borderTop: "1px solid var(--cl-border)",
        height: "calc(4rem + env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map(({ href, label, Icon }) => {
        const isCart = href === "/cart";
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

        return (
          <button
            key={href}
            onClick={() => router.push(href)}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 transition-all active:scale-90"
            aria-label={label}
          >
            {isActive && (
              <span
                className="absolute top-2 h-7 w-9 rounded-lg"
                style={{ background: "var(--cl-accent-subtle)" }}
              />
            )}

            <span className="relative">
              <Icon
                size={22}
                style={{ color: isActive ? "var(--cl-accent)" : "var(--cl-text-muted)" }}
                strokeWidth={isActive ? 2.25 : 1.75}
              />
              {isCart && cartCount > 0 && (
                <span
                  className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: "var(--cl-accent)" }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </span>

            <span
              className="text-[10px] font-medium"
              style={{
                color: isActive ? "var(--cl-accent)" : "var(--cl-text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
