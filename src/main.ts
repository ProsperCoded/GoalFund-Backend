import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger } from '@nestjs/common';
// import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = new ConsoleLogger();
  // app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
  logger.error(
    `Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );
  logger.warn(`Server running on http://localhost:${process.env.PORT ?? 3000}`);
  logger.fatal(
    `Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );
  logger.verbose(
    `Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
