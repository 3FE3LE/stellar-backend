import { IsDateString, IsNumber, IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class SearchRoomsDto {
  @ApiProperty({ description: 'Check-in date', example: '2023-09-25' })
  @IsDateString()
  checkInDate: string;

  @ApiProperty({ description: 'Check-out date', example: '2023-09-30' })
  @IsDateString()
  checkOutDate: string;

  @ApiProperty({ description: 'Number of guests', example: 2 })
  @IsNumber()
  guests: number;

  @ApiPropertyOptional({
    description: 'Room type',
    example: 'standard',
    type: String,
  })
  @IsOptional()
  @IsNumber()
  roomType?: RoomType;
}
