import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Subject, SubjectSchema } from '@todo-microservices/shared/models'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Subject.name,
        schema: SubjectSchema,
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
