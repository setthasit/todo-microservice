import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
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
import {
  UpdateSubjectStatusRequest,
  UpdateSubjectStatusResponse,
} from './dto/update-subject-status.dto'
import {
  UpdateTaskStatusRequest,
  UpdateTaskStatusResponse,
} from './dto/update-task-status.dto'

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
  @Inject(TodoService)
  private todoService: TodoService
  @Get('health')
  public async healthCheck() {
    return this.todoService.healthCheck({})
  }

  @Get('subject/all')
  public async getAll(@Request() req: AuthRequest) {
    return this.todoService.getAll({ userId: req.accountId })
  }

  @Get('subject/info/:subject_id')
  public async getInfo(@Param('subject_id') subjectId: string) {
    return this.todoService.getOne({ subjectId })
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
      subject: subject.subject,
    }
  }

  @Post('task')
  public async createTask(
    @Body() body: CreateTaskRequest
  ): Promise<CreateTaskResponse> {
    const task = await this.todoService.addTask(body.parentId, {
      name: body.name,
      description: body.description,
      priority: body.priority || todo_types.Priority.LOW,
      status: body.status || todo_types.Status.TO_DO,
      task: [],
      startDate: body.startDate ? dayjs(body.startDate).unix() : dayjs().unix(),
      endDate: body.endDate ? dayjs(body.endDate).unix() : null,
    })

    return {
      subject: task.subject,
    }
  }

  @Put('subject/status')
  public async updateSubjectStatus(
    @Body() body: UpdateSubjectStatusRequest
  ): Promise<UpdateSubjectStatusResponse> {
    const resp = await this.todoService.updateSubjectStatus(
      body.subjectId,
      body.status
    )

    return {
      status: resp.status,
    }
  }

  @Put('task/status')
  public async updateTaskStatus(
    @Body() body: UpdateTaskStatusRequest
  ): Promise<UpdateTaskStatusResponse> {
    const resp = await this.todoService.updateTaskStatus(
      body.subjectId,
      body.taskId,
      body.status
    )

    return {
      status: resp.status,
    }
  }
}
