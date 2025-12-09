import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async filter(dto: FilterProductsDto): Promise<Product[]> {
    const qb = this.productRepo.createQueryBuilder('product')
      .leftJoinAndSelect('product.details', 'details')
      .leftJoinAndSelect('product.category', 'category');

    if (dto.search) {
      qb.andWhere(
        '(product.title ILIKE :search OR product.description ILIKE :search)',
        { search: `%${dto.search}%` },
      );
    }

    if (dto.minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice: dto.minPrice });
    }
    if (dto.maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice: dto.maxPrice });
    }

    if (dto.tags && dto.tags.length > 0) {
      qb.andWhere(
        dto.tags.map((_, idx) => `product.tags ILIKE :tag${idx}`).join(' OR '),
        Object.assign({}, ...dto.tags.map((t, idx) => ({ [`tag${idx}`]: `%${t}%` })))
      );
    }

    if (dto.categoryName) {
      qb.andWhere('category.name = :catName', { catName: dto.categoryName });
    }

    if (dto.colors && dto.colors.length > 0) {
      qb.andWhere(
        dto.colors.map((_, idx) => `details.colors::text ILIKE :color${idx}`).join(' OR '),
        Object.assign({}, ...dto.colors.map((c, idx) => ({ [`color${idx}`]: `%${c}%` })))
      );
    }

    if (dto.storageOptions && dto.storageOptions.length > 0) {
      qb.andWhere(
        dto.storageOptions.map((_, idx) => `details.storageOptions::text ILIKE :so${idx}`).join(' OR '),
        Object.assign({}, ...dto.storageOptions.map((s, idx) => ({ [`so${idx}`]: `%${s}%` })))
      );
    }

    if (dto.specsKey && dto.specsValue) {
      qb.andWhere(`details.specs ->> :key = :value`, { key: dto.specsKey, value: dto.specsValue });
    }

    return qb.getMany();
  }
}
