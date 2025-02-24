import { pgTable, uuid, boolean } from 'drizzle-orm/pg-core';
import { proof } from './proof.schema';
import { user } from './user.schema';
import { relations } from 'drizzle-orm';

export const confirmation = pgTable('confirmations', {
  id: uuid('id').primaryKey().defaultRandom(),
  proofId: uuid('proof_id')
    .notNull()
    .references(() => proof.id, { onDelete: 'cascade' }),
  reviewedBy: uuid('reviewed_by')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  confirmed: boolean('confirmed').notNull(),
});

export const confirmationRelations = relations(confirmation, ({ one }) => ({
  proof: one(proof, {
    fields: [confirmation.proofId],
    references: [proof.id],
  }),
  reviewer: one(user, {
    fields: [confirmation.reviewedBy],
    references: [user.id],
  }),
}));
