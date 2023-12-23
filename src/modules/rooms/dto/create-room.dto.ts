import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto {
    @ApiProperty({ example: 'CMS Team' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @ApiProperty({ example: '1234' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;
}
