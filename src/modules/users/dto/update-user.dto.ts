import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { randomUUID } from 'crypto';

export class UpdateUserDto extends PartialType(LoginUserDto) {
  @ApiProperty({ example: 'Paco' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: 'paco@gmail.com' })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '25101994' })
  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  password?: string;

  @ApiProperty({ example: randomUUID() })
  @IsString()
  @IsOptional()
  @IsUUID()
  roomId?: string;
}
