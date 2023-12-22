import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsRepositoryService } from 'src/repository/rooms/rooms-repository.service';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepositoryService: RoomsRepositoryService) {}

  async findAll() {
    return await this.roomRepositoryService.findAll();
  }

  async findOneByName(name: string) {
    const namePrefix = "room_";
    name = namePrefix + name;
    const room = await this.roomRepositoryService.findOneByName(name);
    console.log(room)
    if(room){
      return room;
    }else{
      throw new NotFoundException(`${name} not found`);
    }
  }

  async create(createRoomDto: CreateRoomDto) {
    const namePrefix = "room_";
    createRoomDto.name = namePrefix + createRoomDto.name;
    const roomAlreadyExists = await this.roomRepositoryService.findOneByName(createRoomDto.name);
    if (roomAlreadyExists) {
      throw new ConflictException('This room already exists');
    }
    return await this.roomRepositoryService.saveOne(createRoomDto);
  }

  async remove(id: string) {
    return await this.roomRepositoryService.remove(id);
  }
}
