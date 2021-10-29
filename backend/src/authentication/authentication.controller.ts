import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Req,
  Res,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IHttpError } from './../models/http-error.interface';
import { User } from './../models/user/user';
import { GoogleService } from './authentication-strategies/google.service';

@Controller('api/authentication')
@ApiTags('authentication')
export class AuthenticationController {
  private readonly _logger = new Logger(AuthenticationController.name);

  constructor(
    private readonly _googleService: GoogleService,
    private readonly _configService: ConfigService,
  ) {
    console.log(process.env.NODE_ENV);
  }

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
    delete session.user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    this._logger.debug('User wants to login using Google Auth');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session,
  ) {
    this._logger.debug('User successfully logged in using Google Auth');
    session.user = await this._googleService.googleLogin(req);
    console.log(typeof this._configService.get('PRODUCTION'));
    return res.redirect(
      Boolean(this._configService.get('PRODUCTION'))
        ? '/'
        : 'http://localhost:4200',
    );
  }
}
