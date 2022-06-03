import { Body, Controller, Inject, Post } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { AuthService } from './auth.service'
import { RegisterRequest, RegisterResponse } from './dto/register.dto'
import { SignInRequest, SignInResponse } from './dto/signin.dto'

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private service: AuthService

  @Post('register')
  async register(@Body() body: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.service.register(body)
    return firstValueFrom(response)
  }

  @Post('signin')
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    const response = await this.service.signIn(body)
    return firstValueFrom(response)
  }
}
