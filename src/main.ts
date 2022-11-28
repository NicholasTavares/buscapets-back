import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // só ver os dados do dto
      forbidNonWhitelisted: true, // dar erro ser algum dado além do dto for enviado na requisição
      transform: true, // faz validação de tipagem
    }),
  );
  await app.listen(3002);
}
bootstrap();
