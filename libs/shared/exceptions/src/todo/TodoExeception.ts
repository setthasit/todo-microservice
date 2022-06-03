import { RpcException } from "@nestjs/microservices";
import { GrpcStatusCode } from "../code";

export const SubjectCannotCreate = new RpcException({
  code: GrpcStatusCode.INTERNAL,
  message: 'cannot create subject',
})

export const SubjectNotFound = new RpcException({
  code: GrpcStatusCode.NOT_FOUND,
  message: 'subject not found',
})

export const TaskCannotCreate = new RpcException({
  code: GrpcStatusCode.INTERNAL,
  message: 'cannot create task',
})
