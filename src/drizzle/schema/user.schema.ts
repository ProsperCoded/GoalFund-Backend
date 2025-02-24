import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid().primaryKey(),
  email: text().unique().notNull(),
  password: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),

  profileImage: text().notNull(), // profile url from cloudinary
  phoneNumber: text(), // mark as nullable
  created_at: text().notNull().default('NOW()'),
  updated_at: text()
    .notNull()
    .default('NOW()')
    .$onUpdate(() => new Date().toISOString()),
});

import { relations } from 'drizzle-orm';
import { contribution } from './contribution.schema';
import { deposit } from './deposite.schema';
import { withdrawal } from './withdrawal.schema';
import { confirmation } from './confirmation.schema';

export const userRelations = relations(user, ({ many }) => ({
  contributions: many(contribution),
  deposits: many(deposit),
  withdrawals: many(withdrawal),
  confirmations: many(confirmation),
}));
