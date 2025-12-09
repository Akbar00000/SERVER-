import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { PromoCode } from '../promo/entities/promo-code.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  private appliedPromo: PromoCode | null = null;

  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(PromoCode)
    private promoRepo: Repository<PromoCode>,
  ) {}

  async addToCart(dto: AddToCartDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    let item = await this.cartRepo.findOne({
      where: { product: { id: dto.productId } },
      relations: ['product'],
    });

    if (item) item.quantity += dto.quantity;
    else item = this.cartRepo.create({ product, quantity: dto.quantity });

    return this.cartRepo.save(item);
  }

  async getCart() {
    const items = await this.cartRepo.find({ relations: ['product'] });

    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const estimatedTax = +(totalPrice * 0.1).toFixed(2);
    const estimatedShipping = items.length > 0 ? 5 : 0;

    let discount = 0;
    let finalPrice = totalPrice;

    if (this.appliedPromo) {
      discount = +(totalPrice * (this.appliedPromo.discountPercent / 100)).toFixed(2);
      finalPrice = +(totalPrice - discount).toFixed(2);
    }

    return {
      items,
      totalPrice,
      estimatedTax,
      estimatedShipping,
      discount,
      finalPrice,
      appliedPromo: this.appliedPromo?.code || null,
    };
  }

  async removeFromCart(productId: string) {
    return this.cartRepo.delete({ product: { id: productId } });
  }

  async applyPromo(code: string) {
    const trimmedCode = code.trim();

    const promo = await this.promoRepo
      .createQueryBuilder('promo')
      .where('LOWER(promo.code) = LOWER(:code)', { code: trimmedCode })
      .getOne();

    if (!promo) throw new HttpException('Invalid promo code', HttpStatus.BAD_REQUEST);

    this.appliedPromo = promo;

    return {
      message: `Promo code ${trimmedCode} applied`,
      discountPercent: promo.discountPercent,
    };
  }
}
