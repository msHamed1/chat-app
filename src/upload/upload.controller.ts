import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/common/guards/auth-guard.guard';
import { currentUser } from 'src/common/decorators/user.decorator';
import { Response } from 'express';


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

    const filePath = await this.uploadService.uploadFIle(file.originalname, file.buffer, user)
    return { message: 'File uploaded successfully', data: filePath };

  }

  @Get(":fileId")
  @UseGuards(JwtAuthGuard)
  async getFile(@currentUser() user: any, @Param() id: string, @Res() res: Response) {
    const buffer = await this.uploadService.getFile(id, user)
    res.setHeader('Content-Type', 'image/jpeg')
    res.send(buffer);

  }
}
