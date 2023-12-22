import { ApiProperty } from "@nestjs/swagger";

  export class UserResponseDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
  }