import { revalidatePath } from "next/cache";

const shoppingListsPages = {
  shoppingLists: '/',
  shoppingListProducts: '/:id/items',
  shoppingListProductsEdit: '/:id/items/edit',
}

const shoppingListsPaths = Object.values(shoppingListsPages);

export const revalidateShoppingListsPaths = (id?: string) => {
  shoppingListsPaths.forEach(pathWithId => {
    const path = id ?
      pathWithId.replace(':id', id):
      pathWithId;
    console.log('revalidate: ', path)
    revalidatePath(path);
  });
}
