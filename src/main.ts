import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter, Catch } from '@nestjs/common';

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception;

    console.error('Caught exception:', exception);

    if (!response.headersSent) {
      response.status(status).json({
        timestamp: new Date().toISOString(),
        path: request.url,
        error: message,
      });
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();
  await app.listen(3001);
  console.log('Server running on http://localhost:3001');
}

bootstrap().catch(err => console.error(err));
