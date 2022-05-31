import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { todo } from '@todo-microservices/api-proto';
import serviceConfig from '../config/service.config';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: todo.TODO_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: serviceConfig.todoService,
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
