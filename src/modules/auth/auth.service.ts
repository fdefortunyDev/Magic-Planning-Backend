import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateApiKey(apiKey: string): boolean {
    return apiKey === process.env.API_KEY;
  }

  async generateToken(payload: string): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
