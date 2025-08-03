import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'prisma/prisma.service';
import { AppConfig } from '../config/app.config';
export declare class PaymentService {
    private readonly config;
    private readonly prisma;
    private readonly appConfig;
    private stripe;
    constructor(config: ConfigService, prisma: PrismaService, appConfig: AppConfig);
    createCheckoutSession(orderId: string, amountInGuaranies: number): Promise<{
        url: string;
    }>;
    handleCheckoutSuccess(sessionId: string): Promise<void>;
    handleStripeWebhook(payload: Buffer | string, signature: string): Promise<void>;
    private processSuccessfulPayment;
}
