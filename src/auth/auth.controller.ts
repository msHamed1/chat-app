import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/users/dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { UserDocument } from 'src/users/models/user.schema';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService:AuthService){}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login( @CurrentUser() user : UserDocument,
  @Res({passthrough:true})  response :Response
  ){
     await this.authService.logIn(user,response)
     response.send(user)
  }
}
