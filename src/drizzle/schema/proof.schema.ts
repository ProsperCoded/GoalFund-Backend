import { pgTable, uuid, timestamp, varchar, text } from 'drizzle-orm/pg-core';
import { withdrawal } from './withdrawal.schema';

export const proof = pgTable('proofs', {
  id: uuid('id').primaryKey().defaultRandom(),
  withdrawalId: uuid('withdrawal_id')
    .notNull()
    .references(() => withdrawal.id, { onDelete: 'cascade' }),
  date: timestamp('date').defaultNow(),
  heading: varchar('heading').notNull(),
  body: text('body').notNull(),
  images: text('images').array().notNull().default([]),
});

import { relations } from 'drizzle-orm';
import { confirmation } from './confirmation.schema';

export const proofRelations = relations(proof, ({ one, many }) => ({
  withdrawal: one(withdrawal, {
    fields: [proof.withdrawalId],
    references: [withdrawal.id],
  }),
  confirmations: many(confirmation),
}));
