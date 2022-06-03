import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { todo_types } from '@todo-microservices/api-proto'
import {
  SubjectCannotCreate,
  SubjectNotFound,
  TaskCannotCreate,
} from '@todo-microservices/shared/exceptions'
import { Subject, SubjectDocument, Task } from '@todo-microservices/shared/models'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Subject.name) private subjectRepo: Model<SubjectDocument>
  ) {}

  async createSubject(req: todo_types.Subject): Promise<SubjectDocument> {
    try {
      const subject = await this.subjectRepo.create(req)
      return subject
    } catch {
      throw SubjectCannotCreate
    }
  }

  async createTask(
    subjectId: string,
    task: todo_types.Task
  ): Promise<SubjectDocument> {
    const subject = await this.subjectRepo
      .findOne({ id: subjectId })
      .orFail(SubjectNotFound)

    await this.subjectRepo
      .updateOne(
        { id: subject.id },
        {
          $push: {task: task },
        }
      )
      .orFail(() => TaskCannotCreate)

    subject.task = subject.task ?? []
    subject.task.push(task)

    return subject
  }
}
