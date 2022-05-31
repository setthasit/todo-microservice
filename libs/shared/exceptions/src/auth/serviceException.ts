import { RpcException } from '@nestjs/microservices'
import { GrpcStatusCode } from '../code'

export const RegisterFailUserExisted = new RpcException({
  code: GrpcStatusCode.ALREADY_EXISTS,
  message: 'user already exists',
})

export const SignInFailInvalidRequest = new RpcException({
  code: GrpcStatusCode.INVALID_ARGUMENT,
  message: 'invalid username/password',
})
