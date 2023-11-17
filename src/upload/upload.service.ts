import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from "fs"
import { Model, Types } from 'mongoose';
import { UserDocument } from 'src/users/models/user.schema';
import { FileDocument } from './models/file.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UploadService {


  constructor(@InjectModel(FileDocument.name) private readonly fileModel: Model<FileDocument>) { }


  async uploadFIle(fileName: String, data: Buffer, user: UserDocument) {

    const filePath = './uploads/' + fileName;

    fs.writeFileSync(filePath, data);

    const file = await this.fileModel.create({
      _id: new Types.ObjectId,
      path: filePath,
      createdBy:
      {
        userEmail: user.email,
        userId: user._id
      }


    })


    return file
  }

  async getFile(id: any ,user:any) {
    const ids = new Types.ObjectId(id.fileId)
    const file = await this.fileModel.findById(ids)
    if(!file){
      throw new NotFoundException()
    }
    if(user._id  == file.createdBy.userId ){
      throw new UnauthorizedException()

    }
    const filePath = file.path;
    const fileContent = fs.readFileSync(filePath);
    return fileContent;

  }
}
