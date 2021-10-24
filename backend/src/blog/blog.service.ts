import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogEntry, BlogEntryDocument } from './models/BlogEntry';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(BlogEntry.name)
    private blogEntryModel: Model<BlogEntryDocument>,
  ) {}

  async createBlogEntry(blogEntry) {
    return this.blogEntryModel.create(blogEntry);
  }

  async getLatestBlogs(skip?: number) {
    return this.blogEntryModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(10)
      .populate({
        path: 'author',
        fields: '_id firstname lastname',
      })
      .exec();
  }

  async getBlog(id: string) {
    return this.blogEntryModel
      .findById(id)
      .populate({
        path: 'author',
        fields: '_id firstname lastname',
      })
      .exec();
  }

  async editBlog(id: string, data: any) {
    return this.blogEntryModel
      .findByIdAndUpdate(id, data, { upsert: false, new: true })
      .populate({
        path: 'author',
        fields: '_id firstname lastname',
      })
      .exec();
  }

  async deleteBlogEntry(id: string) {
    return this.blogEntryModel.remove({ _id: id });
  }
}
