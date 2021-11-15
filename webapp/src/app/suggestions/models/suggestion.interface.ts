import { IUser } from '../../models/user/user.interface';
import { IComment } from './comment.interface';

export interface ISuggestion {
  _id: string;
  title: string;
  description: string;
  author: IUser;
  liked: boolean;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
  comments: number;
}
