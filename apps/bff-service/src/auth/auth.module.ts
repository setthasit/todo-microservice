import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { auth } from '@todo-microservices/api-proto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: auth.AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50050',
          package: auth.AUTH_PACKAGE_NAME,
          protoPath: 'libs/api-proto/proto/auth.proto',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
