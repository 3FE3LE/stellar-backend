import { PrismaModule } from 'src/prisma/prisma.module';

import { Module } from '@nestjs/common';

import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';

@Module({
  imports: [PrismaModule],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
