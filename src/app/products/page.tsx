import ProductListView from "@/app/products/_components/ProductListView";
import { productsRepo } from "@/domain/products/ProductsRepo";

export default async function ProductsPage() {

  const products = await productsRepo.findAll();

  return (<ProductListView products={products}/>);
}
