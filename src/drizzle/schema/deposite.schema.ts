import {
  pgTable,
  uuid,
  varchar,
  numeric,
  timestamp,
} from 'drizzle-orm/pg-core';
import { contribution } from './contribution.schema';
import { user } from './user.schema';
import { relations } from 'drizzle-orm';

export const deposit = pgTable('deposits', {
  id: uuid('id').primaryKey().defaultRandom(),
  contributionId: uuid('contribution')
    .notNull()
    .references(() => contribution.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => user.id, { onDelete: 'set null' }),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  amount: numeric('amount').notNull(),
  date: timestamp('date').defaultNow(),
});

export const depositRelations = relations(deposit, ({ one }) => ({
  contribution: one(contribution, {
    fields: [deposit.contributionId],
    references: [contribution.id],
  }),
  user: one(user, {
    fields: [deposit.userId],
    references: [user.id],
  }),
}));
