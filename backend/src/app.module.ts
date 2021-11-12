import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthenticationModule } from '@src/authentication/authentication.module';
import { ProjectModule } from '@src/project/project.module';
import { BlogsModule } from '@src/blog/blogs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '@src/interceptors/logging.interceptor';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from '@src/tags/tags.module';
import { SuggestionsModule } from '@src/suggestions/suggestions.module';

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
    BlogsModule,
    TagsModule,
    SuggestionsModule,
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
