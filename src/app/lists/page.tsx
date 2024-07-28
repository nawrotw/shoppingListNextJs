import { ShoppingListsView } from "@/app/lists/_components/ShoppingListsView";
import { shoppingListsRepo } from "@/domain/shoppingList/ShoppingListsRepo";

// export const runtime = 'nodejs';

export default async function ListPage() {

  const lists = await shoppingListsRepo.findAll();

  return (<ShoppingListsView lists={lists}/>);
}
