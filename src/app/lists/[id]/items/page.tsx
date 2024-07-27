import { ShoppingListItemsView } from "@/app/lists/[id]/items/ListItemsView";
import { shoppingListsRepo } from "@/domain/shoppingList/shoppingListsRepo";

export default async function ShoppingListItemsPage({ params: { id } }: { params: { id: string } }) {

  const list = await shoppingListsRepo.findById(parseInt(id));

  return <>
    {!list && <p>List not found</p>}
    {list && <ShoppingListItemsView list={list}/>}
  </>;
}
