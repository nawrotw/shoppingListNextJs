import { ShoppingListProduct, Product, NewShoppingListProduct } from "@/db/schema";

export const shoppingListProductsUpdate = (
  listId: number,
  currentProducts: ShoppingListProduct[],
  finalProducts: Product[]
): NewShoppingListProduct[] => {

  // find new Products
  const newProducts: Product[] = finalProducts.filter(({ id }) => !currentProducts.some(({ productId }) => productId === id));

  // find list current Products, which aren't removed
  const survivedProducts = currentProducts.filter(({ productId }) => finalProducts.some(({ id }) => id === productId));

  return [
    ...survivedProducts,
    ...newProducts.map(({ id, name, unit }) => ({
      name,
      unit,
      checked: false,
      order: -1, // temporary
      productId: id,
      shoppingListId: listId
    }))
  ].map((product, index) => ({ ...product, order: index }))  // update temporary order
}
