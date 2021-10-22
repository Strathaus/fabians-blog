import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleService } from './authentication-strategies/google.service';
import { GoogleStrategy } from './authentication-strategies/google.strategy';
import { AuthenticationController } from './authentication.controller';
import { GoogleUser, GoogleUserSchema } from './../models/user/google-user';
import { User, UserSchema } from './../models/user/user';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [{ name: GoogleUser.name, schema: GoogleUserSchema }],
      },
    ]),
  ],
  controllers: [AuthenticationController],
  providers: [GoogleService, GoogleStrategy],
})
export class AuthenticationModule {}
