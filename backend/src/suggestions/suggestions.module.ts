import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user/user';
import { Suggestion, SuggestionSchema } from './models/suggestion.model';
import { SuggestionsController } from './suggestions.controller';
import { SuggestionsService } from './suggestions.service';

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
  ],
  controllers: [SuggestionsController],
  providers: [SuggestionsService],
})
export class SuggestionsModule {}
