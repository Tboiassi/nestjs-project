import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();

// tutorial 2:04:57