import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await CommandFactory.run(AppModule, ['warn', 'error']);
}
bootstrap();
