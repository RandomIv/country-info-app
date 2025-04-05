import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { HttpService } from '@nestjs/axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const httpService = new HttpService();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(port ?? 3000);
}
bootstrap();
