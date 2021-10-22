import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogEntry, BlogEntrySchema } from './models/BlogEntry';
import { BlogService } from './blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlogEntry.name,
        schema: BlogEntrySchema,
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
