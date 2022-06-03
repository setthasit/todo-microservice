import { Body, Controller, Get, Inject, Post, Request, UseGuards } from '@nestjs/common'
import { todo_types } from '@todo-microservices/api-proto'
import { AuthRequest } from '@todo-microservices/shared/models'
import { JwtAuthGuard } from '../auth/guard/jwt.guard'

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
  @UseGuards(JwtAuthGuard)
  public async createSubject(
    @Request() req: AuthRequest,
    @Body() body: CreateSubjectRequest
  ): Promise<CreateSubjectResponse> {
    const subject = await this.todoService.create({
      name: body.name,
      description: body.description,
      priority: body.priority || todo_types.Priority.LOW,
      status: body.status || todo_types.Status.TO_DO,
      task: [],
      startDate: body.startDate?.getUTCMilliseconds() || new Date().getUTCMilliseconds(),
      endDate: body.endDate?.getUTCMilliseconds() || null,
      userId: req.accountId,
    })

    return {
      subjectId: subject.subjectId,
    }
  }
}
