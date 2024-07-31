import { db } from "@/db/db";
import { eq, asc } from "drizzle-orm";
import { products } from "@/db/schema";
import { cacheRevalidatePaths } from "@/infrastructure/cache/cacheRevalidatePaths";
import { cache } from "@/infrastructure/cache/cache";

const cacheKeys = {
  view: '/products', // static view with products
  findAll: 'DB/products',
  findById: (id: number) => `DB/products/${id}`,
}

export const revalidateDBProducts = (id?: number) => cacheRevalidatePaths(Object.values(cacheKeys), id);

export const productsRepo = {
  findAll: cache(() =>
    db.query.products.findMany({
      orderBy: [asc((products.name))],
    }), [cacheKeys.findAll]),
  findById: (id: number) => cache(() =>
    db.query.products.findFirst({
      where: eq(products.id, id),
    }), [cacheKeys.findById(id)])()
};

