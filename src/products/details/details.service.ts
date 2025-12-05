
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetails } from '../entities/product-details.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(ProductDetails)
    private detailsRepo: Repository<ProductDetails>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

async getByProductId(productId: string) {
  const product = await this.productRepo.findOne({
    where: { id: productId },
  });

  if (!product) throw new NotFoundException('Product not found');

  let details = await this.detailsRepo.findOne({
    where: { product: { id: productId } }
  });

  if (!details) {
    details = this.detailsRepo.create({ product });
    await this.detailsRepo.save(details);
  }

  return details;
}

}
