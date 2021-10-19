import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GoogleService } from './controller/authentication/authentication-strategies/google.service';
import { GoogleStrategy } from './controller/authentication/authentication-strategies/google.strategy';
import { AuthenticationController } from './controller/authentication/authentication.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URL,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'webapp', 'dist'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [GoogleService, GoogleStrategy],
})
export class AppModule {}
