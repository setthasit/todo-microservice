/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices'
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'
import {
  Status,
  Subject,
  SubjectCreateRequest,
  TaskCreateRequest,
} from './types/task.pb'
import { Observable } from 'rxjs'

export const protobufPackage = 'todo'

/** Health check */
export interface HealthCheckRequest {}

export interface HealthCheckResponse {
  error: string[]
}

/** Get all */
export interface GetAllRequest {
  userId: string
}

export interface GetAllResponse {
  subjects: Subject[]
}

/** Get one */
export interface GetOneRequest {
  subjectId: string
}

export interface GetOneResponse {
  subject: Subject | undefined
}

/** Create task */
export interface CreateRequest {
  subject: SubjectCreateRequest | undefined
}

export interface CreateResponse {
  subject: Subject | undefined
}

/** Add task */
export interface AddTaskRequest {
  parentId: string
  task: TaskCreateRequest | undefined
}

export interface AddTaskResponse {
  subject: Subject | undefined
}

/** Update task */
export interface UpdateSubjectRequest {
  subjectId: string
  subject: Subject | undefined
}

export interface UpdateSubjectResponse {
  subject: Subject | undefined
}

/** Update Subject status */
export interface UpdateSubjectStatusRequest {
  subjectId: string
  status: Status
}

export interface UpdateSubjectStatusResponse {
  status: Status
}

/** Update Task status */
export interface UpdateTaskStatusRequest {
  subjectId: string
  taskId: string
  status: Status
}

export interface UpdateTaskStatusResponse {
  status: Status
}

export const TODO_PACKAGE_NAME = 'todo'

export interface TodoServiceClient {
  healthCheck(request: HealthCheckRequest): Observable<HealthCheckResponse>

  getAll(request: GetAllRequest): Observable<GetAllResponse>

  getOne(request: GetOneRequest): Observable<GetOneResponse>

  create(request: CreateRequest): Observable<CreateResponse>

  addTask(request: AddTaskRequest): Observable<AddTaskResponse>

  updateSubject(
    request: UpdateSubjectRequest
  ): Observable<UpdateSubjectResponse>

  updateSubjectStatus(
    request: UpdateSubjectStatusRequest
  ): Observable<UpdateSubjectStatusResponse>

  updateTaskStatus(
    request: UpdateTaskStatusRequest
  ): Observable<UpdateTaskStatusResponse>
}

export interface TodoServiceController {
  healthCheck(
    request: HealthCheckRequest
  ):
    | Promise<HealthCheckResponse>
    | Observable<HealthCheckResponse>
    | HealthCheckResponse

  getAll(
    request: GetAllRequest
  ): Promise<GetAllResponse> | Observable<GetAllResponse> | GetAllResponse

  getOne(
    request: GetOneRequest
  ): Promise<GetOneResponse> | Observable<GetOneResponse> | GetOneResponse

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

  updateSubjectStatus(
    request: UpdateSubjectStatusRequest
  ):
    | Promise<UpdateSubjectStatusResponse>
    | Observable<UpdateSubjectStatusResponse>
    | UpdateSubjectStatusResponse

  updateTaskStatus(
    request: UpdateTaskStatusRequest
  ):
    | Promise<UpdateTaskStatusResponse>
    | Observable<UpdateTaskStatusResponse>
    | UpdateTaskStatusResponse
}

export function TodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'healthCheck',
      'getAll',
      'getOne',
      'create',
      'addTask',
      'updateSubject',
      'updateSubjectStatus',
      'updateTaskStatus',
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
