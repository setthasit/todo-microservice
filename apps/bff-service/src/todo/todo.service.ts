import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientGrpc } from '@nestjs/microservices'
import { todo, todo_types } from '@todo-microservices/api-proto'
import { Observable, firstValueFrom } from 'rxjs'

@Injectable()
export class TodoService implements OnModuleInit {
  private svc: todo.TodoServiceClient

  constructor(@Inject(todo.TODO_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.svc = this.client.getService<todo.TodoServiceClient>(
      todo.TODO_SERVICE_NAME
    )
  }

  async healthCheck(
    request: todo.HealthCheckRequest
  ): Promise<Observable<todo.HealthCheckResponse>> {
    return this.svc.healthCheck(request)
  }

  async getAll(
    request: todo.GetAllRequest
  ): Promise<todo.GetAllResponse> {
    return firstValueFrom(this.svc.getAll(request))
  }

  async getOne(
    request: todo.GetOneRequest
  ): Promise<todo.GetOneResponse> {
    return firstValueFrom(this.svc.getOne(request))
  }

  async create(
    subject: todo_types.SubjectCreateRequest
  ): Promise<todo.CreateResponse> {
    return firstValueFrom(this.svc.create({ subject }))
  }

  async addTask(
    parentId: string,
    task: todo_types.TaskCreateRequest
  ): Promise<todo.AddTaskResponse> {
    return firstValueFrom(this.svc.addTask({ parentId, task }))
  }

  async updateSubject(
    request: todo.UpdateSubjectRequest
  ): Promise<todo.UpdateSubjectResponse> {
    return firstValueFrom(this.svc.updateSubject(request))
  }

  async updateSubjectStatus(
    subjectId: string,
    status: todo_types.Status
  ): Promise<todo.UpdateSubjectStatusResponse> {
    return firstValueFrom(this.svc.updateSubjectStatus({ subjectId, status }))
  }

  async updateTaskStatus(
    subjectId: string,
    taskId: string,
    status: todo_types.Status
  ): Promise<todo.UpdateTaskStatusResponse> {
    return firstValueFrom(
      this.svc.updateTaskStatus({ subjectId, taskId, status })
    )
  }
}
