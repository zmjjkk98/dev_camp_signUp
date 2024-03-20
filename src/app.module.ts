import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthmoduleModule } from './auth/auth.module';
import { UserService } from './auth/services/user.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      validationSchema,      
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),    
    AuthmoduleModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
