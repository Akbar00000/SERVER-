import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductDetails } from './entities/product-details.entity';
import { Category } from '../categories/entities/category.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductDetails, Category, Review]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
