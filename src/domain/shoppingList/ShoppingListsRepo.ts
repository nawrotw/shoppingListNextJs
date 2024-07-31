import { db } from "@/db/db";
import { shoppingLists, products } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { cacheRevalidatePaths } from "@/infrastructure/cache/cacheRevalidatePaths";
import { cache } from "@/infrastructure/cache/cache";

const cacheKeys = {
  view: '/lists',
  shoppingListProducts: (id: number) => `/lists/${id}/items`,
  shoppingListProductsEdit: (id: number) => `/lists/${id}/items/edit`,
  // repo
  findAll: 'DB/shoppingLists',
  findById: (id: number) => `DB/shoppingLists/${id}`,
}

export const revalidateDBShoppingLists = (id?: number) => cacheRevalidatePaths(Object.values(cacheKeys), id);

export const shoppingListsRepo = {
  findAll: cache(() =>
    db.query.shoppingLists.findMany({
      with: {
        products: {
          orderBy: [asc((products.name))],
        }
      }
    }), [cacheKeys.findAll]),
  findById: (id: number) => cache(() =>
    db.query.shoppingLists.findFirst({
      where: eq(shoppingLists.id, id),
      with: {
        products: {
          orderBy: [asc((products.name))],
        }
      }
    }), [cacheKeys.findById(id)])()
};
