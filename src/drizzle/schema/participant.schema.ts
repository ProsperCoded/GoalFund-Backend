import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { contribution } from './contribution.schema';
import { user } from './user.schema';
import { relations } from 'drizzle-orm';

export const expectedParticipant = pgTable('expected_participants', {
  id: uuid('id').primaryKey().defaultRandom(),
  contributionId: uuid('contribution')
    .notNull()
    .references(() => contribution.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => user.id, { onDelete: 'set null' }),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
});

export const expectedParticipantRelations = relations(
  expectedParticipant,
  ({ one }) => ({
    contribution: one(contribution, {
      fields: [expectedParticipant.contributionId],
      references: [contribution.id],
    }),
    user: one(user, {
      fields: [expectedParticipant.userId],
      references: [user.id],
    }),
  }),
);
