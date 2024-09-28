import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoomTypeDto {
  @IsString()
  name: string;

  @IsNumber()
  basePrice: number;

  @IsString()
  @IsOptional()
  description?: string;
}
