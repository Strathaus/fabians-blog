import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as session from 'express-session';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up OpenApi Viewer
  const config = new DocumentBuilder()
    .setTitle("Fabian 's Blog")
    .setDescription("API Description of Fabian's Blog")
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

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
