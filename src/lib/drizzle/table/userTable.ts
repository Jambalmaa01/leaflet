import {pgTable, text, uuid} from 'drizzle-orm/pg-core';

export const userTable =pgTable('users',{
    id:uuid('id').defaultRandom().primaryKey().notNull(),
    username:text('username').notNull().unique(),
    password:text('password').notNull()
})

export type UserTable = typeof userTable.$inferSelect;
export type UserTableInsert= typeof userTable.$inferInsert