"use server"

import { db } from "@/db/db";
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidateDBShoppingLists, shoppingListsRepo } from "@/domain/shoppingList/ShoppingListsRepo";
import { shoppingLists, Product, shoppingListProducts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateMany } from "@/db/utils/updateMany";
import { shoppingListProductsUpdate } from "@/domain/shoppingList/shoppingListUtils";

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
  redirect("/lists");
}


export async function deleteShoppingList(id: number) {
  await db.delete(shoppingLists).where(eq(shoppingLists.id, id));
  revalidateDBShoppingLists(id);
  redirect("/lists");
}

// =============================
// === ShoppingList.Products ===
// =============================
export async function shoppingListUpdateProductChecked(listId: number, listProductId: number, checked: boolean) {
  await db.update(shoppingListProducts)
    .set({ checked })
    .where(eq(shoppingListProducts.id, listProductId))

  revalidateDBShoppingLists(listId);
}

export async function shoppingListProductsResetDone(listId: number) {
  await db.update(shoppingListProducts)
    .set({ checked: false })
    .where(eq(shoppingListProducts.shoppingListId, listId))

  revalidateDBShoppingLists(listId);
}

export async function shoppingListProductsUpdateOrder(listId: number, newOrders: Array<number>) {
  await updateMany(newOrders);
  revalidateDBShoppingLists(listId);
}

export async function shoppingListUpdateProducts(listId: number, products: Product[]) {
  if (!listId || !products) {
    return notFound(); // requestError
  }

  const shoppingList = await shoppingListsRepo.findById(listId);
  if (!shoppingList) {
    return notFound();
  }

  await db.delete(shoppingListProducts)
    .where(eq(shoppingListProducts.shoppingListId, listId));

  await db.insert(shoppingListProducts)
    .values(shoppingListProductsUpdate(listId, shoppingList.products, products))

  revalidateDBShoppingLists(listId);
  redirect(`/lists/${listId}/items`);
}
