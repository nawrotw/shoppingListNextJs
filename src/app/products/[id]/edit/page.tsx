import db from "@/infrastructure/db/db";
import { ProductFormView } from "@/app/products/_components/ProductFormView";

export default async function EditProductPage({ params: { id } }: { params: { id: string } }) {

  const product = await db.product.findUnique({ where: { id: id } });

  return <ProductFormView product={product}/>
}
