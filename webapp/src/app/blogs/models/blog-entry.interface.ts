import { IUser } from '../../models/user/user.interface';

export interface IBlogEntry {
  _id: string;
  title: string;
  text?: string;
  preview?: string;
  tags: string[];
  author: IUser;
  createdAt: Date;
}
