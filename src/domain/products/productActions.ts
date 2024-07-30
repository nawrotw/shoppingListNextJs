"use server"

import { z } from "zod"
import { redirect } from "next/navigation"
import { db } from "@/db/db";
import { products, ProductUnit } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateDBProducts } from "@/domain/products/ProductsRepo";


const addSchema = z.object({
  name: z.string().min(1),
  unit: z.nativeEnum(ProductUnit),
});

const editSchema = addSchema.extend({});


export async function addProduct(_prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log('errors', result.error.formErrors)
    return result.error.formErrors.fieldErrors
  }

  await db.insert(products).values(result.data);

  revalidateDBProducts();

  redirect("/products"); // TODO wkn pass from parameters?
}

export async function updateProduct(
  id: number,
  _prevState: unknown,
  formData: FormData
) {

  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  if (!result.success) {
    console.log('parse failed', result.error);
    return result.error.formErrors.fieldErrors
  }

  await db.update(products)
    .set(result.data)
    .where(eq(products.id, id));

  revalidateDBProducts(id);

  redirect("/products");
}


export async function deleteProduct(id: number) {

  db.delete(products).where(eq(products.id, id));
  // if (product == null) return notFound() ?? needed

  revalidateDBProducts(id);


  redirect("/products");
}
