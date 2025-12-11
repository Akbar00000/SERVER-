import { Test, TestingModule } from '@nestjs/testing';
import { BannerService } from '../banners/banners.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Banner } from '../banners/entities/banner.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('BannerService', () => {
  let service: BannerService;
  let repo: Repository<Banner>;

  const mockBannerRepo = {
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve({ id: '1', ...dto })),
    find: jest.fn(() => Promise.resolve([{ id: '1', title: 'Test Banner' }])),
    findOne: jest.fn(({ where: { id } }) => {
      if (id === '1') return Promise.resolve({ id, title: 'Test Banner' });
      return Promise.resolve(null);
    }),
    remove: jest.fn(banner => Promise.resolve(banner)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannerService,
        { provide: getRepositoryToken(Banner), useValue: mockBannerRepo },
      ],
    }).compile();

    service = module.get<BannerService>(BannerService);
    repo = module.get<Repository<Banner>>(getRepositoryToken(Banner));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a banner', async () => {
    const dto = { title: 'New Banner' };
    const result = await service.create(dto as any);
    expect(result).toEqual({ id: '1', ...dto });
  });

  it('should find all banners', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: '1', title: 'Test Banner' }]);
  });

  it('should find one banner', async () => {
    const result = await service.findOne('1');
    expect(result.id).toBe('1');
  });

  it('should throw NotFoundException for missing banner', async () => {
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update banner', async () => {
    const result = await service.update('1', { title: 'Updated' });
    expect(result.title).toBe('Updated');
  });

  it('should remove banner', async () => {
    const banner = await service.findOne('1');
    const result = await service.remove('1');
    expect(result).toEqual(banner);
  });
});
