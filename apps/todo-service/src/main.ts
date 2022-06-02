import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const host = process.env.APP_TODO_SERVICE_URL

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: host,
      package: 'todo',
      protoPath: 'libs/api-proto/proto/todo.proto'
    }
  });

  await app.listen();
  Logger.log(`Todo Service is running on: ${host}`);
}

bootstrap();
