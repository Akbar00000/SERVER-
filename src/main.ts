import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new class extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      console.error('Caught exception:', exception);
      super.catch(exception, host);
    }
  });

  app.enableCors();
  await app.listen(3001);
  console.log('Server running on http://localhost:3001');
}


bootstrap().catch(err => console.error(err));
