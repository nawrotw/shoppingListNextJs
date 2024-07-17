import { ShoppingListsView } from "@/app/(lists)/_components/ShoppingListsView";
import { getShoppingLists } from "@/domain/shoppingList/shoppingListsRepo";

export default async function ListPage() {

  const lists = await getShoppingLists();

  return (<ShoppingListsView lists={lists}/>);
}
