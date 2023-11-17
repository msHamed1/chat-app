import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'src/database/database.module';
import { FileDocument, FileSchema } from './models/file.schema';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/auth-guard.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
 imports:[AuthModule,UsersModule,DatabaseModule, DatabaseModule.forFeatures([{name:FileDocument.name, schema:FileSchema}])],
  controllers: [UploadController],
  providers: [UploadService,{
    provide:APP_GUARD,
    useClass:JwtAuthGuard
  }]
})
export class UploadModule { }
