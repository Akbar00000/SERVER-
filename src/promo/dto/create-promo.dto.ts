import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromoDto {
  @ApiProperty({ example: 'BLACKFRIDAY', description: 'Unique promo code' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 15, description: 'Discount percentage' })
  @IsNumber()
  @Min(1)
  @Max(100)
  discountPercent: number;
}
