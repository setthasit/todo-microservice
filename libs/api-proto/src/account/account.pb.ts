/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Account } from './types/account.pb';

export const protobufPackage = 'account';

export interface GetSelfInfoRequest {}

export interface GetSelfInfoResponse {
  account: Account | undefined;
}

export const ACCOUNT_PACKAGE_NAME = 'account';

export interface AccountServiceClient {
  getSelfInfo(request: GetSelfInfoRequest): Observable<GetSelfInfoResponse>;
}

export interface AccountServiceController {
  getSelfInfo(
    request: GetSelfInfoRequest
  ):
    | Promise<GetSelfInfoResponse>
    | Observable<GetSelfInfoResponse>
    | GetSelfInfoResponse;
}

export function AccountServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getSelfInfo'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod('AccountService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod('AccountService', method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ACCOUNT_SERVICE_NAME = 'AccountService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
