import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Product } from '../products/entities/product.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateReviewDto) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const review = this.reviewRepo.create({
      score: dto.score,
      comment: dto.comment || '',
      product,
    });

    return this.reviewRepo.save(review);
  }

  async findByProduct(productId: string) {
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const reviews = await this.reviewRepo.find({ where: { product } });

    const average =
      reviews.reduce((acc, r) => acc + r.score, 0) / (reviews.length || 1);

    return { average, reviews };
  }
}
