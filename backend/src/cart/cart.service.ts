import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(createCartItemDto: CreateCartDto, userId: string) {
  const { productId, quantity } = createCartItemDto;

  const product = await this.prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) throw new NotFoundException('Producto no encontrado');

  return this.prisma.cart.upsert({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      userId,
      productId,
      quantity,
    },
  });
}

async getCartItems(userId: string) {
  return this.prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });
}

async updateQuantity(cartItemId: string, dto: UpdateCartDto, userId: string) {
  const cartItem = await this.prisma.cart.findUnique({
    where: { id: cartItemId },
  });

  if (!cartItem || cartItem.userId !== userId) {
    throw new NotFoundException('Ítem no encontrado');
  }

  return this.prisma.cart.update({
    where: { id: cartItemId },
    data: { quantity: dto.quantity },
  });
}

async removeFromCart(cartItemId: string, userId: string) {
  const cartItem = await this.prisma.cart.findUnique({
    where: { id: cartItemId },
  });

  if (!cartItem || cartItem.userId !== userId) {
    throw new NotFoundException('Ítem no encontrado');
  }

  return this.prisma.cart.delete({
    where: { id: cartItemId },
  });
}

}
