import ProductListView from "@/app/products/_components/ProductListView";
import { productsRepo } from "@/domain/products/productsRepo";

export default async function ProductsPage() {

  const products = await db.product.findMany({});

  return (<ProductListView products={products}/>);
}
