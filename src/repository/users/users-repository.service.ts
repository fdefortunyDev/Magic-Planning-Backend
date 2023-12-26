import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

export class UsersRepositoryService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findAllUsers() {
    return await this.userModel.find();
  }

  async findOneUserById(id: string) {
    const userId = new Types.ObjectId(id);
    return await this.userModel.findById(userId);
  }

  async findOneUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async findOneUserByIdAndUpdate(id: string, updateUserDto: UpdateUserDto) {
    const userId = new Types.ObjectId(id);
    return await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  async saveOneUser(userData: UserDto) {
    return await this.userModel.create(userData);
  }

  async updateOneUserById(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  async deleteOneUserById(id: string) {
    const userId = new Types.ObjectId(id);
    await this.userModel.findByIdAndDelete(userId);
  }
}
