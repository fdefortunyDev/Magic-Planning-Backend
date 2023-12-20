import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositoryService } from '../../repository/users/users-repository.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}

  async findAll() {
    return await this.usersRepositoryService.findAllUsers();
  }

  async findOneUserById(id: string) {
    return await this.usersRepositoryService.findOneUserById(id);
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepositoryService.saveOneUser(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async delete(id: string) {
    return await this.usersRepositoryService.deleteOneUserById(id);
  }
}
