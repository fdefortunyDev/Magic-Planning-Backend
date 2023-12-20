import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schema/users.schema';
import { UsersRepositoryService } from './users/users-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ])
  ],
  providers: [
    UsersRepositoryService,
  ],
  exports: [
    UsersRepositoryService,
  ],
})
export class RepositoryModule {}
