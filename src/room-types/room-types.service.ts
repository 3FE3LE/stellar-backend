import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';

@Injectable()
export class RoomTypesService {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}
  create(createRoomTypeDto: CreateRoomTypeDto) {
    return this.prisma.roomType.create({ data: createRoomTypeDto });
  }

  findAll() {
    return this.prisma.roomType.findMany();
  }

  findOne(id: number) {
    return this.prisma.roomType.findUnique({ where: { id } });
  }
  update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
    return this.prisma.roomType.update({
      where: { id },
      data: updateRoomTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.roomType.delete({ where: { id } });
  }
}
