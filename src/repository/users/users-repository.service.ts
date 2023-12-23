import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { LoginUserDto } from 'src/modules/users/dto/login-user.dto';

export class UsersRepositoryService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findAllUsers() {
    return await this.userModel.find().exec();
  }

  async findOneUserById(id: string) {
    const userId = new Types.ObjectId(id);
    return await this.userModel.findById(new Types.ObjectId(userId)).exec();
  }

  async findOneUserByEmail(email: string) {
    return await this.userModel.findOne({ email: email }).exec();
  }

  async saveOneUser(userData: CreateUserDto) {
    return await this.userModel.create(userData);
  }

  async updateOneUserById(userId: string, updateUserDto: UpdateUserDto) {
    return await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  async deleteOneUserById(id: string) {
    const userId = new Types.ObjectId(id);
    await this.userModel.findByIdAndDelete(userId).exec();
  }
}
