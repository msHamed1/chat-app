import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDocument } from './models/user.schema';
import * as Bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { use } from 'passport';

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

  async verifyUser(login: LoginDto) {
    const user = await this.userModel.findOne({
      email: login.email
    }).lean<UserDocument>(true)


    if (!user) {
      throw new NotFoundException("Not valid crids")
    }
    const passIdCorrect = await Bcrypt.compare(login.password, user.password)
    if (!passIdCorrect) throw new NotFoundException("Not valid crids")

    return user;

  }

  async getUser(email: string) {

    const user = await this.userModel.findOne({
      email: email
    }).lean<UserDocument>(true);
    console.log(user)

    if (!user) throw new UnauthorizedException("user not found ")
    return user;
  }


}
