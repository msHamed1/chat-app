import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/auth-guard.guard';
import { Request } from 'express';
import { currentUser } from 'src/common/decorators/user.decorator';



@Controller('upload')
export class UploadController {

  constructor(private readonly uploadService: UploadService) { }


  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [new MaxFileSizeValidator({
      maxSize: 6000000
    }),
    new FileTypeValidator({
      fileType: "image/jpeg"
    })
    ]
  })) file: Express.Multer.File, @currentUser() user: any) {
    
    const filePath = await this.uploadService.uploadFIle(file.originalname, file.buffer,user)
    return { message: 'File uploaded successfully', filePath };

  }
}
