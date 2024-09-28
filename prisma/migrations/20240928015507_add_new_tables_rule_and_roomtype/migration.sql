/*
  Warnings:

  - You are about to drop the column `basePrice` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('WEEKEND_INCREASE', 'RENTAL_DAYS_DISCOUNT_LVL1', 'RENTAL_DAYS_DISCOUNT_LVL2', 'RENTAL_DAYS_DISCOUNT_LVL3', 'AVAILABILITY_INCREASE_LVL1', 'AVAILABILITY_INCREASE_LVL2', 'AVAILABILITY_INCREASE_LVL3');

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "basePrice",
DROP COLUMN "type",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "RoomType";

-- CreateTable
CREATE TABLE "Rule" (
    "id" SERIAL NOT NULL,
    "ruleType" "RuleType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Rule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "RoomType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
