import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response, response } from 'express';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/models/user.schema';
import { TokenPayload } from './interface/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }


  async logIn(user: UserDocument, res: Response) {
    const payLoad:TokenPayload = {
      userId: user._id.toHexString(),
      email:user.email
    }
    const expires = new Date()
    expires.setSeconds(
      expires.getSeconds() + 3600
    )

    const s = await this.configService.get("SECRET_KEY")



    const token = this.jwtService.sign(payLoad, {
      secret: await this.configService.get("SECRET_KEY")
    })
    res.cookie("AUTH", token, {
      httpOnly: true,
      expires: expires
    })

  }
}
