import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // * localhost:3000/cats/hello
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
