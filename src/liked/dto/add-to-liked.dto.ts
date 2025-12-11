import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddToLikedDto {
  @ApiProperty({
    example: "d3b73e5f-3b2f-4d4c-acde-5a234f71ac01",
    description: "Product UUID",
  })
  @IsUUID()
  productId: string;
}
