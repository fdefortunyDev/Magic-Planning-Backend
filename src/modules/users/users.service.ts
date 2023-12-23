import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepositoryService } from '../../repository/users/users-repository.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Types } from 'mongoose';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly authService: AuthService,
  ) {}

  async findAll() {
    return await this.usersRepositoryService.findAllUsers();
  }

  async findOneUserById(id: string) {
    return await this.usersRepositoryService.findOneUserById(id);
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const userAlreadyExist =
      await this.usersRepositoryService.findOneUserByEmail(email);
    if (userAlreadyExist) {
      throw new ConflictException('User already exists with the same email');
    }
    createUserDto.password = await this.authService.encryptPassword(password);
    return await this.usersRepositoryService.saveOneUser(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${id} is not a valid id`);
    }
    const user = await this.usersRepositoryService.findOneUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { email } = updateUserDto;
    if (email && user.email !== email) {
      const userAlreadyExist =
        await this.usersRepositoryService.findOneUserByEmail(email);
      if (userAlreadyExist) {
        throw new ConflictException('User already exists with the same email');
      }
    }

    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = await this.authService.encryptPassword(password);
    }

    return await this.usersRepositoryService.updateOneUserById(
      id,
      updateUserDto,
    );
  }

  async logIn(loginUserDto: LoginUserDto) {
    const user = await this.usersRepositoryService.findOneUserByEmail(
      loginUserDto.email,
    );
    if (!user) {
      throw new NotFoundException('User not found with this email');
    }

    const hash = user.password;
    const password = loginUserDto.password;
    const isMatch = await this.authService.comparePassword(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: string = JSON.stringify({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return await this.authService.generateToken(payload);
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`${id} is not a valid id`);
    }
    return await this.usersRepositoryService.deleteOneUserById(id);
  }
}
