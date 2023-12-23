import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('BFF Magic Planning')
  .setDescription('Planning sprints with magic')
  .setVersion('1.0')
  .setContact(
    'By Federico de Fortuny',
    'https://www.linkedin.com/in/fdefortuny/',
    '',
    )
    .addApiKey({ type: 'apiKey', in: 'header', name: 'apikey' }, 'apikey')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT!);
}
bootstrap();
