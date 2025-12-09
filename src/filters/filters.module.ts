import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { FilterController } from './filters.controller';
import { FilterService } from './filters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [FilterController],
  providers: [FilterService],
  exports: [] 
})
export class FilterModule {}
