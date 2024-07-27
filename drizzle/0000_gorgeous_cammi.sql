DO $$ BEGIN
 CREATE TYPE "public"."productUnits" AS ENUM('kg', 'pcs');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"productUnits" "productUnits" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_lists_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"unit" "productUnits" NOT NULL,
	"checked" boolean NOT NULL,
	"product_id" integer NOT NULL,
	"shopping_list_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_lists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_lists_products" ADD CONSTRAINT "shopping_lists_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_lists_products" ADD CONSTRAINT "shopping_lists_products_shopping_list_id_shopping_lists_id_fk" FOREIGN KEY ("shopping_list_id") REFERENCES "public"."shopping_lists"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_name_uniq_idx" ON "products" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "shopping_list_product_name_uniq_idx" ON "shopping_lists_products" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "shopping_list_name_uniq_idx" ON "shopping_lists" USING btree ("name");