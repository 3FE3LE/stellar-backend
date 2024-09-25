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

    // Obtener todas las habitaciones que no están reservadas en el rango de fechas proporcionado
    const availableRooms = await this.prisma.room.findMany({
      where: {
        available: true,
        maxOccupancy: {
          gte: guests, // Asegurar que la habitación pueda acomodar el número de huéspedes
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
        ...(roomType && { roomType }), // Filtrar por tipo de habitación opcionalmente
      },
      include: {
        reservations: true,
      },
    });

    return availableRooms;
  }

  create(createRoomDto: CreateRoomDto) {
    return 'This action adds a new room';
  }

  findAll() {
    return `This action returns all rooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
