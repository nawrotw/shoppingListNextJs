import db from "@/infrastructure/db/db";
import ListClientPage from "@/app/(lists)/pageClient";

export default async function ListPage() {

  const lists = await db.shoppingList.findMany({});

  return (<ListClientPage lists={lists} />);
}
