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
      .leftJoinAndSelect('product.details', 'details');

    
    if (dto.colors && dto.colors.length > 0) {
      qb.andWhere(
        dto.colors
          .map((_, idx) => `"details"."colors"::text ILIKE :color${idx}`)
          .join(' OR '),
        Object.assign({}, ...dto.colors.map((c, idx) => ({ [`color${idx}`]: `%${c}%` })))
      );
    }

   
    if (dto.storageOptions && dto.storageOptions.length > 0) {
      qb.andWhere(
        dto.storageOptions
          .map((_, idx) => `"details"."storageOptions"::text ILIKE :so${idx}`)
          .join(' OR '),
        Object.assign({}, ...dto.storageOptions.map((s, idx) => ({ [`so${idx}`]: `%${s}%` })))
      );
    }

    
    if (dto.specsKey && dto.specsValue) {
      qb.andWhere(`"details"."specs" ->> :key = :value`, { key: dto.specsKey, value: dto.specsValue });
    }

    return qb.getMany();
  }
}
