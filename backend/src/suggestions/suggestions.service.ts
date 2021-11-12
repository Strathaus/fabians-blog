import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '@src/models/user/user';
import {
  Suggestion,
  SuggestionDocument,
} from '@src/suggestions/models/suggestion.model';
import * as Mongoose from 'mongoose';

@Injectable()
export class SuggestionsService {
  constructor(
    @InjectModel(Suggestion.name)
    private suggestionModel: Model<SuggestionDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createSuggestion(suggestion) {
    return this.suggestionModel.create(suggestion);
  }

  async editSuggestion(id: string, suggestion, userId: string) {
    return this.suggestionModel.findOneAndUpdate(
      { _id: id, author: new Mongoose.Types.ObjectId(userId) } as any,
      suggestion,
      { new: true, fields: { title: 1, description: 1 } },
    );
  }

  async getSuggestion(id: string) {
    const suggestion = await this.suggestionModel
      .findById(id)
      .select('_id title description');
    if (!suggestion)
      throw new NotFoundException('Suggestion can not be found.');
    return suggestion;
  }

  async likeSuggestionAndReturnLikes(id: string, userId: string) {
    const suggestion = await this.suggestionModel.findOneAndUpdate(
      { _id: id, likes: { $ne: userId } } as any,
      { $push: { likes: userId } },
      { new: true },
    );
    if (!suggestion)
      throw new NotFoundException(
        'Suggestion can not be found or was not liked',
      );
    return suggestion.likes.length;
  }

  async removeLikeSuggestionAndReturnLikes(id: string, userId: string) {
    const suggestion = await this.suggestionModel.findOneAndUpdate(
      { _id: id, likes: userId } as any,
      { $pull: { likes: userId } },
      { new: true },
    );
    if (!suggestion)
      throw new NotFoundException(
        'Suggestion can not be found or was not liked',
      );
    return suggestion.likes.length;
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
        $set: {
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
          createdAt: 1,
          updatedAt: 1,
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
