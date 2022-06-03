import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { todo_types } from '@todo-microservices/api-proto'
import { Document } from 'mongoose'

export type TaskDocument = Task & Document

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true, index: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true, index: true, type: String, enum: todo_types.Priority, default: todo_types.Priority.LOW })
  priority: todo_types.Priority

  @Prop({ required: true, index: true, type: String, enum: todo_types.Status, default: todo_types.Status.TO_DO })
  status: todo_types.Status

  @Prop()
  task: Task[]

  @Prop({ required: true, index: true })
  startDate: number

  @Prop({ required: true, index: true })
  endDate: number
}

export const TaskSchema = SchemaFactory.createForClass(Task)
