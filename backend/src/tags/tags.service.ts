import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogEntry, BlogEntryDocument } from '../blog/models/BlogEntry';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(BlogEntry.name)
    private blogEntryModel: Model<BlogEntryDocument>,
  ) {}

  public getTags(q?: string) {
    return this.blogEntryModel.aggregate([
      {
        $unwind: {
          path: '$tags',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      ...(q
        ? [
            {
              $match: {
                _id: { $regex: new RegExp(q, 'i') },
              },
            },
          ]
        : []),
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          name: '$_id',
          count: 1,
        },
      },
    ]);
  }
}
