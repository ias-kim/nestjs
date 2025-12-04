import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from './aws/aws.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  //constructor(private readonly awsService: AwsService) {}

  // * localhost:3000/cats/hello
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async signUp() {
    return 'signup';
  }

  @Post('login')
  logIn() {
    return 'login';
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'img';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // return await this.AwsService.uploadFileToS3('cats', file);
  }

  @Post('cats')
  getImageUrl(@Body('key') key: string) {
  //  return this.awsService.getAwsS3FileUrl(key);
  }
}
