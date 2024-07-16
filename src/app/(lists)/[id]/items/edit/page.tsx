import db from "@/infrastructure/db/db";
import { ShoppingListEditProductsView } from "@/app/(lists)/[id]/items/edit/ShoppingListEditProductsView";

export default async function AddProductsPage({ params: { id } }: { params: { id: string } }) {

  const list = await db.shoppingList.findUnique({where: {id}});
  const products = await db.product.findMany({});

  if(!list) throw new Error(`Missing list for id: ${id}. Should not happen!`);

  return (<ShoppingListEditProductsView list={list} products={products}/>);
}
