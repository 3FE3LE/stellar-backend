import * as fs from 'fs';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const appConfig = new DocumentBuilder()
    .setTitle('Stellar Backend API')
    .setDescription('Stellar Backend API documentation')
    .setVersion('1.0')
    .build();
  const appDocument = SwaggerModule.createDocument(app, appConfig, {
    ignoreGlobalPrefix: false,
  });
  fs.writeFileSync('openapi.json', JSON.stringify(appDocument, null, 2));
  SwaggerModule.setup(`${globalPrefix}/`, app, appDocument);

  const allowedOrigins = ['http://localhost:3001'];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
