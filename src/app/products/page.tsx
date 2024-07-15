import ProductListClientPage from "@/app/products/pageClient";
import db from "@/infrastructure/db/db";

export default async function ProductsPage() {

  const products = await db.product.findMany({});

  return (<ProductListClientPage products={products}/>);
}
