import type { Product } from "@prisma/client";

export type SerializedProduct = Omit<Product, "priceUSD" | "priceHNL" | "createdAt"> & {
  priceUSD: string | null;
  priceHNL: string;
  createdAt: string;
};

export function serializeProduct(p: Product): SerializedProduct {
  return {
    ...p,
    priceUSD: p.priceUSD?.toString() ?? null,
    priceHNL: p.priceHNL.toString(),
    createdAt: p.createdAt.toISOString(),
  };
}

export function serializeProducts(ps: Product[]): SerializedProduct[] {
  return ps.map(serializeProduct);
}
