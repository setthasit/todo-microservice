import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const globalPrefix = 'api/v1'
  app.setGlobalPrefix(globalPrefix)

  const port = process.env.APP_BFF_SERVICE_PORT || 3333

  await app.listen(port)
  Logger.log(`BFF service is running on: http://localhost:${port}/`)
}

bootstrap()
