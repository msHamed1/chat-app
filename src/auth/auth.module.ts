import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStartegy } from './strategies/local.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal:true,
}),UsersModule,
    JwtModule.registerAsync({
    useFactory:(configService:ConfigService)=>({
      secret: configService.get("SECRET_KEY"),
      signOptions:{
        expiresIn:"3600s"
      }
    }),
    inject:[ConfigService]
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStartegy,JwtService]
})
export class AuthModule {}
