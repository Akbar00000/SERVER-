import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart/cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';
import { PromoCode } from '../promo/entities/promo-code.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;

  const mockCartRepo = {
    find: jest.fn(() => Promise.resolve([{ quantity: 1, product: { price: 100 } }])),
    findOne: jest.fn(),
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve(dto)),
    delete: jest.fn(() => Promise.resolve({ affected: 1 })),
  };

  const mockProductRepo = {
    findOneBy: jest.fn(({ id }) => {
      if (id === '1') return Promise.resolve({ id, price: 100 });
      return null;
    }),
  };

  const mockPromoRepo = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(() => Promise.resolve({ code: 'PROMO10', discountPercent: 10 })),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: getRepositoryToken(CartItem), useValue: mockCartRepo },
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
        { provide: getRepositoryToken(PromoCode), useValue: mockPromoRepo },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add product to cart', async () => {
    const dto = { productId: '1', quantity: 2 };
    const result = await service.addToCart(dto as any);
    expect(result.product.id).toBe('1');
  });

  it('should throw error if product not found', async () => {
    await expect(service.addToCart({ productId: '999', quantity: 1 } as any)).rejects.toThrow(HttpException);
  });

  it('should apply promo code', async () => {
    const result = await service.applyPromo('PROMO10');
    expect(result.discountPercent).toBe(10);
  });

  it('should return cart summary', async () => {
    const result = await service.getCart();
    expect(result.totalPrice).toBe(100);
  });

  it('should remove product from cart', async () => {
    const result = await service.removeFromCart('1');
    expect(result.affected).toBe(1);
  });
});
