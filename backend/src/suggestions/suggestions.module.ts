import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user/user';
import { Suggestion, SuggestionSchema } from './models/suggestion.model';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';
import { SuggestionCommentsModule } from './suggestion-comments/suggestion-comments.module';
import {
  SuggestionComment,
  SuggestionCommentSchema,
} from './suggestion-comments/models/suggestion-comment.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Suggestion.name,
        schema: SuggestionSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: SuggestionComment.name,
        schema: SuggestionCommentSchema,
      },
    ]),
    SuggestionCommentsModule,
  ],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}
