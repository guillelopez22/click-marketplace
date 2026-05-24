import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/schemas/cart";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (incoming) =>
        set((state) => {
          const idx = state.items.findIndex((i) => i.productId === incoming.productId);
          if (idx !== -1) {
            const updated = [...state.items];
            updated[idx] = { ...updated[idx], qty: updated[idx].qty + incoming.qty };
            return { items: updated };
          }
          return { items: [...state.items, incoming] };
        }),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      updateQty: (productId, qty) =>
        set((state) => {
          if (qty <= 0) return { items: state.items.filter((i) => i.productId !== productId) };
          return {
            items: state.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
          };
        }),

      clearCart: () => set({ items: [] }),
    }),
    { name: "click-cart" }
  )
);

// Selector helpers
export const cartItemCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.qty, 0);
