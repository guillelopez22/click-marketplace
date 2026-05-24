import { z } from "zod";

export const CitySchema = z.enum(["TGU", "SPS"]);

export const CheckoutSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(8).max(15),
  address: z.string().min(10).max(300),
  city: CitySchema,
  // Card fields are NEVER included here — validated client-side only, never sent to server
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;

export const OrderStatusSchema = z.enum([
  "ORDERED",
  "MIAMI_WAREHOUSE",
  "IN_TRANSIT_HN",
  "CUSTOMS",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "RIDER_ASSIGNED",
  "PICKING_UP",
  "ON_THE_WAY",
]);

export const UpdateOrderStatusSchema = z.object({
  orderId: z.string().cuid(),
  status: OrderStatusSchema,
  message: z.string().max(200).optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof UpdateOrderStatusSchema>;
