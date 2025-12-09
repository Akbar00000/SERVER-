import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApplyPromoDto } from './dto/apply-promo.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: string) {
    return this.cartService.removeFromCart(productId);
  }

  @Post('apply-promo')
  applyPromo(@Body() dto: ApplyPromoDto) {
    return this.cartService.applyPromo(dto.code);
  }
}
