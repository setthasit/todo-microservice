import { Module } from '@nestjs/common'
import { AccountModule } from '../account/account.module'
import { AuthModule } from '../auth/auth.module'
import { TodoModule } from '../todo/todo.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [AuthModule, AccountModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
