import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schema/users.schema';
import { UsersRepositoryService } from './users/users-repository.service';
import { RoomsRepositoryService } from './rooms/rooms-repository.service';
import { Room, RoomSchema } from './rooms/schema/rooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },

    ])
  ],
  providers: [
    UsersRepositoryService,
    RoomsRepositoryService,
  ],
  exports: [
    UsersRepositoryService,
    RoomsRepositoryService,
  ],
})
export class RepositoryModule {}
