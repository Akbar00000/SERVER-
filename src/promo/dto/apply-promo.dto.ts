import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyPromoDto {
  @ApiProperty({ example: 'BLACKFRIDAY', description: 'Promo code to apply' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
