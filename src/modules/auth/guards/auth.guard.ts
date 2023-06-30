import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/modules/accounts/accounts.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private accountsService: AccountsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers.authorization;

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Авторизационный токен недействителен',
        });
      }

      req.account = await this.jwtService.verifyAsync(token);
      req.account = await this.accountsService.getAuthorized(req);

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({
        message: 'Авторизационный токен недействителен',
      });
    }
  }
}
