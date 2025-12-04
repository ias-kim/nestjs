import { forwardRef, Module } from '@nestjs/common';
import { CatsController } from './controller/cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './services/cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { CommentsSchema, Comments } from 'src/comments/comments.schema';
import { MulterExtendedModule } from 'nestjs-multer-extended';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      dest: './upload', // dest -> 어디에다가 저장이 되는지
    }),
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECERT_KEY,
        region: process.env.AWS_S3_REGION,
      },
      bucket: process.env.AWS_S3_BUCKET_NAME,
      basePath: 'cis',
      fileSize: 1 * 1024 * 1024,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository, MongooseModule],
})
export class CatsModule {}
