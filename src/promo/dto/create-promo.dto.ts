import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreatePromoDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @Min(1)
  @Max(100)
  discountPercent: number;
}
