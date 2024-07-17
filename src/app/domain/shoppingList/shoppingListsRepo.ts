import { cache } from "@/infrastructure/cache";
import db from "@/infrastructure/db/db";

export const getShoppingLists = () => db.shoppingList.findMany({});
// export const getShoppingLists = cache(() => { // TODO wkn cache for Next 15
//   return db.shoppingList.findMany({});
// }, ['shoppingLists']);

export const getShoppingListById = (id: string) => {
  return cache(() => {
    return db.shoppingList.findUnique({where: {id}});
  }, [`shoppingList_${id}`])()
};
