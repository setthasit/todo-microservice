import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { todo } from '@todo-microservices/api-proto'
import { Observable } from 'rxjs';

@Injectable()
export class TodoService implements OnModuleInit {
    private svc: todo.TodoServiceClient

    constructor(
        @Inject('TODO_SERVICE') private client: ClientGrpc 
    ) {}

    onModuleInit() {
        this.svc = this.client.getService<todo.TodoServiceClient>(todo.TODO_SERVICE_NAME)
    }

    async healthCheck(request: todo.HealthCheckRequest): Promise<Observable<todo.HealthCheckResponse>> {
        return this.svc.healthCheck(request)
    }

    // create(request: CreateRequest): Observable<CreateResponse>;
    // addTask(request: AddTaskRequest): Observable<AddTaskResponse>;
    // updateSubject(request: UpdateSubjectRequest): Observable<UpdateSubjectResponse>;
    // updateStatus(request: UpdateStatusRequest): Observable<UpdateStatusResponse>;
}
