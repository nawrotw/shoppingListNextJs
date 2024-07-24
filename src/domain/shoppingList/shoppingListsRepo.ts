import { cache } from "@/infrastructure/cache";
import db from "@/infrastructure/db/db";
import { revalidatePath } from "next/cache";

export const getShoppingLists = cache(() => {
  return db.shoppingList.findMany({});
}, ['DB/shoppingLists']);

export const getShoppingListById = (id: string) => {
  return cache(() => {
    return db.shoppingList.findUnique({where: {id}});
  }, [`DB/shoppingLists/${id}`])()
};


const shoppingListsCacheKeys = {
  allEntities: 'DB/shoppingLists',
  particularList: 'DB/shoppingLists/:id',
}

const shoppingListsPaths = Object.values(shoppingListsCacheKeys);

export const revalidateDBShoppingLists = (id?: string) => {
  shoppingListsPaths.forEach(pathWithId => {
    const path = id ?
      pathWithId.replace(':id', id):
      pathWithId;
    console.log('[DB] revalidate: ', path)
    revalidatePath(path);
  });
}
