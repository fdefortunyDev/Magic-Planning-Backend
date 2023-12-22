import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './apikey.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [ApiKeyStrategy, AuthService],
})
export class AuthModule {}
