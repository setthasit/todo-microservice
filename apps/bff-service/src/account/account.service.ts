import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { account } from '@todo-microservices/api-proto';
import { Observable } from 'rxjs';

@Injectable()
export class AccountService implements OnModuleInit {
  private svc: account.AccountServiceClient;

  constructor(
    @Inject(account.ACCOUNT_PACKAGE_NAME) private client: ClientGrpc
  ) {}

    onModuleInit() {
        this.svc = this.client.getService(account.ACCOUNT_SERVICE_NAME)
    }

    async getSelfInfo(request: account.GetSelfInfoRequest): Promise<Observable<account.GetSelfInfoResponse>> {
      return this.svc.getSelfInfo(request)
    }
}
