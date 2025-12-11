import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: "Home", description: "Short name for address" })
  @IsString()
  addressName: string;

  @ApiProperty({ example: "123 Main St, Apt 4", description: "Full address" })
  @IsString()
  addressFull: string;

  @ApiProperty({ example: "+998901234567", description: "Customer phone number" })
  @IsString()
  phone: string;

  @ApiProperty({ example: "Tashkent", description: "City" })
  @IsString()
  city: string;

  @ApiProperty({ example: "100000", description: "ZIP code" })
  @IsString()
  zip: string;

  @ApiProperty({ example: "Courier", description: "Shipping method" })
  @IsString()
  shippingMethod: string;

  @ApiProperty({ example: 15.5, description: "Shipping price" })
  @IsNumber()
  shippingPrice: number;

  @ApiProperty({ example: "2025-12-15", description: "Expected shipping date" })
  @IsString()
  shippingDate: string;

  @ApiPropertyOptional({ example: "BLACKFRIDAY", description: "Promo code applied" })
  @IsOptional()
  @IsString()
  promoCode?: string;

  @ApiPropertyOptional({ example: 10, description: "Discount amount from promo code" })
  @IsOptional()
  @IsNumber()
  discountAmount?: number;
}
