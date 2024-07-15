import db from "@/infrastructure/db/db";
import ListsView from "@/app/(lists)/_components/ShoppingListsView";

export default async function ListPage() {

  const lists = await db.shoppingList.findMany({});

  return (<ListsView lists={lists} />);
}
