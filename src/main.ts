import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  //logs globally
  // const app = await NestFactory.create(AppModule, {
  //   bufferLogs: true, // logger: ['verbose']
  // });
  // app.useLogger(app.get(MyLoggerService));

  app.enableCors();
  app.setGlobalPrefix('api');
  //app.enableCors();
  await app.listen(3000);
}
bootstrap();
