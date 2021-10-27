import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { User } from 'src/models/user/user';

export type BlogEntryDocument = BlogEntry & Document;
export const BLOG_PREVIEW_LENGTH = 100;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class BlogEntry {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  })
  @Prop({ required: true })
  text: string;

  @ApiProperty({ type: String })
  preview: string;

  @ApiProperty({ type: [String] })
  @Prop({ type: [String] })
  tags: string[];

  @ApiProperty({ type: User })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: ObjectId;
}

const BlogEntrySchema = SchemaFactory.createForClass(BlogEntry);

BlogEntrySchema.virtual('preview').get(function (this: BlogEntryDocument) {
  const preview = `${this.text.substr(0, BLOG_PREVIEW_LENGTH)}...`;
  return preview;
});

export { BlogEntrySchema };
