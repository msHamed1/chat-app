import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class WsAuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,

  ) { }
  async canActivate(context: ExecutionContext) {

    const headers = context.switchToWs().getClient().handshake.headers;
    //console.log(headers)
    const jwt = headers["auth"]
    if (!jwt) {
      // make him disconntect 
      return false;
    }
    const decoded = this.jwtService.decode(jwt)
    if (!decoded) {
      return false;
    }

    //console.log(decoded)



    return false
  }

}