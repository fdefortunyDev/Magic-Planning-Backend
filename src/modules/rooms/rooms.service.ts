import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsRepositoryService } from 'src/repository/rooms/rooms-repository.service';
import { RoomError } from 'src/utils/enums/errors/room-error.enum';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepositoryService: RoomsRepositoryService) {}

  async findAll() {
    return await this.roomRepositoryService.findAll();
  }

  async findOneByName(name: string) {
    const room = await this.roomRepositoryService.findOneByName(name);
    if(!room){
      throw new NotFoundException(RoomError.notFound);
    }
    return room;
  }

  async create(createRoomDto: CreateRoomDto) {
    const roomAlreadyExists = await this.roomRepositoryService.findOneByName(createRoomDto.name);
    if (roomAlreadyExists) {
      throw new ConflictException(RoomError.alreadyExists);
    }
    return await this.roomRepositoryService.saveOne(createRoomDto);
  }

  async remove(id: string) {
    return await this.roomRepositoryService.remove(id);
  }
}
