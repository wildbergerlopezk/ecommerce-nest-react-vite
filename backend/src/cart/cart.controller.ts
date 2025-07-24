import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator'; 

@UseGuards(JwtAuthGuard) 
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  addItem(
    @Body() dto: CreateCartDto,
    @GetUser('userId') userId: string, 
  ) {
    return this.cartService.create(dto, userId);
  }

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.cartService.getCartItems(userId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateQuantity(
    @Param('id', ParseUUIDPipe) cartItemId: string,
    @Body() dto: UpdateCartDto,
    @GetUser('userId') userId: string,
  ) {
    return this.cartService.updateQuantity(cartItemId, dto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) cartItemId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.cartService.removeFromCart(cartItemId, userId);
  }
}
