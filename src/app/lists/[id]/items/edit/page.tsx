import { ShoppingListEditProductsView } from "@/app/lists/[id]/items/edit/ShoppingListEditProductsView";
import { shoppingListsRepo } from "@/domain/shoppingList/ShoppingListsRepo";
import { productsRepo } from "@/domain/products/ProductsRepo";

export default async function AddProductsPage({ params: { id } }: { params: { id: string } }) {

  const list = await shoppingListsRepo.findById(parseInt(id));
  const products = await productsRepo.findAll();

  if (!list) throw new Error(`Missing list for id: ${id}. Should not happen!`);

  return (<ShoppingListEditProductsView list={list} products={products}/>);
}
