import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class UsersRepositoryService {
  constructor(
    @InjectModel(User.name)
    private user: Model<UserDocument>,
  ) {}

  async saveOneUser(userData: CreateUserDto) {
    await this.user.create(userData);
  }

  async findAllUsers() {
    return await this.user.find().exec();
  }

  async findOneUserById(id: string) {
    return await this.user.findOne({ _id: new Types.ObjectId(id) }).exec();
  }

  async deleteOneUserById(id: string) {
    await this.user.deleteOne({ _id: new Types.ObjectId(id) }).exec();
  }
}
