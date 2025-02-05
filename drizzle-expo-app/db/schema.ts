import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  age: int("age").notNull(),
  email: text("email").notNull().unique(),
});

// Export the schema for use in migrations
export type UsersTable = typeof usersTable;
