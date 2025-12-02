import { CommentsSchema, Comments } from './comments.schema';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    forwardRef(() => CatsModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
