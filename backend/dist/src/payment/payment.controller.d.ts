import { PaymentService } from './payment.service';
import { Response, Request } from 'express';
import { AppConfig } from '../config/app.config';
export declare class PaymentController {
    private paymentService;
    private appConfig;
    constructor(paymentService: PaymentService, appConfig: AppConfig);
    createCheckout(body: {
        orderId: string;
        amount: number;
    }): Promise<{
        url: string;
    }>;
    paymentSuccess(sessionId: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    paymentCancel(res: Response): void;
    handleStripeWebhook(req: Request, signature: string): Promise<void>;
}
