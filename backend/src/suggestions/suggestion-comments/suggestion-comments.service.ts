import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  SuggestionComment,
  SuggestionCommentDocument,
} from './models/suggestion-comment.model';

@Injectable()
export class SuggestionCommentsService {
  constructor(
    @InjectModel(SuggestionComment.name)
    private readonly _suggestionCommentModel: Model<SuggestionCommentDocument>,
  ) {}

  async getLatestSuggestionComments(
    suggestionId: string,
    start: number,
    limit: number,
  ) {
    return this._suggestionCommentModel
      .find({
        suggestion: suggestionId,
      } as any)
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(limit)
      .populate({ path: 'author', select: '_id email' });
  }

  async postSuggestionComment(suggestionId: string, comment) {
    return this._suggestionCommentModel.create({
      suggestion: suggestionId,
      ...comment,
    });
  }
}
