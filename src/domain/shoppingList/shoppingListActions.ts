"use server"

import { db } from "@/db/db";
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidateShoppingListsPaths } from "@/domain/shoppingList/shoppingListPaths";
import { revalidateDBShoppingLists, shoppingListsRepo } from "@/domain/shoppingList/shoppingListsRepo";
import { shoppingLists, Product, NewShoppingListProduct, shoppingListProducts } from "@/db/schema";
import { eq } from "drizzle-orm";

const addSchema = z.object({
  name: z.string().min(1),
});

const editSchema = addSchema.extend({});


export async function createShoppingList(_prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const { name } = result.data;

  await db.insert(shoppingLists).values({ name });

  revalidateDBShoppingLists();
  revalidateShoppingListsPaths();

  redirect("/lists");
}

export async function updateShoppingList(
  id: number,
  _prevState: unknown,
  formData: FormData
) {

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const { name } = result.data

  await db.update(shoppingLists)
    .set({ name })
    .where(eq(shoppingLists.id, id))

  revalidateDBShoppingLists();
  revalidateShoppingListsPaths();
  redirect("/lists");
}


export async function deleteShoppingList(id: number) {
  await db.delete(shoppingLists).where(eq(shoppingLists.id, id));
  revalidateShoppingListsPaths();
  redirect("/lists");
}

// =============================
// === ShoppingList.Products ===
// =============================
export async function shoppingListUpdateProductChecked(listId: number, listProductId: number, checked: boolean) {

  await db.update(shoppingListProducts)
    .set({checked})
    .where(eq(shoppingListProducts.id, listProductId))

  revalidateDBShoppingLists(listId);
  revalidateShoppingListsPaths(listId);
}

export async function shoppingListUpdateProducts(listId: number, products: Product[]) {
  if (!listId) {
    return notFound(); // requestError
  }
  if (!products) {
    return notFound(); // requestError
  }

  const shoppingList = await shoppingListsRepo.findById(listId)
  if (!shoppingList) {
    return notFound();
  }

  const newListProducts: NewShoppingListProduct[] = products.map(({ id, name, unit }) => {
    const existingProduct = shoppingList.products.find(existingProduct => existingProduct.productId === id);
    if (existingProduct) { // we want to preserve Products which are already on the list (could have been already checked)
      return existingProduct;
    }
    return {
      name,
      unit,
      checked: false,
      productId: id,
      shoppingListId: listId
    }
  });

  await db.delete(shoppingListProducts)
    .where(eq(shoppingListProducts.shoppingListId, listId));

  await db.insert(shoppingListProducts).values(newListProducts)

  revalidateDBShoppingLists(listId);
  revalidateShoppingListsPaths(listId);
  redirect(`/lists/${listId}/items`);
}
