import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { todo_types } from '@todo-microservices/api-proto'
import { AuthRequest } from '@todo-microservices/shared/models'
import { JwtAuthGuard } from '../auth/guard/jwt.guard'
import * as dayjs from 'dayjs'

import {
  CreateSubjectRequest,
  CreateSubjectResponse,
} from './dto/create-subject.dto'
import { TodoService } from './todo.service'
import { CreateTaskRequest, CreateTaskResponse } from './dto/create-task.dto'

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  @Inject(TodoService)
  private todoService: TodoService
  @Get('health')
  public async healthCheck() {
    return this.todoService.healthCheck({})
  }

  @Post('subject')
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
      startDate: body.startDate ? dayjs(body.startDate).unix() : dayjs().unix(),
      endDate: body.endDate ? dayjs(body.endDate).unix() : null,
      userId: req.accountId,
    })

    return {
      subject: {
        id: subject.subjectId,
        ...subject.subject,
      },
    }
  }

  @Post('task')
  public async createTask(
    @Body() body: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    const subject = await this.todoService.addTask(body.parentId, {
      name: body.name,
      description: body.description,
      priority: body.priority || todo_types.Priority.LOW,
      status: body.status || todo_types.Status.TO_DO,
      task: [],
      startDate: body.startDate ? dayjs(body.startDate).unix() : dayjs().unix(),
      endDate: body.endDate ? dayjs(body.endDate).unix() : null,
    })

    return {
      subject: {
        id: subject.subjectId,
        ...subject.subject,
      },
    }
  }
}
