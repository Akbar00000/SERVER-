import { Test, TestingModule } from '@nestjs/testing';
import { LikedService } from '../liked/liked.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LikedProduct } from '../liked/entities/liked-product.entity';
import { Product } from '../products/entities/product.entity';

describe('LikedService', () => {
  let service: LikedService;

  const mockLikedRepo = {
    findOne: jest.fn(() => Promise.resolve(null)),
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve({ product: { id: dto.product.id } })),
    find: jest.fn(() => Promise.resolve([{ product: { id: '1' } }])),
    delete: jest.fn(),
  };
  const mockProductRepo = {
    findOneBy: jest.fn(({ id }) => Promise.resolve({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikedService,
        { provide: getRepositoryToken(LikedProduct), useValue: mockLikedRepo },
        { provide: getRepositoryToken(Product), useValue: mockProductRepo },
      ],
    }).compile();

    service = module.get<LikedService>(LikedService);
  });

  it('should add to liked', async () => {
    const dto = { productId: '1' };
    const result = await service.addToLiked(dto as any);
    expect(result.product.id).toBe(dto.productId);
  });

  it('should get liked items', async () => {
    const result = await service.getLiked();
    expect(result.length).toBe(1);
    expect(result[0].product.id).toBe('1');
  });
});
