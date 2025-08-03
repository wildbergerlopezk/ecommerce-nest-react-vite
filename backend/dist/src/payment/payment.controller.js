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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const app_config_1 = require("../config/app.config");
let PaymentController = class PaymentController {
    paymentService;
    appConfig;
    constructor(paymentService, appConfig) {
        this.paymentService = paymentService;
        this.appConfig = appConfig;
    }
    async createCheckout(body) {
        return this.paymentService.createCheckoutSession(body.orderId, body.amount);
    }
    async paymentSuccess(sessionId, res) {
        try {
            if (!sessionId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).send('session_id es requerido');
            }
            await this.paymentService.handleCheckoutSuccess(sessionId);
            return res.redirect(`${this.appConfig.frontendUrl}/success`);
        }
        catch (error) {
            console.error('Error en success:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('Error al procesar el pago exitoso');
        }
    }
    paymentCancel(res) {
        return res.redirect(`${this.appConfig.frontendUrl}/cancel`);
    }
    async handleStripeWebhook(req, signature) {
        const rawBody = req.rawBody ?? req.body;
        return this.paymentService.handleStripeWebhook(rawBody, signature);
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createCheckout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('success'),
    __param(0, (0, common_1.Query)('session_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "paymentSuccess", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('cancel'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "paymentCancel", null);
__decorate([
    (0, common_1.Post)('webhook'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "handleStripeWebhook", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        app_config_1.AppConfig])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map