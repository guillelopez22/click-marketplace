"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, MapPin } from "lucide-react";
import { useCartStore, cartItemCount } from "@/stores/cart";
import { useLocationStore } from "@/stores/location";
import { es } from "@/lib/i18n/es";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // useSyncExternalStore gives the correct server snapshot (0 / null)
  // and actual client state without a mounted flag
  const count = useSyncExternalStore(
    useCartStore.subscribe,
    () => cartItemCount(useCartStore.getState().items),
    () => 0
  );
  const city = useSyncExternalStore(
    useLocationStore.subscribe,
    () => useLocationStore.getState().city,
    () => null
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ background: "var(--cl-canvas)", borderBottom: "1px solid var(--cl-border)" }}
    >
      <div className="mx-auto flex max-w-[480px] items-center gap-3 px-4 py-3 sm:max-w-2xl">
        <span
          className="shrink-0 text-lg font-bold"
          style={{ color: "var(--cl-text-primary)", letterSpacing: "-0.03em" }}
        >
          CLICK
        </span>

        <form onSubmit={handleSearch} className="flex-1">
          <label htmlFor="site-search" className="sr-only">{es.common.searchPlaceholder}</label>
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: "var(--cl-surface-raised)", border: "1px solid var(--cl-border)" }}
          >
            <Search size={15} style={{ color: "var(--cl-text-muted)" }} />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={es.common.searchPlaceholder}
              className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--cl-text-muted)]"
              style={{ color: "var(--cl-text-primary)" }}
            />
          </div>
        </form>

        {city && (
          <div className="hidden items-center gap-1 shrink-0 sm:flex">
            <MapPin size={13} style={{ color: "var(--cl-accent)" }} />
            <span className="text-xs font-medium" style={{ color: "var(--cl-text-secondary)" }}>
              {city === "TGU" ? "Tegucigalpa" : "SPS"}
            </span>
          </div>
        )}

        <button
          onClick={() => router.push("/cart")}
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all active:scale-90"
          style={{
            background: count > 0 ? "var(--cl-accent-subtle)" : "transparent",
            color: count > 0 ? "var(--cl-accent)" : "var(--cl-text-muted)",
          }}
          aria-label={es.nav.cart}
        >
          <ShoppingCart size={20} />
          {count > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: "var(--cl-accent)" }}
            >
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
