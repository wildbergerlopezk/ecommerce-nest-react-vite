import { Controller, Body, Post, Get,Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { OrderService } from './order.service';
import { OrderStatus } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-from-cart')
  createOrder(@GetUser('userId') userId: string) {
    return this.orderService.createOrderFromCart(userId);
  }

  @Get()
  getOrders(@GetUser('userId') userId: string) {
    return this.orderService.getUserOrders(userId);
  }

  @Get(':id')
  getOrder(@Param('id') id: string, @GetUser('userId') userId: string) {
    return this.orderService.getOrderById(id, userId);
  }
  
  @Patch('update-status')
  async updateStatus(
    @Body() body: { orderId?: string; status?: OrderStatus },
    @GetUser('userId') userId: string
  ) {
    const { orderId, status } = body;

    if (!orderId || !status) {
      throw new BadRequestException('orderId y status son requeridos');
    }

    const order = await this.orderService.getOrderById(orderId, userId);

    if (!order) {
      throw new BadRequestException('Orden no encontrada o no autorizada');
    }

    return this.orderService.updateOrderStatus(orderId, status);
  }
}
