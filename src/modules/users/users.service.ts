import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { email } = createUserDto;
    const userAlreadyExist =
      await this.usersRepositoryService.findOneUserByEmail(email);
    if (userAlreadyExist) {
      throw new ConflictException('User already exists with the same email');
    }
    return await this.usersRepositoryService.saveOneUser(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepositoryService.findOneUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { email } = updateUserDto;
    if (user.email !== email) {
      const userAlreadyExist =
        await this.usersRepositoryService.findOneUserByEmail(email);
      if (userAlreadyExist) {
        throw new ConflictException(
          'User already exists with the same email',
        );
      }
    }
    return await this.usersRepositoryService.updateOneUserById(
      id,
      updateUserDto,
    );
  }

  async delete(id: string) {
    return await this.usersRepositoryService.deleteOneUserById(id);
  }
}
