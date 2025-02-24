CREATE TYPE "public"."contribution_type" AS ENUM('open', 'closed');--> statement-breakpoint
CREATE TYPE "public"."contribution_visibility" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."withdrawal_purpose" AS ENUM('accomplished', 'pending');--> statement-breakpoint
CREATE TYPE "public"."withdrawal_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"profileImage" text NOT NULL,
	"phoneNumber" text,
	"created_at" text DEFAULT 'NOW()' NOT NULL,
	"updated_at" text DEFAULT 'NOW()' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "contributions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organiser" uuid NOT NULL,
	"type" "contribution_type" NOT NULL,
	"expiry" timestamp,
	"visibility" "contribution_visibility" NOT NULL,
	"min_amount" numeric DEFAULT '0',
	"specific_amount" numeric,
	"goal" text NOT NULL,
	"description" text NOT NULL,
	"balance" numeric DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "deposits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contribution" uuid NOT NULL,
	"user_id" uuid,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"amount" numeric NOT NULL,
	"date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "withdrawals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contribution" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"date" timestamp DEFAULT now(),
	"amount" numeric NOT NULL,
	"status" "withdrawal_status" DEFAULT 'pending' NOT NULL,
	"purpose" "withdrawal_purpose" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proofs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"withdrawal_id" uuid NOT NULL,
	"date" timestamp DEFAULT now(),
	"heading" varchar NOT NULL,
	"body" text NOT NULL,
	"images" text[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "confirmations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"proof_id" uuid NOT NULL,
	"reviewed_by" uuid NOT NULL,
	"confirmed" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expected_participants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contribution" uuid NOT NULL,
	"user_id" uuid,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contribution" uuid NOT NULL,
	"image" text,
	"expiry" timestamp,
	"payment_credentials" jsonb NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contributions" ADD CONSTRAINT "contributions_organiser_user_id_fk" FOREIGN KEY ("organiser") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_contribution_contributions_id_fk" FOREIGN KEY ("contribution") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_contribution_contributions_id_fk" FOREIGN KEY ("contribution") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "withdrawals" ADD CONSTRAINT "withdrawals_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proofs" ADD CONSTRAINT "proofs_withdrawal_id_withdrawals_id_fk" FOREIGN KEY ("withdrawal_id") REFERENCES "public"."withdrawals"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "confirmations" ADD CONSTRAINT "confirmations_proof_id_proofs_id_fk" FOREIGN KEY ("proof_id") REFERENCES "public"."proofs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "confirmations" ADD CONSTRAINT "confirmations_reviewed_by_user_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expected_participants" ADD CONSTRAINT "expected_participants_contribution_contributions_id_fk" FOREIGN KEY ("contribution") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expected_participants" ADD CONSTRAINT "expected_participants_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portal" ADD CONSTRAINT "portal_contribution_contributions_id_fk" FOREIGN KEY ("contribution") REFERENCES "public"."contributions"("id") ON DELETE cascade ON UPDATE no action;