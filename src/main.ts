import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validasi otomatis untuk semua body request berdasarkan aturan di DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // buang field yang tidak ada di DTO
      forbidNonWhitelisted: true, // tolak request jika ada field asing
      transform: true, // ubah body menjadi instance DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
