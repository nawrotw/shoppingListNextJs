'use server';

import { db } from "@/db/db";
import { products, NewProduct, NewShoppingList, shoppingLists, NewShoppingListProduct, Product, shoppingListProducts } from "@/db/schema";
import { revalidateDBProducts } from "@/domain/products/ProductsRepo";
import { revalidateDBShoppingLists } from "@/domain/shoppingList/ShoppingListsRepo";

const shoppingListData: Array<NewShoppingList> = [
  { name: 'Shopping List' }
]

const productsData: Array<NewProduct> = [
  { name: 'Jabłka', unit: "kg" },
  { name: 'Humus', unit: "pcs" },
  { name: 'Chleb', unit: "pcs" },
  { name: 'Wędlina', unit: "kg" },
  { name: 'Papryka', unit: "kg" },
  { name: 'Awokado', unit: "kg" },
  { name: 'Ogórek', unit: "kg" },
  { name: 'Czosnek', unit: "kg" },
  { name: 'Wołowina', unit: "kg" },
  { name: 'Żel pod prysznic', unit: "pcs" },
  { name: 'Marchew', unit: "kg" },
  { name: 'Pomarańcza', unit: "kg" },
  { name: 'Pomidor', unit: "kg" },
  { name: 'Sok z jabłek 5L', unit: "pcs" },
  { name: 'Cytryny', unit: "kg" },
  { name: 'Kurkuma', unit: "kg" },
  { name: 'Banany', unit: "kg" },
  { name: 'Alprobarista', unit: "pcs" },
  { name: 'Imbir', unit: "kg" },
]

export async function initProducts(): Promise<Product[]> {
  console.group('initProducts');
  let productEntities = await db.query.products.findMany();
  if (productEntities.length > 0) {
    console.info(`Products DB already initialized (${productEntities.length} found)`);
    console.groupEnd();
    return productEntities;
  }

  await db.insert(products).values(productsData);
  revalidateDBProducts();
  productEntities = await db.query.products.findMany();
  console.log('inserted Products count:', productEntities.length);
  console.groupEnd();
  return productEntities;
}

export async function initShoppingList(productEntities: Product[]) {
  console.group('initShoppingList');

  const listEntities = await db.query.shoppingLists.findMany(); // no cache
  if (listEntities.length > 0) {
    console.info(`ShoppingList DB already initialized (${listEntities.length} found)`);
    console.groupEnd();
    return;
  }

  const [insertResult] = await db.insert(shoppingLists).values(shoppingListData).returning();
  const shoppingListId = insertResult.id
  console.log(`Inserted ShoppingList id: ${shoppingListId}, products count: ${productEntities.length}`);

  const shoppingListProductsData: Array<NewShoppingListProduct> = productEntities
    .map(({ id, name, unit }, index) => {
      return {
        name,
        unit,
        checked: false,
        order: index,
        productId: id,
        shoppingListId: shoppingListId,
      }
    });

  await db.insert(shoppingListProducts).values(shoppingListProductsData);

  revalidateDBShoppingLists();
  console.groupEnd();
}

export async function initDb() {
  const productEntities = await initProducts();
  await initShoppingList(productEntities);
}
