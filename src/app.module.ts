import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI_MONGODB!),
    PassportModule.register({ defaultStrategy: 'headerapikey' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3s' },
    }),
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
