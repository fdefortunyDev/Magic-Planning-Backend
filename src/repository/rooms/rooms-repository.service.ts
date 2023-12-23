import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from './schema/rooms.schema';
import { CreateRoomDto } from 'src/modules/rooms/dto/create-room.dto';

export class RoomsRepositoryService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
  ) {}

  async findAll() {
    return await this.roomModel.aggregate([
      {
        $project: {
          name: 1,
          _id: 1,
          createdAt: 1 
        }
      }
    ]);
  }

  async findOneById(roomId: string){
    return await this.roomModel.findById(roomId);
  }

  async findOneByName(name: string) {
    return await this.roomModel.findOne({ name: name });
  }

  async saveOne(roomDto: CreateRoomDto) {
    return await this.roomModel.create(roomDto);
  }

  async remove(id: string) {
    const roomId = new Types.ObjectId(id);
    await this.roomModel.findByIdAndDelete(roomId);
  }
}
