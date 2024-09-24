-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomType" TEXT NOT NULL,
    "numberOfBeds" INTEGER NOT NULL,
    "maxOccupancy" INTEGER NOT NULL,
    "oceanView" BOOLEAN NOT NULL,
    "pricePerNight" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL,
    "checkOutDate" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
