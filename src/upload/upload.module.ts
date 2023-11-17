import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/database/database.module';
import { FileDocument, FileSchema } from './models/file.schema';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, DatabaseModule.forFeatures([{ name: FileDocument.name, schema: FileSchema }])],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
