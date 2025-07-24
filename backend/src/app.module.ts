import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductsModule } from './products/products.module';
import { SearchModule } from './search/search.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ UsersModule, PrismaModule, AuthModule, CategoriesModule, SubcategoriesModule, ProductsModule, SearchModule, CartModule, OrderModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
