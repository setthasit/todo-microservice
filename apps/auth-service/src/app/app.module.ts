import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'
import databaseConfig from '../config/database.config'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${databaseConfig.host}/admin`, {
      auth: {
        username: databaseConfig.username,
        password: databaseConfig.password,
      },
      dbName: databaseConfig.database,
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
