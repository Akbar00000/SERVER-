import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './products.service';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { ProductDetails } from './entities/product-details.entity';
import { Review } from '../reviews/entities/review.entity'; 
import { ProductController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductDetails, Review])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductsModule {}
