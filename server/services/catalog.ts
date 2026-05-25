import { amazonService } from "./mock-amazon";
import type { ProductCatalogService } from "./types";

export function getCatalogService(): ProductCatalogService {
  return amazonService;
}

export { amazonService };
