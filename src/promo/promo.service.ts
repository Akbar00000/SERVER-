import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoCode } from './entities/promo-code.entity';
import { CreatePromoDto } from './dto/create-promo.dto';

@Injectable()
export class PromoService {
  constructor(
    @InjectRepository(PromoCode)
    private promoRepo: Repository<PromoCode>,
  ) {}

  async createPromo(dto: CreatePromoDto) {
    const exists = await this.promoRepo.findOneBy({ code: dto.code.trim() });
    if (exists) throw new HttpException('Promo code already exists', HttpStatus.BAD_REQUEST);

    const promo = this.promoRepo.create({
      code: dto.code.trim(),
      discountPercent: dto.discountPercent,
    });

    return this.promoRepo.save(promo);
  }

  async findByCode(code: string): Promise<PromoCode | null> {
    return this.promoRepo.findOne({ where: { code: code.trim() } });
  }
}
