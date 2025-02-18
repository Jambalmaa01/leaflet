import { pgTable, PgTable, text, uuid } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  category: text("category").notNull(),
});

export type CategoryTable = typeof categoryTable.$inferInsert;
export type CategoryTableInsert = typeof categoryTable.$inferInsert;
