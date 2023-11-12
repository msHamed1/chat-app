import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { UserDocument, UserSchema } from './models/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [

    DatabaseModule,
    DatabaseModule.forFeatures([{ name: UserDocument.name, schema: UserSchema }])

  ],
  controllers: [UsersController],
  providers: [UsersService ,JwtAuthGuard],
  exports: [UsersService]

})
export class UsersModule { }
