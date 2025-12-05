
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductDetails } from '../entities/product-details.entity';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetails])],
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService],
})
export class DetailsModule {}
