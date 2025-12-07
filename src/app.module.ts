import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { Banner } from './banners/entities/banner.entity';
import { ProductDetails } from './products/entities/product-details.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/entities/review.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '198019572010',
      database: process.env.DB_NAME || 'mobile_store',
      entities: [Product, Category, Banner, ProductDetails, Review],
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    BannersModule,
    ReviewsModule,
  ],
})
export class AppModule {}
