import { IsBoolean, IsInt, IsNumber, IsString, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class CreateRoomDto {
  @ApiProperty({
    description:
      'Tipo de habitación (e.g. Junior Suite, King Suite, Presidential Suite)',
    example: 'Junior Suite',
  })
  @IsString()
  type: RoomType;

  @ApiProperty({
    description: 'Número de camas en la habitación',
    example: 2,
  })
  @IsInt()
  @Min(1)
  beds: number;

  @ApiProperty({
    description: 'Ocupación máxima de la habitación',
    example: 4,
  })
  @IsInt()
  @Min(1)
  maxOccupancy: number;

  @ApiProperty({
    description: 'Si la habitación tiene vista exterior/oceánica',
    example: true,
  })
  @IsBoolean()
  oceanView: boolean;

  @ApiProperty({
    description: 'Precio base por noche en dólares',
    example: 60.0,
  })
  @IsNumber()
  @Min(0)
  basePrice: number;
}
