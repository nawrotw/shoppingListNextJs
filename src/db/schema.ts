import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, boolean, } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

/*
  After schema change:
    npx drizzle-kit generate
    npx drizzle-kit migrate

  Prototyping with db push
    Drizzle Kit lets you alter your database schema and rapidly move forward with a db
    npx drizzle-kit push
 */

export enum ProductUnit {
  kg = 'kg',
  pcs = 'pcs',
}

// declaring enum in database
export const productUnitsEnum = pgEnum('productUnits', ['kg', 'pcs']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  unit: productUnitsEnum('productUnits').notNull(),
}, (entity) => ({
  nameIndex: uniqueIndex('product_name_uniq_idx').on(entity.name),
}));

export type Product = typeof products.$inferSelect; // return type when queried
export type NewProduct = typeof products.$inferInsert;

export const shoppingLists = pgTable('shopping_lists', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
}, (entity) => ({
  nameIndex: uniqueIndex('shopping_list_name_uniq_idx').on(entity.name),
}));

export const shoppingListRelations = relations(shoppingLists, ({ many }) => ({
  products: many(shoppingListProducts),
}));


export const shoppingListProducts = pgTable('shopping_lists_products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  unit: productUnitsEnum('unit').notNull(),
  checked: boolean('checked').notNull(),
  productId: integer('product_id').references(() => products.id, { onDelete: "restrict" }).notNull(),
  shoppingListId: integer('shopping_list_id').references(() => shoppingLists.id, { onDelete: "restrict" }).notNull(),
}, (entity) => ({
  nameIndex: uniqueIndex('shopping_list_product_name_uniq_idx').on(entity.name),
}));

export const shoppingListProductsRelations = relations(shoppingListProducts, ({ one }) => ({
  author: one(shoppingLists, {
    fields: [shoppingListProducts.shoppingListId],
    references: [shoppingLists.id],
  }),
}));

export type ShoppingListProduct = typeof shoppingListProducts.$inferSelect;
export type NewShoppingListProduct = typeof shoppingListProducts.$inferInsert;

export type ShoppingList = typeof shoppingLists.$inferSelect & { products?: ShoppingListProduct[] };
export type NewShoppingList = typeof shoppingLists.$inferInsert;


