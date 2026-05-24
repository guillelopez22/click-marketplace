import type { ProductCatalogService } from "./types";
import { db } from "@/lib/db";

export const storesService: ProductCatalogService = {
  listFeatured: () =>
    db.product.findMany({
      where: { sourceType: "LOCAL", featured: true, active: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),

  listByCategory: (category, limit = 20) =>
    db.product.findMany({
      where: { sourceType: "LOCAL", category, active: true },
      orderBy: { priceHNL: "asc" },
      take: limit,
    }),

  search: (query) =>
    db.product.findMany({
      where: {
        sourceType: "LOCAL",
        active: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { merchant: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 30,
    }),

  findById: (id) =>
    db.product.findFirst({
      where: { id, sourceType: "LOCAL", active: true },
    }),
};
