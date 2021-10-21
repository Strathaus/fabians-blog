import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { GoogleUser } from './google-user';

export type UserDocument = User & Document;

@Schema({ discriminatorKey: 'idp' })
export class User {
  @Prop({
    type: String,
    required: true,
    enum: [GoogleUser.name],
  })
  idp: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
