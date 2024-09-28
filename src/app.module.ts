import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomsModule } from './rooms/rooms.module';
import { RulesModule } from './rules/rules.module';

@Module({
  imports: [RoomsModule, ReservationsModule, PrismaModule, RulesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
