import { amazonService } from "./mock-amazon";
import { storesService } from "./mock-stores";
import type { ProductCatalogService } from "./types";
import type { ProductSource } from "@prisma/client";

export function getCatalogService(source: ProductSource): ProductCatalogService {
  return source === "AMAZON" ? amazonService : storesService;
}

export { amazonService, storesService };
