import { PaymentMethod } from '@prisma/client';
export declare class CreatePaymentDto {
    orderId: string;
    method: PaymentMethod;
}
