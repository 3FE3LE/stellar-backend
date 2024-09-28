import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Buscar o crear Room Types
  const juniorSuite = await prisma.roomType.create({
    data: {
      name: 'Junior Suite',
      basePrice: 60,
      description: 'A comfortable junior suite with basic amenities.',
    },
  });

  const kingSuite = await prisma.roomType.create({
    data: {
      name: 'King Suite',
      basePrice: 90,
      description:
        'A spacious suite with a king-sized bed and luxury amenities.',
    },
  });

  const presidentialSuite = await prisma.roomType.create({
    data: {
      name: 'Presidential Suite',
      basePrice: 150,
      description: 'The best suite with ocean view and all premium services.',
    },
  });

  // Crear Rooms
  await prisma.room.createMany({
    data: [
      {
        typeId: juniorSuite.id,
        beds: 1,
        maxOccupancy: 2,
        oceanView: false,
      },
      {
        typeId: kingSuite.id,
        beds: 1,
        maxOccupancy: 3,
        oceanView: true,
      },
      {
        typeId: presidentialSuite.id,
        beds: 2,
        maxOccupancy: 4,
        oceanView: true,
      },
    ],
  });

  // Crear Rules
  await prisma.rule.createMany({
    data: [
      {
        ruleType: 'WEEKEND_INCREASE',
        value: 25,
        description: 'Increase of 25% on weekends.',
      },
      {
        ruleType: 'RENTAL_DAYS_DISCOUNT_LVL1',
        value: -4,
        description: 'Discount of $4 per day for 4-6 days rental.',
      },
      {
        ruleType: 'RENTAL_DAYS_DISCOUNT_LVL2',
        value: -8,
        description: 'Discount of $8 per day for 7-9 days rental.',
      },
      {
        ruleType: 'AVAILABILITY_INCREASE_LVL1',
        value: 2,
        description: 'Increase of 2% for 60%-79% availability.',
      },
      {
        ruleType: 'AVAILABILITY_INCREASE_LVL2',
        value: 5,
        description: 'Increase of 5% for 40%-59% availability.',
      },
      {
        ruleType: 'AVAILABILITY_INCREASE_LVL3',
        value: 10,
        description: 'Increase of 10% for 20%-39% availability.',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
