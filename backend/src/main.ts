import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:8080', 'http://192.168.0.110:8080', ' https://c95de2aa99b2.ngrok-free.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(
    '/payments/webhook',
    (req: Request, res: Response, next: NextFunction) => {
      if (req.method === 'POST') {
        const data: Buffer[] = [];
        req.on('data', (chunk: Buffer) => data.push(chunk));
        req.on('end', () => {
          (req as any).rawBody = Buffer.concat(data);
          next();
        });
      } else {
        next();
      }
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
