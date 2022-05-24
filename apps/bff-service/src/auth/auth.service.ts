import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { auth } from '@todo-microservices/api-proto';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private svc: auth.AuthServiceClient

  constructor(
    @Inject(auth.AUTH_PACKAGE_NAME) private client: ClientGrpc
  ) {}

  onModuleInit() {
      this.svc = this.client.getService(auth.AUTH_SERVICE_NAME)
  }

  async register(request: auth.RegisterRequest): Promise<Observable<auth.RegisterResponse>> {
    return this.svc.register(request)
  }

  async signIn(request: auth.SignInRequest): Promise<Observable<auth.SignInResponse>> {
    return this.svc.signIn(request)
  }

  async validate(request: auth.ValidateRequest): Promise<Observable<auth.ValidateResponse>> {
    return this.svc.validate(request)
  }
}
