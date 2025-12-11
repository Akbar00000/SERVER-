import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ApplyPromoDto } from './dto/apply-promo.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: "Add product to cart" })
  @ApiResponse({ status: 201, description: "Product added to cart" })
  addToCart(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get full cart info" })
  @ApiResponse({ status: 200 })
  getCart() {
    return this.cartService.getCart();
  }

  @Delete(':productId')
  @ApiOperation({ summary: "Remove product from cart" })
  @ApiParam({ name: "productId", example: "a23f91d2-1234-4f9a-bd12-123abc987650" })
  @ApiResponse({ status: 200 })
  removeFromCart(@Param('productId') productId: string) {
    return this.cartService.removeFromCart(productId);
  }

  @Post('apply-promo')
  @ApiOperation({ summary: "Apply promo code" })
  @ApiResponse({ status: 200, description: "Promo applied" })
  @ApiResponse({ status: 400, description: "Invalid promo code" })
  applyPromo(@Body() dto: ApplyPromoDto) {
    return this.cartService.applyPromo(dto.code);
  }
}
