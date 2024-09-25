/*
  Warnings:

  - You are about to drop the column `checkInDate` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutDate` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `available` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfBeds` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerNight` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `roomType` on the `Room` table. All the data in the column will be lost.
  - Added the required column `checkIn` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkOut` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "checkInDate",
DROP COLUMN "checkOutDate",
ADD COLUMN     "checkIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "checkOut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "available",
DROP COLUMN "numberOfBeds",
DROP COLUMN "pricePerNight",
DROP COLUMN "roomType",
ADD COLUMN     "basePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "oceanView" SET DEFAULT false;
