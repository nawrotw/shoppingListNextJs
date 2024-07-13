"use server"

import db from "@/infrastructure/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { wait } from "@/utils/wait";

const addSchema = z.object({
  name: z.string().min(1),
});

const editSchema = addSchema.extend({});


export async function createShoppingList(prevState: unknown, formData: FormData) {
  await wait(200);
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log('errors', result.error.formErrors)
    return result.error.formErrors.fieldErrors
  }

  const { name } = result.data;

  console.log("List.name:", name);
  let product = await db.shoppingList.create({
    data: {
      name: name,
      products: []
    }
  });

  console.log('Product', product);

  revalidatePath("/")
  revalidatePath("/lists")

  redirect("/")
}

export async function updateShoppingList(
  id: string,
  prevState: unknown,
  formData: FormData
) {

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    return result.error.formErrors.fieldErrors
  }

  const { name } = result.data
  const list = await db.shoppingList.findUnique({ where: { id } })

  if (list == null) return notFound();

  await db.product.update({
    where: { id },
    data: {
      name: name,
    },
  })

  revalidatePath("/")
  revalidatePath("/lists")

  redirect("/")
}


export async function deleteShoppingList(id: string) {
  const list = await db.shoppingList.delete({ where: { id } })

  if (list == null) return notFound()

  revalidatePath("/")
  revalidatePath("/lists")
}
