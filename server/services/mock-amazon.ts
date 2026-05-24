import type { ProductCatalogService } from "./types";
import { db } from "@/lib/db";

export const amazonService: ProductCatalogService = {
  listFeatured: () =>
    db.product.findMany({
      where: { sourceType: "AMAZON", featured: true, active: true },
      orderBy: { createdAt: "desc" },
      take: 12,
    }),

  listByCategory: (category, limit = 20) =>
    db.product.findMany({
      where: { sourceType: "AMAZON", category, active: true },
      orderBy: { priceHNL: "asc" },
      take: limit,
    }),

  search: (query) =>
    db.product.findMany({
      where: {
        sourceType: "AMAZON",
        active: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 30,
    }),

  findById: (id) =>
    db.product.findFirst({
      where: { id, sourceType: "AMAZON", active: true },
    }),
};
