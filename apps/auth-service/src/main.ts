import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { auth } from '@todo-microservices/api-proto'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50050',
        package: auth.AUTH_PACKAGE_NAME,
        protoPath: 'libs/api-proto/proto/auth.proto',
      },
    }
  )

  await app.listen()

  Logger.log(`Auth Service is running on: 0.0.0.0:50050`)
}

bootstrap()
