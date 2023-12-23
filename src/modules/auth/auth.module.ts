import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './apikey.strategy';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PassportModule],
  providers: [ApiKeyStrategy, AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
