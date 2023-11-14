import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { JwtAuthGuard } from "src/common/guards/auth-guard.guard";
import { JwtStrategy } from "src/auth/strategies/jwt.strategy";
import { JwtService } from "@nestjs/jwt";
import { LocalStartegy } from "src/auth/strategies/local.strategy";
import { UsersService } from "src/users/users.service";
import { DatabaseModule } from "src/database/database.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [DatabaseModule, UsersModule],
  providers: [LocalStartegy, JwtService, ChatGateway]
})
export class ChatModule { }