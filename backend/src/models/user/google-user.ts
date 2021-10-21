import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type GoogleUserDocument = GoogleUser & Document;

@Schema({ discriminatorKey: 'idp' })
export class GoogleUser {
  idp: string;

  @ApiProperty()
  @Prop()
  firstname: string;

  @ApiProperty()
  @Prop()
  lastname: string;

  @ApiProperty()
  @Prop()
  picture: string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);
