import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { account } from '@todo-microservices/api-proto';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import serviceConfig from '../config/service.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: account.ACCOUNT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: serviceConfig.accountService,
          package: account.ACCOUNT_PACKAGE_NAME,
          protoPath: 'libs/api-proto/proto/account.proto',
        },
      },
    ]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
