"use server"

import db from "@/infrastructure/db/db"
import { z } from "zod"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const addSchema = z.object({
  name: z.string().min(1),
  unit: z.string().min(1),
});

const editSchema = addSchema.extend({});


export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log('errors', result.error.formErrors)
    return result.error.formErrors.fieldErrors
  }

  const { name, unit } = result.data;

  let product = await db.product.create({
    data: {
      name: name,
      unit: unit,
    }
  });

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/products"); // TODO wkn pass from parameters?
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log('parse failed', result.error);
    return result.error.formErrors.fieldErrors
  }

  const { name, unit } = result.data
  const product = await db.product.findUnique({ where: { id } })

  if (product == null) return notFound();

  await db.product.update({
    where: { id },
    data: {
      name: name,
      unit: unit,
    },
  })

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/products");
}


export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } })

  if (product == null) return notFound()

  revalidatePath("/")
  revalidatePath("/products")

  redirect("/products");
}
