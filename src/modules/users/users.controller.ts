import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth';

@ApiTags('Users')
@ApiSecurity('apikey')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: `Get all users` })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Get one user by id` })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOneUserById(id);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Register one user` })
  @ApiCreatedResponse({ type: UserResponseDto })
  @Post('/register')
  create(@Body() createUserDto: UserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Login user` })
  @Post('login')
  logIn(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.usersService.logIn(loginUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Join room` })
  @UseGuards(JwtAuthGuard)
  @Patch(':roomId')
  joinRoom(@Param('roomId') roomId: string, @Request() request) {
    try {
      return this.usersService.joinRoom(roomId, request);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Edit one user by id` })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Delete one user by id` })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.usersService.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
