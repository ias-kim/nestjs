import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository, MongooseModule],
})
export class CatsModule {}
