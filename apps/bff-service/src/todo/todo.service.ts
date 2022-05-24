import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { todo } from '@todo-microservices/api-proto'
import { Observable } from 'rxjs';

@Injectable()
export class TodoService implements OnModuleInit {
    private svc: todo.TodoServiceClient

    constructor(
        @Inject(todo.TODO_PACKAGE_NAME) private client: ClientGrpc
    ) {}

    onModuleInit() {
        this.svc = this.client.getService<todo.TodoServiceClient>(todo.TODO_SERVICE_NAME)
    }

    async healthCheck(request: todo.HealthCheckRequest): Promise<Observable<todo.HealthCheckResponse>> {
        return this.svc.healthCheck(request)
    }

    async create(request: todo.CreateRequest): Promise<Observable<todo.CreateResponse>> {
      return this.svc.create(request)
    }

    async addTask(request: todo.AddTaskRequest): Promise<Observable<todo.AddTaskResponse>> {
      return this.svc.addTask(request)
    }

    async updateSubject(request: todo.UpdateSubjectRequest): Promise<Observable<todo.UpdateSubjectResponse>> {
      return this.svc.updateSubject(request)
    }

    async updateStatus(request: todo.UpdateStatusRequest): Promise<Observable<todo.UpdateStatusResponse>> {
      return this.svc.updateStatus(request)
    }
}
