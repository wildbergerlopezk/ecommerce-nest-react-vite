"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
const prisma_service_1 = require("../../prisma/prisma.service");
const app_config_1 = require("../config/app.config");
const client_1 = require("@prisma/client");
let PaymentService = class PaymentService {
    config;
    prisma;
    appConfig;
    stripe;
    constructor(config, prisma, appConfig) {
        this.config = config;
        this.prisma = prisma;
        this.appConfig = appConfig;
        const secretKey = this.config.get('STRIPE_SECRET_KEY');
        if (!secretKey) {
            throw new common_1.InternalServerErrorException('Stripe secret key is not defined');
        }
        this.stripe = new stripe_1.default(secretKey, {
            apiVersion: '2025-06-30.basil',
        });
    }
    async createCheckoutSession(orderId, amountInGuaranies) {
        const frontendUrl = this.appConfig.frontendUrl;
        if (!orderId) {
            throw new common_1.BadRequestException('El ID de la orden es requerido');
        }
        if (!amountInGuaranies || amountInGuaranies <= 0) {
            throw new common_1.BadRequestException('El monto debe ser mayor a cero');
        }
        const exchangeRate = 7200;
        const amountInUsd = amountInGuaranies / exchangeRate;
        const usdAmountInCents = Math.round(amountInUsd * 100);
        if (usdAmountInCents > 99999999) {
            throw new common_1.BadRequestException('El monto excede el límite permitido por Stripe.');
        }
        try {
            await this.prisma.payment.create({
                data: {
                    orderId,
                    status: client_1.PaymentStatus.PENDING,
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
            return { url: session.url };
        }
        catch (error) {
            console.error('Error al crear la sesión de Stripe:', error);
            throw new common_1.InternalServerErrorException('No se pudo crear la sesión de pago.');
        }
    }
    async handleCheckoutSuccess(sessionId) {
        try {
            const session = await this.stripe.checkout.sessions.retrieve(sessionId);
            const orderId = session.metadata?.orderId;
            if (!orderId) {
                throw new common_1.BadRequestException('La sesión no tiene una orden asociada');
            }
            const order = await this.prisma.order.findUnique({
                where: { id: orderId },
            });
            if (!order) {
                throw new common_1.NotFoundException('Orden no encontrada');
            }
            const payment = await this.prisma.payment.findFirst({
                where: { orderId },
            });
            if (!payment) {
                throw new common_1.NotFoundException('Pago no encontrado');
            }
            await this.prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: client_1.PaymentStatus.PAID,
                },
            });
            await this.prisma.order.update({
                where: { id: orderId },
                data: {
                    status: client_1.OrderStatus.CONFIRMED,
                },
            });
        }
        catch (error) {
            console.error('Error al procesar el éxito del pago:', error);
            throw new common_1.InternalServerErrorException('No se pudo completar el proceso de éxito de pago.');
        }
    }
    async handleStripeWebhook(payload, signature) {
        const endpointSecret = this.config.get('STRIPE_WEBHOOK_SECRET');
        if (!endpointSecret)
            throw new common_1.InternalServerErrorException('Falta STRIPE_WEBHOOK_SECRET');
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
        }
        catch (err) {
            console.error('Firma inválida:', err.message);
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            try {
                const orderId = session.metadata?.orderId;
                if (!orderId) {
                    console.error('Webhook sin orderId');
                    throw new common_1.BadRequestException('Falta orderId en metadata');
                }
                const payment = await this.prisma.payment.findFirst({
                    where: { orderId },
                });
                if (!payment) {
                    console.error('Pago no encontrado para orderId:', orderId);
                    throw new common_1.NotFoundException('Pago no encontrado');
                }
                await this.prisma.payment.update({
                    where: { id: payment.id },
                    data: { status: client_1.PaymentStatus.PAID },
                });
                await this.prisma.order.update({
                    where: { id: orderId },
                    data: { status: client_1.OrderStatus.CONFIRMED },
                });
                console.log(`✅ Webhook procesado: orden ${orderId} confirmada.`);
            }
            catch (error) {
                console.error('❌ Error al procesar checkout.session.completed:', error);
                throw new common_1.InternalServerErrorException('Error en procesamiento de webhook');
            }
        }
        else {
            console.log(`ℹ️ Evento ignorado: ${event.type}`);
        }
    }
    async processSuccessfulPayment(session) {
        const orderId = session.metadata?.orderId;
        if (!orderId)
            throw new common_1.BadRequestException('Falta orderId en metadata');
        const payment = await this.prisma.payment.findFirst({ where: { orderId } });
        if (!payment)
            throw new common_1.NotFoundException('Pago no encontrado');
        await this.prisma.payment.update({
            where: { id: payment.id },
            data: { status: client_1.PaymentStatus.PAID },
        });
        await this.prisma.order.update({
            where: { id: orderId },
            data: { status: client_1.OrderStatus.CONFIRMED },
        });
        console.log(` Webhook procesado: Orden ${orderId} confirmada`);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService,
        app_config_1.AppConfig])
], PaymentService);
//# sourceMappingURL=payment.service.js.map