import { describe, it, expect } from "vitest";
import { ShoppingListProduct, Product } from "@/db/schema";
import { shoppingListProductsUpdate } from "@/domain/shoppingList/shoppingListUtils";

describe('ShoppingList.products', () => {

  it('should add new to the bottom', () => {
    const current: ShoppingListProduct[] = [
      { id: 1, name: 'Product1', unit: 'pcs', checked: false, order: 0, productId: 1, shoppingListId: 1 },
      { id: 2, name: 'Product2', unit: 'pcs', checked: false, order: 1, productId: 2, shoppingListId: 1 },
    ];
    const updatedProducts: Product[] = [
      { id: 1, name: 'Product1', unit: 'pcs' },
      { id: 2, name: 'Product2', unit: 'pcs' },
      { id: 3, name: 'Product3', unit: 'pcs' },
    ];
    expect(shoppingListProductsUpdate(1, current, updatedProducts))
      .toEqual([
        { id: 1, name: 'Product1', unit: 'pcs', checked: false, order: 0, productId: 1, shoppingListId: 1 },
        { id: 2, name: 'Product2', unit: 'pcs', checked: false, order: 1, productId: 2, shoppingListId: 1 },
        // id: 3 will be created by DB after commit
        { name: 'Product3', unit: 'pcs', checked: false, order: 2, productId: 3, shoppingListId: 1 },
      ]);
  });

  it('should remove and re-calculate order', () => {
    const current: ShoppingListProduct[] = [
      { id: 1, name: 'Product1', unit: 'pcs', checked: false, order: 0, productId: 1, shoppingListId: 1 },
      { id: 2, name: 'Product2', unit: 'pcs', checked: false, order: 1, productId: 2, shoppingListId: 1 },
      { id: 3, name: 'Product3', unit: 'pcs', checked: false, order: 2, productId: 3, shoppingListId: 1 },
    ];
    const updatedProducts: Product[] = [
      { id: 1, name: 'Product1', unit: 'pcs' },
      { id: 3, name: 'Product3', unit: 'pcs' },
    ];
    expect(shoppingListProductsUpdate(1, current, updatedProducts))
      .toEqual([
        { id: 1, name: 'Product1', unit: 'pcs', checked: false, order: 0, productId: 1, shoppingListId: 1 },
        { id: 3, name: 'Product3', unit: 'pcs', checked: false, order: 1, productId: 3, shoppingListId: 1 },
      ]);
  });
});
