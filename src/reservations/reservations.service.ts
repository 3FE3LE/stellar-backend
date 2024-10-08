import { calculateTotalPrice, getRuleValues } from 'src/helpers';

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}
  async create(createReservationDto: CreateReservationDto) {
    const { checkIn, checkOut, guests, roomId } = createReservationDto;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    checkInDate.setDate(checkInDate.getDate() + 1);
    checkOutDate.setDate(checkOutDate.getDate() + 1);

    // Verificar si la habitación existe y tiene suficiente capacidad
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      include: { reservations: true },
    });

    if (!room) {
      throw new NotFoundException('La habitación no existe');
    }

    if (room.maxOccupancy < guests) {
      throw new Error(
        'El número de huéspedes excede la capacidad máxima de la habitación',
      );
    }

    // Calcular el porcentaje de disponibilidad de la habitación
    const totalRooms = await this.prisma.room.count({
      where: { typeId: room.typeId },
    });
    const reservedRooms = await this.prisma.room.count({
      where: {
        typeId: room.typeId,
        reservations: {
          some: {
            checkIn: { lt: checkOut },
            checkOut: { gt: checkIn },
          },
        },
      },
    });

    const availabilityPercentage =
      ((totalRooms - reservedRooms) / totalRooms) * 100;

    const roomType = await this.prisma.roomType.findUnique({
      where: { id: room.typeId },
    });

    const rules = await this.prisma.rule.findMany();

    const pricingRules = getRuleValues(rules);

    // Calcular el precio dinámico
    const totalPrice = calculateTotalPrice({
      roomType,
      checkInDate,
      checkOutDate,
      availabilityPercentage,
      rules: pricingRules,
    });

    // Crear la reserva
    const newReservation = await this.prisma.reservation.create({
      data: {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        roomId,
        totalPrice,
      },
    });

    return newReservation;
  }
  // get all reservations with room and room type
  findAll() {
    return this.prisma.reservation.findMany({
      include: {
        room: {
          include: { type: true },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.reservation.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.prisma.reservation.update({
      where: {
        id,
      },
      data: updateReservationDto,
    });
  }

  remove(id: number) {
    return this.prisma.reservation.delete({
      where: {
        id,
      },
    });
  }
}
