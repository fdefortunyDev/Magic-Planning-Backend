import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { AuthModule } from '../auth/auth.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [AuthModule, RoomsModule],
  providers: [ChatsGateway, ChatsService]
})
export class ChatsModule {}
