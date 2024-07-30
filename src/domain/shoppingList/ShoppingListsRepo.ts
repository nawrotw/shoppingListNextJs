import { db } from "@/db/db";
import { shoppingLists, products } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { cacheRepoWrapper } from "@/infrastructure/cache/cacheRepoWrapper";
import { cacheRevalidatePaths } from "@/infrastructure/cache/cacheRevalidatePaths";

const cacheKeys: Record<string, string> = {
  view: '/lists',
  shoppingListProducts: '/lists/:id/items',
  shoppingListProductsEdit: '/lists/:id/items/edit',
  // repo
  findAll: 'DB/shoppingLists',
  findById: 'DB/shoppingLists/:id',
}

export const revalidateDBShoppingLists = (id?: number) => cacheRevalidatePaths(Object.values(cacheKeys), id);

export const shoppingListsRepo = cacheRepoWrapper(cacheKeys, {
  findAll: () =>
    db.query.shoppingLists.findMany({
      with: {
        products: {
          orderBy: [asc((products.name))],
        }
      }
    }),
  findById: (id: number) =>
    db.query.shoppingLists.findFirst({
      where: eq(shoppingLists.id, id),
      with: {
        products: {
          orderBy: [asc((products.name))],
        }
      }
    })
});
