import { IsNotEmpty, IsUUID, IsInt, Min, Max, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
