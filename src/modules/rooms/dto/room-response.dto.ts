import { ApiProperty } from "@nestjs/swagger";

  export class RoomResponseDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
  }