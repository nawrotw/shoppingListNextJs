import { SQL, inArray, sql } from "drizzle-orm";
import { shoppingListProducts } from "@/db/schema";
import { db } from "@/db/db";

export const updateMany = async (inputs: Array<number>) => {

  // You have to be sure that inputs array is not empty
  if (inputs.length === 0) {
    return;
  }

  const sqlChunks: SQL[] = [];
  const ids: number[] = [];
  sqlChunks.push(sql`(case`);
  for (const [index, id] of inputs.entries()) {
    sqlChunks.push(sql`when ${shoppingListProducts.id} = ${id} then ${index}::smallint`);
    ids.push(id);
  }
  sqlChunks.push(sql`end)`);
  const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
  await db
    .update(shoppingListProducts)
    .set({ order: finalSql })
    .where(inArray(shoppingListProducts.id, ids));
}
