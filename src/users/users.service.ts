import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from './models/user.schema';
import * as Bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(UserDocument.name) readonly userModel: Model<UserDocument>
  ) { }


  async createUser(user: CreateUserDto) {

    const password = await Bcrypt.hash(user.password, 10)

    return await this.userModel.create(
      {
        _id: new Types.ObjectId,
        ...user,
        password: password,

      }
    )
  }
}
