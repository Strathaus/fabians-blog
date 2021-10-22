import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GoogleUser,
  GoogleUserDocument,
} from './../../models/user/google-user';

@Injectable()
export class GoogleService {
  constructor(
    @InjectModel(GoogleUser.name)
    private googleUserModel: Model<GoogleUserDocument>,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return await this.googleUserModel.findOneAndUpdate(
      { email: req.user.email },
      req.user,
      {
        upsert: true,
      },
    );
  }
}
