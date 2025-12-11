import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../reviews/reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../reviews/entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const mockReviewRepo = {
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve(dto)),
    find: jest.fn(() => Promise.resolve([{ score: 5, comment: 'Great' }])),
  };
  const mockProductRepo = { findOne: jest.fn(() => Promise.resolve({ id: '1' })) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: getRepositoryToken(Review), useValue: mockReviewRepo },
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should create review', async () => {
    const dto = { productId: '1', score: 5 };
    const result = await service.create(dto as any);
    expect(result.score).toBe(5);
  });

  it('should throw NotFoundException if product missing', async () => {
    mockProductRepo.findOne = jest.fn(() => Promise.resolve(null)) as any;
    await expect(service.create({ productId: '999', score: 5 } as any)).rejects.toThrow(NotFoundException);
  });
});
