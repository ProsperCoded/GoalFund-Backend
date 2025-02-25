import { pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const user = pgTable('user', {
  id: uuid().defaultRandom().primaryKey(),
  email: text().unique().notNull(),
  password: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),

  profileImage: text(), // profile url from cloudinary
  phoneNumber: text().notNull(),
  created_at: text().default(sql`NOW()`),
  updated_at: text()
    .default(sql`NOW()`)
    .$onUpdate(() => new Date().toISOString()),
});

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
