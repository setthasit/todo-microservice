import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { todo_types } from '@todo-microservices/api-proto'
import {
  SubjectCannotCreate,
  SubjectCannotUpdateStatus,
  SubjectNotFound,
  TaskCannotCreate,
  TaskCannotUpdateStatus,
} from '@todo-microservices/shared/exceptions'
import { Subject, SubjectDocument } from '@todo-microservices/shared/models'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Subject.name) private subjectRepo: Model<SubjectDocument>
  ) {}

  async getAll(userId: string): Promise<SubjectDocument[]> {
    const subjects = await this.subjectRepo
      .find({ userId })
      .orFail(SubjectNotFound)
    return subjects
  }

  async getOne(subjectId: string): Promise<SubjectDocument> {
    const subject = await this.subjectRepo
      .findOne({ id: subjectId })
      .orFail(SubjectNotFound)
    return subject
  }

  async createSubject(
    req: todo_types.SubjectCreateRequest
  ): Promise<SubjectDocument> {
    try {
      const subject = await this.subjectRepo.create(req)
      console.log(subject.id)
      return subject
    } catch {
      throw SubjectCannotCreate
    }
  }

  async createTask(
    subjectId: string,
    task: todo_types.TaskCreateRequest
  ): Promise<SubjectDocument> {
    const subject = await this.subjectRepo
      .findOne({ id: subjectId })
      .orFail(SubjectNotFound)

    const newTask: todo_types.Task = {
      id: new mongoose.Types.ObjectId().toString(),
      ...task,
    }

    await this.subjectRepo
      .updateOne(
        { id: subject.id },
        {
          $push: { task: newTask },
        }
      )
      .orFail(TaskCannotCreate)

    subject.task = subject.task ?? []
    subject.task.push(newTask)

    return subject
  }

  async updateSubjectStatus(subjectId: string, status: todo_types.Status) {
    await this.subjectRepo
      .updateOne({ id: subjectId }, { status })
      .orFail(SubjectCannotUpdateStatus)

    return
  }

  async updateTaskStatus(
    subjectId: string,
    taskId: string,
    status: todo_types.Status
  ) {
    const subject = await this.subjectRepo
      .findOne({ id: subjectId })
      .orFail(SubjectNotFound)

    let updateQuery: object = { 'task.$.status': status }
    const tasks = subject.task.filter(t => {
      if (t.status !== status && t.id !== taskId) {
        return t
      }
    })
    if (tasks.length < 1) {
      updateQuery = { status, ...updateQuery }
    }

    await this.subjectRepo
      .updateOne({ id: subjectId, 'task.id': taskId }, { $set: updateQuery })
      .orFail(SubjectCannotUpdateStatus)

    return
  }
}
