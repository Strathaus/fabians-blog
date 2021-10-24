import { IUser } from '../user/user.interface';

export interface IBlogEntry {
  _id: string;
  title: string;
  text: string;
  author: IUser;
  createdAt: Date;
}
