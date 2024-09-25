import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Fecha de check-in de la reserva',
    example: '2024-09-25T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  checkIn: Date;

  @ApiProperty({
    description: 'Fecha de check-out de la reserva',
    example: '2024-09-28T00:00:00.000Z',
  })
  @Type(() => Date)
  @IsDate()
  checkOut: Date;

  @ApiProperty({
    description: 'Cantidad de huéspedes',
    example: 2,
  })
  @IsInt()
  @Min(1)
  guests: number;

  @ApiProperty({
    description: 'ID de la habitación a reservar',
    example: 1,
  })
  @IsInt()
  roomId: number;

  @ApiProperty({
    description: 'Precio total de la reserva',
    example: 180.0,
  })
  @IsNumber()
  @Min(0)
  totalPrice: number;
}
