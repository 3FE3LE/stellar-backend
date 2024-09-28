/*
  Warnings:

  - The values [RENTAL_DAYS_DISCOUNT_LVL3] on the enum `RuleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RuleType_new" AS ENUM ('WEEKEND_INCREASE', 'RENTAL_DAYS_DISCOUNT_LVL1', 'RENTAL_DAYS_DISCOUNT_LVL2', 'AVAILABILITY_INCREASE_LVL1', 'AVAILABILITY_INCREASE_LVL2', 'AVAILABILITY_INCREASE_LVL3');
ALTER TABLE "Rule" ALTER COLUMN "ruleType" TYPE "RuleType_new" USING ("ruleType"::text::"RuleType_new");
ALTER TYPE "RuleType" RENAME TO "RuleType_old";
ALTER TYPE "RuleType_new" RENAME TO "RuleType";
DROP TYPE "RuleType_old";
COMMIT;
