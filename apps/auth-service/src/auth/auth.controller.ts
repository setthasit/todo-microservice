import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { auth } from '@todo-microservices/api-proto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController implements auth.AuthServiceController {
  @Inject(AuthService)
  private readonly authService: AuthService

  @GrpcMethod(auth.AUTH_SERVICE_NAME)
  async register(
    request: auth.RegisterRequest
  ): Promise<auth.RegisterResponse> {
    const token = await this.authService.register(
      request.email,
      request.password
    )
    return {
      token: token,
      error: [],
    }
  }

  @GrpcMethod(auth.AUTH_SERVICE_NAME)
  async signIn(request: auth.SignInRequest): Promise<auth.SignInResponse> {
    const token = await this.authService.signIn(request.email, request.password)
    return {
      token: token,
      error: [],
    }
  }

  @GrpcMethod(auth.AUTH_SERVICE_NAME)
  async validate(
    request: auth.ValidateRequest
  ): Promise<auth.ValidateResponse> {
    const user = await this.authService.validate(request.token)
    return {
      accountId: user.id,
      error: [],
    }
  }
}
