import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
