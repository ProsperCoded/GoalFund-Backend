import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { user } from './user.schema';
import { deposit } from './deposite.schema';
import { withdrawal } from './withdrawal.schema';
import { expectedParticipant } from './participant.schema';
import { portal } from './portal.schema';

export const contributionTypeEnum = pgEnum('contribution_type', [
  'open',
  'closed',
]);
export const contributionVisibilityEnum = pgEnum('contribution_visibility', [
  'public',
  'private',
]);

export const contribution = pgTable('contributions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organiserId: uuid('organiser')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: contributionTypeEnum('type').notNull(),
  expiry: timestamp('expiry'),
  visibility: contributionVisibilityEnum('visibility').notNull(),
  minAmount: numeric('min_amount').default('0'),
  specificAmount: numeric('specific_amount'),
  goal: text('goal').notNull(),
  description: text('description').notNull(),
  balance: numeric('balance').default('0'),
});

import { relations } from 'drizzle-orm';

export const contributionRelations = relations(
  contribution,
  ({ one, many }) => ({
    organiser: one(user, {
      fields: [contribution.organiserId],
      references: [user.id],
    }),
    deposits: many(deposit),
    withdrawals: many(withdrawal),
    expectedParticipants: many(expectedParticipant),
    portal: one(portal),
  }),
);
