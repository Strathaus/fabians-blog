import {
  Controller,
  Get,
  Logger,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './authentication-strategies/google.service';

@Controller('api/authentication')
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(private readonly googleService: GoogleService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    this.logger.debug('User wants to login using Google Auth');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('http://localhost:3000', 301)
  googleAuthRedirect(@Req() req) {
    this.logger.debug('User successfully logged in using Google Auth');
    console.log(this.googleService.googleLogin(req));
    return this.googleService.googleLogin(req);
  }
}
