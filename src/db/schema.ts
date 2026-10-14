import { integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const rolesEnum = pgEnum('role', ['INTERN', 'ENGINEER', 'ADMIN'])

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const employees = pgTable("employees", {
   id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
   name: text('name').notNull(),
   regnumber: integer('regnumber').unique().notNull(),
   role: rolesEnum().default("INTERN"),
   createdAt: timestamp('created_at').defaultNow(),
   updatedAt: timestamp('updated_at')
})