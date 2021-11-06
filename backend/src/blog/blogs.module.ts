import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs.controller';
import { BlogEntry, BlogEntrySchema } from './models/BlogEntry';
import { BlogsService } from './blogs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BlogEntry.name,
        schema: BlogEntrySchema,
      },
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
