import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateApiKey(apiKey: string): boolean {
    return apiKey === process.env.API_KEY;
  }

  async generateToken(payload: string): Promise<string> {
    return this.jwtService.sign(
      { data: payload }, 
      { 
        secret: process.env.JWT_SECRET,
        expiresIn: '1h' ,
      }
      
    );
  }

  async validateToken(token: string): Promise<boolean> {
    try{
      verify(token, process.env.JWT_SECRET!);
      return true;
    }catch(err){
      console.error('[validateToken] ', err.name);
      return false;
    }
  }

  async decodedToken(token: string) {
    return verify(token, process.env.JWT_SECRET!);
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
