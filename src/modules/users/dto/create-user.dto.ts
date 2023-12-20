import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength, isEmail, } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}
