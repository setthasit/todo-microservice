import { todo_types } from "@todo-microservices/api-proto"
import { IsEnum, IsOptional, IsString } from "class-validator"

export class CreateSubjectRequest {
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

export class CreateSubjectResponse {
  subjectId: string
}
