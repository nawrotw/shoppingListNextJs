import { db } from "@/db/db";
import { eq, asc } from "drizzle-orm";
import { products } from "@/db/schema";
import { cacheRepoWrapper } from "@/infrastructure/cache/cacheRepoWrapper";
import { cacheRevalidatePaths } from "@/infrastructure/cache/cacheRevalidatePaths";

const cacheKeys: Record<string, string> = {
  view: '/products', // static view with products
  findAll: 'DB/products',
  findById: 'DB/products/:id',
}

export const revalidateDBProducts = (id?: number) => cacheRevalidatePaths(Object.values(cacheKeys), id);

export const productsRepo = cacheRepoWrapper(cacheKeys, {
  findAll: () =>
    db.query.products.findMany({
      orderBy: [asc((products.name))],
    }),
  findById: (id: number) =>
    db.query.products.findFirst({
      where: eq(products.id, id),
    })
});

