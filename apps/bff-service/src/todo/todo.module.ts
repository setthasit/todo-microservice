import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { todo } from '@todo-microservices/api-proto';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TODO_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: "0.0.0.0:50051",
          package: todo.TODO_PACKAGE_NAME,
          protoPath: 'libs/api-proto/proto/todo.proto'
        }
      }
    ])
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
