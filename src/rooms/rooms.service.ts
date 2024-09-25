import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room.dto';
import { SearchRoomsDto } from './dto/search-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAvailableRooms(searchRoomsDto: SearchRoomsDto) {
    const { checkInDate, checkOutDate, guests, roomType } = searchRoomsDto;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const availableRooms = await this.prisma.room.findMany({
      where: {
        // Filtra habitaciones que tengan la capacidad suficiente para los huéspedes
        maxOccupancy: {
          gte: guests,
        },
        // Filtra por tipo de habitación, si se proporciona
        type: roomType ? roomType : undefined,
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
      },
    });

    return availableRooms;
  }

  //service to track how many rooms are in the hotel and how many are available,both overall and by room type.
  async findHotelInfo() {
    const totalRooms = await this.prisma.room.count();
    const availableRooms = await this.prisma.room.count({
      where: {
        reservations: {
          none: {},
        },
      },
    });
    const availableByType = await this.prisma.room.groupBy({
      by: ['type'],
      _count: {
        type: true,
      },
      where: {
        reservations: {
          none: {},
        },
      },
    });
    return {
      totalRooms,
      availableRooms,
      availableByType,
    };
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
