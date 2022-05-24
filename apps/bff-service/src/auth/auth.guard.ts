import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(AuthService)
  private readonly service: AuthService

  async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const req = context.switchToHttp().getRequest()
    const token: string = this.trimBearer(req.headers['authorization'])

    const { accountId, error } = await this.service.validate({ token })

    if (error) {
      throw new UnauthorizedException(error)
    }

    req.user = accountId

    return
  }

  private trimBearer(bearerToken: string): string {
    if (!bearerToken || bearerToken.length < 8) {
      throw new UnauthorizedException("invalid token")
    }

    const [bearer, token] = bearerToken.split(' ', 1)

    if (bearer.toLowerCase() != 'bearer') {
      throw new UnauthorizedException("invalid token")
    }

    if (!token) {
      throw new UnauthorizedException("invalid token")
    }

    return token
  }
}
