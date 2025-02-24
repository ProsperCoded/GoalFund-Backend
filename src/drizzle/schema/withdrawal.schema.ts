import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { contribution } from './contribution.schema';
import { user } from './user.schema';
import { proof } from './proof.schema';

export const withdrawalStatusEnum = pgEnum('withdrawal_status', [
  'pending',
  'approved',
  'rejected',
]);
export const withdrawalPurposeEnum = pgEnum('withdrawal_purpose', [
  'accomplished',
  'pending',
]);

export const withdrawal = pgTable('withdrawals', {
  id: uuid('id').primaryKey().defaultRandom(),
  contributionId: uuid('contribution')
    .notNull()
    .references(() => contribution.id, { onDelete: 'cascade' }),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  date: timestamp('date').defaultNow(),
  amount: numeric('amount').notNull(),
  status: withdrawalStatusEnum('status').notNull().default('pending'),
  purpose: withdrawalPurposeEnum('purpose').notNull(),
});

import { relations } from 'drizzle-orm';

export const withdrawalRelations = relations(withdrawal, ({ one, many }) => ({
  contribution: one(contribution, {
    fields: [withdrawal.contributionId],
    references: [contribution.id],
  }),
  user: one(user, {
    fields: [withdrawal.userId],
    references: [user.id],
  }),
  proofs: many(proof),
}));
