import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // <- cho phép frontend gửi request
  await app.listen(3001);
}
bootstrap();
