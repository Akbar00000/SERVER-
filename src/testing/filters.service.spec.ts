import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from '../filters/filters.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Repository } from 'typeorm';

describe('FilterService', () => {
  let service: FilterService;
  const mockRepo = { createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(() => Promise.resolve([{ id: '1', title: 'Test' }])),
  }))};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilterService,
        { provide: getRepositoryToken(Product), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<FilterService>(FilterService);
  });

  it('should be defined', () => expect(service).toBeDefined());
  it('should return filtered products', async () => {
    const result = await service.filter({ search: 'test' } as any);
    expect(result[0].id).toBe('1');
  });
});
