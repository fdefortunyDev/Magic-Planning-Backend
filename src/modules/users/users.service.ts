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
import { RoomsRepositoryService } from '../../repository/rooms/rooms-repository.service';
import { UserError } from 'src/utils/enums/errors/user-error.enum';
import { GeneralError } from 'src/utils/enums/errors/general-error.enum';
import { RoomError } from 'src/utils/enums/errors/room-error.enum';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly authService: AuthService,
    private readonly roomsRepositoryService: RoomsRepositoryService,
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
      throw new ConflictException(UserError.alredyExists);
    }
    createUserDto.password = await this.authService.encryptPassword(password);
    return await this.usersRepositoryService.saveOneUser(createUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(GeneralError.notValidId);
    }
    const user = await this.usersRepositoryService.findOneUserById(id);
    if (!user) {
      throw new NotFoundException(UserError.notFound);
    }
    const { email } = updateUserDto;
    if (email && user.email !== email) {
      const userAlreadyExist =
        await this.usersRepositoryService.findOneUserByEmail(email);
      if (userAlreadyExist) {
        throw new ConflictException(UserError.alredyExists);
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

  async joinRoom(roomId: string, request: any) {
    const token = request.headers.authorization.split(' ')[1];
    const payload = await this.authService.decodedToken(token);

    const room = await this.roomsRepositoryService.findOneById(roomId);
    if (!room) {
      throw new NotFoundException(RoomError.notFound);
    }

    const parsedPayload = JSON.parse(JSON.stringify(payload));
    const user = await this.usersRepositoryService.findOneUserByIdAndUpdate(parsedPayload.id, { roomId });
    if(!user){
      throw new NotFoundException(UserError.notFound);
    }
    return user;
  }

  async logIn(loginUserDto: LoginUserDto) {
    const user = await this.usersRepositoryService.findOneUserByEmail(
      loginUserDto.email,
    );
    if (!user) {
      throw new NotFoundException(UserError.notFound);
    }

    const hash = user.password;
    const password = loginUserDto.password;
    const isMatch = await this.authService.comparePassword(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException(UserError.invalidPassword);
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
      throw new BadRequestException(GeneralError.notValidId);
    }
    return await this.usersRepositoryService.deleteOneUserById(id);
  }
}
