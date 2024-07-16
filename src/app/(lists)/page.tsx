import db from "@/infrastructure/db/db";
import { ShoppingListsView } from "@/app/(lists)/_components/ShoppingListsView";

export default async function ListPage() {

  const lists = await db.shoppingList.findMany({});

  return (<ShoppingListsView lists={lists}/>);
}
