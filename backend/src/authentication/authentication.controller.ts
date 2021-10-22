import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Redirect,
  Req,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { IHttpError } from './../models/http-error.interface';
import { User } from './../models/user/user';
import { GoogleService } from './authentication-strategies/google.service';

@Controller('api/authentication')
@ApiTags('authentication')
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);

  constructor(private readonly googleService: GoogleService) {}

  @Get()
  @ApiOkResponse({
    description: 'User is authenticated.',
    type: User,
  })
  @ApiUnauthorizedResponse({
    description: 'User is not authenticated.',
    type: IHttpError,
  })
  getAuthenticationStatus(@Session() session) {
    this.logger.debug('getAuthenticationStatus called');
    if (!session.user) throw new UnauthorizedException();
    return session.user;
  }

  @Delete()
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Authentication status was removed successfully.',
  })
  deleteAuthentication(@Session() session) {
    this.logger.debug('deleteAuthentication called');
    delete session.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    this.logger.debug('User wants to login using Google Auth');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect('http://localhost:4200', 301)
  async googleAuthRedirect(@Req() req: Request, @Session() session) {
    this.logger.debug('User successfully logged in using Google Auth');
    session.user = await this.googleService.googleLogin(req);
  }
}
