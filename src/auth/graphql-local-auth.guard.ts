import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class GqlLocalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    console.log('local guard');
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    const query = req.body.query.split('"');
    const username = query[1];
    const password = query[3];
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log('failed');
      throw new UnauthorizedException();
    }
    return user;
  }
}
