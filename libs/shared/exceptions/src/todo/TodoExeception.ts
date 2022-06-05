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

export const SubjectCannotUpdateStatus = new RpcException({
  code: GrpcStatusCode.INTERNAL,
  message: 'cannot update subject status',
})

export const TaskCannotCreate = new RpcException({
  code: GrpcStatusCode.INTERNAL,
  message: 'cannot create task',
})

export const TaskCannotUpdateStatus = new RpcException({
  code: GrpcStatusCode.INTERNAL,
  message: 'cannot update task status',
})
