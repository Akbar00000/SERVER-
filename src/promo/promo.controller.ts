import { Controller, Post, Body } from '@nestjs/common';
import { PromoService } from './promo.service';
import { CreatePromoDto } from './dto/create-promo.dto';

@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post('create')
  async create(@Body() dto: CreatePromoDto) {
    return this.promoService.createPromo(dto);
  }
}
