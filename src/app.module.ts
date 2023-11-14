import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatModule } from './gateway/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    DatabaseModule,
    UsersModule,
    AuthModule,ChatModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule { }
