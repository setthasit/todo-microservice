import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const authHeader = request.header('Authorization')

    if (!authHeader) {
      return false
    }

    const [prefix, token] = authHeader.split(' ')

    if (prefix.toLowerCase() !== 'bearer' || !token) {
      return false
    }

    const user = await this.authService.validate({ token })

    if (user === undefined) {
      return false
    }

    request.accountId = user.accountId

    return true
  }
}
