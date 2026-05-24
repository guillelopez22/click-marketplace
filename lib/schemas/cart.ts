import { z } from "zod";
import { ProductSourceSchema } from "./product";

// Prices stored as strings for JSON-safe Zustand persistence.
// cart-math converts them to Decimal at computation time.
export const CartItemSchema = z.object({
  productId: z.string().cuid(),
  title: z.string(),
  priceHNL: z.string(),
  priceUSD: z.string().nullable(),
  qty: z.number().int().min(1),
  sourceType: ProductSourceSchema,
  image: z.string(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
