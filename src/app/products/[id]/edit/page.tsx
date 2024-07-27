import { ProductFormView } from "@/app/products/_components/ProductFormView";
import { productsRepo } from "@/domain/products/productsRepo";

export default async function EditProductPage({ params: { id } }: { params: { id: string } }) {

  const product = await productsRepo.findById(parseInt(id));

  return <ProductFormView product={product}/>
}
