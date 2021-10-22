import { IUser } from '../user/user.interface';

export interface IBlogEntry {
  title: string;
  text: string;
  author: IUser;
  createdAt: Date;
}
