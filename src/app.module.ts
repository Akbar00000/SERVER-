import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { BannersModule } from './banners/banners.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LikedModule } from './liked/liked.module';
import { CartModule } from './cart/cart.module';
import { PromoModule } from './promo/promo.module';

import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { Banner } from './banners/entities/banner.entity';
import { ProductDetails } from './products/entities/product-details.entity';
import { Review } from './reviews/entities/review.entity';
import { CartItem } from './cart/entities/cart-item.entity';
import { LikedProduct } from './liked/entities/liked-product.entity';
import { PromoCode } from './promo/entities/promo-code.entity';
import { Order } from './order/entities/order.entity';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/entities/payment-record.entity';
import { FilterModule } from './filters/filters.module';

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
      entities: [Product, Category, Banner, ProductDetails, Review, LikedProduct, CartItem, PromoCode, Order, Payment],
      synchronize: true,
    }),
    ProductsModule,
    CategoriesModule,
    BannersModule,
    ReviewsModule,
    CartModule,
    LikedModule,
    PromoModule, 
    OrderModule,
    PaymentModule,
    FilterModule
  ],
})
export class AppModule {}
