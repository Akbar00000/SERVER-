import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { PromoCode } from '../promo/entities/promo-code.entity';  

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, PromoCode])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
