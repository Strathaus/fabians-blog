import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import MongoStore = require('connect-mongo');
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Set up OpenApi Viewer
  const config = new DocumentBuilder()
    .setTitle("Fabian 's Blog")
    .setDescription("API Description of Fabian's Blog")
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  // Set up Sessions
  const configService = app.get(ConfigService);
  const mongoStore = MongoStore.create({
    mongoUrl: configService.get('MONGODB_URL'),
  });
  app.use(
    session({
      secret: 'apUXCM9XzGdnV9ne',
      resave: false,
      saveUninitialized: false,
      store: mongoStore,
    }),
  );
  app.enableCors({ origin: 'http://localhost:4200', credentials: true });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
