import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LikedProduct } from './entities/liked-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddToLikedDto } from './dto/add-to-liked.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class LikedService {
  constructor(
    @InjectRepository(LikedProduct)
    private likedRepo: Repository<LikedProduct>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addToLiked(dto: AddToLikedDto) {
    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new Error('Product not found');

    let liked = await this.likedRepo.findOne({
      where: { product: { id: dto.productId } },
      relations: ['product'],
    });

    if (!liked) {
      liked = this.likedRepo.create({ product });
      return this.likedRepo.save(liked);
    }

    return liked;
  }

  async getLiked() {
    return this.likedRepo.find({ relations: ['product'] });
  }

  async removeFromLiked(productId: string) {
    return this.likedRepo.delete({ product: { id: productId } });
  }
}
