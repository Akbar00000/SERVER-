import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../payment/payment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';

describe('PaymentService', () => {
  let service: PaymentService;

  const mockOrderRepo = {
    findOne: jest.fn(({ where: { id } }) => id === '1' ? Promise.resolve({ id, isPaid: false }) : null),
    save: jest.fn(order => Promise.resolve(order)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepo },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should pay order', async () => {
    const result = await service.payOrder('1', 'card');
    expect(result.isPaid).toBe(true);
  });
});
