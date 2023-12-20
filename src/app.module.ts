import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    UsersModule, 
    ChatsModule,
    MongooseModule.forRoot(process.env.URI_DB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
