import { todo_types } from '@todo-microservices/api-proto'
import { IsEnum, IsString } from 'class-validator'

export class UpdateSubjectStatusRequest {
  @IsString()
  subjectId: string

  @IsEnum(todo_types.Status)
  status: todo_types.Status
}

export class UpdateSubjectStatusResponse {
  @IsEnum(todo_types.Status)
  status: todo_types.Status
}
