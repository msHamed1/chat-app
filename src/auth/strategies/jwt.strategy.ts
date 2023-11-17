import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { TokenPayload } from "../interface/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService


  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.AUTH

      ]),
      secretOrKey: configService.get("SECRET_KEY")
    })
  }


  async validate({ userId,email }: TokenPayload) {
    try {
    
      return await this.userService.getUser(email)
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }


  }

}