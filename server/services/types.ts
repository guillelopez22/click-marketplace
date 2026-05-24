import type { Product } from "@prisma/client";

export interface ProductCatalogService {
  listFeatured(): Promise<Product[]>;
  listByCategory(category: string, limit?: number): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
}
