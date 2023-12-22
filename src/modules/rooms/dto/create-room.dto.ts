import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}
