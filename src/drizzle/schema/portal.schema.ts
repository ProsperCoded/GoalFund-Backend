import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { contribution } from './contribution.schema';
import { relations } from 'drizzle-orm';

export const portal = pgTable('portal', {
  id: uuid('id').primaryKey().defaultRandom(),
  contributionId: uuid('contribution')
    .notNull()
    .references(() => contribution.id, { onDelete: 'cascade' }),
  image: text('image'),
  expiry: timestamp('expiry'),
  paymentCredentials: jsonb('payment_credentials').notNull(),
});

export const portalRelations = relations(portal, ({ one }) => ({
  contribution: one(contribution, {
    fields: [portal.contributionId],
    references: [contribution.id],
  }),
}));
