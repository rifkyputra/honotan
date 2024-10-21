import { bigserial, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userSchema = pgTable('user', {
    id: bigserial('id', {mode:'number'}).primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 65 }).notNull(),
    reset_token: varchar('reset_token', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

