import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { User } from 'src/models/user/user';

export type SuggestionCommentDocument = SuggestionComment & Document;

@Schema({ timestamps: true })
export class SuggestionComment {
  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  })
  @Prop({ required: true })
  text: string;

  @ApiProperty({ type: String })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Suggestion' })
  suggestion: ObjectId;

  @ApiProperty({ type: User })
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  author: ObjectId;

  @ApiProperty({ type: SuggestionComment })
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'SuggestionComment',
  })
  responseTo: ObjectId;
}

export const SuggestionCommentSchema =
  SchemaFactory.createForClass(SuggestionComment);
