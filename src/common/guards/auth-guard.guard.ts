import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,

  ) { }
  async canActivate(context: ExecutionContext) {
    const jwt = context.switchToHttp().getRequest().cookies?.AUTH;
    if (!jwt) return false

    const decoded = this.jwtService.decode(jwt)
    if (!decoded) {
      return false;
    }

    const user = await this.userService.getUser(decoded.email)

    if (!user) {
      return false;
    }
    // Attach the user object to the request
    context.switchToHttp().getRequest().user = user;



    return true
  }

}