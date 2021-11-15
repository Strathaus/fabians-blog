import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SuggestionComment,
  SuggestionCommentSchema,
} from './models/suggestion-comment.model';
import { SuggestionCommentsController } from './suggestion-comments.controller';
import { SuggestionCommentsService } from './suggestion-comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SuggestionComment.name,
        schema: SuggestionCommentSchema,
      },
    ]),
  ],
  controllers: [SuggestionCommentsController],
  providers: [SuggestionCommentsService],
})
export class SuggestionCommentsModule {}
