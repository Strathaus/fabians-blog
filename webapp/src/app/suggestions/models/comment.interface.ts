import { IUser } from '../../models/user/user.interface';

export interface IComment {
  _id: string;
  text: string;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
}
