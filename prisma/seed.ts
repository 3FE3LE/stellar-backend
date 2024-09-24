import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.room.createMany({
    data: [
      {
        roomType: 'Junior Suite',
        numberOfBeds: 1,
        maxOccupancy: 2,
        oceanView: true,
        pricePerNight: 60,
        available: true,
      },
      {
        roomType: 'King Suite',
        numberOfBeds: 2,
        maxOccupancy: 4,
        oceanView: true,
        pricePerNight: 90,
        available: true,
      },
      {
        roomType: 'Presidential Suite',
        numberOfBeds: 3,
        maxOccupancy: 6,
        oceanView: true,
        pricePerNight: 150,
        available: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
