import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogEntry, BlogEntrySchema } from '../blog/models/BlogEntry';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlogEntry.name,
        schema: BlogEntrySchema,
      },
    ]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
