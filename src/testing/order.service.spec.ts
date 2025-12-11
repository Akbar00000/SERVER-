import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../order/order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { CartService } from '../cart/cart.service';
import { PromoService } from '../promo/promo.service';

describe('OrderService', () => {
  let service: OrderService;

  const mockOrderRepo = {
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve(dto)),
    findOne: jest.fn(({ where: { id } }) => id === '1' ? Promise.resolve({ id }) : null),
    find: jest.fn(() => Promise.resolve([{ id: '1' }])),
  };

  const mockCartService = { getCart: jest.fn(() => Promise.resolve({ items: [{}, {}], totalPrice: 100, estimatedTax: 10, estimatedShipping: 5 })) };
  const mockPromoService = { findByCode: jest.fn(() => Promise.resolve({ code: 'PROMO10', discountPercent: 10 })) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepo },
        { provide: CartService, useValue: mockCartService },
        { provide: PromoService, useValue: mockPromoService },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => expect(service).toBeDefined());
  it('should create order', async () => {
    const dto = { promoCode: 'PROMO10', addressName: '', addressFull: '', phone: '', city: '', zip: '', shippingMethod: '', shippingPrice: 0, shippingDate: new Date() };
    const result = await service.create(dto as any);
    expect(result.totalPrice).toBe(100);
  });
});
