import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { auth } from '@todo-microservices/api-proto'

import { AppModule } from './app/app.module'
import serverConfig from './config/server.config'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: serverConfig.hostUrl,
        package: auth.AUTH_PACKAGE_NAME,
        protoPath: 'libs/api-proto/proto/auth.proto',
      },
    }
  )

  await app.listen()

  Logger.log(`Auth Service is running on: ${serverConfig.hostUrl}`)
}

bootstrap()
