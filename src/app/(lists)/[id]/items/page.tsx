import db from "@/infrastructure/db/db";
import { ShoppingListItemsView } from "@/app/(lists)/[id]/items/ListItemsView";

export default async function ShoppingListItemsPage({ params: { id } }: { params: { id: string } }) {

  const list = await db.shoppingList.findUnique({where: {id}});

  return <>
    {!list && <p>List not found</p>}
    {list && <ShoppingListItemsView list={list} />}
    </>;
}
