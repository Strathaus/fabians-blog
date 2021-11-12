import { IUser } from '../../models/user/user.interface';

export interface ISuggestion {
  _id: string;
  title: string;
  description: string;
  author: IUser;
  liked: boolean;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
