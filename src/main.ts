import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(__filename);
  const app = await NestFactory.create(AppModule);
  const configService = await app.resolve(ConfigService);
  const port = configService.get<string>('APP_PORT');
  app
    .listen(port)
    .then(() => logger.debug('App listening on http://127.0.0.1:' + port));
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('News API Docs')
    .setDescription('How to use news API')
    .setVersion('1.0')
    .addTag('news')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
bootstrap();
