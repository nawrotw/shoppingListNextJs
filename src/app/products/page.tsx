import ProductListView from "@/app/products/_components/ProductListView";
import db from "@/infrastructure/db/db";

export default async function ProductsPage() {

  const products = await db.product.findMany({});

  return (<ProductListView products={products}/>);
}
