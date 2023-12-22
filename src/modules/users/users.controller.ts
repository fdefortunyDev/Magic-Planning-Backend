import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@ApiSecurity('apikey')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: `Get all users` })
  @Get()
  findAll() {
    try{
      return this.usersService.findAll();
    }catch(error){
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Get one user by id` })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try{
      return this.usersService.findOneUserById(id);
    }catch(error){
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Create one user` })
  @ApiCreatedResponse({ type: UserResponseDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try{
      return this.usersService.create(createUserDto);
    }catch(error){
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Edit one user by id` })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try{
    return this.usersService.update(id, updateUserDto);
    }catch(error){
      console.log(error);
    }
  }

  @ApiOperation({ summary: `Delete one user by id` })
  @Delete(':id')
  delete(@Param('id') id: string) {
    try{
    return this.usersService.delete(id);
    }catch(error){
      console.log(error);
    }
  }
}
