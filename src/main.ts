import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { authMiddleware } from './middlewares/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(authMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
