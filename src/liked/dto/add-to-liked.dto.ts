import { IsUUID } from 'class-validator';

export class AddToLikedDto {
  @IsUUID()
  productId: string;
}
