import { PrismaClient, RoomType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Datos de habitaciones (Rooms)
  const rooms = [
    {
      type: RoomType.JUNIOR,
      beds: 2,
      maxOccupancy: 4,
      oceanView: true,
      basePrice: 60.0,
    },
    {
      type: RoomType.KING,
      beds: 1,
      maxOccupancy: 2,
      oceanView: false,
      basePrice: 90.0,
    },
    {
      type: RoomType.PRESIDENTIAL,
      beds: 3,
      maxOccupancy: 6,
      oceanView: true,
      basePrice: 150.0,
    },
  ];

  // Crea las habitaciones en la base de datos
  for (const room of rooms) {
    await prisma.room.create({
      data: room,
    });
  }

  console.log('Habitaciones creadas.');

  // Datos de reservas (Reservations)
  const reservations = [
    {
      checkIn: new Date('2024-09-25'),
      checkOut: new Date('2024-09-28'),
      guests: 2,
      roomId: 1, // ID de la habitación
      totalPrice: 180.0, // Ejemplo de precio dinámico
    },
    {
      checkIn: new Date('2024-10-01'),
      checkOut: new Date('2024-10-05'),
      guests: 1,
      roomId: 2,
      totalPrice: 340.0,
    },
    {
      checkIn: new Date('2024-11-12'),
      checkOut: new Date('2024-11-14'),
      guests: 4,
      roomId: 3,
      totalPrice: 300.0,
    },
  ];

  // Crea las reservas en la base de datos
  for (const reservation of reservations) {
    await prisma.reservation.create({
      data: reservation,
    });
  }

  console.log('Reservas creadas.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
