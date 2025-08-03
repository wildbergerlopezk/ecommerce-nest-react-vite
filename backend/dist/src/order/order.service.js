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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrderFromCart(userId) {
        const cartItems = await this.prisma.cart.findMany({
            where: { userId },
            include: { product: true },
        });
        if (cartItems.length === 0) {
            throw new common_1.BadRequestException('Carrito vacío');
        }
        let totalAmount = 0;
        for (const item of cartItems) {
            if (item.quantity > item.product.stock) {
                throw new common_1.BadRequestException(`Stock insuficiente para "${item.product.name}"`);
            }
            totalAmount += item.quantity * item.product.price;
        }
        return this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    totalAmount,
                    currency: 'PYG',
                    status: 'PENDING',
                },
            });
            for (const item of cartItems) {
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.product.price,
                    },
                });
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: { decrement: item.quantity },
                    },
                });
            }
            await tx.cart.deleteMany({ where: { userId } });
            return order;
        });
    }
    async getUserOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                orderItems: {
                    include: { product: true },
                },
                Payment: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getOrderById(orderId, userId) {
        const order = await this.prisma.order.findFirst({
            where: { id: orderId, userId },
            include: {
                orderItems: { include: { product: true } },
                Payment: true,
            },
        });
        if (!order)
            throw new common_1.BadRequestException('Orden no encontrada');
        return order;
    }
    async updateOrderStatus(orderId, status) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map