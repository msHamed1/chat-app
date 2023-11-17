import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from "fs"
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/models/user.schema';
import { FileDocument } from './models/file.schema';

@Injectable()
export class UploadService {


  constructor(@InjectModel(FileDocument.name) fileModel: Model<FileDocument>) { }


  async uploadFIle(fileName: String, data: Buffer, user: UserDocument) {

    const filePath = './uploads/' + fileName;

    fs.writeFileSync(filePath, data);

    return filePath
  }
}
