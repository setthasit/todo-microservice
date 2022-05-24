import { Body, Controller, Inject, Post } from '@nestjs/common';
import { auth } from '@todo-microservices/api-proto';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private service: AuthService

  @Post("register")
  async register(@Body() body: auth.RegisterRequest): Promise<auth.RegisterResponse> {
    const response = await this.service.register(body)
    return firstValueFrom(response)
  }

  @Post("signin")
  async signIn(@Body() body: auth.SignInRequest): Promise<auth.SignInResponse> {
    const response = await this.service.signIn(body)
    return firstValueFrom(response)
  }
}
