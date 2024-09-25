import { IsDateString, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @IsNumber()
  guests: number;

  @IsNumber()
  roomId: number;
}
