import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { todo_types } from '@todo-microservices/api-proto'
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Task } from './task.schema'

export type SubjectDocument = Subject & Document

@Schema({ timestamps: true, minimize: false })
export class Subject {
  id: string

  @Prop({ required: true, index: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true, index: true, type: String, enum: todo_types.Priority, default: todo_types.Priority.LOW })
  priority: todo_types.Priority

  @Prop({ required: true, index: true, type: String, enum: todo_types.Status, default: todo_types.Status.TO_DO })
  status: todo_types.Status

  @Prop()
  task: Task[]

  @Prop({ required: true, index: true })
  startDate: number

  @Prop({ index: true })
  endDate: number

  @Prop({ required: true, index: true })
  userId: string
}

export const SubjectSchema = SchemaFactory.createForClass(Subject)
