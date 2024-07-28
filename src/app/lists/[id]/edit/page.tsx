import { ShoppingListFormView } from "@/app/lists/_components/ShoppingListFormView";
import { shoppingListsRepo } from "@/domain/shoppingList/ShoppingListsRepo";

export default async function EditShoppingListPage({ params: { id } }: { params: { id: string } }) {

  const shoppingList = await shoppingListsRepo.findById(parseInt(id));

  return <ShoppingListFormView list={shoppingList}/>
}
