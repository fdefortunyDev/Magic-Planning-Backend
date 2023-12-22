import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI_DB),
    PassportModule.register({ defaultStrategy: 'headerapikey' }),
    AuthModule,
    UsersModule, 
    ChatsModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}