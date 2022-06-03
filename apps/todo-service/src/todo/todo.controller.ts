import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { todo } from '@todo-microservices/api-proto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController implements todo.TodoServiceController {
  @Inject(TodoService)
  private readonly todoService: TodoService

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async healthCheck(): Promise<todo.HealthCheckResponse> {
    return { error: null }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async create(request: todo.CreateRequest): Promise<todo.CreateResponse> {
    const subject = await this.todoService.createSubject(request.subject)
    return {
      subjectId: subject.id,
    }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  addTask(request: todo.AddTaskRequest): Promise<todo.AddTaskResponse> {
    return
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  updateSubject(
    request: todo.UpdateSubjectRequest
  ): Promise<todo.UpdateSubjectResponse> {
    return
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  updateStatus(
    request: todo.UpdateStatusRequest
  ): Promise<todo.UpdateStatusResponse> {
    return
  }
}
