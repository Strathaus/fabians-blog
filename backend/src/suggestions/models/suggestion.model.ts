import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { User } from 'src/models/user/user';

export type SuggestionDocument = Suggestion & Document;

@Schema({ timestamps: true })
export class Suggestion {
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
  description: string;

  @ApiProperty({ type: User })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: ObjectId;

  @ApiProperty({ type: User, isArray: true })
  @Prop({ required: true, type: [SchemaTypes.ObjectId], ref: 'User' })
  likes: ObjectId[];
}

export const SuggestionSchema = SchemaFactory.createForClass(Suggestion);
