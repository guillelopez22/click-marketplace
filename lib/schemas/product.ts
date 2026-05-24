import { z } from "zod";

export const ProductSourceSchema = z.enum(["AMAZON", "LOCAL"]);

export const ProductSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  priceUSD: z.string().nullable(),
  priceHNL: z.string(),
  sourceType: ProductSourceSchema,
  merchant: z.string().nullable(),
  weightLb: z.number().nullable(),
  etaDays: z.number().int().min(1),
  images: z.array(z.string()),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  featured: z.boolean(),
  active: z.boolean(),
});

export const CreateProductSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  priceUSD: z.string().optional().nullable(),
  priceHNL: z.string().min(1),
  sourceType: ProductSourceSchema,
  merchant: z.string().optional().nullable(),
  weightLb: z.number().optional().nullable(),
  etaDays: z.number().int().min(1),
  images: z.array(z.string()).min(1),
  category: z.string().min(1),
  stock: z.number().int().min(0),
  featured: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof CreateProductSchema>;
