import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Cookie from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(Cookie())
  await app.listen(3000);
}
bootstrap();
