import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    console.log('Local ctx.getContext().req');
    console.log(context.switchToHttp().getRequest());
    return context;
  }
}
