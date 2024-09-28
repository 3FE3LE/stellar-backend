import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateRoomDto } from './dto/create-room.dto';
import { SearchRoomsDto } from './dto/search-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}

  async findAvailableRooms(searchRoomsDto: SearchRoomsDto) {
    const { checkInDate, checkOutDate, guests, roomTypeId } = searchRoomsDto;

    const checkIn = new Date(new Date(checkInDate).getDate() + 1);
    const checkOut = new Date(new Date(checkOutDate).getDate() + 1);

    const availableRooms = await this.prisma.room.findMany({
      where: {
        // Filtra habitaciones que tengan la capacidad suficiente para los huéspedes
        maxOccupancy: {
          gte: Number(guests),
        },
        // Filtra por tipo de habitación, si se proporciona
        typeId: roomTypeId && roomTypeId != 0 ? Number(roomTypeId) : undefined,
        // Excluye habitaciones que ya están reservadas en el período de fechas solicitado
        reservations: {
          none: {
            OR: [
              {
                checkIn: {
                  lt: checkOut, // El check-in de una reserva existente es antes del check-out solicitado
                },
                checkOut: {
                  gt: checkIn, // El check-out de una reserva existente es después del check-in solicitado
                },
              },
            ],
          },
        },
      },
      include: {
        reservations: true,
        type: true,
      },
    });
    const totalRooms = await this.prisma.room.count({
      where: {
        typeId: roomTypeId && roomTypeId != 0 ? Number(roomTypeId) : undefined,
      },
    });
    const reservedRooms = await this.prisma.room.count({
      where: {
        typeId: roomTypeId && roomTypeId != 0 ? Number(roomTypeId) : undefined,
        reservations: {
          some: {
            checkIn: { lt: checkOut },
            checkOut: { gt: checkIn },
          },
        },
      },
    });
    return { availableRooms, totalRooms, reservedRooms };
  }

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: createRoomDto,
    });
  }

  async findAll() {
    return await this.prisma.room.findMany({
      include: {
        reservations: true,
      },
    });
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findFirst({
      where: {
        id,
      },
    });
    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: {
        id,
      },
      data: updateRoomDto,
    });
  }

  remove(id: number) {
    return this.prisma.room.delete({
      where: {
        id,
      },
    });
  }
}
