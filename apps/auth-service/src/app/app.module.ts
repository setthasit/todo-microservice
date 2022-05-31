import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/admin', {
      auth: {
        username: 'todo-admin',
        password: 'todoadmin1234!',
      },
      dbName: 'todo-db',
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
