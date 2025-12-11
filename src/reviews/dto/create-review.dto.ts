import { IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'b21586aa-799f-41bd-9ba3-23f1be64d1a2', description: 'ID of the product being reviewed' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 5, description: 'Rating score from 1 to 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @ApiPropertyOptional({ example: 'Excellent product!', description: 'Optional review comment' })
  @IsOptional()
  @IsString()
  comment?: string;
}
