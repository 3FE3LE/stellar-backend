import { IsBoolean, IsInt, IsNumber, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description:
      'Identificador único del tipo de habitación, se genera automáticamente',
    example: '1',
  })
  @IsNumber()
  typeId: number;

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
