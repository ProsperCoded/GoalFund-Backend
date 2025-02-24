import * as schema from 'src/drizzle/schema/schema';
// import { DRIZZLE_SYMBOL } from 'src/config/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InferSelectModel } from 'drizzle-orm';
export type DrizzleDB = NodePgDatabase<typeof schema>;

// Entities
export type UserEntity = InferSelectModel<typeof schema.user>;
export type ContributionEntity = InferSelectModel<typeof schema.contribution>;
export type DepositEntity = InferSelectModel<typeof schema.deposit>;
export type WithdrawalEntity = InferSelectModel<typeof schema.withdrawal>;
export type ProofEntity = InferSelectModel<typeof schema.proof>;
export type ConfirmationEntity = InferSelectModel<typeof schema.confirmation>;
export type ExpectedParticipantEntity = InferSelectModel<
  typeof schema.expectedParticipant
>;
export type PortalEntity = InferSelectModel<typeof schema.portal>;
