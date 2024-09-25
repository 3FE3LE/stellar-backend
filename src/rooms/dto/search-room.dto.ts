import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class SearchRoomsDto {
  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsNumber()
  guests: number;

  @IsOptional()
  @IsNumber()
  roomType?: string;
}
