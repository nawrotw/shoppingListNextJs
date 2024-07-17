"use server"

import db from "@/infrastructure/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { ShoppingListProduct, Product } from "@prisma/client";
import { revalidateShoppingListsPaths } from "@/domain/shoppingList/shoppingListPaths";

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

  await db.shoppingList.create({
    data: {
      name: name,
      products: []
    }
  });

  revalidateShoppingListsPaths();

  redirect("/");
}

export async function updateShoppingList(
  id: string,
  _prevState: unknown,
  formData: FormData
) {

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const { name } = result.data
  const list = await db.shoppingList.findUnique({ where: { id } })

  if (list == null) return notFound();

  await db.shoppingList.update({
    where: { id },
    data: {
      name: name,
    },
  });

  revalidateShoppingListsPaths();
  redirect("/");
}


export async function deleteShoppingList(id: string) {
  const list = await db.shoppingList.delete({ where: { id } })

  if (list == null) return notFound()

  revalidateShoppingListsPaths();
  redirect("/");
}

// =============================
// === ShoppingList.Products ===
// =============================
export async function shoppingListUpdateProductChecked(listId: string, productId: string, checked: boolean) {
  if (!listId) return notFound();

  const shoppingList = await db.shoppingList.findUnique({ where: { id: listId } });
  if (!shoppingList) return notFound();

  await db.shoppingList.update({
    where: { id: listId },
    data: {
      products: shoppingList.products.map((product) => ({
          ...product,
          checked: product.productId === productId ? checked : product.checked
        })
      ),
    },
  })

  revalidateShoppingListsPaths(listId);
}

export async function shoppingListUpdateProducts(listId: string, products: Product[]) {
  if (!listId) {
    return notFound(); // requestError
  }
  if (!products) {
    return notFound(); // requestError
  }

  const shoppingList = await db.shoppingList.findUnique({ where: { id: listId } });
  if (!shoppingList) {
    return notFound();
  }

  const listProducts: ShoppingListProduct[] = products.map(({ id, name, unit }) => {
    const existingProduct = shoppingList.products.find(existingProduct => existingProduct.productId === id);
    if (existingProduct) { // we want to preserve Products which are already on the list (could have been already checked)
      return existingProduct;
    }
    return {
      productId: id,
      name,
      unit,
      checked: false
    }
  });
  await db.shoppingList.update({
    where: { id: listId },
    data: {
      products: listProducts,
    },
  })

  revalidateShoppingListsPaths(listId);
  redirect(`/${listId}/items`);
}
