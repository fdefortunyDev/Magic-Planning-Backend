import {
  CanActivate,
  ExecutionContext,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const headers: IncomingHttpHeaders = request || {};

      const { authorization } = headers;

      if (!authorization) {
        throw new PreconditionFailedException('Token is required in headers');
      }

      const bearerToken = authorization as string;
      const token = bearerToken.split(' ')[1];

      if (!token) {
        throw new PreconditionFailedException('Invalid token');
      }

      return this.validateToken(token);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    verify(token, process.env.JWT_SECRET!);
    return true;
  }
}
