import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../products/products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductDetails } from '../products/entities/product-details.entity';
import { Category } from '../categories/entities/category.entity';
import { Review } from '../reviews/entities/review.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  const mockProductRepo = { create: jest.fn(dto => dto), save: jest.fn(dto => Promise.resolve(dto)), findOne: jest.fn(), find: jest.fn() };
  const mockDetailsRepo = { create: jest.fn(dto => dto), save: jest.fn(dto => Promise.resolve(dto)), remove: jest.fn() };
  const mockCategoryRepo = { findOne: jest.fn(({ where }) => Promise.resolve({ id: '1', name: where.name })) };
  const mockReviewRepo = { find: jest.fn(() => Promise.resolve([])) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
        { provide: getRepositoryToken(ProductDetails), useValue: mockDetailsRepo },
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepo },
        { provide: getRepositoryToken(Review), useValue: mockReviewRepo },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should create product', async () => {
    const dto = {
      title: 'Test Product',
      description: 'desc',
      price: 100,
      image: 'img.png',
      categoryName: 'TestCat',
      tags: [],
      details: { colors: ['red'], storageOptions: ['64GB'], specs: {}, description: 'details' }
    };
    const result = await service.create(dto as any);
    expect(result.title).toBe('Test Product');
    expect(result.category.name).toBe('TestCat');
  });
});
