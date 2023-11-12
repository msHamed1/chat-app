import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) { }

  @Post()
  async signUp(@Body() user: CreateUserDto) {

    return await this.userService.createUser(user)

  }


  @Get()
  @UseGuards(JwtAuthGuard)
  async getDetails(
    @CurrentUser() user: UserDocument,

    @Res() res: Response
  ) {

    res.send(user)
  }
}
