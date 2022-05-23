import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { auth } from '@todo-microservices/api-proto';

@Controller('auth')
export class AuthController implements auth.AuthServiceController {
    @GrpcMethod(auth.AUTH_SERVICE_NAME)
    register(request: auth.RegisterRequest): Promise<auth.RegisterResponse> {
        return
    }

    @GrpcMethod(auth.AUTH_SERVICE_NAME)
    signIn(request: auth.SignInRequest): Promise<auth.SignInResponse> {
        return
    }

    @GrpcMethod(auth.AUTH_SERVICE_NAME)
    validate(request: auth.ValidateRequest): Promise<auth.ValidateResponse> {
        return
    }
}
