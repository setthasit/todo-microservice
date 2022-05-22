import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { todo } from '@todo-microservices/api-proto'

@Controller('todo')
export class TodoController implements todo.TodoServiceController {

    @GrpcMethod("TodoService")
    async healthCheck(request: todo.HealthCheckRequest): Promise<todo.HealthCheckResponse> {
        return { error: null }
    }

    @GrpcMethod(todo.TODO_SERVICE_NAME)
    create(request: todo.CreateRequest): Promise<todo.CreateResponse> {
        return
    }

    @GrpcMethod(todo.TODO_SERVICE_NAME)
    addTask(request: todo.AddTaskRequest): Promise<todo.AddTaskResponse> {
        return
    }


    @GrpcMethod(todo.TODO_SERVICE_NAME)
    updateSubject(request: todo.UpdateSubjectRequest): Promise<todo.UpdateSubjectResponse> {
        return
    }

    @GrpcMethod(todo.TODO_SERVICE_NAME)
    updateStatus(request: todo.UpdateStatusRequest): Promise<todo.UpdateStatusResponse> {
        return
    }
}
