import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from 'prisma/prisma.service';
import { AppConfig } from '../config/app.config';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly appConfig: AppConfig,
  ) {
    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new InternalServerErrorException('Stripe secret key is not defined');
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-06-30.basil',
    });
  }

  async createCheckoutSession(orderId: string, amountInGuaranies: number): Promise<{ url: string }> {
    const frontendUrl = this.appConfig.frontendUrl;

    if (!orderId) {
      throw new BadRequestException('El ID de la orden es requerido');
    }

    if (!amountInGuaranies || amountInGuaranies <= 0) {
      throw new BadRequestException('El monto debe ser mayor a cero');
    }

    const exchangeRate = 7200;
    const amountInUsd = amountInGuaranies / exchangeRate;

    const usdAmountInCents = Math.round(amountInUsd * 100);

    if (usdAmountInCents > 99999999) {
      throw new BadRequestException('El monto excede el límite permitido por Stripe.');
    }

    try {
      await this.prisma.payment.create({
        data: {
          orderId,
          status: PaymentStatus.PENDING,
          amount: amountInGuaranies,
          method: 'CREDIT_CARD',
        },
      });

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Orden #${orderId}`,
              },
              unit_amount: usdAmountInCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/cancel`,
        metadata: {
          orderId,
        },
      });

      return { url: session.url! };
    } catch (error) {
      console.error('Error al crear la sesión de Stripe:', error);
      throw new InternalServerErrorException('No se pudo crear la sesión de pago.');
    }
  }

  async handleCheckoutSuccess(sessionId: string): Promise<void> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      const orderId = session.metadata?.orderId;

      if (!orderId) {
        throw new BadRequestException('La sesión no tiene una orden asociada');
      }

      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new NotFoundException('Orden no encontrada');
      }

      const payment = await this.prisma.payment.findFirst({
        where: { orderId },
      });

      if (!payment) {
        throw new NotFoundException('Pago no encontrado');
      }

      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: PaymentStatus.PAID,
        },
      });

      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CONFIRMED,
        },
      });
    } catch (error) {
      console.error('Error al procesar el éxito del pago:', error);
      throw new InternalServerErrorException('No se pudo completar el proceso de éxito de pago.');
    }
  }

  async handleStripeWebhook(payload: Buffer | string, signature: string): Promise<void> {
    const endpointSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!endpointSecret) throw new InternalServerErrorException('Falta STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.error('Firma inválida:', err.message);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      try {
        const orderId = session.metadata?.orderId;

        if (!orderId) {
          console.error('Webhook sin orderId');
          throw new BadRequestException('Falta orderId en metadata');
        }

        const payment = await this.prisma.payment.findFirst({
          where: { orderId },
        });

        if (!payment) {
          console.error('Pago no encontrado para orderId:', orderId);
          throw new NotFoundException('Pago no encontrado');
        }

        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.PAID },
        });

        await this.prisma.order.update({
          where: { id: orderId },
          data: { status: OrderStatus.CONFIRMED },
        });

        console.log(`✅ Webhook procesado: orden ${orderId} confirmada.`);
      } catch (error) {
        console.error('❌ Error al procesar checkout.session.completed:', error);
        throw new InternalServerErrorException('Error en procesamiento de webhook');
      }
    } else {
      console.log(`ℹ️ Evento ignorado: ${event.type}`);
    }
  }

  private async processSuccessfulPayment(session: Stripe.Checkout.Session) {
    const orderId = session.metadata?.orderId;
    if (!orderId) throw new BadRequestException('Falta orderId en metadata');

    const payment = await this.prisma.payment.findFirst({ where: { orderId } });
    if (!payment) throw new NotFoundException('Pago no encontrado');

    await this.prisma.payment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.PAID },
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CONFIRMED },
    });

    console.log(` Webhook procesado: Orden ${orderId} confirmada`);
  }

}
