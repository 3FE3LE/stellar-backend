import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { RoomTypesController } from './room-types.controller';
import { RoomTypesService } from './room-types.service';

@Module({
  imports: [PrismaModule],
  controllers: [RoomTypesController],
  providers: [RoomTypesService],
})
export class RoomTypesModule {}
