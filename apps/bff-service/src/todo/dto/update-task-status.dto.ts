import { todo_types } from "@todo-microservices/api-proto"
import { IsEnum, IsString } from "class-validator"

export class UpdateTaskStatusRequest {
  @IsString()
  subjectId: string

  @IsString()
  taskId: string

  @IsEnum(todo_types.Status)
  status: todo_types.Status
}

export class UpdateTaskStatusResponse {
  @IsEnum(todo_types.Status)
  status: todo_types.Status
}
