import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/file-uploading.utils';
import { AppService } from './app.service';
import { PhotoRO } from './image/image.model';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getImages(): Promise<PhotoRO[]> {
    return this.appService.findAll();
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadedImage(@UploadedFile() image) {
  //   console.log(image);
  //   console.log('successfuly uploaded');
  //   const response = {
  //     originalname: image.originalname,
  //     filename: image.filename,
  //   };
  //   return response;
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    console.log(file);
    console.log('successfuly uploaded');
    const image: PhotoRO = {
      directory: file.filename,
      filename: file.originalname,
    }

    this.appService.save(image);

    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }


  @Get('images/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

}
