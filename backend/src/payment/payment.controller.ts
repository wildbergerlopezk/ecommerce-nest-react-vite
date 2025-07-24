import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Res,
  HttpStatus,
  Req,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response, Request } from 'express';
import { AppConfig } from '../config/app.config';

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private appConfig: AppConfig,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async createCheckout(@Body() body: { orderId: string; amount: number }) {
    return this.paymentService.createCheckoutSession(body.orderId, body.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('success')
  async paymentSuccess(@Query('session_id') sessionId: string, @Res() res: Response) {
    try {
      if (!sessionId) {
        return res.status(HttpStatus.BAD_REQUEST).send('session_id es requerido');
      }

      await this.paymentService.handleCheckoutSuccess(sessionId);

      return res.redirect(`${this.appConfig.frontendUrl}/success`);
    } catch (error) {
      console.error('Error en success:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Error al procesar el pago exitoso');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('cancel')
  paymentCancel(@Res() res: Response) {
    return res.redirect(`${this.appConfig.frontendUrl}/cancel`);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleStripeWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = (req as any).rawBody ?? req.body;
    return this.paymentService.handleStripeWebhook(rawBody, signature);
  }
}
