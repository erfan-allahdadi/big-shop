import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as morgan from 'morgan';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/^http:\/\/localhost(:[0-9]+)?$/],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Original-User-Agent, X-Client-Hints',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(morgan('tiny'));

  const config = new DocumentBuilder()
    .setTitle('Shop API')
    .setDescription('The API for the shop')
    .setVersion('1.0')
    .addTag('Authentication')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT);

  new Logger().log(`Server is running on http://127.0.0.1:${process.env.PORT}`);
  new Logger().log(
    `Server is running on http://127.0.0.1:${process.env.PORT}/api/docs`,
  );
}
bootstrap();
