import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoomResponseDto } from './dto/room-response.dto';

@ApiTags('Rooms')
@ApiSecurity('apikey')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: `Get all Rooms` })
  @Get()
  findAll() {
    try{
      return this.roomsService.findAll();
    }catch(error){
      console.log(error);
    };
  }

  @ApiOperation({ summary: `Get one room by name` })
  @Get(':name')
  findOneByName(@Param('name') name: string) {
    try{
      console.log({name});
      return this.roomsService.findOneByName(name);
    }catch(error){
      console.log(error);
    };
  }

  @ApiOperation({ summary: `Create one room` })
  @ApiCreatedResponse({ type: RoomResponseDto })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    try{
      return this.roomsService.create(createRoomDto);
    }catch(error){
      console.log(error);
    };
  }

  @ApiOperation({ summary: `Delete one room by id` })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.remove(id);
    try{
    }catch(error){
      console.log(error);
    };
  }
}
