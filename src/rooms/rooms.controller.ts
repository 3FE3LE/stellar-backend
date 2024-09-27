import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

import { CreateRoomDto } from './dto/create-room.dto';
import { SearchRoomsDto } from './dto/search-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get('available')
  @ApiOperation({
    summary: 'Find available rooms',
    description: 'Returns a list of available rooms based on search criteria',
  })
  @ApiQuery({
    name: 'checkInDate',
    required: true,
    type: String,
    description: 'Check-in date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'checkOutDate',
    required: true,
    type: String,
    description: 'Check-out date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'guests',
    required: true,
    type: Number,
    description: 'Number of guests',
  })
  @ApiQuery({
    name: 'roomType',
    required: false,
    enum: RoomType,
    description: 'Type of room',
  })
  @ApiResponse({ status: 200, description: 'List of available rooms' })
  findAvailableRooms(@Query() searchRoomsDto: SearchRoomsDto) {
    return this.roomsService.findAvailableRooms(searchRoomsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
