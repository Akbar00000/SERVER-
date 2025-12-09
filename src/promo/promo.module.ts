import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';
import { PromoCode } from './entities/promo-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromoCode])],
  providers: [PromoService],
  controllers: [PromoController],
  exports: [PromoService],
})
export class PromoModule {}
