import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useFactory: async () => {
        const prisma = new PrismaClient();

        await prisma.$connect().catch((error) => {
          Logger.error('Failed to connect to the database', error);
          // throw new Error(error);
        });
        return prisma;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class PrismaModule {}
