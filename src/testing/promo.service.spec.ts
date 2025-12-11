import { Test, TestingModule } from '@nestjs/testing';
import { PromoService } from '../promo/promo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PromoCode } from '../promo/entities/promo-code.entity';
import { HttpException } from '@nestjs/common';

describe('PromoService', () => {
  let service: PromoService;

  const mockRepo = {
    findOneBy: jest.fn(() => Promise.resolve(null)), 
    findOne: jest.fn(({ where }) => Promise.resolve({ code: where.code })), 
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve(dto)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromoService,
        { provide: getRepositoryToken(PromoCode), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<PromoService>(PromoService);
  });

  it('should create promo', async () => {
    const dto = { code: 'PROMO10', discountPercent: 10 };
    const result = await service.createPromo(dto as any);
    expect(result!.code).toBe('PROMO10');
  });

  it('should find promo by code', async () => {
    const result = await service.findByCode('PROMO10');
    expect(result!.code).toBe('PROMO10');
  });
});
