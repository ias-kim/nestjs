import { AuthService } from '../auth/auth.service.spec';
import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Patch,
  Delete,
  UseFilters,
  HttpException,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptions/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { ReadOnlyCatDto } from './dto/cats.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기'})
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiResponse({
    status: 500,
    description: 'ㅅ실패',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body)
  }

  @ApiOperation({ summary: '로그인'})
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '로그아웃'})
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
