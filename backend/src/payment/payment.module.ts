import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { AppConfig } from '../config/app.config';  

@Module({
  imports: [ConfigModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService, AppConfig],
})
export class PaymentModule {}
