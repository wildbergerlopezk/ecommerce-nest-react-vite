import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async createOrderFromCart(userId: string) {
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Carrito vacío');
    }

    let totalAmount = 0;

    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        throw new BadRequestException(`Stock insuficiente para "${item.product.name}"`);
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


  async getUserOrders(userId: string) {
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

  async getOrderById(orderId: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        orderItems: { include: { product: true } },
        Payment: true,
      },
    });
    if (!order) throw new BadRequestException('Orden no encontrada');
    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

}

