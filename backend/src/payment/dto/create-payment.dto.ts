// src/payment/dto/create-payment.dto.ts
import { IsEnum, IsString } from 'class-validator';
import { PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {
  @IsString()
  orderId: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
