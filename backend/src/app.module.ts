import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectModule } from './project/project.module';
import { BlogModule } from './blog/blog.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URL,
      }),
    }),
    AuthenticationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'webapp', 'dist'),
      exclude: ['/api*'],
    }),
    ProjectModule,
    BlogModule,
    TagsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
