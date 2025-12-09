import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async payOrder(orderId: string, method?: string) {
    const order = await this.orderRepo.findOne({ where: { id: orderId } });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    if (order.isPaid) {
      throw new BadRequestException('Order already paid');
    }

    order.isPaid = true;
    order.paidAt = new Date();
    
    if (method) {
      (order as any).paymentMethod = method; 
    }

    return this.orderRepo.save(order);
  }
}
