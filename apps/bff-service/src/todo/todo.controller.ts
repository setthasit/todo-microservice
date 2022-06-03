import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { todo_types } from '@todo-microservices/api-proto'
import {
  CreateSubjectRequest,
  CreateSubjectResponse,
} from './dto/createsubject.dto'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  @Inject(TodoService)
  private todoService: TodoService

  @Get('health')
  public async healthCheck() {
    return this.todoService.healthCheck({})
  }

  @Post('subject')
  public async createSubject(
    @Body() request: CreateSubjectRequest
  ): Promise<CreateSubjectResponse> {
    const subject = await this.todoService.create({
      name: request.name,
      description: request.description,
      priority: request.priority || todo_types.Priority.LOW,
      status: request.status || todo_types.Status.TO_DO,
      task: [],
      startDate: request.startDate?.getUTCMilliseconds() || new Date().getUTCMilliseconds(),
      endDate: request.endDate?.getUTCMilliseconds() || null,
      userId: 'test user',
    })

    return {
      subjectId: subject.subjectId,
    }
  }
}
