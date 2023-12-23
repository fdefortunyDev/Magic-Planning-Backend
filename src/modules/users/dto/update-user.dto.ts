import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class UpdateUserDto extends PartialType(LoginUserDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  password?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  loggedIn?: boolean;
}
