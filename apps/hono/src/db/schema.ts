import {  mysqlTable, int, varchar } from 'drizzle-orm/mysql-core';

export const users  = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    username: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    address: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 255 }).notNull(),
});

export const auth = mysqlTable('auth', {
    key: varchar({ length: 255 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;