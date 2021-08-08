import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false },
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get<ConfigService>(ConfigService);

  const appName = configService.get<string>('APP_NAME');
  const appVersion = configService.get<string>('APP_VERSION');
  const config = new DocumentBuilder().setTitle(appName).setVersion(appVersion).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(configService.get<number>('PORT', 8100));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
