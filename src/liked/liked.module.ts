import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedService } from './liked.service';
import { LikedController } from './liked.controller';
import { LikedProduct } from './entities/liked-product.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikedProduct, Product])],
  providers: [LikedService],
  controllers: [LikedController],
})
export class LikedModule {}
