import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GoogleUserDocument } from '../models/user/google-user';
import { User } from '../models/user/user';
import { Suggestion, SuggestionDocument } from './models/suggestion.model';
import * as Mongoose from 'mongoose';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(Suggestion.name)
    private suggestionModel: Model<SuggestionDocument>,
    @InjectModel(User.name)
    private userModel: Model<GoogleUserDocument>,
  ) {}

  async createSuggestion(suggestion) {
    return this.suggestionModel.create(suggestion);
  }

  async getBestSuggestions(inputs: { userId?: string; skip?: number }) {
    return this.suggestionModel.aggregate([
      {
        $set: {
          likesCount: { $size: '$likes' },
        },
      },
      {
        $skip: inputs.skip || 0,
      },
      {
        $limit: 10,
      },
      {
        $project: {
          title: 1,
          description: 1,
          likesCount: 1,
          likes: 1,
          author: 1,
          liked: {
            index: {
              $indexOfArray: [
                '$likes',
                new Mongoose.Types.ObjectId(inputs.userId),
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: this.userModel.collection.collectionName,
          localField: 'author',
          foreignField: '_id',
          as: 'author',
        },
      },
      {
        $set: {
          author: { $arrayElemAt: ['$author', 0] },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          likes: '$likesCount',
          author: { _id: 1, email: 1 },
          liked: {
            $gte: ['$liked.index', 0],
          },
        },
      },
    ]);
  }

  async deleteSuggestion(id: string, userId: string) {
    const suggestion = await this.suggestionModel.findById(id);
    if (!suggestion) throw new NotFoundException();
    if (suggestion.author.toString() !== userId) throw new ForbiddenException();
    return suggestion.remove();
  }
}
