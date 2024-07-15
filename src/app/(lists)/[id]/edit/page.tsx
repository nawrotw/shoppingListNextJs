import db from "@/infrastructure/db/db";
import { ShoppingListFormView } from "@/app/(lists)/_components/ShoppingListFormView";

export default async function EditShoppingListPage({ params: { id } }: { params: { id: string } }) {

  const shoppingList = await db.shoppingList.findUnique({where: { id: id }});

  return <ShoppingListFormView list={shoppingList}/>
}
