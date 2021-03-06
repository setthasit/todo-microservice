/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'
import { Observable } from 'rxjs'

export const protobufPackage = 'auth'

/** Register */
export interface RegisterRequest {
  email: string
  password: string
}

export interface RegisterResponse {
  token: string
  error: string[]
}

/** SignIn */
export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
  error: string[]
}

/** Validate */
export interface ValidateRequest {
  token: string
}

export interface ValidateResponse {
  accountId: string
  error: string[]
}

export const AUTH_PACKAGE_NAME = 'auth'

export interface AuthServiceClient {
  register(request: RegisterRequest): Observable<RegisterResponse>

  signIn(request: SignInRequest): Observable<SignInResponse>

  validate(request: ValidateRequest): Observable<ValidateResponse>
}

export interface AuthServiceController {
  register(
    request: RegisterRequest
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse

  signIn(
    request: SignInRequest
  ): Promise<SignInResponse> | Observable<SignInResponse> | SignInResponse

  validate(
    request: ValidateRequest
  ): Promise<ValidateResponse> | Observable<ValidateResponse> | ValidateResponse
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['register', 'signIn', 'validate']
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      )
      GrpcMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor
      )
    }
    const grpcStreamMethods: string[] = []
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      )
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor
      )
    }
  }
}

export const AUTH_SERVICE_NAME = 'AuthService'

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
