import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use('/uploads', express.static('uploads'))
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
    ],
  });


  await app.listen(3000);
}
bootstrap();
