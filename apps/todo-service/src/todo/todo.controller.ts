import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { todo, todo_types } from '@todo-microservices/api-proto'
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
  async getAll(request: todo.GetAllRequest): Promise<todo.GetAllResponse> {
    const subjects = await this.todoService.getAll(request.userId)
    return {
      subjects,
    }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async getOne(request: todo.GetOneRequest): Promise<todo.GetOneResponse> {
    const subject = await this.todoService.getOne(request.subjectId)
    return { subject }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async create(request: todo.CreateRequest): Promise<todo.CreateResponse> {
    const subject = await this.todoService.createSubject(request.subject)

    return {
      subject: {
        id: subject.id || '',
        description: subject.description,
        name: subject.name,
        priority: subject.priority,
        status: subject.status,
        task: [],
        endDate: subject.endDate,
        startDate: subject.startDate,
        userId: subject.userId,
      },
    }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async addTask(request: todo.AddTaskRequest): Promise<todo.AddTaskResponse> {
    const subject = await this.todoService.createTask(
      request.parentId,
      request.task
    )
    return {
      subject: {
        id: subject.id || '',
        description: subject.description,
        name: subject.name,
        priority: subject.priority,
        status: subject.status,
        task: subject.task as todo_types.Task[],
        endDate: subject.endDate,
        startDate: subject.startDate,
        userId: subject.userId,
      },
    }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async updateSubject(
    request: todo.UpdateSubjectRequest
  ): Promise<todo.UpdateSubjectResponse> {
    return
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async updateSubjectStatus(
    request: todo.UpdateSubjectStatusRequest
  ): Promise<todo.UpdateSubjectStatusResponse> {
    await this.todoService.updateSubjectStatus(
      request.subjectId,
      request.status
    )
    return {
      status: request.status,
    }
  }

  @GrpcMethod(todo.TODO_SERVICE_NAME)
  async updateTaskStatus(
    request: todo.UpdateTaskStatusRequest
  ): Promise<todo.UpdateTaskStatusResponse> {
    await this.todoService.updateTaskStatus(
      request.subjectId,
      request.taskId,
      request.status
    )
    return {
      status: request.status,
    }
  }
}
