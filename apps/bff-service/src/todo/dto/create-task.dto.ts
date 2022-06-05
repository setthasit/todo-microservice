import { todo_types } from "@todo-microservices/api-proto"
import { Subject } from "@todo-microservices/shared/models"
import { IsEnum, IsOptional, IsString } from "class-validator"

export class CreateTaskRequest {
  @IsString()
  parentId: string

  @IsString()
  name: string

  @IsOptional()
  description?: string

  @IsOptional()
  @IsEnum(todo_types.Priority)
  priority?: todo_types.Priority

  @IsOptional()
  @IsEnum(todo_types.Status)
  status?: todo_types.Status

  @IsOptional()
  startDate?: Date

  @IsOptional()
  endDate?: Date
}

export class CreateTaskResponse {
  subject: Subject
}
