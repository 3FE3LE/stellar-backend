import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReservationDto: CreateReservationDto) {
    const { checkInDate, checkOutDate, guests, roomId } = createReservationDto;

    // Verificar si la habitación está disponible
    const room = await this.prisma.room.findFirst({
      where: {
        id: roomId,
        available: true,
        maxOccupancy: {
          gte: guests,
        },
        reservations: {
          none: {
            OR: [
              {
                checkInDate: {
                  lte: new Date(checkOutDate),
                },
                checkOutDate: {
                  gte: new Date(checkInDate),
                },
              },
            ],
          },
        },
      },
    });

    if (!room) {
      throw new Error('Room is not available for the selected dates');
    }
    // Crear reserva
    return this.prisma.reservation.create({
      data: {
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guests,
        roomId,
      },
    });
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
