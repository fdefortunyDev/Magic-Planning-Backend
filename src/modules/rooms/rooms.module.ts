import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RepositoryModule, AuthModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
