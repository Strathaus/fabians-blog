import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRequest } from './auth.req.interface';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this._validateRequest(context.switchToHttp().getRequest());
  }

  private _validateRequest(req: IRequest): boolean {
    if (!req.session.user) {
      throw new UnauthorizedException();
    } else {
      return true;
    }
  }
}
