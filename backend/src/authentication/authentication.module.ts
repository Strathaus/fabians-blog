import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleService } from 'src/authentication/authentication-strategies/google.service';
import { GoogleStrategy } from 'src/authentication/authentication-strategies/google.strategy';
import { AuthenticationController } from 'src/authentication/authentication.controller';
import { GoogleUser, GoogleUserSchema } from 'src/models/user/google-user';
import { User, UserSchema } from 'src/models/user/user';

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
