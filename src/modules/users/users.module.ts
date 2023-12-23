import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
