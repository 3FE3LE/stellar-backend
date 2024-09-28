import { IsDateString, IsNumber, IsOptional } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
    description: 'Type id of room',
    example: '1',
    type: String,
  })
  @IsOptional()
  @IsNumber()
  roomTypeId?: number;
}
