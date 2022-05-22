import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: "0.0.0.0:50051",
      package: 'todo',
      protoPath: 'libs/api-proto/proto/todo.proto'
    }
  });

  await app.listen();
}

bootstrap();
