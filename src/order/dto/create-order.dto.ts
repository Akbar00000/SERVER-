import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateOrderDto {
  
  @IsString()
  addressName: string;

  @IsString()
  addressFull: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  zip: string;

  
  @IsString()
  shippingMethod: string;

  @IsNumber()
  shippingPrice: number;

  @IsString()
  shippingDate: string;

  
  @IsOptional()
  @IsString()
  promoCode?: string;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;
}
