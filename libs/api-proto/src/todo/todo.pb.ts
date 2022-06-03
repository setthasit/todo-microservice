/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'
import { Status, Subject, Task } from './types/task.pb'
import { Observable } from 'rxjs'

export const protobufPackage = 'todo'

/** Health check */
export interface HealthCheckRequest {}

export interface HealthCheckResponse {
  error: string[]
}

/** Create task */
export interface CreateRequest {
  subject: Subject | undefined
}

export interface CreateResponse {
  subjectId: string
  subject: Subject | undefined
}

/** Add task */
export interface AddTaskRequest {
  parentId: string
  task: Task | undefined
}

export interface AddTaskResponse {
  subjectId: string
  subject: Subject | undefined
}

/** Update task */
export interface UpdateSubjectRequest {
  subjectId: string
  subject: Subject | undefined
}

export interface UpdateSubjectResponse {
  subjectId: string
  subject: Subject | undefined
}

/** Update status */
export interface UpdateStatusRequest {
  taskId: string
  status: Status
}

export interface UpdateStatusResponse {
  taskId: string
  status: Status
}

export const TODO_PACKAGE_NAME = 'todo'

export interface TodoServiceClient {
  healthCheck(request: HealthCheckRequest): Observable<HealthCheckResponse>

  create(request: CreateRequest): Observable<CreateResponse>

  addTask(request: AddTaskRequest): Observable<AddTaskResponse>

  updateSubject(
    request: UpdateSubjectRequest
  ): Observable<UpdateSubjectResponse>

  updateStatus(request: UpdateStatusRequest): Observable<UpdateStatusResponse>
}

export interface TodoServiceController {
  healthCheck(
    request: HealthCheckRequest
  ):
    | Promise<HealthCheckResponse>
    | Observable<HealthCheckResponse>
    | HealthCheckResponse

  create(
    request: CreateRequest
  ): Promise<CreateResponse> | Observable<CreateResponse> | CreateResponse

  addTask(
    request: AddTaskRequest
  ): Promise<AddTaskResponse> | Observable<AddTaskResponse> | AddTaskResponse

  updateSubject(
    request: UpdateSubjectRequest
  ):
    | Promise<UpdateSubjectResponse>
    | Observable<UpdateSubjectResponse>
    | UpdateSubjectResponse

  updateStatus(
    request: UpdateStatusRequest
  ):
    | Promise<UpdateStatusResponse>
    | Observable<UpdateStatusResponse>
    | UpdateStatusResponse
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'healthCheck',
      'create',
      'addTask',
      'updateSubject',
      'updateStatus',
    ]
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      )
      GrpcMethod('TodoService', method)(
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
      GrpcStreamMethod('TodoService', method)(
        constructor.prototype[method],
        method,
        descriptor
      )
    }
  }
}

export const TODO_SERVICE_NAME = 'TodoService'

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}
