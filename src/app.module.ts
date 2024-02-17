import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, RegisterController],
  providers: [AppService, RegisterService],
})
export class AppModule {}
