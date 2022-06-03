import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { auth } from '@todo-microservices/api-proto';
import serviceConfig from '../config/service.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: auth.AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: serviceConfig.authService,
          package: auth.AUTH_PACKAGE_NAME,
          protoPath: 'libs/api-proto/proto/auth.proto',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
