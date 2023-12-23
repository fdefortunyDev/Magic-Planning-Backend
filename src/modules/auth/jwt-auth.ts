import {
  CanActivate,
  ExecutionContext,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import 'dotenv/config';
import { AuthService } from './auth.service';
import { GeneralError } from 'src/utils/enums/errors/general-error.enum';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
    ){}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { headers }: { headers: IncomingHttpHeaders } = request || {};

      const { authorization } = headers;
      if (!authorization) {
        throw new PreconditionFailedException(GeneralError.requiredToken);
      }

      const bearerToken = authorization as string;
      const token = bearerToken.split(' ')[1];

      if (!token) {
        throw new PreconditionFailedException(GeneralError.notValidToken);
      }

      return this.authService.validateToken(token);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

 
}
