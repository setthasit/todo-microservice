import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { todo_types } from '@todo-microservices/api-proto'
import { Todo, TodoDocument } from '@todo-microservices/shared/models'
import { Model } from 'mongoose'

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoRepo: Model<TodoDocument>) {}

  async createSubject(req: todo_types.Subject): Promise<TodoDocument> {
    const newSubject = await this.todoRepo.create(req)

    return newSubject
  }
}
