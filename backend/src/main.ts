import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Set up OpenApi Viewer
  const config = new DocumentBuilder()
    .setTitle("Fabian 's Blog")
    .setDescription("API Description of Fabian's Blog")
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  // Set up Sessions
  app.use(
    session({
      secret: 'apUXCM9XzGdnV9ne',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.enableCors({ origin: 'http://localhost:4200', credentials: true });

  await app.listen(3000);
}
bootstrap();
