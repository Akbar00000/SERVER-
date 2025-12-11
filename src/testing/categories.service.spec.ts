import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../categories/categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockRepo = {
    create: jest.fn(dto => dto),
    save: jest.fn(dto => Promise.resolve({ id: '1', ...dto })),
    find: jest.fn(() => Promise.resolve([{ id: '1', name: 'Cat1', products: [] }])),
    findOne: jest.fn(({ where: { id } }) => {
      if (id === '1') return Promise.resolve({ id, name: 'Cat1', products: [] });
      return null;
    }),
    remove: jest.fn(dto => Promise.resolve(dto)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: getRepositoryToken(Category), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create category', async () => {
    const dto = { name: 'NewCat' };
    const result = await service.create(dto as any);
    expect(result.name).toBe('NewCat');
  });

  it('should find all categories', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(1);
  });

  it('should find one category', async () => {
    const result = await service.findOne('1');
    expect(result.id).toBe('1');
  });

  it('should throw NotFoundException for missing category', async () => {
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update category', async () => {
    const result = await service.update('1', { name: 'Updated' });
    expect(result.name).toBe('Updated');
  });

  it('should remove category', async () => {
    const cat = await service.findOne('1');
    const result = await service.remove('1');
    expect(result).toEqual(cat);
  });
});
