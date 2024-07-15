import { ProductFormView } from "@/app/products/_components/ProductFormView";

export default async function NewProductPage({ params: { id } }: { params: { id: string } }) {

  return <ProductFormView/>
}
