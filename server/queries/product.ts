import { db } from "@/lib/db";
import type { Product, ProductSource } from "@prisma/client";

export async function getFeaturedBySource(source: ProductSource, take = 10): Promise<Product[]> {
  return db.product.findMany({
    where: { active: true, featured: true, sourceType: source },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export async function getProductsByCategory(category: string, limit = 40): Promise<Product[]> {
  if (category === "Supermercado") {
    return db.product.findMany({
      where: { active: true, sourceType: "LOCAL" },
      orderBy: { priceHNL: "asc" },
      take: limit,
    });
  }
  return db.product.findMany({
    where: { active: true, category },
    orderBy: { priceHNL: "asc" },
    take: limit,
  });
}

export async function searchProducts(query: string): Promise<Product[]> {
  return db.product.findMany({
    where: {
      active: true,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } },
        { merchant: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 40,
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  return db.product.findFirst({ where: { id, active: true } });
}
