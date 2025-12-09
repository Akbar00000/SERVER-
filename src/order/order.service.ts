import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { PromoService } from '../promo/promo.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    private cartService: CartService,
    private promoService: PromoService,
  ) {}

  async create(dto: CreateOrderDto) {
    const cart = await this.cartService.getCart();

    if (!cart.items?.length) {
      throw new BadRequestException('Cart is empty');
    }

    const { items, totalPrice, estimatedTax, estimatedShipping } = cart;

    let discount = 0;
    let appliedPromo: string | null = null;

    if (dto.promoCode) {
      const promo = await this.promoService.findByCode(dto.promoCode.trim());
      if (!promo) {
        throw new BadRequestException('Invalid promo code');
      }
      discount = +(totalPrice * (promo.discountPercent / 100)).toFixed(2);
      appliedPromo = promo.code;
    }

    const finalPrice = +(totalPrice + estimatedTax + estimatedShipping - discount).toFixed(2);

    const order = this.orderRepo.create({
      addressName: dto.addressName,
      addressFull: dto.addressFull,
      phone: dto.phone,
      city: dto.city,
      zip: dto.zip,

      shippingMethod: dto.shippingMethod,
      shippingPrice: dto.shippingPrice,

      shippingDate: dto.shippingDate,

      promoCode: appliedPromo,      
      discountAmount: discount,

      items: items,
      totalPrice: totalPrice,
      estimatedTax: estimatedTax,
      estimatedShipping: estimatedShipping,
      finalPrice: finalPrice,

      status: 'pending',
      isPaid: false,
    });

    return await this.orderRepo.save(order);
  }

  async findOne(orderId: string): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepo.find();
  }
}
