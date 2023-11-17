import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginDto } from "src/users/dto/login.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userService: UsersService
  ) {
    super({
      usernameField: "email"
    })
  }

  async validate(email: string, password: string) {
    try {
      console.log("email ")
      return await this._userService.verifyUser({
        email,
        password
      })
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }


  }

}